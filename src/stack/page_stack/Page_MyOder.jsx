import React, { useEffect, useState, useContext, useRef } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet, Image, ActivityIndicator, Alert, ScrollView } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage"; // Để lấy id_user
import { api_getOrders } from '../../helper/ApiHelper';
import { AppContext } from '../../context';
import Style_MyOder from '../../styles/Style_MyOder';
import colors from '../../styles/colors';
import PushNotification from 'react-native-push-notification';

const Page_MyOder = (props) => {
    const { navigation } = props;
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedStatus, setSelectedStatus] = useState('Tất cả'); // Trạng thái lọc
    const { users } = useContext(AppContext);
    const prevOrdersRef = useRef([]);

    useEffect(() => {
        // Tạo Channel để đảm bảo thông báo hoạt động trên android
        PushNotification.createChannel(
            {
                channelId: 'order-channel',
                channelName: 'Order Notifications',
                importance: 4,
                vibrate: true
            },
            (created) => console.log(`Channel created: ${created}`)
        )
    }, []);

    const sendNotification = (order) => {
        PushNotification.localNotification({
            channelId: 'order-channel',
            title: 'Cập nhật đơn hàng',
            message: `Đơn hàng #${order._id} đã chuyển sang trạng thái: ${order.status}`,
            vibrate: true,
            playSound: true,
            soundName: 'default'
        })
    }

    useEffect(() => {
        if (!users || !users._id) return;

        const alertOrders = async () => {
            try {
                const response = await api_getOrders(users._id);
                if (response.status) {
                    const newOrders = response.data;
                    console.log("Danh sách đơn hàng trước khi sắp xếp: ", response.data);
                    newOrders.sort((a, b) => new Date(b.date.split('/').reverse().json('-')) - new Date(a.date.split('/').reverse().json('-')));

                    // Kiểm tra xem đơn hàng nào thay đổi để thông báo
                    newOrders.forEach((newOrder) => {
                        const oldOrder = prevOrdersRef.current.find(order => order._id === newOrder._id);
                        if (oldOrder && oldOrder.status !== newOrder.status) {
                            sendNotification(newOrder);
                        }
                    })

                    // Cập nhật state và useRef
                    setOrders(newOrders);
                    prevOrdersRef.current = newOrders;
                }
            } catch (e) {
                console.log(e);
            }
        };

        alertOrders();
        const interval = setInterval(alertOrders, 2000);
        return () => clearInterval(interval)

    }, [users])

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                console.log("ID User lấy được:", users._id); // Kiểm tra log
                const response = await api_getOrders(users._id);
                if (response.status == true) {
                    setOrders(response.data)
                }
            } catch (error) {
                console.log("Lỗi khi tải đơn hàng:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Đang xử lý':
                return colors.Blue; // Màu xanh dương
            case 'Đang vận chuyển':
                return colors.Orange; // Màu vàng cam
            case 'Đã giao':
                return colors.Green; // Màu xanh lá
            case 'Đang giao hàng':
                return colors.Red; // Màu đỏ
            default:
                return colors.Grey; // Màu mặc định nếu không xác định
        }
    };

    // Lọc đơn hàng theo trạng thái được chọn
    const filteredOrders = selectedStatus === 'Tất cả'
        ? orders
        : orders.filter(orders => orders.status === selectedStatus);
    filteredOrders.sort((a, b) => new Date(b.date.split('/').reverse().join('-')) - new Date(a.date.split('/').reverse().join('-')));

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
            <View>
                <Text style={Style_MyOder.orderDetail}>
                    Tổng tiền: <Text style={Style_MyOder.boldText}>{item.total_price.toLocaleString('vi-VN')}đ</Text>
                </Text>
                <Text style={[Style_MyOder.orderStatus, { color: getStatusColor(item.status) }]}>
                    {item.status}
                </Text>
                <View style={{ marginRight: -18 }}>
                    <TouchableOpacity style={[Style_MyOder.detailButton]}>
                        <Text style={Style_MyOder.detailButtonText}>Chi tiết</Text>
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
        <ScrollView style={Style_MyOder.container}>
            <View>
                {/* Header */}
                <TouchableOpacity
                    style={Style_MyOder.header}
                    onPress={() => navigation.navigate('Tab', { screen: 'Profile' })}>
                    <Image style={Style_MyOder.backIcon} source={require('../../assets/icon/icon_long_arrow.png')} />
                    <Text style={Style_MyOder.headerTitle}>Đơn hàng của tôi</Text>
                </TouchableOpacity>

                {/* Bộ lọc trạng thái */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={Style_MyOder.filterContainer}>
                        {['Tất cả', 'Đang xử lý', 'Đang vận chuyển', 'Đã giao'].map(status => (
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

                {/* Danh sách đơn hàng */}
                <FlatList
                    data={filteredOrders}
                    keyExtractor={item => item._id.toString()}
                    renderItem={renderItem}
                    contentContainerStyle={Style_MyOder.listContainer}
                    scrollEnabled={false} />
            </View>
            {filteredOrders.length === 0 ? (
                <View style={Style_MyOder.emptyContainer}>
                    <Text style={Style_MyOder.emptyText}>Không có đơn hàng</Text>
                </View>
            ) : (
                <FlatList
                    data={filteredOrders}
                    keyExtractor={item => item._id.toString()}
                    renderItem={renderItem}
                    contentContainerStyle={Style_MyOder.listContainer}
                    scrollEnabled={false}
                />
            )}
        </ScrollView>
    );
};

export default Page_MyOder;
