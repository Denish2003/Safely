import React from 'react';
import { Button } from 'react-native-paper';

const EmergencyButton = ({ title, onPress, mode = 'contained', icon, color = '#244a1c' }) => {
  return (
    <Button
      mode={mode}               
      icon={icon}               
      onPress={onPress}         
      buttonColor={color}             
      labelStyle={{
        fontSize: 14,            
        fontWeight: 'bold',      
      }}
      style={{
        borderRadius: 10,        
        height: 50,
        width: '45%',
        justifyContent: 'center',              
      }}
    >
      {title}                    
    </Button>
  );
};

export default EmergencyButton;
