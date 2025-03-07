import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Style_MyOder = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingTop: 20
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 15
    },
    backIcon: {
        width: 24,
        height: 24
    },
    headerTitle: {
        fontSize: 20,
        marginLeft: 18,
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
        color: '#7F7F7F',
    },
    listContainer: {
        paddingBottom: 20,
    },
    orderContainer: {
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
        bottom: 1,
        color: '#AAAAAA'
    },
    orderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    orderTitle: {
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
});

export default Style_MyOder;