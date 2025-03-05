import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, createContext, useEffect } from 'react'

// Kho dữ liệu chung cho cả ứng dụng
const AppContext = createContext();
const AppProvider = (props) => {
    const { children } = props;
    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const userData = await AsyncStorage.getItem('userInfo');
                if (userData) {
                    setUsers(JSON.parse(userData))
                }
            } catch (e) {
                console.error("Lỗi khi lấy dữ liệu từ AsyncStorage:", error);
            }
            setLoading(false);
        };

        loadUser();
    }, []);

    return (
        <AppContext.Provider value={{ users, setUsers }}>
            {loading ? null : children}
        </AppContext.Provider>
    );
};

export { AppContext, AppProvider };