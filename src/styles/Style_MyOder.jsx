import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import colors from './colors';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const Style_MyOder = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.White,
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingTop: 20
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 16,
        marginBottom: 8,
        marginLeft: 15
    },
    backIcon: {
        width: 24,
        height: 24
    },
    headerTitle: {
        fontSize: 20,
        marginLeft: 18,
        color: colors.Black,
        color: '#282828',
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
        color: '#7F7F7F',
    },
    listContainer: {
        paddingBottom: 20,
    },
    orderContainer: {
        backgroundColor: colors.White,
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
        bottom: 1,
        color: colors.Light_Grey,
        color: '#AAAAAA'
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
        fontSize: 18,
        color: '#000000'
    },
    orderDate: {
        fontSize: 12,
        color: '#000000',
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
    boldText: {
        fontWeight: 'bold',
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
    detailButton: {
        position: 'absolute',
        right: 16,
        bottom: 10,
        backgroundColor: '#E43727',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 10,
        width: 87,
        height: 44,
        alignItems: 'center'
    },
    detailButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    loading: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    emptyText: {
        fontSize: 16,
        color: colors.Grey,
        fontStyle: 'italic',
    },
});

export default Style_MyOder;