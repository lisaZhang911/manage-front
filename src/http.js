import axios from 'axios'

axios.defaults.baseURL = (process.env.NODE_ENV != 'production')?'http://localhost:3000':'http://domain.com'
axios.defaults.timeout = 10000

axios.interceptors.request.use(
  config => {
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

axios.interceptors.response.use(
  response => {
    if(response.status == 200){
      return Promise.resolve(response.data)
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    if(error.message.includes('timeout')){
      console.log("错误回调", error)
      return Promise.reject(error)
    }
    return error
  }
)

export default axios
