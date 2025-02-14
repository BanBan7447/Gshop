import React from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet, Image } from 'react-native';

const orders = [
    {
        id: '1',
        orderId: '#4367857823',
        date: '20/12/2024',
        quantity: 3,
        total: '346.000.000đ',
        status: 'Đang xử lý',
        statusColor: '#007BFF',
    },
    {
        id: '2',
        orderId: '#4367857823',
        date: '20/12/2024',
        quantity: 3,
        total: '346.000.000đ',
        status: 'Đang vận chuyển',
        statusColor: '#F59E0B',
    },
    {
        id: '3',
        orderId: '#4367857823',
        date: '20/12/2024',
        quantity: 3,
        total: '346.000.000đ',
        status: 'Hoàn thành',
        statusColor: '#16A34A',
    },
];

const Page_MyOder = () => {
    const renderItem = ({ item }) => (
        <View style={styles.orderContainer}>
            <View style={styles.orderHeader}>
                <Text style={styles.orderTitle}>Đơn hàng {item.orderId}</Text>
                <Text style={styles.orderDate}>{item.date}</Text>
            </View>
            <Text style={styles.orderDetail}>Số lượng sản phẩm: <Text style={styles.boldText}>{item.quantity}</Text></Text>
            <Text style={styles.orderDetail}>Tổng tiền: <Text style={styles.boldText}>{item.total}</Text></Text>
            <Text style={[styles.orderStatus, { color: item.statusColor }]}>{item.status}</Text>
            <TouchableOpacity style={styles.detailButton}>
                <Text style={styles.detailButtonText}>Chi tiết</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Image style={styles.backIcon} source={require('../../assets/icon/icon_long_arrow.png')} />
                <Text style={styles.headerTitle}>Đơn hàng của tôi</Text>
            </View>

            {/* Search Bar */}
            <View style={styles.iconTim}>
                <Image
                    source={require('../../assets/icon/icon_search.png')}
                    style={styles.icon}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Tìm kiếm"
                    placeholderTextColor="black"
                />
            </View>

            {/* Filter Tabs */}
            <View style={styles.tabsContainer}>
                <TouchableOpacity>
                    <Text style={[styles.tab, { color: '#E43727' }]}>Tất cả</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.tab}>Đang xử lý</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.tab}>Đang vận chuyển</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.tab}>Hoàn thành</Text>
                </TouchableOpacity>
            </View>
            {/* Order List */}
            <FlatList
                data={orders}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
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
    searchContainer: {
        backgroundColor: '#F3F4F6',
        padding: 12,
        borderRadius: 12,
        marginBottom: 16,
    },
    searchInput: {
        fontSize: 16,
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
    icon: {
        marginRight: 8,
        width: 24,
        height: 24
    },
    input: {
        flex: 1,
        color: 'black',
        fontSize: 16,
    },
    iconTim: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 5,
        width: '100%',
        height: 56,
        alignSelf: 'center',
        margin: 12,
        backgroundColor: '#E9F1FB',
        marginTop: 30
    },
});

export default Page_MyOder;
