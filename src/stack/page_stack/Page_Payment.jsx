import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  ToastAndroid,
  Alert,
  Dimensions,
  StyleSheet,
  Modal,
  TextInput,
} from 'react-native';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import Style_Payment from '../../styles/Style_Payment';
import colors from '../../styles/colors';
import {AppContext} from '../../context';
import {CartContext} from '../../context/CartContext';
import {
  api_addOrder,
  api_getAddressUser,
  api_getImagesProduct,
  api_getPaymentMethod,
} from '../../helper/ApiHelper';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import FastImage from 'react-native-fast-image';
import {hmacSHA256} from 'react-native-hmac';
import axios from 'axios';
import WebView from 'react-native-webview';
import {useToast} from 'react-native-toast-notifications';
import {useFocusEffect} from '@react-navigation/native';

const clientID = '523baaf6-60a1-455a-9676-fd005f76e7f5';
const apiKey = '53a1c476-71c3-4c4c-aebc-58764ed56b58';
const checkSum =
  'b4bf6567e8a351b0617b45eef67cfcbdbaa52026cb1482df3f31aa330192024a';

const Page_Payment = props => {
  const {navigation, route} = props;
  const {users} = useContext(AppContext);
  const {cart, setCart} = useContext(CartContext);
  const {selectProduct} = route.params || {selectProduct: []};
  const [productImages, setProductImages] = useState({});
  const [paymentMethod, setPaymentMethod] = useState([]);
  const [address, setAddress] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [shippingFee, setShippingFee] = useState(29000);
  const [paymentLink, setPaymentLink] = useState('');
  const toast = useToast();
  const [modelVisible, setModelVisible] = useState(false);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [newAddress, setNewAddress] = useState('');

  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editAddress, setEditAddress] = useState('');

  useFocusEffect(
    useCallback(() => {
      setModelVisible(false);
    }, [])
  );

  useEffect(() => {
    if (users) {
      setName(prevName => prevName || `${users.name}`);
      setPhone(prevPhone => prevPhone || `${users.phone_number}`);
    }
  });

  useEffect(() => {
    if (address) {
      setNewAddress(
        prevAddress =>
          prevAddress ||
          `${address.detail}, ${address.commune}, ${address.district}, ${address.province}`,
      );
    }
  }, [address]);

  const openEditModal = () => {
    setEditName(name);
    setEditPhone(phone);
    setEditAddress(newAddress);
    setModelVisible(true);
  };

  const handleUpdate = () => {
    setName(editName);
    setPhone(editPhone);
    setNewAddress(editAddress);
    setModelVisible(false);
  };

  // Cập nhật dữ liệu Address
  useFocusEffect(
    useCallback(() => {
      getAddressUser();
    }, []),
  );

  // Hàm lấy ảnh cho sản phẩm
  const getProductImages = async () => {
    const imagesData = {};
    const requests = selectProduct.map(async item => {
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
  };

  // Hàm lấy dữ liệu địa chỉ của user
  const getAddressUser = async () => {
    if (!users || !users._id) return;

    try {
      const response = await api_getAddressUser(users._id);
      if (response.status == true) {
        // Lọc ra chỉ chỉ có selected == true
        const selectedAddress = response.data.find(addr => addr.selected);
        if (selectedAddress) {
          setAddress(selectedAddress);
          setNewAddress(
            `${selectedAddress.detail}, ${selectedAddress.commune}, ${selectedAddress.district}, ${selectedAddress.province}`,
          );
        } else {
          setAddress(null);
          setNewAddress('');
        }
      }
      console.log('data địa chỉ: ', response);
    } catch (e) {
      console.log(e);
    }
  };

  // Hàm gọi getAddressUser
  useEffect(() => {
    getAddressUser();
  }, [users]);

  // Hàm gọi getPaymentMethod & getAddressUser
  useEffect(() => {
    getPaymentMethod();
  }, []);

  // Hàm chọn phương thức thanh toán
  const handleSelectPayment = _id => {
    setSelectedPayment(_id);
    console.log('Selected Payment Method ID:', _id);
  };

  // Hàm render payment method
  const renderPaymentMethod = ({item}) => {
    const {_id, image, name} = item;
    return (
      <View style={Style_Payment.item_payment}>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={{uri: image}}
            style={{width: 24, height: 24, marginRight: 12}}
          />
          <Text style={Style_Payment.text_name_paymentMethod}>{name}</Text>
        </View>

        <TouchableOpacity
          onPress={() => handleSelectPayment(_id)}
          style={[
            Style_Payment.checkBox,
            selectedPayment === _id && Style_Payment.checkBox_selected,
          ]}>
          {selectedPayment === _id && (
            <Image
              style={{width: 12, height: 12}}
              source={require('../../assets/icon/icon_tick_white.png')}
            />
          )}
        </TouchableOpacity>
      </View>
    );
  };

  // Hàm bỏ chọn sản phẩm
  const removeItem = productId => {
    const updatedProducts = selectProduct.filter(
      item => item.id_product._id !== productId,
    );

    if (updatedProducts.length === 0) {
      navigation.navigate('Tab', {screen: 'Cart'});
    } else {
      navigation.setParams({selectProduct: updatedProducts});
    }
  };

  // Tính tổng tiền
  const totalPrice = selectProduct.reduce((sum, item) => {
    return sum + item.quantity * item.id_product.price;
  }, 0);

  const finalPrice = totalPrice + shippingFee;

  //Hiển thị QR payOS
  const Payment = async () => {
    var amount = finalPrice;
    var cancelUrl = 'https://localhost:3000/cancel';
    var orderCode = Date.now();
    var description = orderCode + '';
    var returnUrl = 'https://localhost:3000/success';
    var signature = await hmacSHA256(
      'amount=' +
        amount +
        '&cancelUrl=' +
        cancelUrl +
        '&description=' +
        description +
        '&orderCode=' +
        orderCode +
        '&returnUrl=' +
        returnUrl,
      checkSum,
    );

    var body = {
      orderCode: orderCode,
      amount: amount,
      description: description,
      cancelUrl: cancelUrl,
      returnUrl: returnUrl,
      signature: signature,
    };

    axios
      .post('https://api-merchant.payos.vn/v2/payment-requests', body, {
        headers: {
          'x-client-id': clientID,
          'x-api-key': apiKey,
        },
      })
      .then(function (response) {
        console.log('response.data: ', response.data);
        if (response.data.code == 0) {
          setPaymentLink(response.data.data.checkoutUrl);
        } else {
          console.log('Lỗi rùi!! :(');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const showToast = () => {
    toast.show('Đặt hàng thành công!', {
      type: 'success',
      position: 'bottom',
      duration: 2500,
      animationType: 'fade',
      style: { backgroundColor: 'red', borderRadius: 10 },
      textStyle: { color: 'white', fontSize: 14 },
    });
  };

  // Hàm đặt hàng
  const handleOrder = async () => {
    if (!selectedPayment) {
      ToastAndroid.show(
        'Vui lòng chọn phương thức thanh toán',
        ToastAndroid.SHORT,
      );
      return;
    }

    if (!address) {
      ToastAndroid.show('Vui lòng chọn địa chỉ giao hàng', ToastAndroid.SHORT);
      return;
    }

    if (selectedPayment === '67d417495deda8e66ddc2fec') {
      return Payment();
    }

    try {
      console.log('user đặt hàng: ', users._id);
      console.log('phương thức thanh toán: ', selectedPayment);
      console.log('Tên người nhận: ', name);
      console.log('Số điện thoại: ', phone);
      console.log('Địa chỉ người nhận: ', newAddress);
      console.log('địa chỉ giao hàng: ', address._id);

      const response = await api_addOrder(
        users._id,
        selectedPayment,
        // address._id,
        name,
        phone,
        newAddress,
      );
      if (response) {
        showToast();
        navigation.navigate('Tab', {screen: 'Cart'});
      } else {
        Alert.alert('Lỗi', 'Đặt hàng thất bại. Vui lòng thử lại');
      }
    } catch (e) {
      console.log(e);
      Alert.alert('Lỗi', 'Có lỗi xảy ra khi đặt hàng');
    }
  };

  //Theo dõi sự thay đổi của link payOS
  const handleNavigationChange = async navState => {
    const {url} = navState;

    console.log('Current URL:', url);
    if (url.includes('/success')) {
      const response = await api_addOrder(
        users._id,
        selectedPayment,
        // address._id,
        name,
        phone,
        newAddress,
      );
      showToast();
      setPaymentLink('');
      navigation.navigate('Tab', {screen: 'Cart'});
    } else if (url.includes('/cancel')) {
      Alert.alert('Thất bại', 'Đã hủy thanh toán.');
      setPaymentLink('');
    }
  };

  return (
    <View style={Style_Payment.container}>
      <TouchableOpacity
        style={Style_Payment.navigation}
        onPress={() => navigation.navigate('Tab', {screen: 'Cart'})}>
        <Image
          source={require('../../assets/icon/icon_long_arrow.png')}
          style={Style_Payment.img_icon}
        />

        <Text style={Style_Payment.text_navigation}>Xác nhận đơn hàng</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={{gap: 24}}>
        <View style={Style_Payment.container_info}>
          <View style={Style_Payment.container_title}>
            <Text style={Style_Payment.text_title}>Người nhận</Text>
            <TouchableOpacity onPress={openEditModal}>
              <Text style={[Style_Payment.btn_text, { color: colors.Red, fontSize: 16 }]}>Đổi thông tin</Text>
            </TouchableOpacity>
          </View>

          <Text style={Style_Payment.text_body_1}>
            Họ tên:{' '}
            <Text style={Style_Payment.text_body_2}>
              {name || 'Chưa có thông tin'}
            </Text>
          </Text>

          <Text style={Style_Payment.text_body_1}>
            SDT:{' '}
            <Text style={Style_Payment.text_body_2}>
              {phone || 'Chưa có thông tin'}
            </Text>
          </Text>

          <Text style={Style_Payment.text_body_1}>
            Địa chỉ:{' '}
            <Text style={Style_Payment.text_body_2}>
              {newAddress || 'Chưa có thông tin'}
            </Text>
          </Text>

          {/* <TouchableOpacity onPress={() => navigation.navigate("Location", { fromCheckout: true })}>
            <Text style={[Style_Payment.btn_text, { textAlign: 'right' }]}>Đổi địa chỉ</Text>
          </TouchableOpacity> */}
        </View>

        <View style={Style_Payment.container_product}>
          <Text style={Style_Payment.text_title}>Sản phẩm</Text>

          {selectProduct.map((item, index) => {
            const ImageData =
              productImages?.[item.id_product?._id]?.[0]?.image?.[1];
            const loadingImage = !ImageData;

            return (
              <View key={index} style={Style_Payment.container_item}>
                {loadingImage ? (
                  <SkeletonPlaceholder>
                    <View style={Style_Payment.img_product} />
                  </SkeletonPlaceholder>
                ) : (
                  <FastImage
                    source={{uri: ImageData}}
                    style={Style_Payment.img_product}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                )}

                <View style={Style_Payment.container_item_info}>
                  <Text
                    style={Style_Payment.text_name}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {item.id_product?.name}
                  </Text>
                  <Text style={Style_Payment.text_price}>
                    {item.id_product?.price?.toLocaleString('vi-VN')}
                  </Text>

                  <Text style={Style_Payment.text_quantity}>
                    Số lượng: {item.quantity}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>

        <View style={Style_Payment.container_payment_method}>
          <Text style={Style_Payment.text_title}>Phương thức thanh toán</Text>

          <FlatList
            data={paymentMethod}
            renderItem={renderPaymentMethod}
            keyExtractor={item => item._id.toString()}
            scrollEnabled={false}
          />
        </View>

        <View style={Style_Payment.container_payment}>
          <Text style={Style_Payment.text_title}>Chi phí thanh toán</Text>

          <View style={[Style_Payment.container_totalPrice, {marginBottom: 8}]}>
            <Text style={{fontSize: 16}}>Tổng tiền sản phẩm: </Text>
            <Text style={{fontSize: 16}}>
              {cart.totalPrice?.toLocaleString('vi-VN')}đ
            </Text>
          </View>

          <View style={[Style_Payment.container_totalPrice, {marginBottom: 8}]}>
            <Text style={{fontSize: 16}}>Phí vận chuyển</Text>
            <Text style={{fontSize: 16}}>
              {shippingFee.toLocaleString('vi-VN')}đ
            </Text>
          </View>

          <View style={Style_Payment.container_totalPrice}>
            <Text style={Style_Payment.text_totalPrice}>Tổng tiền:</Text>
            <Text style={Style_Payment.text_totalPrice}>
              {finalPrice.toLocaleString('vi-VN')}đ
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={Style_Payment.container_bottom}>
        <TouchableOpacity style={Style_Payment.btn_order} onPress={handleOrder}>
          <Text style={Style_Payment.text_oder}>Đặt hàng</Text>
        </TouchableOpacity>
      </View>

      {/* Webview payment */}
      {paymentLink ? (
        <View style={StyleSheet.absoluteFillObject}>
          <WebView
            source={{uri: paymentLink}}
            style={{flex: 1}}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            onNavigationStateChange={handleNavigationChange}
          />
        </View>
      ) : null}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modelVisible}
        onRequestClose={() => setModelVisible(false)}>
        <View style={Style_Payment.modalContainer}>
          <View style={Style_Payment.modalContent}>
            <Text style={Style_Payment.modalTitle}>Chỉnh sửa người nhận</Text>

            <Text style={Style_Payment.modalLabel}>Người nhận</Text>
            <TextInput
              style={Style_Payment.textInput}
              value={editName}
              onChangeText={setEditName}
            />

            <Text style={Style_Payment.modalLabel}>Số điện thoại</Text>
            <TextInput
              style={Style_Payment.textInput}
              keyboardType="phone-pad"
              value={editPhone}
              onChangeText={setEditPhone}
            />

            <Text style={Style_Payment.modalLabel}>Địa chỉ</Text>
            {/* <TextInput
              style={[Style_Payment.textInput, { lineHeight: 24 }]}
              multiline
              value={editAddress}
              onChangeText={setEditAddress} /> */}

            <TouchableOpacity
              style={[Style_Payment.textInput]}
              onPress={() => navigation.navigate("Location", { fromCheckout: true })}>
              <Text style={{ lineHeight: 20, fontSize: 14, color: colors.Black }}>{editAddress}</Text>
            </TouchableOpacity>

            <View style={{flexDirection: 'row', gap: 16}}>
              <TouchableOpacity
                style={[
                  Style_Payment.modalButton,
                  {backgroundColor: colors.Blue},
                ]}
                onPress={handleUpdate}>
                <Text style={Style_Payment.modalTextButton}>Cập nhật</Text>
              </TouchableOpacity>

            <View style={{ flexDirection: 'row', gap: 16 }}>
              <TouchableOpacity
                style={[
                  Style_Payment.modalButton,
                  {backgroundColor: colors.Red},
                ]}
                onPress={() => setModelVisible(false)}>
                <Text style={Style_Payment.modalTextButton}>Hủy</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[Style_Payment.modalButton, { backgroundColor: colors.Blue }]}
                onPress={handleUpdate}>
                <Text style={Style_Payment.modalTextButton}>Cập nhật</Text>
              </TouchableOpacity>
            </View>
          </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Page_Payment;
