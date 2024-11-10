import React from 'react';
import { Button } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

const AddContactButton = ({ title, onPress, mode = 'contained', icon }) => {
  return (
    <View style={styles.buttonWrapper}>
      <Button
        mode={mode}
        icon={icon}
        onPress={onPress}
        buttonColor='#ffffff'
        labelStyle={{
          fontSize: 14,
          fontWeight: 'bold',
          color: '#3f7f31',  // Font color set to light green
        }}
        style={{
          borderRadius: 50,
          height: 50,
          justifyContent: 'center',
          borderWidth: 2,        
          borderColor: '#244a1c',
        }}
      >
        {title}
      </Button>
    </View>
  );
};

export default AddContactButton;

const styles = StyleSheet.create({
  buttonWrapper: {
    alignItems: 'center', // Align button to the right
    paddingBottom: 10,       // Optional padding to adjust position
    paddingTop: 10,        // Optional padding to adjust position
    paddingRight: 10,       // Optional padding to adjust positio
  },
});
