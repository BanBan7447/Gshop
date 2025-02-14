import { Image, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import Page_Login from './Page_Login';
import Style_ChangPass from '../../styles/Style_ChangPass';

const Page_ChangPass = () => {
    return (
        <View style={Style_ChangPass.container}>
            <View style={Style_ChangPass.header}>
                <Image style={Style_ChangPass.backIcon} source={require('../../assets/icon/icon_long_arrow.png')} />
                <Text style={Style_ChangPass.headerTitle}>Bảo mật</Text>
            </View>
            <Text style={Style_ChangPass.title}>Thay đổi mật khẩu</Text>
            <View style={Style_ChangPass.inputContainer}>
                <TextInput
                    placeholder='Nhập mật khẩu mới'
                    style={Style_ChangPass.textInput}
                />
                <Image style={Style_ChangPass.inputIcon} source={require('../../assets/icon/icon_show.png')} />
            </View>
            <View style={Style_ChangPass.inputContainer}>
                <TextInput
                    placeholder='Nhập lại mật khẩu mới'
                    style={Style_ChangPass.textInput}
                />
                <Image style={Style_ChangPass.inputIcon} source={require('../../assets/icon/icon_show.png')} />
            </View>
            <Text style={Style_ChangPass.infoText}>Mật khẩu của bạn phải bao gồm ít nhất: </Text>
            <View style={Style_ChangPass.listItem}>
                <Image style={Style_ChangPass.tickIcon} source={require('../../assets/icon/icon_tick.png')} />
                <Text style={Style_ChangPass.listText}>8 ký tự (tối đa 20 ký tự)</Text>
            </View>
            <View style={Style_ChangPass.listItem}>
                <Image style={Style_ChangPass.tickIcon} source={require('../../assets/icon/icon_tick.png')} />
                <Text style={Style_ChangPass.listText}>1 chữ cái và 1 số</Text>
            </View>
            <View style={Style_ChangPass.listItem}>
                <Image style={Style_ChangPass.tickIcon} source={require('../../assets/icon/icon_tick.png')} />
                <Text style={Style_ChangPass.listText}>1 ký tự đặc biệt (Ví dụ: # ? ! $ & @)</Text>
            </View>
            <TouchableOpacity style={Style_ChangPass.saveButton}>
                <Text style={Style_ChangPass.saveButtonText}>Lưu mật khẩu mới</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Page_ChangPass;