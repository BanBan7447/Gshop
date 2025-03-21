import { View, Text, TouchableOpacity, Image, FlatList, ActivityIndicator, ScrollView, Modal, TextInput, Alert, ToastAndroid, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Style_Rating from '../../styles/Style_Rating'
import { useRoute } from '@react-navigation/native'
import colors from '../../styles/colors'
import { api_getDetailUser, api_addReview, api_getRateByProduct } from '../../helper/ApiHelper'
import { AppContext } from '../../context'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'

const Page_Rating = (props) => {
  const { navigation } = props;
  const route = useRoute();
  const { product } = route.params;
  const [userNames, setUserNames] = useState({});
  const { users, setUsers } = useContext(AppContext);
  //const [reviews, setReviews] = useState(route.params.reviews);
  const [ratings, setRatings] = useState([]);
  const [totalRate, setTotalRate] = useState(0);
  const [averageRate, setAverageRate] = useState(totalRate);
  const [loading, setLoading] = useState(true);

  // Hàm lấy thông tin user theo ID
  const getUserName = async (userdId) => {
    if (userNames[userdId]) return; // Nếu user đã có, không cần gọi API

    try {
      const userData = await api_getDetailUser(userdId);
      setUserNames((prev) => ({
        ...prev,
        [userdId]: userData ? userData.name : "Unknown",
      }));
    } catch (e) {
      console.log("Lỗi lấy thông tin User", e);
    }
  };

  // Gọi getUserName
  useEffect(() => {
    ratings.forEach((review) => {
      getUserName(review.id_user);
    });
  }, [ratings]);

  // Hàm hiển thị sao đánh giá
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Image
          key={i}
          source={i < rating
            ? require('../../assets/icon/icon_star.png')
            : require('../../assets/icon/icon_star_black.jpg')
          }
          style={{ width: 18, height: 18 }} />
      )
    }
    return <View style={{ flexDirection: 'row' }}>{stars}</View>
  }

  // Hàm lấy dữ liệu đánh giá
  const getRatings = async () => {
    try {
      const reviews = await api_getRateByProduct(product._id);
      if (reviews && reviews.length > 0) {
        const totalPoints = reviews.reduce((sum, review) => sum + review.star, 0);
        const avarageRating = totalPoints / reviews.length;
        setTotalRate(avarageRating.toFixed(1));
        setRatings(reviews);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRatings();
  }, []);

  // Hàm render đánh giá
  const renderRating = ({ item }) => {
    const loadingRender = !userNames[item.id_user]; // Nếu chưa có tên thì hiển thị loading

    if (loadingRender) {
      return (
        <SkeletonPlaceholder>
          <View style={Style_Rating.container_customer}>
            <View style={Style_Rating.contain_name_date}>
              <View style={Style_Rating.name_skeleton} />
              <View style={Style_Rating.date_skeleton} />
            </View>

            <View style={{ flexDirection: 'row', marginTop: 8 }}>
              {
                Array(5).fill().map((_, index) => (
                  <View key={index} style={Style_Rating.star_skeleton} />
                ))
              }
            </View>

            <View style={{ marginTop: 24 }}>
              <View style={Style_Rating.body_1_skeleton} />
              <View style={Style_Rating.body_2_skeleton} />
            </View>

          </View>
        </SkeletonPlaceholder>
      )
    }

    return (
      <View style={Style_Rating.container_customer}>

        <View style={Style_Rating.contain_name_date}>
          <Text style={Style_Rating.name_customer}>{userNames[item.id_user]}</Text>
          <Text>{item.date}</Text>
        </View>

        {renderStars(item.star)}
        <Text style={Style_Rating.content_rating}>{item.content}</Text>

        {
          item.images && item.images.length > 0 && (
            <FlatList
              data={item.images}
              keyExtractor={(item, index) => index.toString()}
              numColumns={3}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <Image
                  source={{ uri: item }}
                  style={Style_Rating.img_rating_1}
                  resizeMode="cover" />
              )} />
          )
        }
      </View>
    )
  }

  // Hàm tính trung bình điểm đánh giá
  const calculateAverageRate = (reviews) => {
    if (reviews.length === 0) {
      return 0;
    };

    const totalStars = reviews.reduce((sum, review) => sum + review.star, 0);
    return (totalStars / reviews.length).toFixed(1);
  };

  // Gọi calculateAverageRate khi danh sách thay đổi
  useEffect(() => {
    setAverageRate(calculateAverageRate(ratings));
  }, [ratings]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.White }}>
      {
        loading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size='large' color={colors.Red} />
          </View>
        ) : ratings.length === 0 ? (
          <View style={{ flex: 1, backgroundColor: colors.White }}>
            <TouchableOpacity
              style={Style_Rating.navigation}
              onPress={() => navigation.goBack()}>
              <Image
                source={require('../../assets/icon/icon_long_arrow.png')}
                style={Style_Rating.img_icon} />

              <Text style={Style_Rating.text_navigation}>Đánh giá</Text>
            </TouchableOpacity>

            <View style={Style_Rating.container_empty}>
              <Image
                source={require('../../assets/icon/icon_star_sad.jpg')}
                style={{ width: 104, height: 100 }} />

              <Text style={Style_Rating.text_noRating}>Chưa có đánh giá nào</Text>
            </View>
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={Style_Rating.navigation}
              onPress={() => navigation.goBack()}>
              <Image
                source={require('../../assets/icon/icon_long_arrow.png')}
                style={Style_Rating.img_icon} />

              <Text style={Style_Rating.text_navigation}>Đánh giá</Text>
            </TouchableOpacity>

            <ScrollView style={Style_Rating.container}>
              <Text style={Style_Rating.text_name}>
                {product.name}
              </Text>

              <View style={Style_Rating.container_rating}>
                <Text style={Style_Rating.text_rating}>{ratings.length} Đánh giá</Text>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image
                    source={require('../../assets/icon/icon_star.png')}
                    style={{ width: 24, height: 24 }} />
                  <Text style={Style_Rating.text_rateNumber}>{averageRate}/5.0</Text>
                </View>
              </View>

              <FlatList
                data={ratings}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderRating} />
            </ScrollView>
          </View>
        )
      }
    </View>
  )
}

export default Page_Rating