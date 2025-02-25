import { View, Text, TouchableOpacity, Button, Image } from 'react-native'
import React, { useContext } from 'react'
import { AppContext } from '../../context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Style_Profile from '../../styles/Style_Profile';
import colors from '../../styles/colors';

const Page_Profile = (props) => {
  const { navigation } = props;

  const { users, setUsers } = useContext(AppContext); // Lay thong tin nguoi dung tu Context

  //Ham dang xuat
  const onLogout = async () => {
    setUsers(null); // Xoa thong tin nguoi dung trong Context
    await AsyncStorage.removeItem('userInfo');
  }

  // Ham component chuyen trang cho moi muc:
  const ProfileOption = ({ icon, label, onPress, textColor = colors.Black, arrowIcon }) => {
    return (
      <TouchableOpacity style={Style_Profile.btn_page} onPress={onPress}>
        <View style={{ flexDirection: 'row' }}>
          <Image
            source={icon}
            style={[Style_Profile.icon_img, { marginRight: 16 }]} />
          <Text style={[Style_Profile.text_btn_page, { color: textColor }]}>{label}</Text>

        </View>
        <Image
          source={arrowIcon || require('../../assets/icon/icon_arrow.png')}
          style={Style_Profile.icon_img} />
      </TouchableOpacity>
    )
  }
  return (
    <View style={Style_Profile.container}>
      {users ? (
        <View>
          <View style={Style_Profile.container_info}>
            <Image
              //source={{uri: users.avatar ? users.avatar : 'https://i.pinimg.com/736x/fd/1f/34/fd1f347ffac0a91e0ecd38c306b1ce37.jpg'}}
              source={{ uri: 'https://i.pinimg.com/736x/fd/1f/34/fd1f347ffac0a91e0ecd38c306b1ce37.jpg' }}
              style={Style_Profile.avatar} />

            <View>
              <Text style={Style_Profile.title_name}>{users.name}</Text>
              <Text style={Style_Profile.title_phone}>{users.phone_number}</Text>
            </View>
          </View>

          {/* Danh sách các mục menu */}
          <ProfileOption
            icon={require('../../assets/icon/icon_pen.png')}
            label={'Chỉnh sửa thông tin'}
            onPress={() => navigation.navigate('EditProfile')} />

          <ProfileOption
            icon={require('../../assets/icon/icon_list_order.png')}
            label={'Đơn hàng của tôi'}
            onPress={() => navigation.navigate('MyOrder')} />

          <ProfileOption
            icon={require('../../assets/icon/icon_location.png')}
            label={'Địa chỉ giao hàng'}
            onPress={() => navigation.navigate('Location')} />
          
          <ProfileOption
            icon={require('../../assets/icon/icon_security.png')}
            label={'Bảo mật'}
            onPress={() => navigation.navigate('ChangePass')} />

          <ProfileOption
            icon={require('../../assets/icon/icon_help.png')}
            label={'FAQ - Trợ giúp'}
            onPress={() => navigation.navigate('Help')} />

          <ProfileOption
            icon={require('../../assets/icon/icon_logout.png')}
            label={'Đăng suất'}
            onPress={() => onLogout()}
            textColor={colors.Red}
            arrowIcon={require('../../assets/icon/icon_arrow_red.png')} />
        </View>
      ) : (
        <View>
          <View style={Style_Profile.container_info}>
            <Image
              source={require('../../assets/icon/icon_avatar_profile.png')}
              style={Style_Profile.avatar} />

            <View style={Style_Profile.info}>
              <Text style={Style_Profile.title_welcome}>Chào mừng đến với GShop</Text>

              <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
                style={Style_Profile.btn_Login_SignUp}>
                <Text style={Style_Profile.text_btn_Login_SignUp}>Đăng nhập/Đăng ký</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Danh sách các mục menu */}
          <ProfileOption
            icon={require('../../assets/icon/icon_pen.png')}
            label={'Chỉnh sửa thông tin'}
            onPress={() => navigation.navigate('Login')} />

          <ProfileOption
            icon={require('../../assets/icon/icon_list_order.png')}
            label={'Đơn hàng của tôi'}
            onPress={() => navigation.navigate('Login')} />

          <ProfileOption
            icon={require('../../assets/icon/icon_location.png')}
            label={'Địa chỉ giao hàng'}
            onPress={() => navigation.navigate('Login')} />

          <ProfileOption
            icon={require('../../assets/icon/icon_security.png')}
            label={'Bảo mật'}
            onPress={() => navigation.navigate('Login')} />

          <ProfileOption
            icon={require('../../assets/icon/icon_help.png')}
            label={'FAQ - Trợ giúp'}
            onPress={() => navigation.navigate('FQA')} />
        </View>
      )}
    </View>
  )
}

export default Page_Profile