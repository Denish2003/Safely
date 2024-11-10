import React from 'react';
import { Button } from 'react-native-paper';

const CustomButton = ({ title, onPress, mode = 'contained', icon, color = '#3f7f31' }) => {
  return (
    <Button
      mode={mode}               
      icon={icon}               
      onPress={onPress}         
      buttonColor={color}             
      labelStyle={{
        fontSize: 16,            
        fontWeight: 'bold',      
      }}
      style={{
        borderRadius: 30,        
        margin: 10,            
      }}
    >
      {title}                    
    </Button>
  );
};

export default CustomButton;
