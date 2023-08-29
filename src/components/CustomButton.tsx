import { Text, TouchableOpacity, ViewStyle, StyleSheet, TextStyle, ActivityIndicator } from 'react-native'
import React from 'react'
import { COLORS } from '../constants/theme';

interface ButtonProps {
  label: string;
  onPress: () => void;
  containerStyles?: ViewStyle;
  disabled?: boolean;
  labelStyles?: TextStyle;
  isLoading?: boolean
}
export function CustomButton({ isLoading, label, onPress, containerStyles, labelStyles, disabled }: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || isLoading}
      style={{ ...styles.buttonContainer, ...containerStyles }}
    >
      {isLoading ? <ActivityIndicator color={COLORS['off-white']} /> : <Text
        style={{
          ...styles.label, ...labelStyles
        }}
      >{label}</Text>}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 10,
    borderRadius: 6,
    backgroundColor: COLORS['teal-001']
  },
  label: {
    fontFamily: 'dm-sans',
    color: COLORS['off-white'],
    fontSize: 15
  }
})