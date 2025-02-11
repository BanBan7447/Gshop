import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native'
import React, { useContext } from 'react'

import Style_Cart from '../../styles/Style_Cart'
import { AppContext } from '../../context'

const Page_Cart = (props) => {
  const { navigation } = props

  const { cart, setCart } = useContext(AppContext)

  // Hàm giảm số lượng
  const minusItem = (itemId) => {
    setCart(prevCart => {
      const updateCart = prevCart.map(item =>
        item.id === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );

      const productToDelete = updateCart.find(item => item.id === itemId && item.quantity === 1);
      if (productToDelete) {
        return updateCart.filter(item => item.id !== itemId);
      }
      return updateCart;
    });
  }

  // Hàm tăng số lượng
  const plusItem = (itemId) => {
    setCart(prevCart => prevCart.map(item =>
      item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    ))
  }

  // Hàm xóa sản phẩm
  const removeItem = (itemId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId))
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
              onPress={() => minusItem(item.id)}>
              <Image
                source={require('../../assets/icon/icon_minus.png')}
                style={Style_Cart.icon_quantity} />
            </TouchableOpacity>

            <Text style={Style_Cart.text_quantity}>{item.quantity}</Text>

            <TouchableOpacity
              style={Style_Cart.btn_quantity}
              onPress={() => plusItem(item.id)}>
              <Image
                source={require('../../assets/icon/icon_plus.png')}
                style={Style_Cart.icon_quantity} />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={Style_Cart.btn_delete}
          onPress={() => removeItem(item.id)}>
          <Image
            source={require('../../assets/icon/icon_x_black.png')}
            style={Style_Cart.icon_quantity}/>
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
        cart && cart.length > 0 ? (
          <View style={Style_Cart.container_cart}>
            <FlatList
              data={cart}
              renderItem={renderCart}
              keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()} />

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