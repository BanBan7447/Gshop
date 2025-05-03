import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import Style_FQA from '../../styles/Style_FQA';

const Page_FQA = (props) => {
    const { navigation } = props;
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
                'Gundam là tên gọi của thương hiệu cũng như các series về robot chiến đấu (Mobile Suit) trong thế giới viễn tưởng.',
                'Gunpla (viết tắt của Gundam Plastic Model) là các mô hình nhựa mô phỏng lại các Mobile Suit trong loạt phim Gundam. Đây là sản phẩm để người hâm mộ có thể tự tay lắp ráp và trưng bày.'
            ]
        },
        {
            question: 'Gunpla có những loại nào?',
            answer: [
                'Gunpla được chia thành nhiều dòng theo độ chi tiết và độ khó, phổ biến gồm:',
                'Entry Grade (EG): Dành cho người mới, dễ lắp ráp, không cần dùng keo hoặc sơn.',
                'High Grade (HG): Tỷ lệ 1/144, chi tiết vừa phải, phù hợp với người mới và trung cấp.',
                'Real Grade (RG): Tỷ lệ 1/144 nhưng chi tiết cao, giống như MG thu nhỏ.',
                'Master Grade (MG): Tỷ lệ 1/100, nhiều chi tiết và khung xương bên trong.',
                'Perfect Grade (PG): Tỷ lệ 1/60, cao cấp nhất, chi tiết phức tạp, giá thành cao.',
                'SD (Super Deformed): Thiết kế chibi, nhỏ gọn, dễ thương, lắp nhanh.'
            ]
        },
        {
            question: 'Bạn cần chuẩn bị dụng cụ gì để lắp ráp Gunpla ?',
            answer: [
                'Một số dụng cụ cơ bản bao gồm:',
                'Kềm cắt nhựa (nipper): Để cắt các chi tiết ra khỏi runner.',
                'Dao rọc mô hình (hobby knife): Dùng để làm sạch phần thừa.',
                'Giấy nhám hoặc dũa: Đánh mịn vết cắt.',
                'Nhíp: Hỗ trợ dán decal chính xác.',
                'Panel liner: Để vẽ các đường rãnh chi tiết. Ngoài ra, có thể sử dụng keo, sơn hoặc topcoat nếu muốn tăng độ hoàn thiện.'
            ]
        },
        {
            question: 'Làm sao để chọn bộ Gunpla phù hợp cho người mới ?',
            answer: [
                'Người mới nên bắt đầu với các dòng:',
                'Entry Grade (EG) hoặc High Grade (HG): Lắp ráp dễ, không cần nhiều dụng cụ phức tạp.',
                'Nên chọn các mẫu không quá nhiều chi tiết và màu sắc đơn giản.',
                'Có thể tham khảo các mẫu như RX-78-2 Gundam (HG), hoặc các mẫu SD nếu thích phong cách chibi.'
            ]
        },
        {
            question: 'Bảo quản Gunpla thế nào để tránh hỏng?',
            answer: [
                'Tránh ánh nắng trực tiếp: Vì tia UV có thể làm phai màu nhựa.',
                'Trưng bày nơi khô ráo, tránh bụi: Có thể sử dụng tủ kính để bảo quản.',
                'Hạn chế va chạm: Tránh làm rơi hoặc để trẻ em chơi.',
                'Nếu dán decal, nên phủ Top Coat (sơn bảo vệ) để tránh bong tróc.',
                'Có thể phủ lớp topcoat: Giúp bảo vệ màu và bề mặt mô hình khỏi trầy xước.'
            ]
        },
        {
            question: 'Gunpla có cần sơn không?',
            answer: 'Không bắt buộc phải sơn Gunpla. Các bộ kit hiện đại đã được đúc sẵn với nhiều màu sắc, đủ để trông đẹp ngay cả khi chỉ lắp ráp cơ bản. Tuy nhiên, nếu bạn muốn tăng độ chân thực, độ sắc nét, hoặc tạo dấu ấn cá nhân, thì sơn sẽ giúp mô hình nổi bật hơn. Người mới có thể bắt đầu với các loại bút tô chi tiết (Gundam Marker) trước khi chuyển sang sơn airbrush hoặc sơn xịt chuyên dụng.'
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
        <ScrollView style={Style_FQA.container}>
            <TouchableOpacity
                style={Style_FQA.header}
                onPress={() => navigation.goBack()}>
                <Image
                    style={Style_FQA.backIcon}
                    source={require('../../assets/icon/icon_long_arrow.png')} />
                <Text style={Style_FQA.headerTitle}>FAQ - Hỏi đáp</Text>
            </TouchableOpacity>

            {faqItems.map((item, index) => (
                <View key={index} style={Style_FQA.item}>
                    <TouchableOpacity style={Style_FQA.question} onPress={() => toggleAccordion(index)}>
                        <Text style={Style_FQA.questionText}>{item.question}</Text>
                        <Image style={{ width: 12, height: 12, transform: [{ rotate: expandedIndex === index ? '180deg' : '0deg' }] }} source={expandedIndex === index
                            ? require('../../assets/icon/icon_arrow_down.png') // Icon mở
                            : require('../../assets/icon/icon_arrow_down.png') // Icon đóng
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
        </ScrollView>
    );
};

export default Page_FQA