import { View, Text, ScrollView, Image, FlatList } from 'react-native'
import React, { useState } from 'react'
import Style_Notification from '../../styles/Style_Notification'

const Page_Notification = () => {
  const getPastTime = (daysAgo, hoursAgo, minutesAgo) => {
    const date = new Date();

    date.setDate(date.getDate() - daysAgo); // Lùi lại X ngày
    date.setHours(date.getHours() - hoursAgo); // Lùi lại X giờ
    date.setMinutes(date.getMinutes() - minutesAgo); // Lùi lại X phút

    return date;
  };

  // Data mẫu tin tức
  const [notification, setNotification] = useState([
    {
      id: 1,
      content: 'Đơn hàng DG8354 của bạn đã được vận chuyển thành công.',
      date: getPastTime(0, 2, 15)
    },

    {
      id: 2,
      content: 'Đơn hàng DG8354 của bạn đã được xử lý, và sẽ được vận chuyển dự kiến từ 1 đến 2 ngày.',
      date: getPastTime(0, 3, 20)
    },

    {
      id: 3,
      content: 'Đơn hàng DG8354 của bạn đang được xử lý.',
      date: getPastTime(1, 1, 20)
    },

    {
      id: 4,
      content: 'Đơn hàng DG3453 của bạn đã được vận chuyển thành công.',
      date: getPastTime(1, 2, 35)
    },

    {
      id: 5,
      content: 'Đơn hàng DG3453 của bạn đã được xử lý, và sẽ được vận chuyển dự kiến từ 1 đến 2 ngày',
      date: getPastTime(2, 30, 25)
    },

    {
      id: 6,
      content: 'Đơn hàng DG3453 của bạn đang được xử lý.',
      date: getPastTime(3, 12, 45)
    },
  ]);

  // Lọc tin tức theo ngày mới nhất và trước đó
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const newNotifications = notification.filter(item => item.date >= today);
  const oldNotifications = notification.filter(item => item.date < today);

  // Render thông báo
  const renderNotification = ({ item }) => {
    const { content, date } = item;

    return (
      <View style={Style_Notification.container_cart}>
        <View style={Style_Notification.container_icon_cart}>
          <Image
            source={require('../../assets/icon/icon_shopping_cart.png')}
            style={Style_Notification.icon_cart} />
        </View>

        <View style={Style_Notification.container_info}>
          <Text style={Style_Notification.content}>{content}</Text>
          <Text style={Style_Notification.date}>{date.toLocaleString('vi-VN', {
            hour: '2-digit',
            minute: '2-digit',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour12: false
          }).replace(',', ' -')}
          </Text>
        </View>
      </View>
    )
  }

  return (
    <ScrollView style={Style_Notification.container}>
      <Text style={Style_Notification.title}>Thông báo</Text>

      <Text style={Style_Notification.title_body}>Mới nhất</Text>
      <FlatList
        data={newNotifications}
        renderItem={renderNotification}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false} />

      <Text style={Style_Notification.title_body}>Trước đó</Text>
      <FlatList
        data={oldNotifications}
        renderItem={renderNotification}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false} />
    </ScrollView>
  )
}

export default Page_Notification