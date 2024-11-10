import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, TextInput, FlatList, StyleSheet } from 'react-native';
import * as FileSystem from 'expo-file-system';

const EmergencyContactModal = ({ visible, onClose }) => {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const contactsFilePath = FileSystem.documentDirectory + 'contacts.json';

  useEffect(() => {
    // Load contacts from file on component mount
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      // Check if the file exists
      const fileInfo = await FileSystem.getInfoAsync(contactsFilePath);

      if (fileInfo.exists) {
        // File exists, read its content
        const fileContent = await FileSystem.readAsStringAsync(contactsFilePath);
        const data = JSON.parse(fileContent);
        setContacts(data || []);
      } else {
        // File doesn't exist, create it with an empty array
        await FileSystem.writeAsStringAsync(contactsFilePath, JSON.stringify([]));
        setContacts([]);
      }
    } catch (error) {
      console.error('Error reading contacts file:', error);
    }
  };

  const saveContacts = async (newContacts) => {
    try {
      await FileSystem.writeAsStringAsync(contactsFilePath, JSON.stringify(newContacts));
      setContacts(newContacts);
    } catch (error) {
      console.error('Error saving contacts:', error);
    }
  };

  const handleAddContact = () => {
    if (name.trim() && phone.trim()) {
      const newContact = { name, phone };
      const updatedContacts = [...contacts, newContact];
      saveContacts(updatedContacts);
      setName('');
      setPhone('');
    } else {
      alert('Please enter both name and phone number.');
    }
  };

  const handleDeleteContact = (index) => {
    const updatedContacts = contacts.filter((_, i) => i !== index);
    saveContacts(updatedContacts);
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
          <Text style={styles.modalText}>EMERGENCY CONTACTS</Text>

          <FlatList
            data={contacts}
            renderItem={({ item, index }) => (
              <View style={styles.contactItem}>
                <Text style={styles.contactText}>{item.name} - {item.phone}</Text>
                <TouchableOpacity
                  onPress={() => handleDeleteContact(index)}
                  style={styles.deleteButton}
                >
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            style={styles.contactList}
          />

          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />

          <TouchableOpacity onPress={handleAddContact} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Add Contact</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default EmergencyContactModal;

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
    fontWeight: 'bold',
  },
  contactList: {
    width: '100%',
    marginBottom: 20,
  },
  contactItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  contactText: {
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: '#ff5722',
    padding: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 14,
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
