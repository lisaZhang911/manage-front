import { Validator } from 'vee-validate'

const dictionary = {
  'zh-CN':{
    messages:{
      required: field => '请输入'+field,
      email: () => '请输入正确的邮箱格式'
    },
    attributes:{
      email:'邮箱',
      name:'昵称',
      password:'密码',
      code:'验证码',
      catalog:'专栏',
      title:'标题',
      content:'内容',
      score:'积分'
    }
  }
}

Validator.localize(dictionary)
