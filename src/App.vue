<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import axios from 'axios'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default {
  name: 'App',
  components:{
    Header,
    Footer
  },
  data(){
    return {
      svg:'',
      name:'',
      password:'',
      code:''
    }
  },
  methods:{
    getCaptcha(){
      axios.get('http://localhost:3000/demo').then(r => {
        if(r.status == 200){
          if(r.data.code == 200){
            this.svg = r.data.data
          }
        }
      })
    }
  },
  mounted(){
    // this.getCaptcha()
  }
}
</script>

<style lang="scss">
  @import "assets/layui/css/layui.css";
  @import "assets/css/global.css";
  @import "assets/layui/css/modules/layer/default/layer.css";

  #app {
    height:90%;
  }
  .layui-input{
    width:190px
  }
  .error{ color: red}
  .page{
    text-align: center;
    padding-bottom: 50px
  }
</style>
