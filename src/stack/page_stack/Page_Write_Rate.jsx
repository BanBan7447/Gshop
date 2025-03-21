import { View, Text, TouchableOpacity, Image, TextInput, ToastAndroid, ScrollView, FlatList, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import Style_Write_Rate from '../../styles/Style_Write_Rate';
import { api_uploadImage, api_addReview, api_editReview, api_deleteImage } from '../../helper/ApiHelper';
import { launchImageLibrary } from 'react-native-image-picker';
import Style_Rating from '../../styles/Style_Rating';
import colors from '../../styles/colors';
import FastImage from 'react-native-fast-image';

const Page_Write_Rate = (props) => {
  const { navigation, route } = props;
  const { product, productImage, user, userReview } = route.params;
  const imageURL = productImage?.length > 0 ? productImage[0].image[1] : 'https://via.placeholder.com/300';
  const productPrice = product.price.toLocaleString('vi-VN');

  console.log("User Review: ", userReview)

  const [star, setStar] = useState(userReview ? userReview.star : 0);
  const [content, setContent] = useState(userReview ? userReview.content : '');
  const [loading, setLoading] = useState(false);
  const [imagesRating, setImagesRating] = useState(userReview ? userReview.images : []);
  const [uploadedImages, setUploadedImages] = useState([]); // Danh sách ảnh đã upload
  const starText = ["Rất tệ", "Tệ", "Ổn", "Tốt", "Rất tốt"];

  useEffect(() => {
    if (userReview && userReview.images) {
      setImagesRating(userReview.images);
      setUploadedImages(userReview.images.map(img => img.uri));
    }
  }, [userReview]);


  // Hàm chọn ảnh từ thư viện
  const pickImages = () => {
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
          type: item.type,
        }));

        console.log("Ảnh được chọn:", selectedImages.map(img => img.name));

        setImagesRating((prevImages) => {
          // Loại bỏ ảnh trùng lặp, so sánh bằng name
          const uniqueImages = [
            ...prevImages,
            ...selectedImages.filter(
              (newImage) => !prevImages.some((img) => img.name === newImage.name)
            ),
          ];

          // Log danh sách ảnh sau khi cập nhật
          console.log("Danh sách ảnh sau khi cập nhật:", uniqueImages.map(img => img.uri));

          // Cảnh báo khi số ảnh chọn vượt 9
          if (uniqueImages.length > 9) {
            Alert.alert("Thông báo", "Bạn chỉ được chọn tối đa 9 ảnh");
            return prevImages;
          };

          return uniqueImages; // Cập nhật danh sách ảnh không trùng lặp
        })
      }
    });
  };

  // Hàm up ảnh lên back end
  // const uploadImages = async () => {
  //   // Lọc ra ảnh chưa upload, chỉ up ảnh mới
  //   const newImages = imagesRating.filter(img => !uploadedImages.includes(img.uri));

  //   if (newImages.length === 0) {
  //     Alert.alert('Vui lòng chọn ít nhất một ảnh để tải lên.');
  //     return;
  //   }

  //   setLoading(true);

  //   try {
  //     const id_rating = userReview ? userReview._id : null;
  //     if (!id_rating) {
  //       Alert.alert('Không tìm thấy ID đánh giá.');
  //       setLoading(false);
  //       return;
  //     }

  //     const result = await api_uploadImage(id_rating, newImages);

  //     if (result.status) {
  //       ToastAndroid.show("Upload thành công", ToastAndroid.SHORT);
  //       // Cập nhật danh sách ảnh đã upload
  //       setUploadedImages([...uploadedImages, ...newImages.map(img => img.uri)]);
  //     } else {
  //       Alert.alert(`Lỗi: ${result.message}`);
  //     }
  //   } catch (error) {
  //     console.error('Lỗi khi upload ảnh:', error);
  //     Alert.alert('Có lỗi xảy ra khi tải ảnh.');
  //   }

  //   setLoading(false);
  // };

  const deleteImage = async (imageUri) => {
    setImagesRating((prevImages) => prevImages.filter(img => img.uri !== imageUri && img !== imageUri));
  };

  const deleteAllImages = () => {
    setImagesRating([]);
  };

  // Hàm gửi đánh giá
  // const addReview = async () => {
  //   if (star === 0 || content.trim() === '') {
  //     Alert.alert("Vui lòng chọn số sao và nhập nội dung đánh giá");
  //     return;
  //   };

  //   setLoading(true);
  //   try {
  //     const response = await api_addReview(star, content, user._id, product._id);
  //     console.log("Dữ liệu đánh giá trả về: ", response)

  //     if (response) {
  //       ToastAndroid.show("Cảm ơn bạn đã góp ý", ToastAndroid.SHORT);
  //     } else {
  //       ToastAndroid.show("Vui lòng thử lại sau", ToastAndroid.SHORT);
  //     }
  //   } catch (e) {
  //     console.log("Lỗi khi đánh giá: ", e);
  //     Alert.alert("Lỗi khi đánh giá");
  //   } finally {
  //     setLoading(false)
  //   }
  // };

  // Hàm gửi đánh giá kèm ảnh
  const addReview = async () => {
    if (star === 0 || content.trim() === '') {
      Alert.alert("Thông báo", "Vui lòng chọn số sao và nhập nội dung đánh giá");
      return;
    };

    setLoading(true);
    try {
      // Gửi đánh giá
      const response = await api_addReview(star, content, user._id, product._id);
      console.log("Dữ liệu đánh giá trả về: ", response);

      if (!response) {
        Alert.alert("Vui lòng thử lại sau");
        setLoading(false);
        return;
      };

      ToastAndroid.show("Cảm ơn bạn đã góp ý", ToastAndroid.show);
      navigation.navigate("Rating", { product });

      // Upload ảnh
      // Lấy ID đánh giá
      const id_rating = response.data._id;
      console.log("ID của đánh giá mới nhất: ", id_rating);
      if (!id_rating) {
        console.log("Không lấy được ID đánh giá, bỏ qua bước upload ảnh");
        return;
      }

      // Nếu có ảnh thì tiến hành upload
      if (imagesRating.length > 0) {
        console.log("Bắt đầu upload ảnh với ID đánh giá:", id_rating);
        console.log("Danh sách ảnh cần upload:", imagesRating);
        const uploadResponse = await api_uploadImage(id_rating, imagesRating);
        console.log("Kết quả upload ảnh:", uploadResponse);
      } else {
        console.log("Lỗi không upload ảnh được");
      }
    } catch (e) {
      console.log("Lỗi gửi đánh giá", e);
      Alert.alert("Có lỗi xảy ra", "Vui lòng thử lại sau");
    } finally {
      setLoading(false);
    }
  }

  // Hàm chỉnh sửa đánh giá
  // const editReview = async () => {
  //   if (star === 0 || content.trim() === '') {
  //     Alert.alert("Vui lòng chọn số sao và nhập nội dung đánh giá");
  //     return;
  //   };

  //   try {
  //     if (!userReview || !userReview._id) {
  //       Alert.alert("Không tìm thấy đánh giá để chỉnh sửa");
  //       return;
  //     }

  //     const response = await api_editReview(userReview._id, star, content, user._id, product._id);
  //     console.log("Dữ liệu phản hồi từ server cập nhật đánh giá: ", response);

  //     if (response) {
  //       ToastAndroid.show("Đánh giá đã được cập nhật", ToastAndroid.SHORT);
  //       navigation.goBack(); // Quay lại trang trước
  //     } else {
  //       ToastAndroid.show("Cập nhật đánh giá thất bại, vui lòng thử lại", ToastAndroid.SHORT);
  //     }
  //   } catch (e) {
  //     console.log("Lỗi khi đánh giá: ", e);
  //     Alert.alert("Lỗi khi đánh giá");
  //   }
  // };

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

      <View style={Style_Write_Rate.container_product}>
        <Image
          source={{ uri: imageURL }}
          style={Style_Write_Rate.img_product}>
        </Image>

        <View style={{ flex: 1 }}>
          <Text
            style={Style_Write_Rate.text_name}
            numberOfLines={2}>
            {product.name}
          </Text>
          <Text style={Style_Write_Rate.text_price}>{productPrice}đ</Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 16 }}>
        {
          [1, 2, 3, 4, 5].map((num) => (
            <View key={num} style={{ alignItems: 'center', marginHorizontal: 14 }}>
              <TouchableOpacity onPress={() => setStar(num)}>
                <Image source={
                  num <= star
                    ? require('../../assets/icon/icon_star.png')
                    : require('../../assets/icon/icon_star_black.jpg')
                } style={{ width: 42, height: 42 }} />
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
        value={content}
        onChangeText={setContent} />

      <TouchableOpacity
        onPress={pickImages}
        style={Style_Write_Rate.btn_upload}>
        <Image
          source={require('../../assets/icon/icon_camera.png')}
          style={Style_Write_Rate.img_icon_2} />
        <Text style={Style_Write_Rate.text_upload}>Thêm ảnh</Text>
      </TouchableOpacity>

      {
        imagesRating.length === 0 ? (
          <Text style={Style_Write_Rate.text_empty}>
            Hãy tải ảnh sản phẩm của bạn
          </Text>
        ) : (
          <FlatList
            data={imagesRating}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3}
            scrollEnabled={false}
            contentContainerStyle={{ marginVertical: 16 }}
            renderItem={({ item }) => {
              const imageUri = item.uri ? item.uri : item;
              console.log("Image URI: ", imageUri);

              return (
                <View style={Style_Rating.container_image}>
                  <FastImage
                    source={{ uri: imageUri, priority: FastImage.priority.high }}
                    style={Style_Rating.img_rating}
                    resizeMode={FastImage.resizeMode.cover} />

                  <TouchableOpacity
                    style={Style_Rating.btn_delete}
                    onPress={() => deleteImage(imageUri)}>
                    <Image
                      source={require('../../assets/icon/icon_x_white.png')}
                      style={{ width: 8, height: 8 }} />
                  </TouchableOpacity>
                </View>
              )
            }} />
        )
      }

      {
        imagesRating.length > 0 && (
          <TouchableOpacity onPress={deleteAllImages}>
            <Text style={Style_Write_Rate.text_deleteAll}>Xóa tất cả ảnh</Text>
          </TouchableOpacity>
        )
      }

      <View style={Style_Write_Rate.container_bottom}>
        <TouchableOpacity
          onPress={addReview}
          disabled={loading}
          style={[Style_Write_Rate.btn_review, { backgroundColor: colors.Red }]}>
          <Text style={Style_Write_Rate.text_review}>{loading ? 'Đang tải lên...' : 'Gửi đánh giá'}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default Page_Write_Rate