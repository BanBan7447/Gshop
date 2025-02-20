import { View, Text, TouchableOpacity, Image, FlatList, ActivityIndicator, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Style_Rating from '../../styles/Style_Rating'
import { useRoute } from '@react-navigation/native'
import colors from '../../styles/colors'
import { api_getDetailNews, api_getDetailUser } from '../../helper/ApiHelper'

const Page_Rating = (props) => {
  const { navigation } = props;
  const route = useRoute();
  const { reviews, totalRate, product } = route.params;
  const [userNames, setUserNames] = useState({});

  // Hàm lấy thông tin user theo ID
  const getUserName = async (userdId) => {
    if(userNames[userdId]) return; // Nếu user đã có, không cần gọi API

    try {
      const userData = await api_getDetailUser(userdId);
      setUserNames((prev) => ({
        ...prev,
        [userdId]: userData ? userData.name : "Unknown",
      }));
    } catch(e){
      console.log("Lỗi lấy thông tin User", e);
    }
  };

  // Gọi getUserName
  useEffect(() => {
    reviews.forEach((review) => {
      getUserName(review.id_user);
    });
  }, [reviews]);

  // useEffect(() => {
  //   const getUserNames = async () => {
  //     let userMap = { ...userNames };

  //     for (let review of reviews) {
  //       if (!userMap[review.id_user]) {
  //         const userData = await api_getDetailUser(review.id_user);
  //         if (userData) {
  //           userMap[review.id_user] = userData.name;
  //         } else {
  //           userMap[review.id_user] = 'Unknow';
  //         }
  //       }
  //     }

  //     setUserNames(userMap);
  //   };

  //   getUserNames();
  // }, [reviews]);

  // Hàm hiển thị sao đánh giá
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(
        <Image
          key={i}
          source={require('../../assets/icon/icon_star.png')}
          style={{ width: 20, height: 20 }} />
      )
    }
    return <View style={{ flexDirection: 'row' }}>{stars}</View>
  }

  // Hàm render đánh giá
  const renderRating = ({ item }) => {
    return (
      <View>
        <Text>{userNames[item.id_user] || "Đang tải..."}</Text>
        {renderStars(item.star)}
        <Text>{item.content}</Text>
        <Text>{item.date}</Text>
      </View>
    )
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.White }}>
      <TouchableOpacity
        style={Style_Rating.navigation}
        onPress={() => navigation.goBack()}>
        <Image
          source={require('../../assets/icon/icon_long_arrow.png')}
          style={Style_Rating.img_icon} />

        <Text style={Style_Rating.text_navigation}>Đánh giá</Text>
      </TouchableOpacity>
      <ScrollView>
        <Image
          source={require('../../assets/icon/icon_star.png')}
          style={{ width: 24, height: 24 }} />
        <Text style={Style_Rating.text_rate}>{totalRate}/5.0</Text>

        <Text>
          {product.name}
        </Text>

        <FlatList
          data={reviews}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderRating} />
      </ScrollView>
    </View>
  )
}

export default Page_Rating