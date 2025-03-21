import { View, Text, TouchableOpacity, FlatList, Image, ToastAndroid, ActivityIndicator, KeyboardAvoidingView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'

import Style_Cart from '../../styles/Style_Cart'
import { CartContext } from '../../context/CartContext'
import colors from '../../styles/colors'
import { api_deleteCart, api_getCarts, api_updateQuantity, api_getImagesProduct, api_updateSelected } from '../../helper/ApiHelper'
import { AppContext } from '../../context'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import FastImage from 'react-native-fast-image'

const Page_Cart = (props) => {
  const { navigation } = props
  const { cart, setCart } = useContext(CartContext);
  const [loading, setLoading] = useState(true);
  const [loadingTotal, setLoadingTotal] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isCheckedAll, setIsCheckedAll] = useState(false);
  const { users } = useContext(AppContext);
  const [productImages, setProductImages] = useState({});

  console.log('Danh sách sản phẩm có trong Cart: ', cart);

  const shopping = () => {
    if (!users?._id) {
      navigation.navigate('Login');
    } else {
      navigation.navigate('Tab', { screen: 'Home' })
    }
  }

  // Hàm lấy dữ liệu danh sách giỏ hàng
  const getCarts = async () => {
    if (!users?._id) {
      console.log("⚠️ Không tìm thấy ID user, không thể lấy giỏ hàng!");
      setLoading(false);
      return;
    };

    console.log("📌 Đang gọi API lấy giỏ hàng của user:", users._id);
    setLoading(true);

    const cartData = await api_getCarts(users._id);

    if (cartData) {
      console.log("✅ Giỏ hàng nhận được từ API:", cartData);

      // Xử lý danh sách sản phẩm để thuộc tính `selected` được giữ nguyên
      const newItems = cartData.items.map(item => ({
        ...item,
        selected: item.selected ?? false,
      }));

      // Cập nhật danh sách sản phẩm đã chọn
      const selectedItems = newItems.filter(item => item.selected).map(item => item._id);

      // Gán dữ liệu vào state
      const newCart = {
        id_user: users._id,
        items: cartData.items || [],
        totalPrice: cartData.totalPrice || 0,
      };

      setCart(newCart)

      setSelectedItems(selectedItems);
      setIsCheckedAll(selectedItems.length === newItems.length);

      console.log("📌 Dữ liệu setCart:", newCart);
    } else {
      console.log("⚠️ Giỏ hàng trống hoặc lỗi!");
      setCart({ items: [], totalPrice: 0 })
    }

    setLoading(false);
  };

  // Gọi getCarts
  useEffect(() => {
    if (!users?._id) {
      setCart([]); // Xóa giỏ hàng khi user đăng xuất
      setLoading(false);
      return;
    }

    getCarts(); // Nếu có user, lấy lại giỏ hàng
  }, [users]);

  // Hàm chọn || bỏ chọn sản phẩm
  const toggleSelectItems = async (_id) => {
    if (!users?._id) return;

    // Biến tạm để lưu trạng thái mới && ID sản phẩm
    let updatedSelected = false;
    let updatedProductId = '';

    setCart(prevCart => {
      const newItems = prevCart.items.map(item => {
        if (item._id === _id) {
          updatedSelected = !item.selected; // Lưu trạng thái mới
          updatedProductId = item.id_product._id.toString(); // Lưu ID sản phẩm
          return { ...item, selected: updatedSelected };
        }
        return item;
      });

      const selectItems = newItems.filter(item => item.selected).map(item => item._id);
      const isAllSelect = selectItems.length === newItems.length;
      const newTotalPrice = newItems
        .filter(item => item.selected)
        .reduce((sum, item) => sum + item.quantity * item.id_product.price, 0);

      setIsCheckedAll(isAllSelect);
      setSelectedItems(selectItems);

      return {
        ...prevCart,
        items: newItems,
        totalPrice: newTotalPrice
      };
    });

    console.log("User ID:", users._id);
    console.log("Product ID:", updatedProductId);
    console.log("New selected state:", updatedSelected);

    // Gọi API với giá trị đã cập nhật
    await api_updateSelected(users._id, updatedProductId, updatedSelected);
  };

  // Hàm chọn || bỏ chọn tất cả sản phẩm
  const toggleSelectAll = async () => {
    if (!users?._id || !cart.items.length) return;

    const newSelectedState = !isCheckedAll;

    setCart(prevCart => {
      const newItems = prevCart.items.map(item => ({
        ...item,
        selected: newSelectedState
      }));

      const selectedItems = newSelectedState ? newItems.map(item => item._id) : [];
      const newTotalPrice = newSelectedState
        ? newItems.reduce((sum, item) => sum + item.quantity * item.id_product.price, 0)
        : 0;

      setIsCheckedAll(newSelectedState);
      setSelectedItems(selectedItems);

      return {
        ...prevCart,
        items: newItems,
        totalPrice: newTotalPrice
      };
    });

    // Gọi API cập nhật trạng thái tất cả sản phẩm
    await api_updateSelected(users._id, null, newSelectedState);
  };

  // Hàm giảm số lượng
  const minusItem = async (_id) => {
    const findProduct = cart.items.find(item => item._id === _id);
    if (!findProduct) return;

    const newQuantity = findProduct.quantity - 1;
    console.log('📉 Số lượng mới:', newQuantity, `(Tồn kho: ${findProduct.id_product.quantity})`);

    if (newQuantity < 1) {
      return removeItem(_id);
    }

    setLoadingTotal(true);

    // Gọi API cập nhật số lượng
    console.log('🔄 Gọi API cập nhật số lượng...');
    await api_updateQuantity(cart.id_user, findProduct.id_product._id, newQuantity);

    // Cập nhật dữ liệu giỏ hàng
    setCart(prevCart => {
      const newItems = prevCart.items.map(item =>
        item._id === _id
          ? { ...item, quantity: newQuantity, selected: true }
          : item
      );

      // Danh sách sản phẩm đã chọn
      const newTotalPrice = newItems
        .filter(item => item.selected)
        .reduce((sum, item) => sum + item.quantity * item.id_product.price, 0);

      setSelectedItems(selectedItems);

      return {
        ...prevCart,
        items: newItems,
        totalPrice: newTotalPrice
      };
    });

    setLoadingTotal(false);
  };

  // Hàm tăng số lượng
  const plusItem = async (_id) => {
    const findProduct = cart.items.find(item => item._id === _id);
    console.log('Sản phẩm cần tăng: ', findProduct);

    if (!findProduct) return;

    const newQuantity = findProduct.quantity + 1;
    console.log('📈 Số lượng mới:', newQuantity, `(Tồn kho: ${findProduct.id_product.quantity})`);

    // Kiểm tra số lượng
    if (newQuantity > findProduct.id_product.quantity) {
      ToastAndroid.show('Sản phẩm đã hết hàng', ToastAndroid.SHORT);
      return;
    }

    setLoadingTotal(true)

    // Gọi API cập nhật số lượng
    console.log('🔄 Gọi API cập nhật số lượng...');
    await api_updateQuantity(cart.id_user, findProduct.id_product._id, newQuantity);

    // Cập nhật dữ liệu
    setCart(prevCart => {
      const newItems = prevCart.items.map(item =>
        item._id === _id
          ? { ...item, quantity: newQuantity, selected: true }
          : item
      );

      // Danh sách sản phẩm đã chọn
      const selectedItems = newItems
        .filter(item => item.selected)
        .map(item => item._id);

      // Tính tổng tiền chỉ với sản phẩm đã chọn
      const newTotalPrice = newItems
        .filter(item => item.selected)
        .reduce((sum, item) => sum + item.quantity * item.id_product.price, 0);

      setSelectedItems(selectedItems);

      return {
        ...prevCart,
        items: newItems,
        totalPrice: newTotalPrice
      }
    });

    // Nếu sản phẩm chưa được chọn trước đó, gọi API cập nhật selected
    if (!findProduct.selected) {
      await api_updateSelected(cart.id_user, findProduct.id_product._id, true)
    }

    setLoadingTotal(false);
  };

  // Hàm xóa sản phẩm
  const removeItem = async (_id) => {
    const findProduct = cart.items.find(item => item._id === _id);
    console.log('Sản phẩm cần xóa: ', findProduct);

    if (!findProduct) return;

    // Gọi API cập nhật số lượng
    console.log('🔄 Gọi API xóa...');
    await api_deleteCart(cart.id_user, findProduct.id_product._id);

    // Cập nhật dữ liệu giỏ hàng
    setCart(prevCart => {
      const newsItems = prevCart.items.filter(item => item._id !== _id);

      // Lọc lại danh sách sản phẩm đc chọn
      const newSelectedItems = selectedItems.filter(itemId => itemId !== _id);
      setSelectedItems(newSelectedItems);

      // Tính lại tổng số tiền
      const newTotalPrice = newsItems
        .filter(item => newSelectedItems.includes(item._id)) // Chỉ tính những sản phẩm đang được chọn
        .reduce((sum, item) => sum + item.quantity * item.id_product.price, 0);

      return {
        ...prevCart,
        items: newsItems,
        totalPrice: newTotalPrice
      }
    })
  }

  // // Hàm lấy ảnh cho từng sản phẩm
  const getProductImages = async () => {
    const imagesData = {};
    for (const item of cart.items) {
      if (item.id_product?._id) {
        const images = await api_getImagesProduct(item.id_product._id);
        imagesData[item.id_product._id] = images || [];
      }
    }
    console.log('Data ảnh của sản phẩm: ', imagesData)
    setProductImages(imagesData);
  };

  // Hàm gọi getProductImages
  useEffect(() => {
    if (cart?.items?.length > 0) {
      getProductImages();
    }
  }, [cart]);

  // Hàm đặt hàng
  const order = async () => {
    if (selectedItems.length === 0) {
      ToastAndroid.show("Bạn chưa chọn sản phẩm nào!", ToastAndroid.SHORT);
      return;
    }

    // Lọc ra danh sách sản phẩm đã chọn
    const selectProduct = cart.items.filter(item => selectedItems.includes(item._id));

    // Chuyển đến trang thanh toán và truyền danh sách sản phẩm
    navigation.navigate('Payment', { selectProduct });
  }

  // Hàm render danh sách giỏ hàng
  const renderCart = ({ item }) => {
    const isChecked = selectedItems.includes(item._id);
    const ImageData = productImages?.[item.id_product?._id]?.[0]?.image?.[1];
    const loadingImage = !ImageData;

    return (
      <View style={Style_Cart.container_product}>
        <TouchableOpacity
          onPress={() => toggleSelectItems(item._id)}
          style={[Style_Cart.checkBox, isChecked && Style_Cart.checkBox_selected]}>
          {isChecked &&
            <Image
              style={{ width: 12, height: 12 }}
              source={require('../../assets/icon/icon_tick_white.png')} />
          }
        </TouchableOpacity>

        {
          loadingImage ? (
            <SkeletonPlaceholder>
              <View style={Style_Cart.img_product} />
            </SkeletonPlaceholder>
          ) : (
            <FastImage
              source={{ uri: ImageData }}
              style={Style_Cart.img_product}
              resizeMode={FastImage.resizeMode.cover} />
          )
        }

        <View style={Style_Cart.container_info}>
          <Text
            style={Style_Cart.text_name}
            numberOfLines={1}
            ellipsizeMode='tail'>
            {item.id_product?.name}
          </Text>
          <Text style={Style_Cart.text_price}>{item.id_product?.price?.toLocaleString('vi-VN')}đ</Text>

          <View style={Style_Cart.container_quantity}>
            <TouchableOpacity
              style={Style_Cart.btn_quantity}
              onPress={() => minusItem(item._id)}>
              <Image
                source={require('../../assets/icon/icon_minus.png')}
                style={Style_Cart.icon_quantity} />
            </TouchableOpacity>

            <Text style={Style_Cart.text_quantity}>{item.quantity}</Text>

            <TouchableOpacity
              style={Style_Cart.btn_quantity}
              onPress={() => plusItem(item._id)}>
              <Image
                source={require('../../assets/icon/icon_plus.png')}
                style={Style_Cart.icon_quantity} />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={Style_Cart.btn_delete}
          onPress={() => removeItem(item._id)}>
          <Image
            source={require('../../assets/icon/icon_x_black.png')}
            style={Style_Cart.icon_quantity} />
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={Style_Cart.container}>
      <View style={Style_Cart.container_title}>
        <Text style={Style_Cart.title_cart}>
          Giỏ hàng (<Text>{cart?.items?.length || 0}</Text>)
        </Text>

        <TouchableOpacity onPress={() => navigation.navigate('MyOrder')}>
          <Image
            source={require('../../assets/icon/icon_history_order.png')}
            style={{ width: 26.5, height: 24.5 }} />
        </TouchableOpacity>
      </View>

      {
        loading ? (
          <View style={Style_Cart.container_loading}>
            <ActivityIndicator size='large' color="red" />
          </View>
        ) :
          cart && cart.items && cart.items.length > 0 ? (
            <View style={Style_Cart.container_cart}>
              <FlatList
                data={cart.items || []}
                renderItem={renderCart}
                keyExtractor={(item) => item._id.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 120 }} />

              <View style={Style_Cart.container_bottom}>
                <View style={Style_Cart.container_checkAll}>
                  <View style={Style_Cart.content_checkAll}>
                    <TouchableOpacity
                      onPress={toggleSelectAll}
                      style={[Style_Cart.checkBoxAll, isCheckedAll && Style_Cart.checkBox_selected]}>
                      {isCheckedAll &&
                        <Image
                          style={{ width: 12, height: 12 }}
                          source={require('../../assets/icon/icon_tick_white.png')} />
                      }
                    </TouchableOpacity>

                    <Text style={Style_Cart.label_checkAll}>Tất cả</Text>
                  </View>

                  <Text style={Style_Cart.text_totalPrice}>
                    {loadingTotal ? (
                      <ActivityIndicator size="small" color="red" />
                    ) : (
                      `${cart.totalPrice?.toLocaleString('vi-VN')}đ`
                    )}
                  </Text>
                </View>
                <TouchableOpacity
                  style={Style_Cart.btn_payment}
                  onPress={() => order()}>
                  <Text style={Style_Cart.text_payment}>Thanh Toán</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={Style_Cart.container_empty}>
              <Image
                source={require('../../assets/icon/icon_empty_cart.png')}
                style={Style_Cart.img_icon_empty} />
              <Text style={Style_Cart.title_empty}>Giỏ hàng của bạn trống</Text>
              <Text style={Style_Cart.text_empty}>Hãy làm đầy giỏ hàng với các sản phẩm bạn yêu thích</Text>

              <TouchableOpacity
                style={Style_Cart.btn_shopping}
                onPress={() => shopping()}>
                <Text style={Style_Cart.text_shopping}>Bắt đầu mua sắm</Text>
              </TouchableOpacity>
            </View>
          )
      }
    </View>
  )
}

export default Page_Cart