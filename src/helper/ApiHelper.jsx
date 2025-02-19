import AxiosInstance from "./AxiosInstance";

// Gọi API đăng nhập
const api_login = async (data) => {
    try {
        console.log('>>>>>>>>>>>>>>>>> get_api_login')
        const { email, password } = data;
        const body = {
            email: email,
            password: password
        }
        console.log(`Email: ${email}, Password: ${password}`)

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
    try{
        console.log('>>>>>>>>>>>>>> get api list news');
        const response = await AxiosInstance().get('/news/list');

        if(response.status == true){
            console.log('Data News', response);
            return response.data
        }

    }catch(e){
        console.log(e)
    }
}

// Gọi API lấy chi tiết tin tức
const api_getDetailNews = async (_id) => {
    try{
        console.log('>>>>>>>>>>>>>>>>>> get Detail News');
        const response = await AxiosInstance().get(`/news/detail_news?_id=${_id}`)
        
        if(response.status == true){
            return response.data;
        }
    }catch(e){
        console.log(e);
    }
}

export {
    api_login,
    api_signUp,
    api_getCategories,
    api_getProducts,
    api_getImagesProduct,
    api_getProductsByCategory,
    api_getDetailProduct,
    api_getNews,
    api_getDetailNews
}