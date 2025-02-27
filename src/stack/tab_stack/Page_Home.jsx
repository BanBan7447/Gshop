import { View, Text, TouchableOpacity, FlatList, Image, ActivityIndicator, ScrollView, LogBox, ToastAndroid, BackHandler, Alert, Platform } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import {
  api_getProducts,
  api_getCategories,
  api_getImagesProduct,
  api_getProductsByCategory,
  api_updateView,
  api_getDetailProduct,
} from '../../helper/ApiHelper';
import FastImage from 'react-native-fast-image';
import Style_Home from '../../styles/Style_Home';
import colors from '../../styles/colors';
import DropDownPicker from 'react-native-dropdown-picker';
import { AppContext } from '../../context';
import { useNavigation } from '@react-navigation/native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

// Tắt cảnh báo cụ thể
LogBox.ignoreLogs([
  'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation', // Cảnh báo cụ thể bạn muốn tắt
]);

const Page_Home = (props) => {
  const { navigation } = props;

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [productImages, setProductImages] = useState({});
  const [selectCategory, setSelectCategory] = useState(null);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("highlight");
  const [items, setItems] = useState([
    { label: 'Nổi bật', value: 'highlight' },
    { label: 'Giá cao nhất', value: 'high_price' },
    { label: 'Giá thấp nhất', value: 'low_price' },
  ]);

  const [exitApp, setExitApp] = useState(false);
  const navigationExit = useNavigation();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const backAction = () => {
      if (navigationExit.isFocused()) {
        if (exitApp) {
          BackHandler.exitApp()
          return true
        } else {
          if (Platform.OS === 'android') {
            ToastAndroid.show('Nhấn lại để thoát', ToastAndroid.SHORT);
          }
          setExitApp(true)

          // Reset lại trạng thái sau 2 giây
          setTimeout(() => setExitApp(false), 2000)
          return true;
        }
      } else {
        return false
      }
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, [exitApp]);

  // Hàm lấy danh mục
  const funGetCategories = async () => {
    try {
      const response = await api_getCategories();

      const filterCategories = response.filter(category =>
        category.name_type.includes("Grade")
      )

      setCategories(filterCategories);
      setSelectCategory(null);
    } catch (e) {
      console.log(e);
    }
  };

  // Hàm render danh sách category
  const renderCategory = ({ item }) => {
    const { _id, name_type } = item;

    // Xác định màu của nút dựa trên việc nó có được chọn hay không?
    const isSelected = selectCategory === _id;
    const buttonStyle = isSelected ? { backgroundColor: colors.Red } : { backgroundColor: colors.Light_Blue };
    const textStyle = isSelected ? { color: colors.White } : { color: colors.Black };

    return (
      <TouchableOpacity
        style={[Style_Home.render_category, buttonStyle]}
        onPress={() => {
          if (_id == selectCategory) {
            setSelectCategory(null);
          } else {
            setSelectCategory(_id);
          }
        }}>

        <Text style={[Style_Home.render_text_category, textStyle]}>{name_type}</Text>
      </TouchableOpacity>
    )
  };

  // Cập nhật màu cho nút tất cả
  const ButtonAllStyle = selectCategory === null ?
    { backgroundColor: colors.Red } :
    { backgroundColor: colors.Light_Blue };

  const TextAllStyle = selectCategory === null ?
    { color: colors.White } :
    { color: colors.Black };

  // Hàm xử lý danh sách sản phẩm
  const processProducts = (products) => {
    // Từ khóa lọc sản phẩm
    const keyWords = ["Entry Grade", "High Grade", "Real Grade", "Master Grade", "Perfect Grade"];

    return products
      .filter(product =>
        keyWords.some(keyWords => product.name.includes(keyWords))
      )
      .sort((a, b) => b.viewer - a.viewer);
  }

  // Hàm lấy tất cả sản phẩm
  const funGetAllProducts = async () => {
    try {
      const response = await api_getProducts();
      const filterDataProducts = processProducts(response);
      console.log('All Products:', filterDataProducts);  // In ra dữ liệu sản phẩm để kiểm tra
      setProducts(filterDataProducts); // Cập nhật danh sách sản phẩm với tất cả sản phẩm
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false); // Dừng loading sau khi tải xong
    }
  }

  // Hàm lấy sản phẩm theo danh mục
  const funGetProducts = async () => {
    try {
      const response = await api_getProductsByCategory(selectCategory);
      const filterDataProducts = processProducts(response);
      setProducts(filterDataProducts);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  // Gọi hàm funGetCategories khi màn hình home render
  useEffect(() => {
    funGetAllProducts()
    funGetCategories();
  }, []);

  // Gọi hàm funGetProducts khi chọn danh mục
  useEffect(() => {
    if (selectCategory) {
      funGetProducts(selectCategory);
    }
  }, [selectCategory]);

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

  // Hàm lọc sản phẩm theo giá
  const filterProducts = (filter) => {
    let sortedProducts;
    if (filter === 'high_price') {
      sortedProducts = [...products].sort((a, b) => b.price - a.price);
    } else if (filter === 'low_price') {
      sortedProducts = [...products].sort((a, b) => a.price - b.price);
    } else if (filter === 'highlight') {
      sortedProducts = [...products].sort((a, b) => b.viewer - a.viewer);
    } else {
      sortedProducts = [...products];
    }
    setProducts(sortedProducts);
  }

  // Hàm getProductImages để lấy ảnh
  useEffect(() => {
    if (products.length > 0) {
      const productIds = products.map(product => product._id);
      getProductImages(productIds);
    }
  }, [products]);

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
              <View style={Style_Home.type_product_skeleton}/>
              <View style={Style_Home.price_product_skeleton}/>
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
          <View style={Style_Home.container_loading}>
            <ActivityIndicator size='large' color={colors.Red} />
          </View>
        ) : (
          <ScrollView
            style={Style_Home.container}
            showsVerticalScrollIndicator={false}>
            <View style={Style_Home.container_title}>
              <Image
                source={require('../../assets/image/logo_app_2.png')}
                style={Style_Home.img_logo} />

              <TouchableOpacity
                onPress={() => navigation.navigate('Search')}>
                <Image
                  source={require('../../assets/icon/icon_search.png')}
                  style={Style_Home.img_icon} />
              </TouchableOpacity>
            </View>

            <FlatList
              data={[{ key: 'all' }, ...categories]}
              renderItem={({ item }) => {
                if (item.key === 'all') {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        setSelectCategory(null);
                        funGetAllProducts();
                      }}
                      style={[Style_Home.render_category, ButtonAllStyle]}>
                      <Text style={[Style_Home.render_text_category, TextAllStyle]}>Tất cả</Text>
                    </TouchableOpacity>
                  );
                } else {
                  return renderCategory({ item }); // render danh sách danh mục
                }
              }}
              keyExtractor={item => item._id || item.key}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={Style_Home.container_category}
            />

            <View style={Style_Home.container_filer}>
              <Text style={Style_Home.title}>Đề xuất cho bạn</Text>

              <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                containerStyle={{
                  width: 160,
                  height: 40,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}

                style={{
                  borderWidth: 0,
                }}

                textStyle={{
                  fontSize: 16,
                  color: colors.Black,
                  marginRight: 10,
                  textAlign: 'left'
                }}

                labelStyle={{
                  textAlign: 'right'
                }}

                dropDownContainerStyle={{
                  backgroundColor: colors.White, // Màu nền của dropdown
                  borderTopStartRadius: 12,
                  borderTopEndRadius: 12,
                  borderBottomStartRadius: 12,
                  borderBottomStartRadius: 12,
                  borderWidth: 1,
                  borderColor: colors.Light_Grey,
                  width: '100%'
                }}

                onChangeValue={(value) => {
                  filterProducts(value)
                }}

                showArrowIcon={true}
                ArrowDownIconComponent={() => {
                  return (
                    <Image
                      style={{ width: 12, height: 12 }}
                      source={require('../../assets/icon/icon_arrow_down.png')} />
                  )
                }}

                ArrowUpIconComponent={() => {
                  return (
                    <Image
                      style={{ width: 12, height: 12, transform: [{ rotate: '180deg' }] }}
                      source={require('../../assets/icon/icon_arrow_down.png')} />
                  )
                }}

                scrollViewProps={{
                  nestedScrollEnabled: false,
                  keyboardShouldPersistTaps: 'handled'
                }}
              />
            </View>

            <FlatList
              data={products.filter(product => product.isActive)}
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

export default Page_Home