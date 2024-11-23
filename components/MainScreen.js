import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';
import AddTransactionButton from './AddTransactionButton';
import Icon from 'react-native-vector-icons/FontAwesome';
import AddTransactionModal from './AddTransactionModal';

const MainScreen = () => {
  const [budgetModalVisible, setBudgetModalVisible] = useState(false);
  const [transactionModalVisible, setTransactionModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* Budget Selector Button */}
      <TouchableOpacity onPress={() => setBudgetModalVisible(true)} style={styles.budgetButton}>
        <Text style={styles.budgetButtonText}>Моя семья</Text>
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
              <TouchableOpacity style={styles.budgetOption}>
                <Text style={styles.budgetOptionText}>Моя семья</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.budgetOption}>
                <Text style={styles.budgetOptionText}>Проект А</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.budgetOption}>
                <Text style={styles.budgetOptionText}>Путешествие</Text>
              </TouchableOpacity>
              {/* Add more budgets here */}
              <TouchableOpacity style={styles.createBudgetButton}>
                <Text style={styles.createBudgetButtonText}>Создать новый бюджет</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>

      <View style={styles.tabsContainer}>
        <TouchableOpacity style={styles.tabButton}><Text style={styles.tabText}>Обзор</Text></TouchableOpacity>
        <TouchableOpacity style={styles.tabButton}><Text style={styles.tabText}>Расходы</Text></TouchableOpacity>
        <TouchableOpacity style={styles.tabButton}><Text style={styles.tabText}>Список</Text></TouchableOpacity>
      </View>
      <View style={styles.transactionContainer}>
        <Text style={styles.transactionText}>Октябрь 2024</Text>
        <Text style={styles.transactionSubText}>Нет транзакций</Text>
      </View>
      <View style={styles.summaryContainer}>
        <View style={styles.summaryBox}><Text style={styles.summaryLabel}>Доходы</Text><Text style={styles.summaryValue}>₸0</Text></View>
        <View style={styles.summaryBox}><Text style={styles.summaryLabel}>Расходы</Text><Text style={styles.summaryValue}>₸0</Text></View>
        <View style={styles.summaryBox}><Text style={styles.summaryLabel}>Остаток</Text><Text style={styles.summaryValue}>₸0</Text></View>
      </View>

      <AddTransactionButton onPress={() => setTransactionModalVisible(true)} />

      {/* Modal for Adding Transaction */}
      <AddTransactionModal
        visible={transactionModalVisible}
        onClose={() => setTransactionModalVisible(false)}
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
  createBudgetButton: {
    paddingVertical: 15,
    marginTop: 20,
    backgroundColor: '#3D85C6',
    borderRadius: 10,
    alignItems: 'center',
  },
  createBudgetButtonText: {
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
  transactionSubText: {
    fontSize: 14,
    color: '#aaaaaa',
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