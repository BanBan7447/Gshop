import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import Style_MyAddress from '../../styles/Style_MyAddress';

const Page_MyAddress = () => {
  return (
    <View style={Style_MyAddress.container}>
      <View style={Style_MyAddress.header}>
        <Image style={Style_MyAddress.backIcon} source={require('../../assets/icon/icon_long_arrow.png')} />
        <Text style={Style_MyAddress.headerTitle}>Địa chỉ giao hàng</Text>
      </View>
      <TouchableOpacity style={Style_MyAddress.addButton}>
        <Text style={Style_MyAddress.addButtonText}>Thêm địa chỉ</Text>
      </TouchableOpacity>
      <View style={Style_MyAddress.addressContainer}>
        <View style={Style_MyAddress.iconLocation}>
          <Image style={Style_MyAddress.locationIcon} source={require('../../assets/icon/icon_location.png')} />
        </View>
        <View style={Style_MyAddress.addressDetails}>
          <Text style={Style_MyAddress.addressText}>Số nhà 128, đường Nguyễn Văn Linh, phường Bình Hiên, quận Hải Châu, TP. Đà Nẵng.</Text>
          <Text style={Style_MyAddress.editText}>Chỉnh sửa</Text>
        </View>
      </View>
      <View style={Style_MyAddress.addressContainer}>
        <View style={Style_MyAddress.iconLocation}>
          <Image style={Style_MyAddress.locationIcon} source={require('../../assets/icon/icon_location.png')} />
        </View>
        <View style={Style_MyAddress.addressDetails}>
          <Text style={Style_MyAddress.addressText}>Số 12, đường Lê Hồng Phong, phường Trần Phú,TP. Hà Giang, tỉnh Hà Giang.</Text>
          <Text style={Style_MyAddress.editText}>Chỉnh sửa</Text>
        </View>
      </View>
    </View>
  );
};

export default Page_MyAddress;