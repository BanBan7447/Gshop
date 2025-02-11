import { View, Text, TouchableOpacity, Image, ActivityIndicator, TextInput, FlatList, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'

import Style_Home from '../../styles/Style_Home'

import Style_Search from '../../styles/Style_Search'
import colors from '../../styles/colors'

import { api_getCategories, api_getProducts, api_getImagesProduct, getAllProdcts, getCategories } from '../../helper/ApiHelper'
import FastImage from 'react-native-fast-image'

const Page_Search = () => {
    const [searchText, setSearchText] = useState(''); // Lưu trữ từ khóa tìm kiếm

    const [products, setProducts] = useState([]);
    const [productImages, setProductImages] = useState({});
    const [categories, setCategories] = useState([]);

    const [filterProducts, setFilterProducts] = useState([]);

    // Hàm lấy tất cả sản phẩm
    const funGetAllProducts = async () => {
        try {
            const response = await api_getProducts();
            setProducts(response);
            setFilterProducts(response); // Ban đầu danh sách tìm kiếm trống
        } catch (e) {
            console.log(e);
        }
    };

    // Hàm lấy ảnh cho từng sản phẩm
    const getProductImages = async (productIds) => {
        try {
            const imagesPromise = productIds.map(id => api_getImagesProduct(id));

            // Chờ tất cả các yêu cầu hoàn thành
            const imagesResult = await Promise.all(imagesPromise);

            // Lưu kết quả ảnh vào state
            const imagesObj = productIds.reduce((acc, productId, index) => {
                acc[productId] = imagesResult[index];
                return acc;
            }, {});

            // Kiểm tra dữ liệu trả về từ API
            console.log("Images Results: ", imagesObj);

            setProductImages(imagesObj);
        } catch (e) {
            console.log(e);
        }
    }

    // Hàm lấy danh mục
    const funGetCategories = async () => {
        try {
            const response = await api_getCategories();
            setCategories(response);
        } catch (e) {
            console.log(e);
        }
    };

    // Hàm lấy tất cả sản phẩm khi trang được render
    useEffect(() => {
        funGetAllProducts();
        funGetCategories()
    }, []);

    // Hàm gọi ảnh sản phẩm
    useEffect(() => {
        if (products.length > 0) {
            const productIds = products.map(product => product._id);
            getProductImages(productIds);
        }
    }, [products]);

    // Hàm lọc sản phẩm theo tên khi người dùng nhập từ khóa
    const funFilterProducts = (text) => {
        setSearchText(text); // Cập nhật từ khóa tìm kiếm

        if (text === '') {
            setFilterProducts(funGetAllProducts); // Nếu không có từ khóa thì giữ danh sách trống
        } else {
            const filter = products.filter(product =>
                product.name.toLowerCase().includes(text.toLowerCase()) // // Lọc sản phẩm có tên chứa từ khóa
            );
            setFilterProducts(filter);
        }
    };

    // Hàm render Products
    const renderProduct = ({ item }) => {
        const { _id, name, price, id_category } = item;
        const productData = productImages[_id]?.[0];

        // Tìm danh mục tương ứng với sản phẩm
        const category = categories.find(cat => cat._id == id_category);
        const categoryName = category ? category.name_type : "Không xác định";

        // Định dạng giá tiền
        const formatPrice = price.toLocaleString('vi-VN');

        return (
            <TouchableOpacity style={Style_Home.card_product}>
                {
                    productData ? (
                        <FastImage
                            style={Style_Home.img_product}
                            source={{
                                uri: productData.image[1],
                                priority: FastImage.priority.high,
                            }}
                        />
                    ) : (
                        <View style={Style_Home.loading_img_product}>
                            <ActivityIndicator size='large' color={colors.Red} />
                        </View>
                    )
                }

                <Text
                    style={Style_Home.name_product}
                    numberOfLines={1}>
                    {name}
                </Text>

                <Text style={Style_Home.type_product}>
                    {categoryName}
                </Text>

                <Text
                    style={Style_Home.price_product}>
                    {formatPrice}đ
                </Text>
            </TouchableOpacity>
        )
    };

    return (
        <ScrollView
            style={Style_Search.container}
            showsVerticalScrollIndicator={false}>
            <TouchableOpacity style={Style_Search.navigation}>
                <Image
                    source={require('../../assets/icon/icon_long_arrow.png')}
                    style={Style_Search.img_icon} />

                <Text style={Style_Search.text_navigation}>Tìm kiếm</Text>
            </TouchableOpacity>

            <View style={Style_Search.contain_text_input}>
                <Image
                    source={require('../../assets/icon/icon_search.png')}
                    style={Style_Search.img_icon} />

                <TextInput
                    style={Style_Search.text_input}
                    placeholder='Tìm kiếm'
                    placeholderTextColor={colors.Black}
                    value={searchText}
                    onChangeText={text => funFilterProducts(text)} />
            </View>

            <FlatList
                data={filterProducts}
                renderItem={renderProduct}
                keyExtractor={item => item._id}
                numColumns={2}
                initialNumToRender={20}
                maxToRenderPerBatch={20}
                windowSize={21}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
                style={Style_Home.container_product} />
        </ScrollView>
    )
}

export default Page_Search