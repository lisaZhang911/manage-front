import { getCode } from '../service/loginService.js'
import { v4 as uuidv4 } from 'uuid'
import { ValidationObserver,ValidationProvider } from 'vee-validate'

export default {
  components:{
    ValidationObserver,
    ValidationProvider
  },
  data(){
    return {
      svg:''
    }
  },
  methods:{
    _getCaptcha(){
      let sid = this.$store.state.sid
      getCode(sid).then(r => {this.svg = r.data})
    }
  },
  mounted(){
    let sid = ''
    if(localStorage.getItem('sid')){
      sid = localStorage.getItem('sid')
    } else {
      sid = uuidv4()
      localStorage.setItem('sid',sid)
    }
    this.$store.commit('setSid',sid)
    this._getCaptcha()
  }
}
