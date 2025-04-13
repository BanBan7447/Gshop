import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import colors from './colors';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const Style_MyOder = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.White,
        paddingTop: 20
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 16,
        marginBottom: 8,
        marginLeft: 15,
        paddingHorizontal: 20
    },
    backIcon: {
        width: 24,
        height: 24
    },
    headerTitle: {
        fontFamily: 'Inter Medium',
        fontSize: 16,
        marginLeft: 18,
        color: colors.Black,
        color: '#282828',
    },
    tabsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
        marginTop: 16,
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
        bottom: 1,
        color: '#AAAAAA',
        borderBottomWidth: 1,
        paddingVertical: 20,
        paddingHorizontal: 20
    },
    orderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    orderTitle: {
        width: '50%',
        fontSize: 16,
        fontFamily: 'Inter Bold',
        color: colors.Black
    },
    orderDate: {
        marginTop: 4,
        fontSize: 12,
        color: colors.Black,
    },
    orderDetail: {
        fontSize: 14,
        marginBottom: 4,
        color: colors.Grey
    },
    boldText: {
        fontFamily: 'Inter Bold',
        color: colors.Black
    },
    boldText: {
        fontWeight: 'bold',
        color: colors.Black
    },
    orderStatus: {
        fontFamily: 'Inter Medium',
        fontSize: 14,
        marginTop: 4,
    },
    detailButton: {
        position: 'absolute',
        backgroundColor: colors.Red,
        borderRadius: 10,
    },
    detailButtonText: {
        color: colors.Black
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
        paddingHorizontal: 20
    },
    filterButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 12,
        backgroundColor: colors.Light_Blue,
        marginRight: 16,
    },
    filterButtonActive: {
        backgroundColor: colors.Red,
    },
    filterText: {
        color: colors.Black,
        fontFamily: 'Inter Bold',
        fontSize: 14,
    },
    filterTextActive: {
        fontFamily: 'Inter Bold',
        color: 'white',
        fontSize: 14,
    },
    detailButton: {
        backgroundColor: colors.Red,
        borderRadius: 10,
        width: 80,
        height: 40,
        justifyContent: 'center',
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
    },
    emptyText: {
        fontSize: 16,
        color: colors.Grey,
        fontStyle: 'italic',
    },
});

export default Style_MyOder;