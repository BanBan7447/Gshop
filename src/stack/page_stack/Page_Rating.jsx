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
  const { totalRate, product, images } = route.params;
  const [averageRate, setAverageRate] = useState(totalRate);
  const [userNames, setUserNames] = useState({});
  const [modelDialog, setModelDialog] = useState(false);
  const [star, setStar] = useState(0);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const { users, setUsers } = useContext(AppContext);

  // Kiểm tra nếu images có dữ liệu hợp lệ thì lấy ảnh đầu tiên
  const firstImage = images?.[0]?.image?.[1] || null;

  const [reviews, setReviews] = useState(route.params.reviews);
  const starText = ["Rất tệ", "Tệ", "Ổn", "Tốt", "Rất tốt"];

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
    reviews.forEach((review) => {
      getUserName(review.id_user);
    });
  }, [reviews]);

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

            <View style={{ marginTop: 8 }}>
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
      </View>
    )
  }

  // Hàm kiểm tra user đăng nhập chưa
  const handleRatingPress = () => {
    if (!users) {
      navigation.navigate('Login')
    } else {
      setModelDialog(true)
    }
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
    setAverageRate(calculateAverageRate(reviews));
  }, [reviews]);

  // Hàm gửi đánh giá
  const submitReview = async () => {
    if (!content.trim()) {
      Alert.alert('Lỗi đánh giá', 'Vui lòng nhập nội dung đánh giá');
      return;
    }

    if (star === 0) {
      Alert.alert('Lỗi đánh giá', 'Vui lòng chọn số sao');
    }

    setLoading(true);

    // Gọi & truyền data vào api
    try {
      const response = await api_addReview(star, content, users._id, product._id);
      setLoading(false);

      console.log('📌 Kết quả trả về từ api_addReview:', response);

      if (response.status === true) {
        ToastAndroid.show('Thêm đánh giá thành công', ToastAndroid.SHORT);
        setModelDialog(false);
        setContent('');
        setStar(5);

        // Cập nhật danh sách reviews
        const newReview = {
          id_user: users._id,
          date: new Date().toLocaleDateString("en-GB"),
          star,
          content
        };

        // setReviews((prevReviews) => [newReviews, ...prevReviews]); // Thêm đánh giá mới nhất vào đầu danh sách
        const updatedReviews = [newReview, ...reviews];
        setReviews(updatedReviews);
        setAverageRate(calculateAverageRate(updatedReviews));

      } else {
        ToastAndroid.show('Thêm đánh giá thất bại', ToastAndroid.SHORT);
        console.log('❗ API trả về không đúng mong đợi:', response);
      }
    } catch (e) {
      setLoading(false);
      ToastAndroid.show('Lỗi kết nối thử lại sau', ToastAndroid.SHORT);
      console.error('❌ Lỗi khi gửi đánh giá:', error);
    }

  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.White }}>
      {
        reviews.length === 0 ? (
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

              <TouchableOpacity
                style={Style_Rating.btn_empty_Rating}
                onPress={handleRatingPress}>
                <Text style={Style_Rating.text_btnRating}>Hãy đánh giá sản phẩm</Text>
              </TouchableOpacity>
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
                <Text style={Style_Rating.text_rating}>{reviews.length} Đánh giá</Text>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image
                    source={require('../../assets/icon/icon_star.png')}
                    style={{ width: 24, height: 24 }} />
                  <Text style={Style_Rating.text_rateNumber}>{averageRate}/5.0</Text>
                </View>
              </View>

              <FlatList
                data={reviews}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderRating} />

            </ScrollView>

            <View style={Style_Rating.container_bottom}>
              <TouchableOpacity
                style={Style_Rating.btn_Rating}
                onPress={handleRatingPress}>
                <Text style={Style_Rating.text_btnRating}>Đánh giá</Text>
              </TouchableOpacity>
            </View>
          </View>
        )
      }

      <Modal visible={modelDialog} transparent animationType='slide'>
        <View style={Style_Rating.container_model}>
          <View style={Style_Rating.content_model}>
            <Text style={Style_Rating.title_model}>Đánh giá sản phẩm</Text>

            {
              firstImage && (
                <Image
                  source={{ uri: firstImage }}
                  style={Style_Rating.img_model} />
              )
            }

            <Text style={Style_Rating.name_model}>{product.name}</Text>

            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              {
                [1, 2, 3, 4, 5].map((num) => (
                  <View key={num} style={{ alignItems: "center", marginHorizontal: 5 }}>
                    <TouchableOpacity onPress={() => setStar(num)}>
                      <Image
                        source={
                          num <= star
                            ? require('../../assets/icon/icon_star.png')
                            : require('../../assets/icon/icon_star_black.jpg')
                        }
                        style={Style_Rating.star_model} />
                    </TouchableOpacity>

                    <Text style={Style_Rating.star_text}>
                      {starText[num - 1]}
                    </Text>
                  </View>
                ))
              }
            </View>

            <Text style={Style_Rating.label_text_input}>Mời bạn chia sẻ</Text>
            <TextInput
              style={Style_Rating.text_input}
              multiline
              value={content}
              onChangeText={setContent} />

            <View style={Style_Rating.contaner_btn}>
              <TouchableOpacity
                style={Style_Rating.btn_submit}
                onPress={(submitReview)}
                disabled={loading}>
                <Text style={Style_Rating.text_submit_cancel}>
                  {loading ? 'Đang gửi...' : 'Gửi đánh giá'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={Style_Rating.btn_cancel}
                onPress={() => setModelDialog(false)}>
                <Text style={Style_Rating.text_submit_cancel}>Hủy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </View>
  )
}

export default Page_Rating