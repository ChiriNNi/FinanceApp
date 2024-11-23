import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView, TextInput, Alert } from 'react-native';
import AddTransactionButton from './AddTransactionButton';
import Icon from 'react-native-vector-icons/FontAwesome';
import AddTransactionModal from './AddTransactionModal';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MainScreen = () => {
  const [budgetModalVisible, setBudgetModalVisible] = useState(false);
  const [transactionModalVisible, setTransactionModalVisible] = useState(false);
  const [budgets, setBudgets] = useState([]);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [incomeTotal, setIncomeTotal] = useState(0);
  const [expenseTotal, setExpenseTotal] = useState(0);
  const [newBudgetName, setNewBudgetName] = useState('');

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const storedBudgets = await AsyncStorage.getItem('budgets');
        if (storedBudgets) {
          setBudgets(JSON.parse(storedBudgets));
          setSelectedBudget(JSON.parse(storedBudgets)[0]);
        }
      } catch (error) {
        console.error('Ошибка при загрузке бюджетов:', error);
      }
    };
    fetchBudgets();
  }, []);

  useEffect(() => {
    if (selectedBudget) {
      fetchSummary();
    }
  }, [selectedBudget]);

  const fetchSummary = async () => {
    try {
      const storedTransactions = await AsyncStorage.getItem(`${selectedBudget}_transactions`);
      if (storedTransactions) {
        updateSummary(JSON.parse(storedTransactions));
      } else {
        updateSummary([]);
      }
    } catch (error) {
      console.error('Ошибка при загрузке транзакций:', error);
    }
  };

  const updateSummary = (transactions) => {
    const income = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const expense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    setIncomeTotal(income);
    setExpenseTotal(expense);
  };

  const addNewBudget = async () => {
    if (!newBudgetName.trim()) {
      Alert.alert('Ошибка', 'Введите название бюджета');
      return;
    }
    const updatedBudgets = [...budgets, newBudgetName];
    try {
      await AsyncStorage.setItem('budgets', JSON.stringify(updatedBudgets));
      setBudgets(updatedBudgets);
      setNewBudgetName('');
      setSelectedBudget(newBudgetName);
      setBudgetModalVisible(false);
    } catch (error) {
      console.error('Ошибка при добавлении нового бюджета:', error);
    }
  };

  const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
      setBudgets([]);
      setSelectedBudget(null);
      setIncomeTotal(0);
      setExpenseTotal(0);
      Alert.alert('Успех', 'Локальное хранилище очищено');
    } catch (error) {
      console.error('Ошибка при очистке локального хранилища:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Budget Selector Button */}
      <TouchableOpacity onPress={() => setBudgetModalVisible(true)} style={styles.budgetButton}>
        <Text style={styles.budgetButtonText}>{selectedBudget || 'Выберите бюджет'}</Text>
        <Icon name="caret-down" size={20} color="#ffffff" style={styles.caretIcon} />
      </TouchableOpacity>

      {/* Modal for Budget Selection */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={budgetModalVisible}
        onRequestClose={() => {
          setBudgetModalVisible(!budgetModalVisible);
        }}
      >
        <TouchableOpacity
          style={styles.modalContainer}
          activeOpacity={1}
          onPressOut={() => setBudgetModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <ScrollView>
              <Text style={styles.modalTitle}>Выберите бюджет:</Text>
              {budgets.map((budget, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.budgetOption}
                  onPress={() => {
                    setSelectedBudget(budget);
                    setBudgetModalVisible(false);
                  }}
                >
                  <Text style={styles.budgetOptionText}>{budget}</Text>
                </TouchableOpacity>
              ))}
              <View style={styles.newBudgetContainer}>
                <TextInput
                  style={styles.newBudgetInput}
                  placeholder="Название нового бюджета"
                  placeholderTextColor="#aaaaaa"
                  value={newBudgetName}
                  onChangeText={setNewBudgetName}
                />
                <TouchableOpacity style={styles.createBudgetButton} onPress={addNewBudget}>
                  <Text style={styles.createBudgetButtonText}>Создать новый бюджет</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.clearButton} onPress={clearStorage}>
                <Text style={styles.clearButtonText}>Очистить локальное хранилище</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>

      <View style={styles.tabsContainer}>
        <TouchableOpacity style={styles.tabButton}><Text style={styles.tabText}>Обзор</Text></TouchableOpacity>
        <TouchableOpacity style={styles.tabButton}><Text style={styles.tabText}>Финансы</Text></TouchableOpacity>
        <TouchableOpacity style={styles.tabButton}><Text style={styles.tabText}>Транзакции</Text></TouchableOpacity>
      </View>
      <View style={styles.transactionContainer}>
        <Text style={styles.transactionText}>Октябрь 2024</Text>
      </View>
      <View style={styles.summaryContainer}>
        <View style={styles.summaryBox}><Text style={styles.summaryLabel}>Доходы</Text><Text style={styles.summaryValue}>₸{incomeTotal}</Text></View>
        <View style={styles.summaryBox}><Text style={styles.summaryLabel}>Расходы</Text><Text style={styles.summaryValue}>₸{expenseTotal}</Text></View>
        <View style={styles.summaryBox}><Text style={styles.summaryLabel}>Остаток</Text><Text style={styles.summaryValue}>₸{incomeTotal - expenseTotal}</Text></View>
      </View>

      <AddTransactionButton onPress={() => setTransactionModalVisible(true)} />

      {/* Modal for Adding Transaction */}
      <AddTransactionModal
        visible={transactionModalVisible}
        onClose={() => setTransactionModalVisible(false)}
        updateSummary={(transactions) => updateSummary(transactions)}
        budgetKey={selectedBudget}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1E1E1E',
  },
  budgetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: '#333333',
    borderRadius: 15,
    marginBottom: 20,
  },
  budgetButtonText: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  caretIcon: {
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#1E1E1E',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
  },
  budgetOption: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  budgetOptionText: {
    fontSize: 18,
    color: '#ffffff',
  },
  newBudgetContainer: {
    marginTop: 20,
  },
  newBudgetInput: {
    backgroundColor: '#333',
    color: '#ffffff',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  createBudgetButton: {
    paddingVertical: 15,
    marginTop: 10,
    backgroundColor: '#3D85C6',
    borderRadius: 10,
    alignItems: 'center',
  },
  createBudgetButtonText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  clearButton: {
    paddingVertical: 15,
    marginTop: 20,
    backgroundColor: '#ff6666',
    borderRadius: 10,
    alignItems: 'center',
  },
  clearButtonText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#333333',
    borderRadius: 20,
  },
  tabText: {
    fontSize: 14,
    color: '#ffffff',
  },
  transactionContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  transactionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  summaryBox: {
    alignItems: 'center',
    backgroundColor: '#333333',
    padding: 15,
    borderRadius: 15,
    width: '30%',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#aaaaaa',
    marginBottom: 5,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default MainScreen;
