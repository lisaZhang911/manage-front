import axios from '../http.js'

const getCode = (sid) => axios.get('/public/getCode',{ params:{sid: sid} })
const login =  (userInfo) =>  axios.post('/login',{...userInfo})
const registry =  (userInfo) =>  axios.post('/reg',{...userInfo})
const forget =  (params) =>  axios.post('/forget',params)


export {
  getCode,
  login,
  registry,
  forget
}
