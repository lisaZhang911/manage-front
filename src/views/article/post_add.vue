<template>
  <div class="">
    <div class="layui-container fly-marginTop">
      <div class="fly-panel" pad20 style="padding-top: 5px;">
        <div class="layui-form layui-form-pane">
          <div class="layui-tab layui-tab-brief" lay-filter="user">
            <ul class="layui-tab-title">
              <li class="layui-this">发表新帖<!-- 编辑帖子 --></li>
            </ul>
            <div class="layui-form layui-tab-content" id="LAY_ucm" style="padding: 20px 0;">
              <div class="layui-tab-item layui-show">
                <ValidationObserver ref="observer" v-slot="{validate}">
                  <form method="post" @submit.prevent="validate(submit)">
                  <div class="layui-row layui-col-space15 layui-form-item">
                    <!-- 所在专栏 -->
                    <div class="layui-col-md3">
                      <label class="layui-form-label">所在专栏</label>
                      <ValidationProvider name="catalog" rules="required" v-slot="{errors}">
                        <div class="layui-input-block">
                          <div class="layui-unselect layui-form-select" :class="{'layui-form-selected':selected}">
                            <div class="layui-select-title" @click="open_select">
                              <input type="text" name="catalog" placeholder="请选择" v-model="currentIndex_txt_c" readonly class="layui-input layui-unselect">
                              <i class="layui-edge"></i>
                            </div>
                            <dl class="layui-anim layui-anim-upbit custom-select">
                              <dd class="layui-select-tips">请选择</dd>
                              <dd
                                :key="index"
                                v-for="(i,index) in lists"
                                :class="{'layui-this':currentIndex == index}"
                                @click="change_dl(index)"
                                >{{i.title}}</dd>
                              </dl>
                            </div>
                            <div class="error layui-form-mid">{{errors[0]}}</div>
                          </div>
                        </ValidationProvider>
                      </div>
                    <!-- 标题 -->
                    <div class="layui-col-md9">
                      <label for="L_title" class="layui-form-label">标题</label>
                      <ValidationProvider name="title" rules="required" v-slot="{errors}">
                      <div class="layui-input-block">
                        <input type="text" name="title" class="layui-input" v-model="title">
                      </div>
                      <div class="error layui-form-mid">{{errors[0]}}</div>
                    </ValidationProvider>
                    </div>
                  </div>
                  <!-- 内容 -->
                  <div class="layui-form-item layui-form-text ql-edit">
                    <div id="toolbar" slot="toolbar">
                      <button class="ql-bold"></button>
                      <button class="ql-italic"></button>
                      <button class="ql-underline"></button>
                      <button class="ql-strike"></button>
                      <select class="ql-color" value="color" title="字体颜色"></select>
                      <button class="ql-image" type="button"></button>
                      <button class="ql-blockquote" type="button"></button>
                      <button class="ql-code-block" type="button"></button>
                      <button class="ql-link" type="button"></button>
                      <span class="iconfont icon-yxj-expression face_btn" ref="face" @click="toggle_face"></span>
                    </div>
                    <ValidationProvider name="content" rules="required" v-slot="{errors}">
                      <quillEditor ref="editor" id="edit"
                      :options="editorOption" v-model="content"
                      @focus="blurEvent"/>
                      <Face :isShow="faceShow" @closeEvent="closeEvent" @addFaceIcon="addFaceIcon"></Face>
                      <div class="error layui-form-mid">{{errors[0]}}</div>
                    </ValidationProvider >
                  </div>
                  <!-- 积分 -->
                  <div class="layui-col-md3">
                    <label class="layui-form-label">悬赏飞吻</label>
                    <ValidationProvider name="score" rules="required" v-slot="{errors}">
                      <div class="layui-input-block">
                        <div class="layui-unselect layui-form-select" :class="{'layui-form-selected':selected_s}">
                          <div class="layui-select-title" @click="open_select_s">
                            <input type="text" placeholder="请选择" v-model="currentIndex_score" readonly class="layui-input layui-unselect">
                            <i class="layui-edge"></i>
                          </div>
                          <dl class="layui-anim layui-anim-upbit custom-select">
                            <dd class="layui-select-tips">请选择</dd>
                            <dd
                              :key="index"
                              v-for="(i,index) in score_lists"
                              :class="{'layui-this':currentIndex_s == index}"
                              @click="change_dl_s(index)"
                              >{{i.score}}</dd>
                            </dl>
                          </div>
                          <div class="error layui-form-mid">{{errors[0]}}</div>
                        </div>
                      </ValidationProvider>
                    <div class="layui-word-aux">发表后无法更改飞吻</div>
                  </div>
                  <div class="layui-form-item">
                    <button class="layui-btn" @click="submit">立即发布</button>
                  </div>
                  </form>
                </ValidationObserver>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Code from '@/mixin/code.js'
