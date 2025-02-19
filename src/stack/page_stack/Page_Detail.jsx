import { View, Text, Image, TouchableOpacity, ScrollView, Modal, FlatList, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'

import { getDetailProduct, api_getDetailProduct } from '../../helper/ApiHelper';

import Style_Detail from '../../styles/Style_Detail';
import colors from '../../styles/colors';

import FastImage from 'react-native-fast-image';
import { Dimensions } from 'react-native';
import { CartContext } from '../../context/CartContext';

const Page_Detail = (props) => {
    const { navigation, route } = props;

    const { id, images, productView } = route.params;
    const [product, setProduct] = useState(null);
    const { cart, setCart } = useContext(CartContext);

    console.log("Detail page loaded with ID:", id, "Image URL:", images);

    // Trạng thái giỏ hàng
    const [showNotification, setShowNotification] = useState(false);

    const screenWidth = Dimensions.get('window').width; // Lấy chiều rộng màn hình

    // Thêm trạng thái để kiểm tra nếu sản phẩm đã hết hàng
    const isOutStock = product?.status === false;

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

    // Gọi hàm funGetDetailProduct khi render
    useEffect(() => {
        funGetDetailProduct();
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

    return (
        <ScrollView style={Style_Detail.container}>
            {/* {
                showNotification && (
                    <View style={[
                        Style_Detail.card,
                    ]}>
                        <Image
                            style={Style_Detail.img_icon}
                            source={require('../../assets/icon/icon_check_white.png')} />
                        <Text style={Style_Detail.text_card}>Đã thêm vào giỏ hàng</Text>
                    </View>
                )
            } */}

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

            {product ? (
                <>
                    <FlatList
                        data={images.flatMap(item => item.image)} // Trải phẳng mảng ảnh
                        keyExtractor={(item, index) => index.toString()}
                        horizontal
                        pagingEnabled={true}
                        showsHorizontalScrollIndicator={false}
                        initialNumToRender={5}
                        renderItem={({ item }) => (
                            <FastImage
                                style={{
                                    width: screenWidth,
                                    height: 240,
                                    backgroundColor: 'black'
                                }}
                                source={{
                                    uri: item,
                                    priority: FastImage.priority.high,
                                    cache: FastImage.cacheControl.immutable,
                                }}
                                resizeMode={FastImage.resizeMode.contain}
                            />
                        )}
                    />

                    <View style={Style_Detail.container_info}>
                        <Text style={Style_Detail.text_name}>{product.name}</Text>
                        <Text style={Style_Detail.text_price}>{product.price.toLocaleString('vi-VN')}đ</Text>

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

                        <Text>
                            lượt xem: {productView?.viewer}
                        </Text>


                        <Text style={Style_Detail.text_title_describe}>Mô tả</Text>

                        <Text style={Style_Detail.text_describe}>{product.description}</Text>

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

                </>
            ) : (
                <View style={Style_Detail.container_error}>
                    <ActivityIndicator size='large' color={colors.Red} />
                    <Text style={Style_Detail.title_error}>Đang tải dữ liệu...</Text>
                </View>
            )}

        </ScrollView>
    )
}

export default Page_Detail