import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet, Image, ActivityIndicator, Alert, ScrollView } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage"; // Để lấy id_user
import { api_getOrders } from '../../helper/ApiHelper';
import { AppContext } from '../../context';
import Style_MyOder from '../../styles/Style_MyOder';
import colors from '../../styles/colors';

const Page_MyOder = (props) => {
    const { navigation } = props;
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedStatus, setSelectedStatus] = useState('Tất cả'); // Trạng thái lọc
    const { users } = useContext(AppContext);

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
            default:
                return colors.Grey; // Màu mặc định nếu không xác định
        }
    };
    // Lọc đơn hàng theo trạng thái được chọn
    const filteredOrders = selectedStatus === 'Tất cả'
        ? orders
        : orders.filter(orders => orders.status === selectedStatus);


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
            <Text style={Style_MyOder.orderDetail}>
                Tổng tiền: <Text style={Style_MyOder.boldText}>{item.total_price.toLocaleString('vi-VN')}đ</Text>
            </Text>
            <Text style={[Style_MyOder.orderStatus, { color: getStatusColor(item.status) }]}>
                {item.status}
            </Text>
            <View style={Style_MyOder.detailButton}>
                <Text style={Style_MyOder.detailButtonText}>Chi tiết</Text>
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
