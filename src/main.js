import Vue from 'vue'
import App from './App.vue'
import VeeValidate,{ Validator } from 'vee-validate'
import zh from 'vee-validate/dist/locale/zh_CN'
import router from './router.js'
import store from './store.js'
import { Page } from 'view-design'
import Alert from './components/module/alert'
import 'view-design/dist/styles/iview.css';

Vue.component('Page', Page);
Vue.use(VeeValidate)
Vue.use(Alert)
Validator.localize('zh-CN',zh)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
