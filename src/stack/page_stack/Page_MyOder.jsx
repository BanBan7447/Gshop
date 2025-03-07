import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet, Image, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage"; // Để lấy id_user
import { api_getOrders } from '../../helper/ApiHelper';
import { AppContext } from '../../context';
import Style_MyOder from '../../styles/Style_MyOder';

const Page_MyOder = (props) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
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

    const renderItem = ({ item }) => (
        <View style={Style_MyOder.orderContainer}>
            <View style={Style_MyOder.orderHeader}>
                <Text style={Style_MyOder.orderTitle}>Đơn hàng {item.orderId}</Text>
                <Text style={Style_MyOder.orderDate}>{item.date}</Text>
            </View>
            <Text style={Style_MyOder.orderDetail}>Số lượng sản phẩm: <Text style={Style_MyOder.boldText}>{Style_MyOder.quantity}</Text></Text>
            <Text style={Style_MyOder.orderDetail}>Tổng tiền: <Text style={Style_MyOder.boldText}>{item.total}</Text></Text>
            <Text style={[Style_MyOder.orderStatus, { color: item.statusColor }]}>{item.status}</Text>
            <TouchableOpacity style={Style_MyOder.detailButton}>
                <Text style={Style_MyOder.detailButtonText}>Chi tiết</Text>
            </TouchableOpacity>
        </View>
    );

    if (loading) {
        return <ActivityIndicator size="large" color="blue" />;
    }

    return (
        <View style={Style_MyOder.container}>
            {/* Header */}
            <View style={Style_MyOder.header}>
                <Image style={Style_MyOder.backIcon} source={require('../../assets/icon/icon_long_arrow.png')} />
                <Text style={Style_MyOder.headerTitle}>Đơn hàng của tôi</Text>
            </View>

            {/* Filter Tabs */}
            <View style={Style_MyOder.tabsContainer}>
                <TouchableOpacity>
                    <Text style={[Style_MyOder.tab, { color: '#E43727' }]}>Tất cả</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={Style_MyOder.tab}>Đang xử lý</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={Style_MyOder.tab}>Đang vận chuyển</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={Style_MyOder.tab}>Hoàn thành</Text>
                </TouchableOpacity>
            </View>

            {/* Order List */}
            <FlatList
                data={orders}
                keyExtractor={item => item._id.toString()}
                renderItem={renderItem}
                contentContainerStyle={Style_MyOder.listContainer}
            />
        </View>
    );
};

export default Page_MyOder;
