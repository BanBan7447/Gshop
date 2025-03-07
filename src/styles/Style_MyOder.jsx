import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import colors from './colors';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const Style_MyOder = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.White,
        paddingHorizontal: 20,
        paddingTop: 20
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 16,
        marginBottom: 8
    },
    backIcon: {
        width: 24,
        height: 24
    },
    headerTitle: {
        fontSize: 20,
        marginLeft: 18,
        color: colors.Black,
    },
    tabsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
        marginTop: 15,
    },
    tab: {
        fontSize: 16,
        fontWeight: '500',
        color: colors.Grey,
    },
    listContainer: {
        paddingBottom: 20,
    },
    orderContainer: {
        backgroundColor: colors.White,
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
        bottom: 1,
        color: colors.Light_Grey
    },
    orderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    orderTitle: {
        width: '50%',
        fontSize: 20,
        fontFamily: 'Inter Bold',
        color: colors.Black
    },
    orderDate: {
        fontSize: 16,
        color: colors.Black,
    },
    orderDetail: {
        fontSize: 16,
        marginBottom: 4,
        color: colors.Grey
    },
    boldText: {
        fontFamily: 'Inter Bold',
        color: colors.Black
    },
    orderStatus: {
        fontSize: 16,
        marginTop: 4,
    },

    detailButton: {
        position: 'absolute',
        right: 16,
        bottom: 20,
        backgroundColor: colors.Red,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    detailButtonText: {
        color:  colors.White,
        fontSize: 16,
        fontFamily: 'Inter Bold',
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
    },
    
    filterButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 12,
        backgroundColor: colors.Light_Blue,
        marginRight: 16
    },
    
    filterButtonActive: {
        backgroundColor: colors.Red,
    },
    
    filterText: {
        color: colors.Black,
        fontWeight: 'bold',
        fontSize: 16,
    },
    
    filterTextActive: {
        color: 'white',
        fontSize: 16,
    },
    
});

export default Style_MyOder;