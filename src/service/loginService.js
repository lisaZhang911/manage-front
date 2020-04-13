import axios from '../http.js'

const getCode = (sid) => {
    return axios.get('/public/getCode',{ params:{sid: sid} })
}
const login =  (userInfo) =>  axios.post('/login',{...userInfo})


export {
  getCode,
  login
}
