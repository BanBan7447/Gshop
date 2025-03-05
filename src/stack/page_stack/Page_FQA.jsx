import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Style_FQA from '../../styles/Style_FQA';

const Page_FQA = (props) => {
    const {navigation} = props;
    const [expandedIndex, setExpandedIndex] = useState(null);

    const faqItems = [
        {
            question: 'Gunpla có những loại nào ?',
            answer: [
                'HG - High Grade: Dễ lắp ráp, dành cho người mới.',
                'MG - Master Grade: Chi tiết hơn, có khung xương.',
                'RG - Real Grade: Nhỏ gọn nhưng chi tiết cao.',
                'PG - Perfect Grade: Lớn, chi tiết nhiều, giá cao.'
            ]
        },
        {
            question: 'Sự khác biệt giữa Gundam & Gunpla ?',
            answer: [
                'Gundam là tên của series, còn Gunpla là mô hình lắp ráp.',
            ]
        },
        {
            question: 'Gunpla có những loại nào?',
            answer: [
                'Có nhiều loại như HG, MG, RG, PG...',
            ]
        },
        {
            question: 'Bạn cần chuẩn bị dụng cụ gì để lắp ráp Gunpla ?',
            answer: [
                'Kìm cắt: Dùng để cắt các mảnh nhựa khỏi runner.',
                'Dao rọc giấy: Loại bỏ phần thừa trên chi tiết.',
                'Bút kẻ lằn: Giúp tạo đường viền chi tiết hơn.'
            ]
        },
        {
            question: 'Làm sao để chọn bộ Gunpla phù hợp \ncho người mới ?',
            answer: [
                'Nên chọn HG hoặc RG có độ khó thấp.',
            ]
        },
        {
            question: 'Bảo quản Gunpla thế nào để tránh \nhỏng ?',
            answer: [
                'Tránh ánh nắng trực tiếp, bụi bẩn, và va đập mạnh.',
            ]
        }
    ];


    const toggleAccordion = (index) => {
        if (expandedIndex === index) {
            setExpandedIndex(null);
        } else {
            setExpandedIndex(index);
        }
    };

    return (
        <View style={Style_FQA.container}>
            <TouchableOpacity
                style={Style_FQA.header}
                onPress={() => navigation.goBack()}>
                <Image
                    style={Style_FQA.backIcon}
                    source={require('../../assets/icon/icon_long_arrow.png')} />
                <Text style={Style_FQA.headerTitle}>FAQ - Hỏi dáp</Text>
            </TouchableOpacity>

            {faqItems.map((item, index) => (
                <View key={index} style={Style_FQA.item}>
                    <TouchableOpacity style={Style_FQA.question} onPress={() => toggleAccordion(index)}>
                        <Text style={Style_FQA.questionText}>{item.question}</Text>
                        <Image source={expandedIndex === index
                            ? require('../../assets/icon/icon_polygo_up.jpg') // Icon mở
                            : require('../../assets/icon/icon_polygo.png')    // Icon đóng
                        } />
                    </TouchableOpacity>
                    {expandedIndex === index && (
                        <View style={Style_FQA.answer}>
                            {Array.isArray(item.answer) ? (
                                item.answer.map((ans, idx) => (
                                    <Text key={idx} style={Style_FQA.answerText}>• {ans}</Text>
                                ))
                            ) : (
                                <Text style={Style_FQA.answerText}>{item.answer}</Text>
                            )}
                        </View>
                    )}
                </View>
            ))}
        </View>
    );
};

export default Page_FQA