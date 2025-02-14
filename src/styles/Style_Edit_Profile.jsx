import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Style_Edit_Profile = StyleSheet.create ({
    container: {
        flex: 1,
        padding: 24,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backIcon: {
        width: 25,
        height: 20,
    },
    headerTitle: {
        fontSize: 20,
        marginLeft: 18,
        color: '#282828',
    },
    profileImageContainer: {
        alignItems: 'center',
    },
    profileImage: {
        borderRadius: 100,
        backgroundColor: '#7F7F7F',
        width: 120,
        height: 120,
        marginTop: 25,
    },
    updateButton: {
        width: 231,
        height: 48,
        backgroundColor: '#266FDA',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 12,
        marginHorizontal: 'auto',
        marginTop: 12,
    },
    uploadIcon: {
        marginRight: 10,
        width: 24,
        height: 24
    },
    updateButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    label: {
        fontSize: 16,
        color: '#7F7F7F',
        marginTop: 10,
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#E9F1FB',
        borderRadius: 16,
        paddingHorizontal: 16,
        backgroundColor: '#E9F1FB',
        marginBottom: 16,
        marginTop: 9,
    },
    placeholder: {
        color: '#000000',
    },
    saveButton: {
        width: 365,
        height: 56,
        backgroundColor: '#E43727',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    saveButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
  

export default Style_Edit_Profile