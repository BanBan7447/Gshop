import { View, Text, TouchableOpacity, Image, Modal, ScrollView, TextInput, Alert, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import {
    api_getDetailOrder,
    api_getDetailAddress,
    api_getDetailProduct,
    api_getImagesProduct,
    api_addReview,
    api_getDetailPayment,
    api_getRateByProduct,
    api_editReview
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
    const [ratedProducts, setRatedProducts] = useState([]);

    const [modelDialog, setModelDialog] = useState(false);
    const [star, setStar] = useState(0);
    const [content, setContent] = useState('');
    const starText = ["Rất tệ", "Tệ", "Ổn", "Tốt", "Rất tốt"];
    const [reviewedProducts, setReviewProducts] = useState([]);

    const [userReviews, setUserReviews] = useState({});

    useEffect(() => {
        const getRatedProducts = async () => {
            try {
                // const ratedList = await Promise.all(
                //     products.map(async (product) => {
                //         const ratings = await api_getRateByProduct(product._id);
                //         const userReview = ratings.find(rating => rating.id_user === user._id);

                //         // Log đánh giá của user hiện tại nếu có
                //         if (userReview) {
                //             console.log(`📝 Đánh giá của user ${user._id} cho sản phẩm ${product._id}:`, userReview);
                //         }

                //         // const userRated = ratings.some(rating => rating.id_user === user._id);
                //         return userReview ? product._id : null;
                //     })
                // );

                // // Lọc bỏ những giá trị null và cập nhật state
                // setRatedProducts(ratedList.filter(id => id !== null));

                const ratedList = [];
                const reviews = {}; // Lưu đánh giá của user hiện tại

                await Promise.all(
                    products.map(async (product) => {
                        const ratings = await api_getRateByProduct(product._id);

                        // Lọc ra đánh giá của user hiện tại
                        const userReview = ratings.find(rating => rating.id_user === user._id);
                        if (userReview) {
                            ratedList.push(product._id);
                            reviews[product._id] = userReview; // Lưu đánh giá
                        }
                    })
                );

                setRatedProducts(ratedList);
                setUserReviews(reviews); // Cập nhật state đánh giá của user
            } catch (e) {
                console.log('Lỗi khi lấy danh sách đánh giá:', e);
            }
        };

        getRatedProducts();
    }, [products]);

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

            // Kiểm tra xem user đã đánh giá chưa
            const isUserRated = ratedProducts.includes(product._id);
            const userReview = userReviews[product._id]; // Lấy đánh giá của user hiện tại

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
                        <View style={{ justifyContent: 'center', marginLeft: 10, marginTop: -10}}>
                            <Text  
                                style={{ fontSize: 16, fontFamily: 'Inter Bold', marginTop: 10, maxWidth: 200 }}
                                numberOfLines={2}>
                                {product.name}
                            </Text>
                            <Text style={{ fontSize: 18, color: colors.Red }}>
                                {Number(product.unit_price).toLocaleString("vi-VN")}đ
                            </Text>

                            <Text style={{ fontSize: 16 }}>x{product.order_quantity}</Text>
                        </View>
                    </View>

                    {
                        order.status === "Đã giao" && (
                            <View style={{ alignItems: 'flex-end' }}>
                                {
                                    isUserRated ? (
                                        // <TouchableOpacity onPress={() =>
                                        //     navigation.navigate('WriteRate',
                                        //         { product, user, productImage, userReview })}>
                                        //     <Text style={[Style_Detail_Order.textRating, { color: colors.Blue }]}>
                                        //         Chỉnh sửa đánh giá
                                        //     </Text>
                                        // </TouchableOpacity>

                                        <TouchableOpacity
                                            onPress={() => navigation.navigate("Rating", {product})}>
                                            <Text style={[Style_Detail_Order.textRating, { color: colors.Blue }]}>
                                                Cảm ơn bạn đã góp ý
                                            </Text>
                                        </TouchableOpacity>
                                    ) : (
                                        <TouchableOpacity onPress={() =>
                                            navigation.navigate('WriteRate',
                                                { product, user, productImage })}>
                                            <Text style={[Style_Detail_Order.textRating, { color: colors.Red }]}>
                                                Đánh giá
                                            </Text>
                                        </TouchableOpacity>
                                    )
                                }
                            </View>
                        )
                    }
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

            {/* <Modal visible={modelDialog} transparent animationType='slide'>
                <View style={Style_Rating.container_model}>
                    <View style={Style_Rating.content_model}>
                        <Text style={Style_Rating.title_model}>Đánh giá sản phẩm</Text>

                        {
                            selectedProduct ? (
                                <View>
                                    <Image
                                        source={{ uri: productImages[selectedProduct._id]?.[0]?.image?.[1] || 'https://via.placeholder.com/300' }}
                                        style={Style_Rating.img_model} />
                                    <Text style={Style_Rating.name_model}>{selectedProduct.name}</Text>

                                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                        {
                                            [1, 2, 3, 4, 5].map((num) => (
                                                <View key={num} style={{ alignItems: 'center', marginHorizontal: 5 }}>
                                                    <TouchableOpacity onPress={() => setStar(num)}>
                                                        <Image
                                                            source={
                                                                num <= star
                                                                    ? require('../../assets/icon/icon_star.png')
                                                                    : require('../../assets/icon/icon_star_black.jpg')
                                                            }
                                                            style={Style_Rating.star_model} />
                                                    </TouchableOpacity>

                                                    <Text style={Style_Rating.star_text}>
                                                        {starText[num - 1]}
                                                    </Text>
                                                </View>
                                            ))
                                        }
                                    </View>

                                    <Text style={Style_Rating.label_text_input}>
                                        Mời bạn góp ý
                                    </Text>

                                    <TextInput
                                        style={Style_Rating.text_input}
                                        multiline
                                        value={content}
                                        onChangeText={setContent} />

                                    <View
                                        style={Style_Rating.contaner_btn}>
                                        <TouchableOpacity
                                            style={Style_Rating.btn_submit}
                                            onPress={submitReview}
                                            disabled={loading}>
                                            <Text style={Style_Rating.text_submit_cancel}>
                                                {loading ? 'Đang gửi...' : 'Gửi đánh giá'}
                                            </Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={Style_Rating.btn_cancel}
                                            onPress={() => setModelDialog(false)}>
                                            <Text style={Style_Rating.text_submit_cancel}>
                                                Hủy
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ) : (
                                <Text>Đang tải dữ liệu</Text>
                            )
                        }

                    </View>
                </View>
            </Modal> */}
        </ScrollView>
    )
}

export default Page_Detail_Order

