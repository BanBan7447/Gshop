import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Style_MyAddress = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
      },
      header: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      backIcon: {
        width: 24,
        height: 20,
      },
      headerTitle: {
        width: 164,
        height: 28,
        fontSize: 20,
        marginLeft: 18,
        color: '#282828',
      },
      addButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#E43727',
        borderRadius: 16,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
      },
      addButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
      },
      addressContainer: {
        flexDirection: 'row',
        width: '100%',
        marginTop: 20,
      },
      iconLocation: {
        borderRadius: 100,
        backgroundColor: '#E9F1FB',
        width: 48,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15
      },
      locationIcon: {
        width: 24,
        height: 24,
      },
      addressDetails: {
        marginLeft: 10,
        marginTop: 15,
        flex: 1,
      },
      addressText: {
        fontSize: 16,
        color: '#121212',
        lineHeight: 24,
        fontWeight: '400',
      },
      editText: {
        fontSize: 18,
        color: '#E43727',
        alignSelf: 'flex-end',
        marginTop: 15,
      },
});
export default Style_MyAddress