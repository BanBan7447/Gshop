import { View, Text, TouchableOpacity, FlatList, Image, ToastAndroid } from 'react-native'
import React, { useContext, useState } from 'react'

import Style_Cart from '../../styles/Style_Cart'
import { CartContext } from '../../context/CartContext'

const Page_Cart = (props) => {
  const { navigation } = props

  const { cart, setCart } = useContext(CartContext)

  console.log('Danh sách sản phẩm có trong Cart: ', cart)

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
      if(item._id === _id){
        const stockQuantity = item.quantity;
        const cartQuantity = item.quantityCart;

        if(cartQuantity > stockQuantity){
          ToastAndroid.show('Sản phẩm đã hết hàng', ToastAndroid.SHORT);
          return item;
        }

        return {...item, quantityCart: item.quantityCart + 1}
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
    return (
      <View style={Style_Cart.container_product}>
        {
          item.image && item.image.length > 0 && (
            <Image
              source={{ uri: item.image[0] }}
              style={Style_Cart.img_product} />
          )
        }

        <View style={Style_Cart.container_info}>
          <Text
            style={Style_Cart.text_name}
            numberOfLines={1}
            ellipsizeMode='tail'>
            {item.name}
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

            <Text style={Style_Cart.text_quantity}>{item.quantityCart}</Text>

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
        cart.length > 0 ? (
          <View style={Style_Cart.container_cart}>
            <FlatList
              data={cart}
              renderItem={renderCart}
              keyExtractor={(item) => item._id.toString()} />
            <View style={Style_Cart.container_bottom}>
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