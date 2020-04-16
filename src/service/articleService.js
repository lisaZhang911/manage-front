import axios from '../http.js'
import qs from 'qs'

const getList = (options) => axios.get('/public/getList?'+qs.stringify(options))

//温馨提醒
const getTips = () => axios.get('/public/tips')

//友情链接
const links = () => axios.get('/public/links')

//本周热议
const gethot = () => axios.get('/public/getHot_w')

export {
  getList,
  getTips,
  links,
  gethot
}
