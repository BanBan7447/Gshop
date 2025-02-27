import { View, Text, FlatList, Image, ScrollView, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import colors from '../../styles/colors'
import Styles_News from '../../styles/Styles_News'
import { AppContext } from '../../context'
import { api_getNews } from '../../helper/ApiHelper'
import Style_Detail_News from '../../styles/Style_Detail_News'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'

const Page_News = (props) => {
  const { navigation } = props;

  const [news, setNews] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Lấy data tin tức
  const get_News = async () => {
    try {
      const response = await api_getNews();
      setNews(response);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  // Gọi get_News
  useEffect(() => {
    get_News();
  }, [])

  const renderNews = ({ item }) => {
    const { images, title, date, _id } = item;
    const isLoadingRender = !item;

    return (
      <TouchableOpacity
        style={Styles_News.container_news}
        onPress={() => navigation.navigate('DetailNews', { newsId: _id })}
        disabled={isLoadingRender}>
        {
          isLoadingRender ? (
            <SkeletonPlaceholder>
              <View style={Styles_News.thumbnails_news} />
              <View style={Styles_News.skeleton_titleNews_1} />
              <View style={Styles_News.skeleton_titleNews_2} />
              <View style={Styles_News.skeleton_dateNews} />
            </SkeletonPlaceholder>
          ) : (
            <View>
              <Image
                source={{ uri: images[0] }}
                style={Styles_News.thumbnails_news} />
              <Text
                style={Styles_News.title_news}
                numberOfLines={2}
                ellipsizeMode='tail'>
                {title}
              </Text>
              <Text style={Styles_News.date_news}>{date}</Text>
            </View>
          )
        }
      </TouchableOpacity>
    )
  }

  // Lọc tin tức theo tiêu đề
  const filterNews = news.filter(item =>
    item.title.toLowerCase().includes(searchText.toLowerCase())
  );

  if (isLoading) {
    return (
      <View style={Style_Detail_News.container_loading}>
        <ActivityIndicator size="large" color={colors.Red} />
      </View>
    )
  }

  return (
    <ScrollView style={Styles_News.container}>
      <Text style={Styles_News.title}> Tin tức </Text>

      <View style={Styles_News.container_input}>
        <Image
          source={require('../../assets/icon/icon_search.png')}
          style={Styles_News.img_icon} />

        <TextInput
          style={Styles_News.text_input}
          placeholder='Tìm kiếm'
          placeholderTextColor={colors.Black}
          value={searchText}
          onChangeText={text => setSearchText(text)} />
      </View>

      <FlatList
        data={isLoading ? Array(5).fill({}) : filterNews}
        renderItem={renderNews}
        keyExtractor={item => item._id}
        scrollEnabled={false} />
    </ScrollView>
  )
}

export default Page_News