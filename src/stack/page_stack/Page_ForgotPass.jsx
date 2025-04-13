import { View, Text, TextInput, TouchableOpacity, Image, Alert, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import Style_Find_Email from '../../styles/Style_Find_Email'
import Style_ForgotPass from '../../styles/Style_ForgotPass'
import Style_ChangPass from '../../styles/Style_ChangPass'
import colors from '../../styles/colors'
import { api_forgotPass } from '../../helper/ApiHelper'

const Page_ForgotPass = ({ navigation, route }) => {
  const { email } = route.params;
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [hideNewPassword, setHideNewPassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);

  const handleForgotPass = async () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Lỗi", "Mật khẩu xác nhận không khớp");
      return;
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&^+=()_\-])[A-Za-z\d@$!%*#?&^+=()_\-]+$/;

    if (!passwordRegex.test(newPassword)) {
      Alert.alert("Lỗi", "Mật khẩu phải bao gồm ít nhất 1 chữ cái, 1 số và 1 ký tự đặc biệt");
      return;
    }

    try {
      const response = await api_forgotPass(email, newPassword, confirmPassword);
      if (response?.status) {
        ToastAndroid.show("Đổi mật khẩu thành công", ToastAndroid.LONG);
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }]
        });
      } else {
        Alert.alert("Thất bại", result?.message || "Không thể đổi mật khẩu");
      }
    } catch (e) {
      Alert.alert("Lỗi hệ thống", "Đã có lỗi xảy ra, vui lòng thử lại sau");
    }
  };


  return (
    <View style={Style_ForgotPass.container}>
      <Text style={Style_Find_Email.title}>Chọn mật khẩu mới</Text>
      <Text style={Style_Find_Email.label}>Đảm bảo mật khẩu mới có 8 ký tự, bao gồm chữ và số, và ký tự đặc biệt</Text>

      <View style={Style_ForgotPass.inputContainer}>
        <TextInput
          style={Style_ForgotPass.textInput}
          value={email}
          editable={false}
        />
      </View>

      <View style={Style_ForgotPass.inputContainer}>
        <TextInput
          placeholder="Nhập mật khẩu mới"
          style={Style_ForgotPass.textInput}
          secureTextEntry={hideNewPassword}
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <TouchableOpacity onPress={() => setHideNewPassword(!hideNewPassword)}>
          <Image
            source={
              hideNewPassword
                ? require('../../assets/icon/icon_hide.png')
                : require('../../assets/icon/icon_show.png')
            }
            style={Style_ForgotPass.eyeIcon}
          />
        </TouchableOpacity>
      </View>

      <View style={Style_ForgotPass.inputContainer}>
        <TextInput
          placeholder="Xác nhận mật khẩu mới"
          style={Style_ForgotPass.textInput}
          secureTextEntry={hideConfirmPassword}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity onPress={() => setHideConfirmPassword(!hideConfirmPassword)}>
          <Image
            source={
              hideConfirmPassword
                ? require('../../assets/icon/icon_hide.png')
                : require('../../assets/icon/icon_show.png')
            }
            style={Style_ForgotPass.eyeIcon}
          />
        </TouchableOpacity>
      </View>

      <View style={{flex: 1}}/>

      <View style={Style_ForgotPass.container_btn}>
        <TouchableOpacity
          style={[Style_ForgotPass.btnChange, { backgroundColor: colors.Blue }]}
          onPress={() => navigation.navigate('Tab', { screen: 'Profile' })}>
          <Text style={Style_ForgotPass.textBtn}>Hủy</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[Style_ForgotPass.btnChange, { backgroundColor: colors.Red }]}
          onPress={handleForgotPass}>
          <Text style={Style_ForgotPass.textBtn}>Đổi mật khẩu</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Page_ForgotPass