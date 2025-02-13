import { View, Text, ScrollView, Image, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import Style_Detail_News from '../../styles/Style_Detail_News';

const Page_Detail_News = (props) => {
    const { navigation, route } = props
    const { newsItem } = route.params;

    return (
        <ScrollView style={Style_Detail_News.container}>
            <TouchableOpacity
                style={Style_Detail_News.navigation}
                onPress={() => navigation.navigate('Tab', { screen: 'News' })}>
                <Image
                    source={require('../../assets/icon/icon_long_arrow.png')}
                    style={Style_Detail_News.img_icon} />

                <Text style={Style_Detail_News.text_navigation}>Tin tức</Text>
            </TouchableOpacity>

            <Text style={Style_Detail_News.title_news}>{newsItem.title}</Text>


            <Text style={Style_Detail_News.date_news}>{newsItem.date}</Text>

            <Image
                source={{ uri: newsItem.images[0] }}
                style={Style_Detail_News.thumbnails_news} />

            <Text style={Style_Detail_News.content_news}>{newsItem.content}</Text>

            <FlatList
                data={newsItem.images.slice(1)} // Lấy tất cả ảnh từ vị trí thứ 2
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <Image
                        source={{ uri: item }}
                        style={Style_Detail_News.images_news} />
                )}
                scrollEnabled={false} />

        </ScrollView>
    )
}

export default Page_Detail_News