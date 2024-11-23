import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Picker } from '@react-native-picker/picker';

const AddTransactionModal = ({ visible, onClose }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [comment, setComment] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const categories = ['Аренда', 'Материалы', 'Реклама', 'Транспорт', 'Добавить категорию...'];

  const handleConfirmDate = (selectedDate) => {
    setShowDatePicker(false);
    setDate(selectedDate);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Добавить транзакцию</Text>
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
            <TouchableOpacity style={styles.button} onPress={() => {
              // Добавить логику добавления транзакции здесь
              onClose();
            }}>
              <Text style={styles.buttonText}>Добавить</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
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
