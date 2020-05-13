<template>
  <div class="layui-form layui-form-pane person_setInfo">
    <form>
      <div class="layui-form-item">
        <label for="L_username" class="layui-form-label">昵称</label>
        <div class="layui-input-inline">
          <input v-model="userInfo.name" type="text" class="layui-input">
        </div>
      </div>
      <div class="layui-form-item">
        <label for="L_city" class="layui-form-label">城市</label>
        <div class="layui-input-inline">
          <input v-model="userInfo.location" type="text" class="layui-input">
        </div>
      </div>
      <div class="layui-form-item layui-form-text">
        <label for="L_sign" class="layui-form-label">签名</label>
        <div class="layui-input-block">
          <textarea v-model="userInfo.mark" class="layui-textarea" placeholder="随便写些什么刷下存在感" style="height: 80px;"></textarea>
        </div>
      </div>
      <div class="layui-form layui-form-pane">
        <div class="layui-form-item">
          <div class="avatar-add">
            <img :src="$store.state.baseUrl+userInfo.avar">
            <span class="loading"></span>
            <label class="layui-btn upload-img" id="test1">
              <input
                type="file"
                name="file"
                accept ="image/png,image/gif,image/jpg,image/jpeg"
                @change="upload"
              />
              <i class="layui-icon">&#xe67c;</i>上传头像
            </label>
            <p>建议尺寸168*168，支持jpg、png、gif，最大不能超过5MB</p>
          </div>

        </div>
      </div>
      <div class="layui-form-item submitBtn">
        <button class="layui-btn" @click="updateBaseInfo">确认修改</button>
      </div>
    </form>
  </div>
</template>

<script>
import { update_baseInfo,uploadImg } from '../../../service/userService.js'

export default {
  data(){
    return {
      userInfo:{
        name:'11',
        location:'',
        mark:'',
        avar:''
      },
      formdate:''
    }
  },
  methods:{
    updateBaseInfo(){
      update_baseInfo(this.userInfo).then(r => {
        console.log({...r});
        console.log(r);
        if(r.response != undefined && r.response.status != 200){
          this.$alert('错误回调，请稍后再试')
          return
        }
        this.$alert('更新成功')

        const data = r.data.data
        let userInfo_obj = JSON.parse(localStorage.getItem('userInfo'))

        userInfo_obj.name = data.name
        userInfo_obj.location = data.location
        userInfo_obj.mark = data.mark
        userInfo_obj.avar = data.avar
      })
    },
    upload(e){
      let file = e.target.files
      let formDate = new FormData()

      if(file.length > 0){
        formDate.append('file',file[0])
        this.formdate = formDate

        uploadImg(formDate).then(r => {
          console.log(r);
          this.userInfo.avar = `/${r.data.pic}`
        })
      }
    }
  },
  created(){
    let userInfo_obj = JSON.parse(localStorage.getItem('userInfo'))

    this.userInfo.name = userInfo_obj.name
    this.userInfo.location = userInfo_obj.location || ''
    this.userInfo.mark = userInfo_obj.mark || ''
    this.userInfo.avar = userInfo_obj.avar
  }
}
</script>

<style lang="scss" scoped>
.person_setInfo{
  padding: 30px;

  .submitBtn{
    margin-left: 95px;
    margin-top: 35px;
  }
}
.upload-img{
  width:118px
}
.upload-img input{
  display: none
}
</style>
