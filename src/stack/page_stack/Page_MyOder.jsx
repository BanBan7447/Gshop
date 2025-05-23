import React, { useEffect, useState, useContext, useRef, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet, Image, ActivityIndicator, Alert, ScrollView, RefreshControl } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage"; // Để lấy id_user
import { api_getOrders } from '../../helper/ApiHelper';
import { AppContext } from '../../context';
import Style_MyOder from '../../styles/Style_MyOder';
import colors from '../../styles/colors';
import PushNotification from 'react-native-push-notification';
import { useFocusEffect } from '@react-navigation/native';

const Page_MyOder = (props) => {
    const { navigation } = props;
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedStatus, setSelectedStatus] = useState('Tất cả'); // Trạng thái lọc
    const { users } = useContext(AppContext);
    const prevOrdersRef = useRef([]);
    const [refreshing, setRefreshing] = useState(false);

    useFocusEffect(
        useCallback(() => {
            if (users?._id) {
                fetchOrders(users._id, setOrders, setLoading);
            }
        }, [])
    );

    const loadOrders = async () => {
        if (!users?._id) return;
        setLoading(true);
        await fetchOrders(users._id, setOrders, setLoading);
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await loadOrders();
        setRefreshing(false);
    };

    const fetchOrders = async (userId, setOrders, setLoading) => {
        try {
            console.log("ID User lấy được:", userId);
            const response = await api_getOrders(userId);
            if (response.status === true) {
                setOrders(response.data);
            }
        } catch (error) {
            console.log("Lỗi khi tải đơn hàng:", error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Đang xử lý':
                return colors.Blue; // Màu xanh dương
            case 'Đang giao hàng':
                return colors.Orange; // Màu vàng cam
            case 'Đã giao':
                return colors.Green; // Màu xanh lá
            case 'Đã hủy':
                return colors.Red; // Màu đỏ
            default:
                return colors.Grey; // Màu mặc định nếu không xác định
        }
    };

    // Lọc đơn hàng theo trạng thái được chọn
    const filteredOrders = selectedStatus === 'Tất cả'
        ? orders
        : orders.filter(orders => orders.status === selectedStatus);
    filteredOrders.sort((a, b) => {
        const dateTimeA = new Date(a.date.split('/').reverse().join('-') + 'T' + a.time);
        const dateTimeB = new Date(b.date.split('/').reverse().join('-') + 'T' + b.time);
        return dateTimeB - dateTimeA;
    });

    //new Date(b.date.split('/').reverse().join('-')) - new Date(a.date.split('/').reverse().join('-'))

    console.log("Danh sách đơn hàng trước sau khi sắp xếp: ", filteredOrders);
    orders.forEach(order => console.log(order.date, new Date(order.date)));


    const renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => navigation.navigate('DetailOrder', { order: item, user: users })}
            style={Style_MyOder.orderContainer}>
            <View style={Style_MyOder.orderHeader}>
                <Text style={Style_MyOder.orderTitle} numberOfLines={1} ellipsizeMode='tail'>
                    #{item._id}
                </Text>
                <Text style={Style_MyOder.orderDate}>{item.date}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View>
                    <Text style={Style_MyOder.orderDetail}>
                        Tổng tiền: <Text style={Style_MyOder.boldText}>{item.total_price.toLocaleString('vi-VN')}đ</Text>
                    </Text>
                    <Text style={[Style_MyOder.orderStatus, { color: getStatusColor(item.status) }]}>
                        {item.status}
                    </Text>
                </View>
                <View>
                    <TouchableOpacity
                        style={[Style_MyOder.detailButton]}
                        onPress={() => navigation.navigate('DetailOrder', { order: item, user: users })}>
                        <Text style={{ fontSize: 12, fontFamily: 'Inter Medium', color: colors.White }}>Chi tiết</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );


    if (loading) {
        return (
            <View style={Style_MyOder.loading}>
                <ActivityIndicator size="large" color={colors.Red} />
            </View>
        );
    }

    return (
        <ScrollView
            style={Style_MyOder.container}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={[colors.Red]}
                    tintColor={colors.Red}
                />
            }>
            <View>
                <TouchableOpacity
                    style={Style_MyOder.header}
                    onPress={() => navigation.navigate('Tab', { screen: 'Profile' })}>
                    <Image style={Style_MyOder.backIcon} source={require('../../assets/icon/icon_long_arrow.png')} />
                    <Text style={Style_MyOder.headerTitle}>Đơn hàng của tôi</Text>
                </TouchableOpacity>

                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={Style_MyOder.filterContainer}>
                        {['Tất cả', 'Đang xử lý', 'Đang giao hàng', 'Đã giao', "Đã hủy"].map(status => (
                            <TouchableOpacity
                                key={status}
                                style={[
                                    Style_MyOder.filterButton,
                                    selectedStatus === status && Style_MyOder.filterButtonActive
                                ]}
                                onPress={() => setSelectedStatus(status)}
                            >
                                <Text style={[
                                    Style_MyOder.filterText,
                                    selectedStatus === status && Style_MyOder.filterTextActive
                                ]}>
                                    {status}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>

                <FlatList
                    data={filteredOrders}
                    keyExtractor={item => item._id.toString()}
                    renderItem={renderItem}
                    contentContainerStyle={Style_MyOder.listContainer}
                    scrollEnabled={false} />
            </View>
            {filteredOrders.length === 0 && (
                <View style={Style_MyOder.emptyContainer}>
                    <Text style={Style_MyOder.emptyText}>Không có đơn hàng</Text>
                </View>
            )}
        </ScrollView>
    );
};

export default Page_MyOder;
