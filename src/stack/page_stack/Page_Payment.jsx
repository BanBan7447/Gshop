import { View, Text, TouchableOpacity, Image, ScrollView, FlatList } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Style_Payment from '../../styles/Style_Payment'
import colors from '../../styles/colors'
import { AppContext } from '../../context'
import { CartContext } from '../../context/CartContext'
import { api_getImagesProduct, api_getPaymentMethod } from '../../helper/ApiHelper'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import FastImage from 'react-native-fast-image'

const Page_Payment = (props) => {
    const { navigation, route } = props;
    const { users } = useContext(AppContext);
    const { cart, setCart } = useContext(CartContext);
    const { selectProduct } = route.params || { selectProduct: [] };
    const [productImages, setProductImages] = useState({});
    const [paymentMethod, setPaymentMethod] = useState(true);
    const [selectedItems, setSelectedItems] = useState([]);
    const [shippingFee, setShippingFee] = useState(29000);

    // Hàm lấy ảnh cho sản phẩm
    const getProductImages = async () => {
        const imagesData = {};
        const requests = selectProduct.map(async (item) => {
            if (item.id_product?._id) {
                const images = await api_getImagesProduct(item.id_product._id);
                imagesData[item.id_product._id] = images || [];
            }
        });

        await Promise.all(requests);
        console.log('Data ảnh của sản phẩm: ', imagesData);
        setProductImages(imagesData);
    };

    // Hàm gọi getProductImages
    useEffect(() => {
        if (selectProduct.length > 0) {
            getProductImages();
        }
    }, [selectProduct]);

    // Hàm lấy dữ liệu thanh toán
    const getPaymentMethod = async () => {
        try {
            const response = await api_getPaymentMethod();
            setPaymentMethod(response);
        } catch (e) {
            console.log(e);
        }
    }

    // Hàm gọi getPaymentMethod
    useEffect(() => {
        getPaymentMethod();
    }, []);

    // Hàm render payment method
    const renderPaymentMethod = ({ item }) => {
        const { image, name } = item;
        const isChecked = selectedItems.includes(item._id);
        return (
            <View style={Style_Payment.item_payment}>
                <View style={{ flexDirection: 'row' }}>
                    <Image
                        source={{ uri: image }}
                        style={{ width: 24, height: 24, marginRight: 12 }} />
                    <Text style={Style_Payment.text_name_paymentMethod}>{name}</Text>
                </View>

                <TouchableOpacity
                    //onPress={() => toggleSelectItems(item._id)}
                    style={[Style_Payment.checkBox, isChecked && Style_Payment.checkBox_selected]}>
                    {isChecked &&
                        <Image
                            style={{ width: 12, height: 12 }}
                            source={require('../../assets/icon/icon_tick_white.png')} />
                    }
                </TouchableOpacity>
            </View>
        )
    }

    // Hàm bỏ chọn sản phẩm
    const removeItem = (productId) => {
        const updatedProducts = selectProduct.filter(item => item.id_product._id !== productId);

        if (updatedProducts.length === 0) {
            navigation.navigate('Tab', { screen: 'Cart' });
        } else {
            navigation.setParams({ selectProduct: updatedProducts });
        }
    };

    // Tính tổng tiền
    const totalPrice = selectProduct.reduce((sum, item) => {
        return sum + item.quantity * item.id_product.price;
    }, 0)

    const finalPrice = totalPrice + shippingFee;

    return (
        <View style={Style_Payment.container}>
            <TouchableOpacity
                style={Style_Payment.navigation}
                onPress={() => navigation.navigate('Tab', { screen: 'Cart' })}>
                <Image
                    source={require('../../assets/icon/icon_long_arrow.png')}
                    style={Style_Payment.img_icon} />

                <Text style={Style_Payment.text_navigation}>Xác nhận đơn hàng</Text>
            </TouchableOpacity>

            <ScrollView contentContainerStyle={{ gap: 24 }}>
                <View style={Style_Payment.container_info}>
                    <View style={Style_Payment.container_title}>
                        <Text style={Style_Payment.text_title}>Người nhận</Text>
                        <TouchableOpacity>
                            <Text style={Style_Payment.btn_text}>Đổi địa chỉ</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={Style_Payment.text_body_1}>
                        Họ tên: <Text style={Style_Payment.text_body_2}>{users?.name || 'Chưa có thông tin'}</Text>
                    </Text>

                    <Text style={Style_Payment.text_body_1}>
                        SDT: <Text style={Style_Payment.text_body_2}>{users?.phone_number || 'Chưa có thông tin'}</Text>
                    </Text>

                    <Text style={Style_Payment.text_body_1}>
                        Địa chỉ: <Text style={Style_Payment.text_body_2}>Số nhà 128, đường Nguyễn Văn Linh, phường Bình Hiên, quận Hải Châu, TP. Đà Nẵng.</Text>
                    </Text>
                </View>

                <View style={Style_Payment.container_product}>
                    <Text style={Style_Payment.text_title}>Sản phẩm</Text>

                    {
                        selectProduct.map((item, index) => {
                            const ImageData = productImages?.[item.id_product?._id]?.[0]?.image?.[1];
                            const loadingImage = !ImageData;

                            return (
                                <View key={index} style={Style_Payment.container_item}>
                                    {
                                        loadingImage ? (
                                            <SkeletonPlaceholder>
                                                <View style={Style_Payment.img_product} />
                                            </SkeletonPlaceholder>
                                        ) : (
                                            <FastImage
                                                source={{ uri: ImageData }}
                                                style={Style_Payment.img_product}
                                                resizeMode={FastImage.resizeMode.cover} />
                                        )
                                    }

                                    <View style={Style_Payment.container_item_info}>
                                        <Text
                                            style={Style_Payment.text_name}
                                            numberOfLines={1}
                                            ellipsizeMode='tail'>
                                            {item.id_product?.name}
                                        </Text>
                                        <Text style={Style_Payment.text_price}>{item.id_product?.price?.toLocaleString('vi-VN')}</Text>

                                        <View style={Style_Payment.container_quantity}>
                                            <Text style={Style_Payment.text_quantity}>
                                                Số lượng: {item.quantity}
                                            </Text>

                                            <TouchableOpacity
                                                style={Style_Payment.btn_delete}
                                                onPress={() => removeItem(item.id_product._id)}>
                                                <Image
                                                    source={require('../../assets/icon/icon_x_black.png')}
                                                    style={Style_Payment.icon_quantity} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            );
                        })
                    }
                </View>

                <View style={Style_Payment.container_payment_method}>
                    <Text style={Style_Payment.text_title}>Phương thức thanh toán</Text>

                    <FlatList
                        data={paymentMethod}
                        renderItem={renderPaymentMethod}
                        keyExtractor={item => item._id.toString()}
                        scrollEnabled={false} />
                </View>

                <View style={Style_Payment.container_payment}>
                    <Text style={Style_Payment.text_title}>Chi phí thanh toán</Text>

                    <View style={[Style_Payment.container_totalPrice, {marginBottom: 8}]}>
                        <Text style={{fontSize: 16}}>Tổng tiền sản phẩm: </Text>
                        <Text style={{fontSize: 16}}>{cart.totalPrice?.toLocaleString('vi-VN')}đ</Text>
                    </View>

                    <View style={[Style_Payment.container_totalPrice, {marginBottom: 8}]}>
                        <Text style={{fontSize: 16}}>Phí vận chuyển</Text>
                        <Text style={{fontSize: 16}}>{shippingFee.toLocaleString('vi-VN')}đ</Text>
                    </View>

                    <View style={Style_Payment.container_totalPrice}>
                        <Text style={Style_Payment.text_totalPrice}>Tổng tiền</Text>
                        <Text style={Style_Payment.text_totalPrice}>{finalPrice.toLocaleString('vi-VN')}đ</Text>
                    </View>
                </View>
            </ScrollView>

            <View style={Style_Payment.container_bottom}>
                <TouchableOpacity
                    style={Style_Payment.btn_order}>
                    <Text style={Style_Payment.text_oder}>Đặt hàng</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default Page_Payment