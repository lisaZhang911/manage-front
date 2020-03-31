import Vue from 'vue'
import App from './App.vue'
import VeeValidate,{ Validator } from 'vee-validate'
import zh from 'vee-validate/dist/locale/zh_CN'
import router from './router.js'
import axios from 'axios'

Vue.use(VeeValidate)
Validator.localize('zh-CN',zh)
Vue.config.productionTip = false

axios.defaults.baseURL = (process.env.NODE_ENV != 'production')?'http://localhost:3000':'http://domain.com'

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
