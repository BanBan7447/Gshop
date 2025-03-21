import { Platform } from "react-native";
import AxiosInstance from "./AxiosInstance";
import { launchImageLibrary } from "react-native-image-picker";

// Gọi API đăng nhập
const api_login = async (data) => {
    try {
        console.log('>>>>>>>>>>>>>>>>> get_api_login')
        const { email_phone, phone_number, password } = data;
        const body = {
            email: email_phone,
            phone_number: phone_number,
            password: password
        }
        console.log(`Email: ${email_phone} | Phone: ${phone_number}, Password: ${password}`)

        const response = await AxiosInstance().post('/user/login', body);
        if (response.status == true) {
            return response.data;
        }
    } catch (e) {
        console.log(e);
    }
}

// Gọi API đăng ký 
const api_signUp = async (data) => {
    try {
        const { name, email, phone_number, password } = data;
        const body = {
            name: name,
            email: email,
            phone_number: phone_number,
            password: password
        }

        const response = await AxiosInstance().post('/user/register', body);

        if (response.status == true) {
            return true;
        }

        return false

    } catch (e) {
        console.log(e);
        return false
    }
}

// Gọi API lấy thông tin chi tiết của user
const api_getDetailUser = async (_id) => {
    try {
        console.log('>>>>>>>>>>>>>>>>>> get Detail User');
        const response = await AxiosInstance().get(`/user/detail_user?_id=${_id}`);

        if (response.status == true) {
            return response.data;
        }
    } catch (e) {
        console.log(e);
    }
}

// Hàm xử lý cập nhật thông tin
const api_updateProfile = async (email, name, phone_number) => {
    try {
        console.log('>>>>>>>>>>>>>>>>>> get update profile');
        const response = await AxiosInstance().put("user/update", {
            email, name, phone_number
        });

        console.log("Response API cập nhật thông tin: ", response)

        if (response.status == true) {
            return response
        }
    } catch (error) {
        console.log(error);
    }
};

// Gọi API lấy danh sách danh mục
const api_getCategories = async () => {
    try {
        console.log(">>>>>>>>>>>>>> getCategories");
        const response = await AxiosInstance().get('/category/list');

        if (response.status == true) {
            console.log('Data Categories: ', response);
            return response.data
        }
    } catch (e) {
        console.log(e);
    }
}

// Gọi API lấy danh sách sản phẩm
const api_getProducts = async () => {
    try {
        console.log('>>>>>>>>>>>>>> getProducts');
        const response = await AxiosInstance().get('/product/list');

        if (response.status == true) {
            console.log('Data Products: ', response);
            return response.data
        }

    } catch (e) {
        console.log(e)
    }
}

// Gọi API lấy ảnh cho sản phẩm
const api_getImagesProduct = async (id_product) => {
    try {
        console.log('>>>>>>>>>>>>>> getImagesProduct', id_product);
        const response = await AxiosInstance().get(`/image_product/list-images/${id_product}`);

        if (response.status == true) {
            console.log('Data Images: ', response);
            return response.data;
        }

    } catch (e) {
        console.log(e);
    }
}

// Gọi API lấy danh sách sản phẩm theo loại
const api_getProductsByCategory = async (id_category) => {
    console.log("Calling API with categoryID:", id_category);
    try {
        console.log('>>>>>>>>>>>>>>>>>> get Products by Categories')

        const response = await AxiosInstance().get(`/product/list-by-category/${id_category}`);
        console.log('API Response:', response.data);

        if (response.status == true) {
            return response.data;
        }

        console.log('Data Products', response);
    } catch (e) {
        console.log('Lỗi', e.message);
    }

    return [];
}

// Gọi API lấy thông tin chi tiết của 1 sản phẩm
const api_getDetailProduct = async (id) => {
    try {
        console.log('>>>>>>>>>>>>>>>>>> get Detail Product');
        const response = await AxiosInstance().get(`/product/detail/${id}`);

        if (response.status == true) {
            return response.data;
        }
    } catch (e) {
        console.log(e);
    }
}

// Gọi API lấy danh sách tin tức
const api_getNews = async () => {
    try {
        console.log('>>>>>>>>>>>>>> get api list news');
        const response = await AxiosInstance().get('/news/list');

        if (response.status == true) {
            console.log('Data News', response);
            return response.data
        }

    } catch (e) {
        console.log(e)
    }
}

// Gọi API lấy chi tiết tin tức
const api_getDetailNews = async (_id) => {
    try {
        console.log('>>>>>>>>>>>>>>>>>> get Detail News');
        const response = await AxiosInstance().get(`/news/detail_news?_id=${_id}`)

        if (response.status == true) {
            return response.data;
        }
    } catch (e) {
        console.log(e);
    }
}

// Gọi API lấy danh sách đánh giá theo sản phẩm
const api_getRateByProduct = async (id_product) => {
    try {
        console.log('>>>>>>>>>>>>>>>>>> get Rate Product');
        const response = await AxiosInstance().get(`/rating/list_product?id_product=${id_product}`);

        if (response.status == true) {
            return response.data;
        } else {
            return [];
        }
    } catch (e) {
        console.log(e);
    }
}

