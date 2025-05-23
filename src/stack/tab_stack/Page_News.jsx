import { View, Text, FlatList, Image, ScrollView, TextInput, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import colors from '../../styles/colors'
import Styles_News from '../../styles/Styles_News'
import { AppContext } from '../../context'
import { api_getNews } from '../../helper/ApiHelper'
import Style_Detail_News from '../../styles/Style_Detail_News'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import FastImage from 'react-native-fast-image'

const Page_News = (props) => {
  const { navigation } = props;
  const [news, setNews] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await get_News();
    setRefreshing(false);
  }

  // Lấy data tin tức
  const get_News = async () => {
    try {
      const response = await api_getNews();

      const sortedNews = response.sort((a, b) => {
        const dateTimeA = new Date(`${a.date.split('/').reverse().join('-')}T${a.time}`);
        const dateTimeB = new Date(`${b.date.split('/').reverse().join('-')}T${b.time}`);
        return dateTimeB - dateTimeA
      });

      setNews(sortedNews);
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
    const { thumbnail, title, date, _id } = item;
    const isLoadingRender = !item;
    console.log('Ảnh thumbnail: ', thumbnail);

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
              {
                thumbnail && thumbnail.startsWith('https') ? (
                  <FastImage
                    source={{ uri: thumbnail }}
                    style={Styles_News.thumbnails_news} />
                ) : (
                  <Image
                    source={{ uri: 'https://phutungnhapkhauchinhhang.com/wp-content/uploads/2020/06/default-thumbnail.jpg' }}
                    style={Styles_News.thumbnails_news} />
                )
              }
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
    <ScrollView
      style={Styles_News.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[colors.Red]}
          tintColor={colors.Red}/>
      }>
      <Text style={Styles_News.title}> Tin tức </Text>

      <View style={Styles_News.container_input}>
        <Image
          source={require('../../assets/icon/icon_search_thin.png')}
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