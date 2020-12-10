import axios from 'axios';
let instance = axios.create({
    // baseURL: 'https://shopapi.smartisan.com',
    // baseURL: 'http://localhost:3300',与本地服务器代理不能共存，记得注释掉
})
export default instance;