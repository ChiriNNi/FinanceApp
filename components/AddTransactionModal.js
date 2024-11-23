import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddTransactionModal = ({ visible, onClose, updateSummary }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [comment, setComment] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [transactionType, setTransactionType] = useState('expense');

  const expenseCategories = ['Аренда', 'Материалы', 'Реклама', 'Транспорт', 'Добавить категорию...'];
  const incomeCategories = ['Спонсоры', 'Гранты', 'Инвестиции', 'Продажи', 'Платные мероприятия'];

  const categories = transactionType === 'expense' ? expenseCategories : incomeCategories;

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const storedTransactions = await AsyncStorage.getItem('transactions');
        if (storedTransactions) {
          setTransactions(JSON.parse(storedTransactions));
        }
      } catch (error) {
        console.error('Ошибка при загрузке транзакций:', error);
      }
    };
    fetchTransactions();
  }, []);

  const handleConfirmDate = (selectedDate) => {
    setShowDatePicker(false);
    setDate(selectedDate);
  };

  const addTransaction = async () => {
    if (!amount || !category || !comment) {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    const newTransaction = {
      type: transactionType,
      amount: parseFloat(amount),
      category: category,
      comment: comment,
      date: date.toISOString(),
    };

    try {
      const updatedTransactions = [...transactions, newTransaction];
      await AsyncStorage.setItem('transactions', JSON.stringify(updatedTransactions));
      setTransactions(updatedTransactions);
      updateSummary(updatedTransactions);
      alert('Транзакция добавлена успешно');
      onClose();
    } catch (error) {
      console.error('Ошибка при добавлении транзакции: ', error);
      alert(`Ошибка при добавлении транзакции: ${error.message}`);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <ScrollView contentContainerStyle={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Добавить транзакцию</Text>
          <View style={styles.transactionTypeContainer}>
            <TouchableOpacity
              style={[styles.transactionTypeButton, transactionType === 'income' && styles.selectedButton]}
              onPress={() => setTransactionType('income')}
            >
              <Text style={styles.transactionTypeText}>Доходы</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.transactionTypeButton, transactionType === 'expense' && styles.selectedButton]}
              onPress={() => setTransactionType('expense')}
            >
              <Text style={styles.transactionTypeText}>Расходы</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Сумма:"
            placeholderTextColor="#aaaaaa"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />
          <Picker
            selectedValue={category}
            style={styles.picker}
            onValueChange={(itemValue) => setCategory(itemValue)}
          >
            {categories.map((cat, index) => (
              <Picker.Item key={index} label={cat} value={cat} color="#000000" />
            ))}
          </Picker>
          <TextInput
            style={styles.input}
            placeholder="Назначение средств:"
            placeholderTextColor="#aaaaaa"
            value={comment}
            onChangeText={setComment}
          />
          <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
            <Text style={styles.dateButtonText}>Дата: {date.toLocaleDateString()}</Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={showDatePicker}
            mode="date"
            onConfirm={handleConfirmDate}
            onCancel={() => setShowDatePicker(false)}
            display="inline"
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>Отмена</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={addTransaction}>
              <Text style={styles.buttonText}>Добавить</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flexGrow: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
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
  transactionTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  transactionTypeButton: {
    flex: 1,
    backgroundColor: '#333',
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 10,
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#3D85C6',
  },
  transactionTypeText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#333',
    color: '#ffffff',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 15,
  },
  picker: {
    height: 50,
    color: '#000000',
    backgroundColor: '#ffffff',
    marginBottom: 15,
  },
  dateButton: {
    backgroundColor: '#3D85C6',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  dateButtonText: {
    fontSize: 16,
    color: '#ffffff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#3D85C6',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AddTransactionModal;
