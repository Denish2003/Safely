import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import * as FileSystem from 'expo-file-system';

const CustomModal = ({ visible, latitude, longitude, onClose }) => {
  const [description, setDescription] = useState('');

  const handleSaveAndClose = async () => {
    const data = {
      latitude,
      longitude,
      description,
    };

    const filePath = FileSystem.documentDirectory + 'incidents.json';

    try {
      const fileExists = await FileSystem.getInfoAsync(filePath);

      let existingData = [];
      if (fileExists.exists) {
        const fileContents = await FileSystem.readAsStringAsync(filePath);
        existingData = JSON.parse(fileContents);
      }

      existingData.push(data);
      console.log('Incident data:', existingData);
      // Write the new data back to the file
      await FileSystem.writeAsStringAsync(filePath, JSON.stringify(existingData), { encoding: FileSystem.EncodingType.UTF8 });
      setDescription('');
      onClose();
    } catch (error) {
      console.error('Error saving incident data:', error);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>REPORT AN INCIDENT</Text>
          <Text style={styles.modalText}>Latitude: {latitude}</Text>
          <Text style={styles.modalText}>Longitude: {longitude}</Text>
          <TextInput
            style={styles.input}
            placeholder="Describe the incident"
            value={description}
            onChangeText={setDescription}
          />
          <TouchableOpacity onPress={handleSaveAndClose} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: '#ff5722',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