// Gọi API đổi mật khẩu
const api_changePassword = async (userId, newPassword, confirmPassword) => {
    try {
        const response = await AxiosInstance().put('/user/changPass', {
            userId,
            newPassword,
            confirmPassword,
        });

        if (response.status === 200) {
            console.log('Đổi mật khẩu thành công:', response.data);
            return response.data;
        } else {
            console.error('Lỗi khi đổi mật khẩu:', response.data);
            throw new Error(response.data.message || 'Có lỗi xảy ra');
        }
    } catch (error) {
        console.error('Lỗi khi gọi API:', error);
        throw error;
    }
};

// Gọi API thêm đánh giá
const api_addReview = async (star, content, id_user, id_product) => {
    try {
        console.log('>>>>>>>>>>>>>>>>>> get Add Review');
        const response = await AxiosInstance().post('/rating/add', {
            star, content, id_user, id_product
        });

        console.log('📌 Phản hồi từ server:', response);

        if (response.status == true) {
            return response;
        }
    } catch (e) {
        console.log('❌ Lỗi khi thêm đánh giá:', e);
    }
}

// Gọi API upload image rating
const BASE_URL = "https://gshopbackend.onrender.com/rating";
const api_uploadImage = async (id_rating, images) => {
    try {
        let formData = new FormData();

        images.forEach((image, index) => {
            formData.append("image", {
                uri: Platform.OS === "ios" ? image.uri.replace("file://", "") : image.uri,
                name: `image_${index}.jpg`,
                type: "image/jpeg",
            });
        });

        const response = await fetch(`${BASE_URL}/upload?id_rating=${id_rating}`, {
            method: "POST",
            // headers: {
            //     "Content-Type": "multipart/form-data",
            // },
            body: formData,
        });

        console.log("📥 Response status:", response.status);
        console.log("📥 Response headers:", response.headers);

        if (!response.ok) {
            throw new Error(`Lỗi HTTP: ${response.status}`);
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            throw new Error("Phản hồi từ server không phải JSON");
        }

        const result = await response.json();
        console.log("📥 Response JSON:", result);
        return result;
    } catch (error) {
        console.error("Lỗi khi upload ảnh:", error);
        return { status: false, message: error.message };
    }
}

// Gọi API xóa 1 hoặc nhiều ảnh
const api_deleteImage = async (id_rating, imaUrlsRemove) => {
    try {
        if (!id_rating || !Array.isArray(imaUrlsRemove) || imaUrlsRemove.length === 0) {
            throw new Error("Dữ liệu đầu vào không hợp lệ");
        }

        const response = await AxiosInstance().delete("/rating/delete-image/", {
            params: { id_rating },
            data: { imaUrlsRemove },
        });

        return response.data;
    } catch (e) {
        console.log("Lỗi xóa ảnh", e);
    }
}

// Gọi API chỉnh sửa đánh giá
const api_editReview = async (_id, star, content, id_user, id_product) => {
    try {
        console.log('>>>>>>>>>>>>>>>>>> get Edit Review');
        const response = await AxiosInstance().put(`/rating/edit?_id=${_id}`, {
            star, content, id_user, id_product
        });

        console.log('Phản hồi từ server:', response);

        if (response.status == true) {
            return response;
        }
    } catch (e) {
        console.log('Lỗi khi thêm đánh giá:', e);
    }
}

// Gọi API cập nhật view của sản phẩm
const api_updateView = async (id) => {
    try {
        console.log('>>>>>>>>>>>>>>>>>> get api update View');
        const response = AxiosInstance().put(`/product/update_view?id=${id}`);

        if (response.status == true) {
            return response
        }
    } catch (e) {
        console.log("Lỗi khi tăng view", e)
    }
}

// Gọi API thêm sản phẩm vào giỏ hàng
const api_addToCart = async (id_user, id_product, quantity) => {
    try {
        console.log('>>>>>>>>>>>>>>>>>> get add cart');
        const response = await AxiosInstance().post('/cart/add', {
            id_user, id_product, quantity
        });

        if (response.status == true) {
            return response.data;
        }
    } catch (e) {
        console.log(e);
    }
}

// Gọi API lấy giỏ hàng
const api_getCarts = async (id_user) => {
    try {
        console.log('>>>>>>>>>>>>>>>>>> get cart');
        const response = await AxiosInstance().get(`/cart/${id_user}`);

        if (response.status == true) {
            return response.data;
        }
    } catch (e) {
        console.log(e);
        return null
    }
}

// Gọi API cập nhật số lượng giỏ hàng
const api_updateQuantity = async (id_user, id_product, quantity) => {
    try {
        console.log('>>>>>>>>>>>>>>>>>> update quantity cart');
        const response = await AxiosInstance().put('/cart/update', {
            id_user, id_product, quantity
        });

        console.log("Response API cập nhật giỏ hàng: ", response)

        if (response.status == true) {
            return response
        }
    } catch (e) {
        console.log(e)
    }
}

