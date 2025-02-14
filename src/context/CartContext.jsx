import { createContext, useState } from 'react'
import { View, Text } from 'react-native'

// Tạo context trong giỏ hàng
const CartContext = createContext();

const CartProvider = (props) => {
    const { children } = props;

    // Trạng thái giỏ hàng, lưu trữ các sản phẩm trong giỏ hàng
    const [cart, setCart] = useState([]);

    // Trả về giá trị context để chia sẻ dữ liệu giữa các màn hình
    return (
        <CartContext.Provider value={{ cart, setCart }}>
            {children}
        </CartContext.Provider>
    )
}

export { CartContext, CartProvider }