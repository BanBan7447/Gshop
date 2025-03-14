import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import {
    api_getDetailOrder,
    api_getDetailAddress,
    api_getDetailProduct,
    api_getImagesProduct,
    api_getPaymentMethod,
    api_getDetailPayment
} from '../../helper/ApiHelper';
import colors from '../../styles/colors';
import Style_Detail_Order from '../../styles/Style_Detail_Order';
import FastImage from 'react-native-fast-image';

const Page_Detail_Order = (props) => {
    const { navigation, route } = props;
    const { order, user } = route.params
    // const { users } = useContext(AppContext);
    const [address, setAddress] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [productImages, setProductImages] = useState({});

    console.log("product order: ", order._id);
    console.log("product: ", products);

    // Hàm lấy danh sách sản phẩm trong đơn hàng
    const getOrderDetails = async () => {
        try {
            const response = await api_getDetailOrder(order._id);
            if (response.status) {
                const productOrders = response.data;
                getProductDetails(productOrders);
            }
        } catch (e) {
            console.log("Lỗi khi lấy chi tiết đơn hàng:", e);
            setLoading(false);
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
        } finally {
            setLoading(false);
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
                : 'https://via.placeholder.com/300'

            console.log(`Render ảnh cho sản phẩm ${product._id}:`, imageUrl);

            return (
                <View key={product._id}>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <FastImage
                            source={{
                                uri: imageUrl,
                                priority: FastImage.priority.high
                            }}
                            style={{ width: 100, height: 100, borderRadius: 20 }}
                            resizeMode={FastImage.resizeMode.cover} />
                        <View style={{ justifyContent: 'space-between', marginLeft: 10 }}>
                            <Text
                                style={{ fontSize: 16, fontFamily: 'Inter Bold', marginTop: 10, maxWidth: 200 }}
                                numberOfLines={2}
                            >
                                {product.name}
                            </Text>
                            <Text style={{ fontSize: 18, color: colors.Red }}>{product.unit_price}</Text>
                            <Text style={{ fontSize: 16 }}>x{product.order_quantity}</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={{ alignItems: 'flex-end' }}>
                        <Text style={{ fontSize: 16, color: colors.Red, fontFamily: 'Inter Bold' }}>Đánh giá</Text>
                    </TouchableOpacity>
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
        "Đã giao": colors.Green
    };

    // Hàm láy dữ liệu địa chỉ của user
    const getAddressUser = async () => {
        try {
            const response = await api_getDetailAddress(order.id_address);
            if (response.status == true) {
                setAddress(response.data);
            }
            console.log('data địa chỉ: ', response)
        } catch (e) {
            console.log(e);
        }
    };

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
        getAddressUser();
        getPaymentMethod();
    }, []);

    // Hàm render address
    const renderAddress = () => {
        return (
            <View>
                <Text style={{ fontSize: 16, color: colors.Black, marginTop: 10 }}>Địa chỉ: <Text>
                    {
                        address ? (
                            <Text>
                                {address.detail}, {address.commune}, {address.district}, {address.province}
                            </Text>
                        ) : (
                            <Text>Đang tải...</Text>
                        )
                    }
                </Text>
                </Text>
                <Text style={{ fontSize: 20, color: colors.Black, marginTop: 10 }}>Sản phẩm</Text>
            </View>
        )
    };

    // Tính tổng tiền sản phẩm
    const productTotalPrice = () => {
        return products.reduce((total, products) => {
            return total + products.unit_price * products.order_quantity
        }, 0);
    }

    return (
        <View style={Style_Detail_Order.container}>
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
                    {order.status}
                </Text>

                <Text style={Style_Detail_Order.date}>{order.date}</Text>
            </View>

            <View style={{ flexDirection: 'column' }}>
                <Text style={{ fontSize: 20, color: colors.Black, fontFamily: 'Inter Bold' }}>Người nhận</Text>
                <Text style={{ fontSize: 16, color: colors.Black, marginTop: 10 }}>{user.name}</Text>
                <Text style={{ fontSize: 16, color: colors.Black, marginTop: 10 }}>{user.phone_number}</Text>
                {renderAddress()}
            </View>
            {renderProductOrder()}
            <Text style={{ fontSize: 20, color: colors.Black, marginTop: 10 }}>Thanh toán</Text>
            {
                paymentMethod ? (
                    <View style={Style_Detail_Order.row}>
                        <Text>Phương thức:</Text>
                        <Text>{paymentMethod.name}</Text>
                    </View>
                ) : (
                    <Text style={Style_Detail_Order.centerText}>Đang tải...</Text>
                )
            }

            <View style={Style_Detail_Order.row}>
                <Text>Tổng sản phẩm:</Text>
                <Text>{productTotalPrice().toLocaleString('vi-VN')}đ</Text>
            </View>

            <View style={Style_Detail_Order.row}>
                <Text>Phí vận chuyển:</Text>
                <Text>{order.shipping_fee.toLocaleString('vi-VN')}đ</Text>
            </View>

            <View style={Style_Detail_Order.row}>
                <Text style={{ fontSize: 18, color: colors.Black }}>Tổng tiền:</Text>
                <Text style={{ fontSize: 18, color: colors.Black }}>{order.total_price.toLocaleString('vi-VN')}đ</Text>
            </View>
        </View>
    )
}

export default Page_Detail_Order

