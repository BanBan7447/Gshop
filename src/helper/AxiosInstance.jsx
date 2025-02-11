import axios from "axios";

// Cấu trúc dùng thư viện Axios
const AxiosInstance = (token = '', contentType = 'application/json') => {
    const axiosInstance = axios.create({
        baseURL: 'https://gshopbackend.onrender.com/' // domain
    });
    // cmd -----> ipconfig -----> IPv4 Address (192.168.1.1)

    axiosInstance.interceptors.request.use( // thông tin gửi lên server
        async (config) => {
            // const token = '';
            config.headers = {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json', // dữ liệu gửi đi dưới dạng json
                'Content-Type': contentType
            }
            return config;
        },
        err => Promise.reject(err)
    );

    // Gửi đi thì chắc chắc sẽ có dữ liệu trả về
    axiosInstance.interceptors.response.use(
        res => res.data,
        err => Promise.reject(err)
    );
    return axiosInstance;
};

export default AxiosInstance;