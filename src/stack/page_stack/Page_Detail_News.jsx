import { View, Text, ScrollView, Image, FlatList, TouchableOpacity, ActivityIndicator, useWindowDimensions, LogBox } from 'react-native'
import React, { useEffect, useState } from 'react'
import Style_Detail_News from '../../styles/Style_Detail_News';
import { api_getDetailNews } from '../../helper/ApiHelper';
import colors from '../../styles/colors';
import RenderHTML from 'react-native-render-html';
// import { WebView } from 'react-native-webview';

LogBox.ignoreLogs([
    'Support for defaultProps will be removed from function components',
    'MemoizedTNodeRenderer: Support for defaultProps will be removed from memo components in a future major release. Use JavaScript default parameters instead.',
    'bound renderChildren: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.',
    'TNodeChildrenRenderer: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.'
]);

const Page_Detail_News = (props) => {
    const { width } = useWindowDimensions();
    const { navigation, route } = props
    const { newsId } = route.params;

    const [news, setNews] = useState(null);
    const [loading, setLoading] = useState(true);

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

    // Format lại nội dung HTML để đảm bảo hiển thị đúng
    // const formattedHTML = `
    //     <!DOCTYPE html>
    //     <html lang="vi">
    //     <head>
    //         <meta charset="UTF-8">
    //         <meta name="viewport" content="width=device-width, initial-scale=1.0">
    //         <style>
    //             body { font-size: 16px; padding: 0px; color: ${colors.Black}; }
    //             img { max-width: 100%; height: auto; }
    //             a { color: blue; text-decoration: none; }
    //         </style>
    //     </head>
    //     <body>
    //         ${news.content}
    //     </body>
    //     </html>
    // `;

    const customStyle = {
        p: {color: colors.Black, fontSize: 18, lineHeight: 24},
        img: {maxWidth: '100%', height: 'auto'},
        a: { color: 'blue', textDecorationLine: 'underline' },
    };

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
                source={{ uri: news.thumbnail }}
                style={Style_Detail_News.thumbnails_news} />

            <RenderHTML
                contentWidth={width}
                source={{ html: news.content }}
                enableExperimentalMarginCollapsing={true}
                tagsStyles={customStyle}
            />

            {/* <ScrollView style={{flex: 1}}>
                <WebView
                    originWhitelist={['*']}
                    source={{ html: formattedHTML }}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    scrollEnabled={false}
                    style={{ flex: 1, width: '100%', height: 100 }} />
            </ScrollView> */}

        </ScrollView>
    )
}

export default Page_Detail_News