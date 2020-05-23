import axios from '../http.js'
import qs from 'qs'

const getList = (options) => axios.get('/public/listChannel?'+qs.stringify(options))

//温馨提醒
const getTips = () => axios.get('/public/tips')

//友情链接
const links = () => axios.get('/public/links')

//本周热议
const gethot = () => axios.get('/public/getHot_w')

//发布文章
const add_post = (params) => axios.post('/add_post',params)

// 文章详情
const get_list_detail = (params) => axios.get('/public/get_postDetail?id='+params)

//提交评论
const add_comment = (params) => axios.post('/add_comment',params)

//评论列表
const get_comments = (params) => axios.get('/public/comments?'+qs.stringify(params))

export {
  getList,
  getTips,
  links,
  gethot,
  add_post,
  get_list_detail,
  add_comment,
  get_comments
}
