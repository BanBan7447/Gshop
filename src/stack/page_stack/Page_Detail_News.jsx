import { View, Text, ScrollView, Image, FlatList, TouchableOpacity, ActivityIndicator, useWindowDimensions, LogBox, Dimensions, RefreshControl } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import Style_Detail_News from '../../styles/Style_Detail_News';
import { api_getDetailNews } from '../../helper/ApiHelper';
import colors from '../../styles/colors';
import RenderHTML from 'react-native-render-html';
// import { WebView } from 'react-native-webview';

LogBox.ignoreLogs([
    'Support for defaultProps will be removed from function components',
    'MemoizedTNodeRenderer: Support for defaultProps will be removed from memo components in a future major release. Use JavaScript default parameters instead.',
    'bound renderChildren: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.',
    'TNodeChildrenRenderer: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.',
    'You seem to update props of the "TRenderEngineProvider" component'
]);

const Page_Detail_News = (props) => {
    const screenWidth = Dimensions.get('window').width;
    const { navigation, route } = props
    const { newsId } = route.params;

    const [news, setNews] = useState(null);
    const [loading, setLoading] = useState(true);

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        await getDetailNews();
        setRefreshing(false);
    }

    const getDetailNews = async () => {
        try {
            const response = await api_getDetailNews(newsId);
            if (!response || !response.content) {
                throw new Error("Không có nội dung bài viết");
            }
            setNews(response);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false)
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

    console.log("Content tin tức: ", news.content);

    const customStyle = {
        h2: {
            color: colors.Black,
            fontSize: 20,
            fontWeight: 'bold',
            backgroundColor: 'white',
        },
        h3: {
            color: colors.Black,
            fontSize: 18,
            fontWeight: 'bold',
            backgroundColor: 'white',
        },
        p: {
            color: colors.Black,
            fontSize: 14,
            lineHeight: 20,
            backgroundColor: 'white',
            textAlign: 'justify',
        },
        img: {
            width: '100%',
            height: 'auto',
            resizeMode: 'contain',
        },
        a: {
            color: 'blue',
            textDecorationLine: 'underline',
        },
    };

    return (
        <ScrollView
            style={Style_Detail_News.container}
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={[colors.Red]}
                    tintColor={colors.Red}
                />
            }>
            <View style={{ marginHorizontal: 20 }}>
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
                    source={{ uri: news.thumbnail }}
                    style={Style_Detail_News.thumbnails_news} />

                <View style={{ flex: 1 }}>
                    <ScrollView>
                        <RenderHTML
                            contentWidth={screenWidth}
                            source={{ html: news.content }}
                            enableExperimentalMarginCollapsing={true}
                            tagsStyles={customStyle}
                            ignoredDomTags={['source']}
                        />
                    </ScrollView>
                </View>
            </View>
        </ScrollView>
    )
}

export default Page_Detail_News