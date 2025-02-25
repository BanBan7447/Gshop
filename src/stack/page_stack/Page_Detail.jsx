import { View, Text, Image, TouchableOpacity, ScrollView, Modal, FlatList, ActivityIndicator } from 'react-native'
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'

import { getDetailProduct, api_getDetailProduct, api_getRateByProduct } from '../../helper/ApiHelper';

import Style_Detail from '../../styles/Style_Detail';
import colors from '../../styles/colors';

import FastImage from 'react-native-fast-image';
import { Dimensions } from 'react-native';
import { CartContext } from '../../context/CartContext';
import { useFocusEffect } from '@react-navigation/native';

const Page_Detail = (props) => {
    const { navigation, route } = props;

    const { id, images, productView } = route.params;
    const [product, setProduct] = useState(null);
    const { cart, setCart } = useContext(CartContext);
    const [totalRate, setTotalRate] = useState(0);
    const [reviews, setReviews] = useState([]);

    console.log("Detail page loaded with ID:", id, "Image URL:", images);

    const [showNotification, setShowNotification] = useState(false); // Trạng thái giỏ hàng
    const screenWidth = Dimensions.get('window').width; // Lấy chiều rộng màn hình
    const isOutStock = product?.status === "Hết hàng"; // Thêm trạng thái để kiểm tra nếu sản phẩm đã hết hàng

    // Hàm lấy dữ liệu sản phẩm
    const funGetDetailProduct = async () => {
        try {
            const dataProduct = await api_getDetailProduct(id);
            if (dataProduct) {
                setProduct(dataProduct);
            }
        } catch (e) {
            console.log(e);
        }
    };

    // Hàm lấy dữ liệu đánh giá
    const funGetRating = async () => {
        try {
            const reviews = await api_getRateByProduct(id);
            if (reviews && reviews.length > 0) {
                const totalPoints = reviews.reduce((sum, review) => sum + review.star, 0);
                const averageRating = totalPoints / reviews.length; // Tính trung bình điểm đánh giá
                setTotalRate(averageRating.toFixed(1));
                setReviews(reviews)
            } else {
                setTotalRate("0.0");
                setReviews([]);
            }
        } catch (e) {
            console.log(e);
        }
    }

    useFocusEffect(
        useCallback(() => {
            funGetRating()
        }, [])
    );

    // Gọi hàm funGetDetailProduct khi render
    useEffect(() => {
        funGetDetailProduct();
        funGetRating();
    }, [id]);

    // Kiểm tra và lấy url từ images
    //const imageUrl = images?.[0]?.image?.[0] ?? null;

    const addToCart = () => {
        console.log('>>>>>>>>>>>>>>>> Đã thêm sản phẩm')

        setCart((prevCart) => {
            const newCart = prevCart ? [...prevCart] : [];

            // Kiểm tra sản phẩm đã có trong giỏ hàng chưa
            const existingIndex = newCart.findIndex(item => item._id === id);
            if (existingIndex !== -1) {
                // Nếu đã có thì tăng số lượng
                newCart[existingIndex].quantityCart += 1;
            } else {
                newCart.push({
                    ...product,
                    quantityCart: 1,
                    image: images[0]?.image
                });
            }

            return newCart;
        });
    };

    // Xử lý hiển thị thứ tự ảnh sản phẩm
    const [currentIndex, setCurrentIndex] = useState(0); // State để theo dõi ảnh hiện tại
    // const flastListRef = useRef(null);

    // Xử lý sự kiện khi ảnh thay đổi
    const onViewableItemsChanged = useRef(({ viewableItems }) => {
        if (viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0].index);
        }
    }).current;

    return (
        <View style={{ flex: 1 }}>
            {
                product ? (
                    <View style={{ flex: 1, backgroundColor: colors.White }}>
                        <View style={Style_Detail.container_title}>
                            <TouchableOpacity
                                style={Style_Detail.navigation}
                                onPress={() => navigation.navigate('Tab')}>
                                <Image
                                    source={require('../../assets/icon/icon_long_arrow.png')}
                                    style={Style_Detail.img_icon} />

                                <Text style={Style_Detail.text_navigation}>Sản phẩm</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={Style_Detail.cart}
                                onPress={() => navigation.navigate('Tab', { screen: 'Cart' })}>
                                <Image
                                    source={require('../../assets/icon/icon_shopping_cart.png')}
                                    style={Style_Detail.img_icon_cart} />

                                <View style={Style_Detail.numberCart}>
                                    <Text style={Style_Detail.text_cart}>{cart ? cart.length : 0}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <ScrollView style={Style_Detail.container}>
                            <View style={{ position: 'relative' }}>
                                <FlatList
                                    data={images.flatMap(item => item.image)} // Trải phẳng mảng ảnh
                                    keyExtractor={(item, index) => index.toString()}
                                    horizontal
                                    pagingEnabled={true}
                                    showsHorizontalScrollIndicator={false}
                                    initialNumToRender={5}
                                    onViewableItemsChanged={onViewableItemsChanged}
                                    viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
                                    renderItem={({ item, index }) => (
                                        <FastImage
                                            style={{
                                                width: screenWidth,
                                                height: 240,
                                                backgroundColor: colors.Black
                                            }}
                                            source={{
                                                uri: item,
                                                priority: FastImage.priority.high,
                                                cache: FastImage.cacheControl.immutable,
                                            }}
                                            resizeMode={index === 0 ? FastImage.resizeMode.cover : FastImage.resizeMode.contain}
                                        />
                                    )}
                                />

                                <View style={Style_Detail.container_view}>
                                    <Image
                                        source={require('../../assets/icon/icon_eye.png')}
                                        style={Style_Detail.img_icon_view} />
                                    <Text
                                        style={Style_Detail.text_view}>
                                        {productView?.viewer}
                                    </Text>
                                </View>

                                <View style={Style_Detail.container_numberPic}>
                                    <Text style={Style_Detail.text_view}>
                                        {currentIndex + 1}/{images.flatMap(item => item.image).length}
                                    </Text>
                                </View>
                            </View>

                            <View style={Style_Detail.container_info}>
                                <Text style={Style_Detail.text_name}>{product.name}</Text>

                                <View style={Style_Detail.info_rate}>
                                    <Text style={Style_Detail.text_price}>{product.price.toLocaleString('vi-VN')}đ</Text>
                                    <TouchableOpacity
                                        style={Style_Detail.btn_rate}
                                        onPress={() => navigation.navigate('Rating', { reviews, totalRate, product, images })}>
                                        <Image
                                            source={require('../../assets/icon/icon_star.png')}
                                            style={{ width: 24, height: 24 }} />
                                        <Text style={Style_Detail.text_rate}>{totalRate}/5.0</Text>
                                    </TouchableOpacity>
                                </View>

                                {product.status ? (
                                    <Text style={Style_Detail.text_title_state}>
                                        Trạng thái: <Text style={{
                                            color:
                                                product.quantity === 0
                                                    ? colors.Red
                                                    : product.quantity <= 10
                                                        ? colors.Orange
                                                        : colors.Green
                                        }}>
                                            {product.quantity === 0
                                                ? "Hết hàng"
                                                : product.quantity <= 10
                                                    ? `Chỉ còn ${product.quantity} bộ`
                                                    : `Còn ${product.quantity} bộ`
                                            }
                                        </Text>
                                    </Text>
                                ) : null}

                                <Text style={Style_Detail.text_title_describe}>Mô tả</Text>

                                <Text style={Style_Detail.text_describe}>{product.description}</Text>
                            </View>
                        </ScrollView>

                        <View style={Style_Detail.container_bottom}>
                            <TouchableOpacity
                                style={[
                                    Style_Detail.btn_AddCart,
                                    { backgroundColor: isOutStock ? colors.Black : colors.Red }
                                ]}
                                disabled={isOutStock}
                                onPress={() => addToCart()}>

                                <Text style={Style_Detail.text_AddCart}>
                                    {isOutStock ? 'Sản phẩm đã hết hàng' : 'Thêm vào giỏ hàng'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : (
                    <View style={Style_Detail.container_loading}>
                        <ActivityIndicator size='large' color={colors.Red} />
                    </View>
                )
            }
        </View>
    )
}

export default Page_Detail