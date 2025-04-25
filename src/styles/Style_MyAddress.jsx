import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import colors from './colors';

const Style_MyAddress = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.White,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20
  },
  backIcon: {
    width: 24,
    height: 20,
  },
  headerTitle: {
    width: '100%',
    fontSize: 16,
    marginLeft: 18,
    color: colors.Black,
  },
  addButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#E43727',
    borderRadius: 16,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  addressContainer: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 20
  },
  selectedAddress: {
    backgroundColor: colors.Blue
  },
  iconLocation: {
    borderRadius: 100,
    backgroundColor: '#E9F1FB',
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16
  },
  locationIcon: {
    width: 24,
    height: 24,
  },
  addressDetails: {
    marginLeft: 16,
    marginTop: 16,
    flex: 1,
  },
  addressText: {
    fontSize: 14,
    color: '#121212',
    lineHeight: 20,
    fontFamily: 'Inter Medium'
  },
  editText: {
    fontFamily: 'Inter Bold',
    fontSize: 16,
    color: '#E43727',
    alignSelf: 'flex-end',
    marginTop: 12,
    marginBottom: 8
  },
});
export default Style_MyAddress