import { ActivityIndicator, StyleSheet, View } from 'react-native'
import React from 'react'

const LoadingContainer = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size={'large'}  color={primary}/>
    </View>
  )
}

export default LoadingContainer

const styles = StyleSheet.create({
  loadingContainer: {
    width: "100%",
    height: "100%",
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#fffdffc5'
  }
})