import { View, Text, TouchableOpacity, Image, ActivityIndicator, TextInput, FlatList, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'

import Style_Home from '../../styles/Style_Home'

import Style_Search from '../../styles/Style_Search'
import colors from '../../styles/colors'

import { api_getCategories, api_getProducts, api_getImagesProduct, getAllProdcts, getCategories } from '../../helper/ApiHelper'
import FastImage from 'react-native-fast-image'

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

            const defaultViewers = {
                "Lah Gundam - Entry Grade 1/144": 24,
                "Zaku II (F Type) Solari's - High Grade 1/144": 27,
                "Mighty Strike Freedom Gundam - High Grade 1/144": 34,
                "Gundam Epyon (Mobile Suit Gundam Wing) - Real Grade 1/144": 35,
                "Force Impulse Gundam- Real Grade 1/144": 40,
                "Unicorn Gundam 02 Banshee Norn - Real Grade 1/144": 100,
                "Gundam Astray Gold Frame Amatsu Mina - Real Grade 1/144": 120,
                "EX Strike Freedom Gundam (Gundam Seed Destiny) - Master Grade 1/100": 53,
                "Gunner Zaku Warrior (Lunamaria Hawke Use) - Master Grade 1/100": 65,
                "Ex-S Gundam/S Gundam - Master Grade 1/100": 57,
                "Gundam Astray Red Frame - Perfect Grade 1/60": 470,
                "Build Strike Exceed Galaxy - Entry Grade 1/144": 23,
                "RX-78-2 Gundam Classic Color GUNDAM NEXT FUTURE Limited - Entry Grade 1/144": 10,
                "Gundam Perfect Strike Freedom Rouge - High Grade 1/144": 35,
                "Black Knight Squad Shi-ve.A - High Grade 1/144": 80,
                "Gyan Strom - Agnes Giebenrath Custom - High Grade 1/144": 35,
                "Tallgeese EW - Real Grade 1/144": 430,
                "Gundam Dynames - Master Grade 1/100": 463,
                "Iron Blooded Orphans - High Grade 1/144": 120,
                "Black Knight Squad Cal-re.A - High Grade 1/144": 98,
                "GFAS-X1 Destroy Gundam - High Grade 1/144": 34,
                "MSN 04 SAZABI - Real Grade 1/144": 470,
                "RX-78-2 Gundam E.F.S.T Prototype - Perfect Grade 1/60": 400
            };

            // Thêm thuộc tính viewer cho mỗi sản phẩm
            const productViewer = response.map(product => ({
                ...product,
                viewer: defaultViewers[product._id] || defaultViewers[product.name]
            }))

            // Lọc sản phẩm theo các từ khóa
            const keyWords = ["Entry Grade", "High Grade", "Real Grade", "Master Grade", "Perfect Grade"];

            const filterDataProduct = productViewer
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
        const updateView = products.map(product => {
            if (product._id === _id) {
                return { ...product, viewer: product.viewer + 1 };
            }

            return product;
        });

        setProducts(updateView);

        // Điều hướng qua detail
        const productImagesArray = productImages[_id] ?? []; // Lấy ảnh cho sản phẩm
        const updateProduct = updateView.find(product => product._id == _id) // Lấy thông tin sản phẩm sau khi tăng lượt xem
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
            <TouchableOpacity
                style={Style_Home.card_product}
                onPress={() => viewProductPress(_id)}>
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
        </View>
    )
}

export default Page_Search