import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';

const CrimeRateModal = ({ visible, location, crimePercentage, onClose }) => {
  const getBackgroundColor = (percentage) => {
    if (percentage >= 80) return '#4CAF50'; 
    if (percentage >= 50) return '#FFEB3B';
    return '#F44336'; 
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
          <Text style={styles.modalText}>SAFETY SCORE REPORT</Text>
          <Text style={styles.modalText}>{location}</Text>
          <View
            style={[
              styles.crimeCircle,
              {
                backgroundColor: getBackgroundColor(crimePercentage),
              },
            ]}
          >
            <Text style={styles.crimePercentageText}>{crimePercentage}%</Text>
          </View>

          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CrimeRateModal;

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
    color: 'black',
    marginBottom: 20,
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
  crimeCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  crimePercentageText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
