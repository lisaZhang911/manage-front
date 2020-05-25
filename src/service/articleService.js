import axios from '../http.js'
import qs from 'qs'

//获取文章列表
const getList = (options) => axios.get('/public/listChannel?'+qs.stringify(options))

//获取文章列表 - 私人
const get_list_id = (options) => axios.get('/get_listById?'+qs.stringify(options))

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

//采纳评论
const set_best = (param) => axios.post('/set_best',param)

//点赞-评论
const set_good = (param) => axios.post('/set_good',param)

//编辑文章
const edit_post = (params) => axios.post('/edit_post',params)

//收藏文章
const collect_post = (params) => axios.post('/collect_post',params)

//获取被收藏的文章列表
const get_collectList = (params) => axios.get('/get_collectList?'+qs.stringify(params))

//获取登录用户收藏某文章的状态
const get_collectState = (params) => axios.get('/get_collectState?uid='+params)

export {
  getList,
  get_list_id,
  getTips,
  links,
  gethot,
  add_post,
  get_list_detail,
  add_comment,
  get_comments,
  set_best,
  set_good,
  edit_post,
  collect_post,
  get_collectState,
  get_collectList
}
