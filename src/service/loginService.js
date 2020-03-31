import axios from 'axios'

const getCode = async () => {
  let result = await axios.get('/demo')
  if(result.status == 200){
    return result.data.data
  }
}

export {
  getCode
}
