import axios from '../http.js'

const sign_today = () => axios.get('/sign')
const update_baseInfo = (params) => axios.post('/base_update',params)
const uploadImg = (file) => axios.post('/upload_img',file)
const password_update = (params) => axios.post('/password_update',params)
const send_mail = () => axios.get('/verify_mail')
const change_mail = (params) => axios.post('/mail_update',params)

export {
  sign_today,
  update_baseInfo,
  uploadImg,
  password_update,
  send_mail,
  change_mail
}
