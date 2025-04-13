import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import colors from './colors';

const Style_Edit_Profile = StyleSheet.create ({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: colors.White
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
        fontFamily: 'Inter Medium',
        fontSize: 16,
        marginLeft: 18,
        color: colors.Black,
    },
    profileImageContainer: {
        alignItems: 'center',
    },
    profileImage: {
        borderRadius: 100,
        backgroundColor: colors.Grey,
        width: 120,
        height: 120,
        marginTop: 24,
        marginBottom: 16,
    },
    updateButton: {
        height: 48,
        backgroundColor: colors.Blue,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 12,
        paddingHorizontal: 16
    },
    uploadIcon: {
        marginRight: 8,
        width: 24,
        height: 24
    },
    updateButtonText: {
        color: colors.White,
        fontSize: 16,
    },
    label: {
        fontSize: 14,
        color: colors.Grey,
        marginTop: 10,
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: colors.Light_Blue,
        borderRadius: 16,
        paddingHorizontal: 16,
        backgroundColor: colors.Light_Blue,
        marginBottom: 16,
        marginTop: 9,
        color: colors.Black
    },
    error: {
        fontFamily: "Inter Regular",
        marginTop: -4,
        marginBottom: 16,
        color: colors.Red
    },
    placeholder: {
        color: colors.Black,
    },
    saveButton: {
        width: 365,
        height: 56,
        backgroundColor: colors.Red,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    saveButtonText: {
        color: colors.White,
        fontSize: 16,
        fontWeight: 'bold',
    },
});
  

export default Style_Edit_Profile