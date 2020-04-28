import axios from 'axios'

axios.defaults.baseURL = (process.env.NODE_ENV != 'production')?'http://localhost:36742':'http://domain.com'
axios.defaults.timeout = 10000

const CancelToken = axios.CancelToken
let pending = {}
let key = ''


axios.interceptors.request.use(
  config => {
    if(config.url + '&' + config.method == key){
      pending[key]()
    } else {
      key = config.url + '&' + config.method
    }
    config.cancelToken = new CancelToken(function(c){
      pending[key] = c
    })

    return config
  },
  err => {
    return Promise.reject(err)
  }
)

axios.interceptors.response.use(
  response => {
    if(response.config.url + '&' + response.config.method == key){
      delete pending[key]
      key = ''
    }
  
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
