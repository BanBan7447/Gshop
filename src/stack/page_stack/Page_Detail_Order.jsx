import { View, Text, TouchableOpacity, Image, Modal, ScrollView, TextInput, Alert, ToastAndroid, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import {
    api_getDetailOrder,
    api_getDetailAddress,
    api_getDetailProduct,
    api_getImagesProduct,
    api_addReview,
    api_getDetailPayment,
    api_getRateByProduct,
    api_editReview,
    api_editStatusOrder
} from '../../helper/ApiHelper';
import colors from '../../styles/colors';
import Style_Detail_Order from '../../styles/Style_Detail_Order';
import FastImage from 'react-native-fast-image';
import Style_Rating from '../../styles/Style_Rating';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Page_Detail_Order = (props) => {
    const { navigation, route } = props;
    const { order, user } = route.params
    // const { users } = useContext(AppContext);
    const [address, setAddress] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [productImages, setProductImages] = useState({});
    const [orderData, setOrderData] = useState(order);

    const getOrderDetails = async () => {
        try {
            const response = await api_getDetailOrder(order._id);
            if (response.status) {
                const productOrders = response.data;
                getProductDetails(productOrders);
            }
        } catch (e) {
            console.log("Lỗi khi lấy chi tiết đơn hàng:", e);
        }
    }

    // Hàm lấy thông tin chi tiết sản phẩm & kết hợp với quantity từ đơn hàng
    const getProductDetails = async (productOrders) => {
        try {
            const productDetails = await Promise.all(
                productOrders.map(async (item) => {
                    const product = await api_getDetailProduct(item.id_product);
                    return { ...product, order_quantity: item.quantity, unit_price: item.unit_price };
                })
            );

            setProducts(productDetails);
            getProductImages(productDetails)
        } catch (e) {
            console.log("Lỗi khi lấy thông tin sản phẩm:", e);
        }
    }

    useEffect(() => {
        console.log("🔄 productImages đã cập nhật: ", productImages);
    }, [productImages]);

    // Hàm lấy ảnh sản phẩm
    const getProductImages = async (productDetails) => {
        try {
            const imagesData = {};
            await Promise.all(
                productDetails.map(async (product) => {
                    const images = await api_getImagesProduct(product._id);
                    console.log(`Ảnh của sản phẩm ${product._id}:`, images);
                    imagesData[product._id] = images;
                })
            );
            setProductImages(imagesData);
        } catch (e) {
            console.log("Lỗi khi lấy ảnh sản phẩm:", e);
        }
    }

    // Render danh sách sản phẩm
    const renderProductOrder = () => {
        console.log("📸 Đang render, dữ liệu productImages:", productImages);

        return products.map((product) => {
            const productImage = productImages[product._id];

            const imageUrl = productImage && productImage.length > 0
                ? productImage[0].image[1]
                : 'https://via.placeholder.com/300';

            console.log(`Render ảnh cho sản phẩm ${product._id}:`, imageUrl);
            return (
                <View key={product._id}>
                    <View style={{ flexDirection: 'row', marginTop: 12 }}>
                        <FastImage
                            source={{
                                uri: imageUrl,
                                priority: FastImage.priority.high
                            }}
                            style={{ width: 88, height: 88, borderRadius: 16 }}
                            resizeMode={FastImage.resizeMode.cover} />
                        <View style={{ flex: 1, justifyContent: 'center', marginLeft: 12 }}>
                            <Text
                                style={{ fontSize: 14, fontFamily: 'Inter Bold', color: colors.Black, marginBottom: 4 }}
                                numberOfLines={1}>
                                {product.name}
                            </Text>
                            <Text style={{ fontSize: 14, color: colors.Red, fontFamily: 'Inter Bold', marginBottom: 4 }}>
                                {Number(product.unit_price).toLocaleString("vi-VN")}đ
                            </Text>

                            <Text style={{ fontSize: 14, color: colors.Black, fontFamily: 'Inter Medium' }}>x{product.order_quantity}</Text>
                        </View>
                    </View>
                </View>
            )
        })
    }

    useEffect(() => {
        getOrderDetails();
    }, []);

    // Định nghĩa màu cho từng status
    const statusColors = {
        "Đang xử lý": colors.Blue,
        "Đang giao hàng": colors.Orange,
        "Đã giao": colors.Green,
        "Đã hủy": colors.Red
    };

    // Hàm láy dữ liệu địa chỉ của user
    // const getAddressUser = async () => {
    //     try {
    //         const response = await api_getDetailAddress(order.id_address);
    //         if (response.status == true) {
    //             setAddress(response.data);
    //         }
    //         console.log('data địa chỉ: ', response)
    //     } catch (e) {
    //         console.log(e);
    //     }
    // };

    // Hàm lấy dữ liệu phương thức thanh toán của đơn hàng
    const getPaymentMethod = async () => {
        try {
            const response = await api_getDetailPayment(order.id_payment);
            if (response.status == true) {
                setPaymentMethod(response.data);
            }
            console.log('data thanh toán: ', response)
        } catch (e) {
            console.log(e)
        }
    }

    // Hàm gọi getAddressUser
    useEffect(() => {
        //getAddressUser();
        getPaymentMethod();
    }, []);

    // Tính tổng tiền sản phẩm
    const productTotalPrice = () => {
        return products.reduce((total, products) => {
            return total + products.unit_price * products.order_quantity
        }, 0);
    }

    const handleCancelOrder = async () => {
        if (orderData.status === "Đã giao" || order.status === "Đã hủy") {
            return;
        };

        Alert.alert(
            "Xác nhận đơn hàng",
            "Bạn có chắc muốn hủy đơn hàng này không?",
            [
                { text: "Không", style: "cancel" },
                {
                    text: "Hủy đơn",
                    style: "destructive",
                    onPress: async () => {
                        setLoading(true);
                        try {
                            const result = await api_editStatusOrder(order._id, "Đã hủy");
                            if (result.success) {
                                setOrderData(result.updatedOrder)
                                navigation.goBack();
                            } else {
                                Alert.alert("Thất bại", result.message || "Không thể hủy đơn hàng.");
                            }
                        } catch (e) {
                            console.log(e);
                        } finally {
                            setLoading(false)
                        }
                    }
                }
            ]
        )
    };

    return (
        <ScrollView style={Style_Detail_Order.container}>
            <TouchableOpacity
                style={Style_Detail_Order.navigation}
                onPress={() => navigation.navigate('MyOrder')}>
                <Image
                    source={require('../../assets/icon/icon_long_arrow.png')}
                    style={Style_Detail_Order.img_icon} />

                <Text style={Style_Detail_Order.text_navigation}>Chi tiết đơn hàng</Text>
            </TouchableOpacity>

            <Text style={Style_Detail_Order.title}>Đơn hàng #{order._id}</Text>

            <View style={Style_Detail_Order.container_title}>
                <Text
                    style={[Style_Detail_Order.status, { color: statusColors[order.status] }]}>
                    {order?.status}
                </Text>

                <Text style={Style_Detail_Order.date}>{order.date}</Text>
            </View>

            <View style={{ flexDirection: 'column' }}>
                <Text style={Style_Detail_Order.user_title}>Người nhận</Text>

                <Text style={[Style_Detail_Order.user_info, { color: colors.Grey }]}>
                    Họ tên: <Text style={Style_Detail_Order.user_info}>{order.name}</Text>
                </Text>

                <Text style={[Style_Detail_Order.user_info, { color: colors.Grey }]}>
                    Số điện thoại: <Text style={Style_Detail_Order.user_info}>{order.phone}</Text>
                </Text>

                <Text style={[Style_Detail_Order.user_info, { color: colors.Grey }]}>
                    Địa chỉ: <Text style={Style_Detail_Order.user_info}>{order.address}</Text>
                </Text>
            </View>

            <Text style={[Style_Detail_Order.user_title, { marginTop: 16 }]}>Sản phẩm</Text>
            {renderProductOrder()}
            {
                order.status === 'Đã giao' && (
                    <TouchableOpacity style={{ alignItems: 'flex-end', marginTop: 16 }} onPress={() => navigation.navigate('WriteRate', { products, user, productImages, order })}>
                        <Text style={[Style_Detail_Order.textRating, { color: colors.Red }]}>Đánh giá sản phẩm</Text>
                    </TouchableOpacity>
                )
            }

            <Text style={[Style_Detail_Order.user_title, { marginTop: 16 }]}>Thanh toán</Text>
            {
                paymentMethod ? (
                    <View style={[Style_Detail_Order.row]}>
                        <Text style={{ fontSize: 14 }}>Phương thức:</Text>
                        <Text style={{ fontSize: 14, width: '50%', textAlign: 'right' }}>{paymentMethod.name}</Text>
                    </View>
                ) : (
                    <Text style={Style_Detail_Order.centerText}>Đang tải...</Text>
                )
            }

            <View style={Style_Detail_Order.row}>
                <Text style={{ fontSize: 14 }}>Tổng sản phẩm:</Text>
                <Text style={{ fontSize: 14 }}>{productTotalPrice().toLocaleString('vi-VN')}đ</Text>
            </View>

            <View style={Style_Detail_Order.row}>
                <Text style={{ fontSize: 14 }}>Phí vận chuyển:</Text>
                <Text style={{ fontSize: 14 }}>{order.shipping_fee.toLocaleString('vi-VN')}đ</Text>
            </View>

            <View style={Style_Detail_Order.row}>
                <Text style={{ fontFamily: 'Inter Bold', fontSize: 16, color: colors.Black }}>Tổng tiền:</Text>
                <Text style={{ fontFamily: 'Inter Bold', fontSize: 16, color: colors.Black, marginBottom: 16 }}>{order.total_price.toLocaleString('vi-VN')}đ</Text>
            </View>

            {
                (orderData?.status !== "Đã giao" && orderData?.status !== "Đã hủy" && orderData?.status !== "Đang giao hàng") && (
                    <TouchableOpacity
                        style={Style_Detail_Order.cancelOrderBtn}
                        onPress={handleCancelOrder}>
                        {
                            loading ? (
                                <ActivityIndicator size='small' color={colors.White} />
                            ) : (
                                <Text style={Style_Detail_Order.textCancelOrder}>Hủy hàng</Text>
                            )
                        }
                    </TouchableOpacity>
                )
            }
        </ScrollView>
    )
}

export default Page_Detail_Order

