// 引入axios
import axios from 'axios'
export const request = axios.create({
  baseURL: 'http://toutiao.itheima.net/v1_0',
  timeout: 5000

})
export default request
