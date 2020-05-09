import axios from '../http.js'

const sign_today = () => axios.get('/sign')
const update_baseInfo = (params) => axios.post('/base_update',params)

export {
  sign_today,
  update_baseInfo
}
