import { View, Text, TouchableOpacity, FlatList, Image, ToastAndroid, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'

import Style_Cart from '../../styles/Style_Cart'
import { CartContext } from '../../context/CartContext'
import colors from '../../styles/colors'
import { api_getCarts } from '../../helper/ApiHelper'
import { AppContext } from '../../context'

const Page_Cart = (props) => {
  const { navigation } = props
  const { cart, setCart } = useContext(CartContext);
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);
  //const [totalPrice, setTotalPrice] = useState(0);
  const [isCheckedAll, setIsCheckedAll] = useState(false);
  const { users } = useContext(AppContext);

  console.log('Danh sách sản phẩm có trong Cart: ', cart);

  // Hàm lấy dữ liệu danh sách giỏ hàng
  const getCarts = async () => {
    if (!users?._id) {
      console.log("⚠️ Không tìm thấy ID user, không thể lấy giỏ hàng!");
      return;
    };

    console.log("📌 Đang gọi API lấy giỏ hàng của user:", users._id);
    setLoading(true);

    const cartData = await api_getCarts(users._id);

    if (cartData) {
      console.log("✅ Giỏ hàng nhận được từ API:", cartData);
      setCart(cartData.items);
    } else {
      console.log("⚠️ Giỏ hàng trống hoặc lỗi!");
      setCart([])
    }

    setLoading(false);
  };

  // Gọi getCarts
  useEffect(() => {
    getCarts();
  }, []);

  // Hàm chọn || bỏ chọn sản phẩm
  const toggleSelectItems = (_id) => {
    setSelectedItems(prev => {
      if (prev.includes(_id)) {
        const updateItem = prev.filter(id => id !== _id);
        setIsCheckedAll(false);
        return updateItem
      } else {
        const updateItem = [...prev, _id];
        if (updateItem.length === cart.length) {
          setIsCheckedAll(true);
        }
        return updateItem;
      }
    })
  };

  // Hàm chọn || bỏ chọn tất cả sản phẩm
  const toggleSelectAll = () => {
    if (isCheckedAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cart.map((item) => item._id));
    }
    setIsCheckedAll(!isCheckedAll);
  }

  // // Tính tổng giá trị của các sản phẩm được chọn
  // useEffect(() => {
  //   const total = cart
  //     .filter(item => selectedItems.includes(item._id))
  //     .reduce((sum, item) => sum + item.price * item.quantityCart, 0);
  //   setTotalPrice(total)
  // }, [selectedItems, cart]);

  // Tự động chọn tất cả sản phẩm lần đầu khi vào giỏ hàng
  useEffect(() => {
    if (cart.length > 0 && selectedItems.length === 0) {
      setSelectedItems(cart.map(item => item._id));
      setIsCheckedAll(true);
    }
  }, [cart])

  // Hàm giảm số lượng
  const minusItem = (_id) => { // Truyền updateProduct vô
    console.log('ID sản phẩm cần giảm: ', _id)

    // Tìm sản phẩm trong giỏ
    const findProduct = cart.find(item => item._id === _id);

    if (findProduct && findProduct.quantityCart > 1) {
      // Lớn hơn 1 thì giảm xuống 1
      setCart(cart.map(item =>
        item._id === _id
          ? { ...item, quantityCart: item.quantityCart - 1 }
          : item
      ));
    } else {
      // Bằng 1 thì xóa luôn
      setCart(cart.filter(item => item._id !== _id))
    }
  }

  // Hàm tăng số lượng
  const plusItem = (_id) => {
    console.log('ID sản phẩm cần tăng: ', _id)

    setCart(cart.map(item => {
      if (item._id === _id) {
        const stockQuantity = item.quantity;
        const cartQuantity = item.quantityCart;

        if (cartQuantity > stockQuantity) {
          ToastAndroid.show('Sản phẩm đã hết hàng', ToastAndroid.SHORT);
          return item;
        }

        return { ...item, quantityCart: item.quantityCart + 1 }
      }
      return item;
    }))

    // setCart(cart.map(item =>
    //   item._id === _id
    //     ? { ...item, quantityCart: item.quantityCart + 1 }
    //     : item
    // ))
  }

  // Hàm xóa sản phẩm
  const removeItem = (_id) => {
    console.log('ID sản phẩm cần xóa: ', _id)
    setCart(cart.filter(item => item._id !== _id))
  }

  // Hàm render danh sách giỏ hàng
  const renderCart = ({ item }) => {
    const isChecked = selectedItems.includes(item._id);

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
          item.image && item.image.length > 0 && (
            <Image
              source={{ uri: item.image[1] }}
              style={Style_Cart.img_product} />
          )
        }

        <View style={Style_Cart.container_info}>
          <Text
            style={Style_Cart.text_name}
            numberOfLines={1}
            ellipsizeMode='tail'>
            {item.id_product?.name}
          </Text>
          <Text style={Style_Cart.text_price}>{item.price.toLocaleString('vi-VN')}đ</Text>

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
      <Text style={Style_Cart.title_cart}>
        Giỏ hàng (<Text>{cart ? cart.length : 0}</Text>)
      </Text>

      {
        loading ? (
          <View style={Style_Cart.container_loading}>
            <ActivityIndicator size='large' color="red" />
          </View>
        ) :
          cart.length > 0 ? (
            <View style={Style_Cart.container_cart}>
              <FlatList
                data={cart}
                renderItem={renderCart}
                keyExtractor={(item) => item._id.toString()}
                showsVerticalScrollIndicator={false} />

              <View style={Style_Cart.container_bottom}>
                <View style={Style_Cart.container_checkAll}>
                  <View style={Style_Cart.content_checkAll}>
                    <TouchableOpacity
                      onPress={toggleSelectAll}
                      style={[Style_Cart.checkBox, isCheckedAll && Style_Cart.checkBox_selected]}>
                      {isCheckedAll &&
                        <Image
                          style={{ width: 12, height: 12 }}
                          source={require('../../assets/icon/icon_tick_white.png')} />
                      }
                    </TouchableOpacity>

                    <Text style={Style_Cart.label_checkAll}>Tất cả</Text>
                  </View>

                  <Text style={Style_Cart.text_totalPrice}>{cart.totalPrice?.toLocaleString('vi-VN')}</Text>
                </View>
                <TouchableOpacity style={Style_Cart.btn_payment}>
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
                onPress={() => navigation.navigate('Tab', { screen: 'Home' })}>
                <Text style={Style_Cart.text_shopping}>Bắt đầu mua sắm</Text>
              </TouchableOpacity>
            </View>
          )
      }
    </View>
  )
}

export default Page_Cart