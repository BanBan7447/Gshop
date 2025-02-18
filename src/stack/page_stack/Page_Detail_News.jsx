import { View, Text, ScrollView, Image, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import Style_Detail_News from '../../styles/Style_Detail_News';
import { api_getDetailNews } from '../../helper/ApiHelper';
import colors from '../../styles/colors';

const Page_Detail_News = (props) => {
    const { navigation, route } = props
    const { newsId } = route.params;

    const [news, setNews] = useState(null);
    const [loading, setLoading] = useState(true);

    const getDetailNews = async () => {
        try {
            const response = await api_getDetailNews(newsId);
            setNews(response);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getDetailNews();
    }, [newsId]);

    if (loading) {
        return (
            <View style={Style_Detail_News.container_loading}>
                <ActivityIndicator size='large' color={colors.Red} />
            </View>
        )
    }

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

            <Text style={Style_Detail_News.title_news}>{news.title}</Text>


            <Text style={Style_Detail_News.date_news}>{news.date}</Text>

            <Image
                source={{ uri: news.images[0] }}
                style={Style_Detail_News.thumbnails_news} />

            <Text style={Style_Detail_News.content_news}>{news.content}</Text>

            <FlatList
                data={news.images.slice(1)} // Lấy tất cả ảnh từ vị trí thứ 2
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