import { View, Text, TouchableOpacity, Image, TextInput, ToastAndroid, ScrollView, FlatList, Alert, LogBox } from 'react-native'
import React, { useState, useEffect } from 'react'
import Style_Write_Rate from '../../styles/Style_Write_Rate';
import { api_uploadImage, api_addReview, api_getRateByProduct, api_getRateByUser } from '../../helper/ApiHelper';
import { launchImageLibrary } from 'react-native-image-picker';
import Style_Rating from '../../styles/Style_Rating';
import colors from '../../styles/colors';
import FastImage from 'react-native-fast-image';

const Page_Write_Rate = (props) => {
  const { navigation, route } = props;
  const { products, productImages, user } = route.params;
  const [star, setStar] = useState(0);
  const [content, setContent] = useState('');
  const [imagesRating, setImagesRating] = useState([]);
  const [loading, setLoading] = useState(false);
  const starText = ["Rất tệ", "Tệ", "Ổn", "Tốt", "Rất tốt"];
  const [reviews, setReviews] = useState([]);
  const [userReviews, setUserReviews] = useState([]);

  const allReviewed = products.every(product =>
    userReviews.some(reviewsArray =>
      reviewsArray.some(review => review.id_product === product._id)
    )
  );

  // Lấy dữ liệu đánh giá mới nhất
  useEffect(() => {
    const checkReviewStatus = async () => {
      try {
        const productReviews = await Promise.all(
          products.map(async (product) => {
            const response = await api_getRateByProduct(product._id);
            console.log(`Lấy danh sách đánh giá cho sản phẩm ${product.name}: `, response);

            const filterReviews = response.filter(review => review.id_user === user._id)
            return filterReviews;
          })
        );

        setUserReviews(productReviews)
      } catch (e) {
        console.log('Lỗi khi kiểm tra đánh giá:', e);
      }
    };

    checkReviewStatus();
  }, [products, user]);

  console.log("Lấy danh sách đánh giá của user: ", userReviews);

  // Gán dữ liệu đánh giá đã có vô phần tử của hàm render
  useEffect(() => {
    if (userReviews.length > 0) {
      const mapReviews = {};

      userReviews.forEach((reviewsArray) => {
        if (Array.isArray(reviewsArray) && reviewsArray.length > 0) {
          reviewsArray.forEach((review) => {
            mapReviews[review.id_product] = {
              star: review.star || 0,
              content: review.content || '',
              images: review.images?.map(img => ({ uri: img })) || []
            };
          });
        }
      });

      setReviews(mapReviews);
    }
  }, [userReviews]);

  const updateReview = (productId, key, value) => {
    setReviews((prevReviews) => ({
      ...prevReviews,
      [productId]: {
        ...prevReviews[productId],
        [key]: value,
      },
    }));
  };

  const pickImages = (productId) => {
    const options = {
      mediaType: "photo",
      selectionLimit: 9,
      quality: 1
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('Người dùng đã hủy chọn ảnh.');
      } else if (response.errorCode) {
        console.log('Lỗi chọn ảnh:', response.errorMessage);
      } else {
        let selectedImages = response.assets.map((item) => ({
          uri: item.uri,
          name: item.fileName,
          type: item.type
        }));

        setReviews((prevReviews) => {
          const existingImages = prevReviews[productId]?.images || [];
          const imageMap = new Map(existingImages.map(img => [img.name, img]));

          selectedImages.forEach(img => {
            imageMap.set(img.name, img);
          });

          let updateImages = Array.from(imageMap.values());

          if (updateImages.length > 9) {
            Alert.alert("Cảnh báo", "Bạn chỉ có thể chọn tối đa 9 ảnh");
            updateImages = updateImages.slice(0, 9);
          }

          return {
            ...prevReviews,
            [productId]: {
              ...prevReviews[productId],
              images: updateImages,
            }
          }
        })
      }
    });
  };

  const deleteImage = (productId, imageUri) => {
    setReviews((prevReviews) => ({
      ...prevReviews,
      [productId]: {
        ...prevReviews[productId],
        images: prevReviews[productId].images.filter(img => img.uri !== imageUri)
      },
    }));
  };

  const addReview = async () => {
    setLoading(true);
    let hasValidateReview = false;

    try {
      for (const productId in reviews) {
        const { star, content, images } = reviews[productId] || {};

        const isReviewed = userReviews.some(reviewsArray =>
          reviewsArray.some(review => review.id_product === productId)
        );

        if (isReviewed) continue;

        if (!star || !content?.trim()) continue;
        const response = await api_addReview(star, content, user._id, productId);

        if (response?.data?._id) {
          hasValidateReview = true;

          if (images?.length) {
            await api_uploadImage(response.data._id, images);
          }
        }
      }

      if (hasValidateReview) {
        ToastAndroid.show("Cảm ơn bạn đã đánh giá", ToastAndroid.SHORT);
        navigation.goBack();
      } else {
        Alert.alert("Thông báo", "Vui lòng nhập đánh giá trước khi gửi.");
      }
    } catch (e) {
      console.log("Lỗi gửi đánh giá", e);
      Alert.alert("Có lỗi xảy ra", "Vui lòng thử lại sau");
    } finally {
      setLoading(false);
    }
  }

  const renderProducts = ({ item }) => {
    const productId = item._id;
    console.log("product ID: ", productId)
    const imageUri = productImages[productId]?.[0]?.image[1] || 'https://via.placeholder.com/300';
    const productPrice = item?.price.toLocaleString('vi-VN');
    const productReview = reviews[productId] || {};

    const isReviewed = userReviews.some(reviewsArray =>
      reviewsArray.some(review => review.id_product === productId)
    )

    return (
      <View style={Style_Write_Rate.container_product}>
        <View style={Style_Write_Rate.container_info}>
          <Image source={{ uri: imageUri }} style={Style_Write_Rate.img_product} />

          <View style={{ flex: 1 }}>
            <Text style={Style_Write_Rate.text_name} numberOfLines={2}>{item.name}</Text>
            <Text style={Style_Write_Rate.text_price}>{productPrice}đ</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 16 }}>
          {
            [1, 2, 3, 4, 5].map((num) => (
              <View key={num} style={{ alignItems: 'center', marginHorizontal: 12 }}>
                <TouchableOpacity onPress={() => !isReviewed && updateReview(productId, 'star', num)}>
                  <Image source={
                    num <= (productReview.star || 0)
                      ? require('../../assets/icon/icon_star.png')
                      : require('../../assets/icon/icon_star_black.jpg')
                  } style={{ width: 40, height: 40 }} />
                </TouchableOpacity>

                <Text style={Style_Write_Rate.star_text}>
                  {starText[num - 1]}
                </Text>
              </View>
            ))
          }
        </View>

        <Text style={Style_Write_Rate.label_text_input}>Mời bạn chia sẻ</Text>
        <TextInput
          style={Style_Write_Rate.text_input}
          multiline
          editable={!isReviewed}
          value={productReview.content || ''}
          onChangeText={(text) => !isReviewed && updateReview(productId, 'content', text)}
        />

        {productReview.images?.length > 0 && (
          <FlatList
            data={productReview.images}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3}
            scrollEnabled={false}
            contentContainerStyle={{ marginVertical: 16 }}
            renderItem={({ item }) => (
              <View style={Style_Rating.container_image}>
                <FastImage source={{ uri: item.uri }} style={Style_Rating.img_rating} resizeMode="cover" />
                {
                  !isReviewed && (
                    <TouchableOpacity onPress={() => deleteImage(productId, item.uri)} style={Style_Rating.btn_delete}>
                      <Image source={require('../../assets/icon/icon_x_white.png')} style={{ width: 8, height: 8 }} />
                    </TouchableOpacity>
                  )
                }
              </View>
            )}
          />
        )}

        {
          !isReviewed && (
            <TouchableOpacity onPress={() => pickImages(productId)} style={Style_Write_Rate.btn_upload}>
              <Image source={require('../../assets/icon/icon_camera.png')} style={Style_Write_Rate.img_icon_2} />
              <Text style={Style_Write_Rate.text_upload}>Thêm ảnh</Text>
            </TouchableOpacity>
          )
        }
      </View>
    );
  };

  return (
    <ScrollView style={Style_Write_Rate.container}>
      <TouchableOpacity
        style={Style_Write_Rate.navigation}
        onPress={() => navigation.goBack()}>
        <Image
          source={require('../../assets/icon/icon_long_arrow.png')}
          style={Style_Write_Rate.img_icon} />

        <Text style={Style_Write_Rate.text_navigation}>Đánh giá sản phẩm</Text>
      </TouchableOpacity>

      <View>
        <FlatList
          data={products}
          keyExtractor={(item) => item._id}
          renderItem={(item) => renderProducts(item, productImages)}
          showsVerticalScrollIndicator={false} />
      </View>

      {
        !allReviewed && (
          <TouchableOpacity
            onPress={addReview}
            disabled={loading}
            style={[Style_Write_Rate.btn_review, { backgroundColor: colors.Red }]}>
            <Text style={Style_Write_Rate.text_review}>{loading ? 'Đang tải lên...' : 'Gửi đánh giá'}</Text>
          </TouchableOpacity>
        )
      }
    </ScrollView>
  )
}

export default Page_Write_Rate