import Face from '@/components/module/editor/Face.vue'
import faces from '@/assets/mods/face.js'
import { add_post } from '@/service/articleService.js'
import { debounce } from '@/util.js'

import {quillEditor} from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'

export default {
  mixins:[Code],
  components:{
    Face,
    quillEditor
  },
  data(){
    return {
      title:'',
      current_tag:-1,
      faceShow:false,
      selected:false,
      selected_s:false,
      currentIndex:-1,
      currentIndex_s:-1,
      currentIndex_txt:'',
      currentIndex_txt_c:'',
      currentIndex_score:'',
      content:'',
      pos:0,
      editorOption:{
        modules:{
          toolbar: '#toolbar'
        }
      },
      score_lists:[{
        index:0,
        score:20
      },{
        index:1,
        score:30
      },{
        index:2,
        score:50
      },{
        index:3,
        score:60
      },{
        index:4,
        score:80
      }],
      lists:[{
        index:0,
        title:'提问'
      },{
        index:1,
        title:'分享'
      },{
        index:2,
        title:'讨论'
      },{
        index:3,
        title:'建议'
      },{
        index:4,
        title:'公告'
      },{
        index:5,
        title:'动态'
      }]
    }
  },
  watch:{
    content:function(){
      debounce(() => {
        localStorage.setItem('content',this.content)
      },1500)
    }
  },
  methods:{
    addFaceIcon(key){
      const insertContent = faces[key]
      this.quillObj().insertEmbed(this.pos, 'image', insertContent)
    },
    quillObj(){
      const quill = this.$refs['editor'].quill;
      return quill
    },
    blurEvent(){
      const descRage = this.quillObj().getSelection();
      this.pos = descRage.index
    },
    closeEvent(){
      this.faceShow = false
    },
    open_select(){
      this.selected = !this.selected
    },
    open_select_s(){
      this.selected_s = !this.selected_s
    },
    toggle_face(){
      this.faceShow = !this.faceShow
    },
    change_dl_s(index){
      this.currentIndex_s = index
      this.open_select_s()
      switch(index){
        case 0:
          this.currentIndex_score = 20
          break;
        case 1:
          this.currentIndex_score = 30
          break;
        case 2:
          this.currentIndex_score = 50
          break;
        case 3:
          this.currentIndex_score = 60
          break;
        case 4:
          this.currentIndex_score = 80
          break;
      }
    },
    change_dl(index){
      this.currentIndex = index
      this.open_select()
      switch(index){
        case 0:
        this.currentIndex_txt = 'ask'
          this.currentIndex_txt_c = '提问'
          break;
        case 1:
          this.currentIndex_txt = 'share'
          this.currentIndex_txt_c = '分享'
          break;
        case 2:
          this.currentIndex_txt = 'discuss'
          this.currentIndex_txt_c = '讨论'
          break;
        case 3:
          this.currentIndex_txt = 'advice'
          this.currentIndex_txt_c = '建议'
          break;
        case 4:
          this.currentIndex_txt = 'notice'
          this.currentIndex_txt_c = '公告'
          break;
        case 5:
          this.currentIndex_txt = 'news'
          this.currentIndex_txt_c = '动态'
          break;
      }
    },
    async submit(){
      const isValid = await this.$refs.observer.validate()
      if(!isValid){
        return
      }
      let obj = {
        catalog:this.currentIndex_txt,
        title:this.title,
        content:this.content,
        score:this.currentIndex_score
      }
      add_post(obj).then(r => {
        if(r.code == 200){
          this.$alert(r.data.result)
          setTimeout(() => {
            this.$router.replace('/home')
          },2000)
          localStorage.removeItem('content')
        } else {
          this.$alert(r.err_msg)
        }
      })
    },
    handle_body(e){
      e.stopPropagation()
      const ctrl = this.$refs.face
      if(ctrl == undefined) return
      if(!ctrl.contains(e.target)){
        this.closeEvent()
      }
    }
  },
  created(){
    const content = localStorage.getItem('content')
    if(content){
      this.content = content
    }
  },
  mounted(){
    this.$nextTick(() => {
      document.querySelector('body').addEventListener('click',this.handle_body)
    })
  },
  beforeDestory(){
    document.querySelector('body').removeEventListener('click',this.handle_body)
  }
}
</script>

<style lang="scss" scoped>
.layui-word-aux{
  padding: 8px 5px 30px!important
}
.quill-editor{
  height: 400px
}
.ql-edit{
  position: relative;
}
.face_btn {
  cursor: pointer;
}
</style>
