import { View, Text, FlatList, Image, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import colors from '../../styles/colors'
import Styles_News from '../../styles/Styles_News'
import { AppContext } from '../../context'

const Page_News = (props) => {
  const { navigation } = props

  // Data tin tức
  const { news } = useContext(AppContext);
  const [searchText, setSearchText] = useState('');

  // Lọc tin tức theo tiêu đề
  const filterNews = news.filter(item =>
    item.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderNews = ({ item }) => {
    const { images, title, date } = item;

    return (
      <TouchableOpacity
        style={Styles_News.container_news}
        onPress={() => navigation.navigate('DetailNews', { newsItem: item })}>
        <Image
          source={{ uri: images[0] }}
          style={Styles_News.thumbnails_news} />
        <Text style={Styles_News.title_news}>{title}</Text>
        <Text style={Styles_News.date_news}>{date}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <ScrollView style={Styles_News.container}>
      <Text style={Styles_News.title}>Tin tức</Text>

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
        data={filterNews}
        renderItem={renderNews}
        keyExtractor={item => item._id}
        scrollEnabled={false} />
    </ScrollView>
  )
}

export default Page_News