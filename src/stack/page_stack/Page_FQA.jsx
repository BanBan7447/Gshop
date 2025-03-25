import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Style_FQA from '../../styles/Style_FQA';

const Page_FQA = (props) => {
    const {navigation} = props;
    const [expandedIndex, setExpandedIndex] = useState(null);

    const faqItems = [
        {
            question: 'Gundam là gì?',
            answer: [
                'Gundam là một thương hiệu nhượng quyền nổi tiếng của Nhật Bản, xoay quanh các loạt phim hoạt hình, mô hình và truyện tranh về những cỗ máy chiến đấu khổng lồ (mecha) gọi là Mobile Suit',
                'Được tạo ra bởi Sunrise và đạo diễn Yoshiyuki Tomino, bắt đầu với bộ anime Mobile Suit Gundam (1979).',
                'Đây là một trong những thương hiệu mecha có ảnh hưởng nhất mọi thời đại.'
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
                'HG - High Grade: Dễ lắp ráp, dành cho người mới.',
                'MG - Master Grade: Chi tiết hơn, có khung xương.',
                'RG - Real Grade: Nhỏ gọn nhưng chi tiết cao.',
                'PG - Perfect Grade: Lớn, chi tiết nhiều, giá cao.',
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
                'Muốn thử mẫu nhỏ gọn, nhanh lắp? → SD Gundam.',
                'Tránh MG, PG và mẫu có quá nhiều chi tiết rườm rà.',
                'Chuẩn bị dụng cụ cơ bản để dễ lắp hơn.'
            ]
        },
        {
            question: 'Bảo quản Gunpla thế nào để tránh \nhỏng ?',
            answer: [
                'Tránh ánh nắng trực tiếp, bụi bẩn, và va đập mạnh.',
                'Sử dụng tủ kính hoặc hộp mica',
                'Vệ sinh thường xuyên',
                'Nếu dán decal, nên phủ Top Coat (sơn bảo vệ) để tránh bong tróc.',
                'Tránh nhiệt độ cao & độ ẩm để ngăn ố vàng.',
                'Không tạo dáng quá căng, tránh làm lỏng hoặc gãy khớp.'
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