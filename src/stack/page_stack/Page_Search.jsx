import { View, Text, TouchableOpacity, Image, ActivityIndicator, TextInput, FlatList, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'

import Style_Home from '../../styles/Style_Home'

import Style_Search from '../../styles/Style_Search'
import colors from '../../styles/colors'

import { api_getCategories, api_getProducts, api_getImagesProduct, api_updateView, api_getDetailProduct } from '../../helper/ApiHelper'
import FastImage from 'react-native-fast-image'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'

const Page_Search = (props) => {
    const { navigation } = props;

    const [searchText, setSearchText] = useState(''); // Lưu trữ từ khóa tìm kiếm

    const [products, setProducts] = useState([]);
    const [productImages, setProductImages] = useState({});
    const [categories, setCategories] = useState([]);

    const [filterProducts, setFilterProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Hàm lấy tất cả sản phẩm
    const funGetAllProducts = async () => {
        try {
            const response = await api_getProducts();
            // Lọc sản phẩm theo các từ khóa
            const keyWords = ["Entry Grade", "High Grade", "Real Grade", "Master Grade", "Perfect Grade"];

            const filterDataProduct = response
                .filter(product =>
                    keyWords.some(keyWords => product.name.includes(keyWords))
                )
                // Sắp xếp sản phẩm theo lượt xem từ cao đến thấp (nổi bật)
                .sort((a, b) => b.viewer - a.viewer);

            console.log('All Products:', filterDataProduct);  // In ra dữ liệu sản phẩm để kiểm tra

            setProducts(filterDataProduct); // Cập nhật danh sách sản phẩm với tất cả sản phẩm
            setFilterProducts(filterDataProduct)
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false); // Dừng loading sau khi tải xong
        }
    };

    // Cập nhật lượt xem khi người dùng nhấn vào
    const viewProductPress = async (_id) => {
        // Gọi hàm api_updateView
        await api_updateView(_id);
        console.log("mã sản phẩm: ", _id)

        // Lấy chi tiết sản phẩm mới từ Back End
        const updateProduct = await api_getDetailProduct(_id);

        // Điều hướng qua detail
        const productImagesArray = productImages[_id] ?? []; // Lấy ảnh cho sản phẩm
        navigation.navigate('Detail', { id: _id, images: productImagesArray, productView: updateProduct });
    }

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
        funGetAllProducts()
        funGetCategories();
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
            setFilterProducts(products); // Nếu không có từ khóa thì giữ danh sách trống
            return;
        }

        const lowerText = text.toLowerCase().trim();
        const isNumber = !isNaN(text);

        const filter = products.filter(product => {
            const productName = product.name.toLowerCase();
            const productPrice = product.price;
            const category = categories.find(cat => cat._id == product.id_category);
            const categoryName = category ? category.name_type.toLowerCase() : '';

            const formatPrice = productPrice.toLocaleString('vi-VN'); // Định dạng giá tiền

            return(
                productName.includes(lowerText) || // Tìm tên sản phẩm
                categoryName.includes(lowerText) || // Tìm loại sản phẩm
                (isNumber && (productPrice <= parseFloat(text.replace(/\./g, '')) || formatPrice.includes(text))) // Tìm giá sản phẩm
            );
        });

        setFilterProducts(filter)
    };

    // Hàm render Products
    const renderProduct = ({ item }) => {
        const { _id, name, price, id_category, status, isActive } = item;
        const productData = productImages[_id]?.[0]; // Lấy object đầu tiên trong mảng
        // const productImagesArray = productImages[_id] ?? [];

        console.log("Rendering product:", _id, "Image URL:", productData);

        // Tìm danh mục tương ứng với sản phẩm
        const category = categories.find(cat => cat._id == id_category);
        const categoryName = category ? category.name_type : "Không xác định";

        const formatPrice = price.toLocaleString('vi-VN'); // Định dạng giá tiền
        const isOutStock = status === 'Hết hàng'; // Kiểm tra nếu sản phẩm hết hàng
        if (!isActive) return null; // Ngừng kinh doanh thì không hiển thị

        const loadingRender = !productData;

        return (
            <TouchableOpacity
                style={Style_Home.card_product}
                onPress={() => viewProductPress(_id)}>

                <View style={{ position: 'relative' }}>
                    {
                        loadingRender ? (
                            <SkeletonPlaceholder>
                                <View style={Style_Home.img_skeleton} />
                            </SkeletonPlaceholder>
                        ) : (
                            <FastImage
                                style={Style_Home.img_product}
                                source={{
                                    uri: productData.image[1],
                                    priority: FastImage.priority.high,
                                }} />
                        )
                    }

                    {
                        isOutStock && (
                            <View style={Style_Home.label_outStock}>
                                <Text style={Style_Home.text_outStock}>Đã hết hàng</Text>
                            </View>
                        )
                    }
                </View>

                {
                    loadingRender ? (
                        <SkeletonPlaceholder>
                            <View style={Style_Home.name_skeleton} />
                            <View style={Style_Home.type_product_skeleton} />
                            <View style={Style_Home.price_product_skeleton} />
                        </SkeletonPlaceholder>
                    ) : (
                        <View>
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
                        </View>
                    )
                }
            </TouchableOpacity>
        )
    };

    return (
        <View style={{ flex: 1 }}>
            {
                loading ? (
                    <View style={Style_Search.container_loading}>
                        <ActivityIndicator size='large' color={colors.Red} />
                    </View>
                ) : (
                    <ScrollView
                        style={Style_Search.container}
                        showsVerticalScrollIndicator={false}>
                        <TouchableOpacity
                            style={Style_Search.navigation}
                            onPress={() => navigation.navigate('Tab', { screen: 'Home' })}>
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
                            data={filterProducts.filter(product => product.isActive)}
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
        </View>
    )
}

export default Page_Search