import axios from 'axios'
import {Message, MessageBox} from 'element-ui'
const service = axios.create({
  baseURL: document.location.protocol+'PublicChainBrowser/'+ window.location.search,
  // withCredentials: true,
  timeout: 200000
})
service.interceptors.response.use(
  response => {
    const res = response.data
    if (response.data.code === 200 ) {
      return response.data
    } else {
      return Promise.reject('error')
    }
  },
  error => {
    console.log('err' + error)
    let msg = ''
    if (error == 'Error: timeout of 200000ms exceeded') {
      msg = '无效请求！请求超时！'
    } else {
      msg = error.message
    }
    Message({
      message: msg,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
