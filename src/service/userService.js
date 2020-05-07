import axios from '../http.js'

const sign_today = () => axios.get('/sign')

export {
  sign_today
}
