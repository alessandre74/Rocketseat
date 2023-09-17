import React from 'react'
import { Text, TouchableOpacity, StyleSheet, TouchableOpacityProps } from 'react-native'

interface ButtoProps extends TouchableOpacityProps {
  title: String
}

export function Button({ title, ...rest }: ButtoProps) {
  return (
    <TouchableOpacity style={styles.button} activeOpacity={0.6} {...rest}>
      <Text style={styles.buttoText}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#A370F7',
    padding: 15,
    borderRadius: 7,
    alignItems: 'center',
    marginTop: 20
  },
  buttoText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold'
  }
})