// Gọi API xóa sản phẩm khỏi giỏ hàng
const api_deleteCart = async (id_user, id_product) => {
    try {
        console.log('>>>>>>>>>>>>>>>>>> delete cart');
        const response = await AxiosInstance().delete('/cart/remove', {
            data: { id_user, id_product }
        });

        console.log(`user: ${id_user} | product: ${id_product}`)
        console.log('Response API xóa giỏ hàng: ', response);

        if (response.status == true) {
            return response.data
        }

    } catch (e) {
        console.log(e)
    }
}

// Gọi API cập nhật selected trong giỏ hàng
const api_updateSelected = async (id_user, id_product, selected) => {
    try {
        console.log('>>>>>>>>>>>>>>>>>> update selected cart');
        const response = await AxiosInstance().put('/cart/update-selected', {
            id_user, id_product, selected
        });

        console.log("Response API cập nhật selected: ", response)

        if (response.status == true) {
            return response
        }
    } catch (e) {
        console.log(e)
    }
}

// Gọi API lấy danh sách phương thức thanh toán
const api_getPaymentMethod = async () => {
    try {
        console.log('>>>>>>>>>>>>>> get Payment Method');
        const response = await AxiosInstance().get('/payment_method/list');

        if (response.status == true) {
            console.log('Data Payment: ', response);
            return response.data
        }

    } catch (e) {
        console.log(e)
    }
}

// Gọi API lấy danh sách địa chỉ theo id_user
const api_getAddressUser = async (id_user) => {
    try {
        console.log('>>>>>>>>>>>>>> get Address User');
        const response = await AxiosInstance().get(`/address/list/${id_user}`);

        if (response.status == true) {
            return response;
        }
    } catch (e) {
        console.log(e);
    }
}

// Gọi API thêm đơn hàng
const api_addOrder = async (id_user, id_payment, id_address) => {
    try {
        console.log('>>>>>>>>>>>>>> add Order');
        const response = await AxiosInstance().post('/order/create-order', {
            id_user, id_payment, id_address
        });

        if (response.status == true) {
            return response.data;
        }
    } catch (e) {
        console.log(e)
    }
}

// Gọi API lấy tất cả oder của user
const api_getOrders = async (id_user) => {
    if (!id_user) {
        console.log("ID user không hợp lệ:", id_user);
        return [];
    }

    try {
        console.log(`Gọi API với ID: ${id_user}`);
        const response = await AxiosInstance().get(`order/list-order-user/${id_user}`);

        console.log("Response API lấy đơn hàng: ", response);

        if (response?.status == true) {
            return response;
        } else {
            return [];
        }
    } catch (error) {
        console.log("Lỗi khi lấy danh sách đơn hàng:", error);
        return [];
    }
};

// Gọi API lấy danh sách chi tiết đơn hàng theo id_order
const api_getDetailOrder = async (id_order) => {
    try {
        console.log('>>>>>>>>>>>>>> get Detail Order');
        const response = await AxiosInstance().get(`/detail_order/list-by-order/${id_order}`);

        if (response.status == true) {
            console.log('Data detail Order: ', response);
            return response
        }
    } catch (e) {
        console.log(e);
    }
};

// Gọi API lấy chi tiết địa chỉ theo id_address
const api_getDetailAddress = async (id_address) => {
    try {
        console.log('>>>>>>>>>>>>>> get Detail Address');
        const response = await AxiosInstance().get(`/address/detail/${id_address}`);

        if (response.status == true) {
            return response;
        }
    } catch (e) {
        console.log(e);
    }
};

// Gọi API lấy chi tiết phương thức thanh toán theo id_payment
const api_getDetailPayment = async (id_payment) => {
    try {
        console.log('>>>>>>>>>>>>>> get Detail Payment');
        const response = await AxiosInstance().get(`/payment_method/detail/${id_payment}`)

        if (response.status == true) {
            return response
        }
    } catch (e) {
        console.log(e)
    }
}

// API update Image người dùng
const api_uploadAvatar = async (id_user, imageUri) => {
    console.log('user: ', id_user);
    console.log('image: ', imageUri);

    
};


export {
    api_login,
    api_signUp,
    api_getDetailUser,
    api_updateProfile,
    api_getCategories,
    api_getProducts,
    api_getImagesProduct,
    api_getProductsByCategory,
    api_getDetailProduct,
    api_getNews,
    api_getDetailNews,
    api_getRateByProduct,
    api_changePassword,
    api_addReview,
    api_uploadImage,
    api_deleteImage,
    api_editReview,
    api_updateView,
    api_addToCart,
    api_getCarts,
    api_updateQuantity,
    api_deleteCart,
    api_updateSelected,
    api_getPaymentMethod,
    api_getAddressUser,
    api_addOrder,
    api_getOrders,
    api_getDetailAddress,
    api_getDetailOrder,
    api_getDetailPayment,
    api_uploadAvatar,
}