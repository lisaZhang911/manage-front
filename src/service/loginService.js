import axios from '../http.js'

const getCode = (sid) => {
    return axios.get('/public/getCode',{ params:{sid: sid} })
}
const login =  (userInfo) =>  axios.post('/login',{...userInfo})
const registry =  (userInfo) =>  axios.post('/reg',{...userInfo})


export {
  getCode,
  login,
  registry
}
