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
                              <input type="text" name="catalog" placeholder="请选择" :value="currentIndex_txt" readonly class="layui-input layui-unselect">
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
                        <input type="text" name="title" class="layui-input">
                      </div>
                      <div class="error layui-form-mid">{{errors[0]}}</div>
                    </ValidationProvider>
                    </div>
                  </div>
                  <!-- 内容 -->
                  <div class="layui-form-item layui-form-text">
                    <Editor />
                  </div>
                  <!-- 积分 -->
                  <div class="layui-col-md3">
                    <label class="layui-form-label">悬赏飞吻</label>
                    <ValidationProvider name="score" rules="required" v-slot="{errors}">
                      <div class="layui-input-block">
                        <div class="layui-unselect layui-form-select" :class="{'layui-form-selected':selected_s}">
                          <div class="layui-select-title" @click="open_select_s">
                            <input type="text" placeholder="请选择" :value="currentIndex_score" readonly class="layui-input layui-unselect">
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
                  <!-- 验证码 -->
                  <div class="layui-form-item vercode">
                    <label for="L_vercode" class="layui-form-label">验证码</label>
                    <ValidationProvider name="vercode" rules="required" v-slot="{errors}">
                      <div class="layui-input-inline">
                        <input type="text" name="vercode" placeholder="输入验证码" class="layui-input">
                      </div>
                      <div class="error layui-form-mid">{{errors[0]}}</div>
                    </ValidationProvider>
                    <div class="layui-form-mid">
                      <span style="color: #c00;" v-html="svg" @click="_getCaptcha">1</span>
                    </div>
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
import Code from '../../mixin/code.js'
import Editor from '../../components/module/editor/Editor.vue'

export default {
  mixins:[Code],
  components:{
    Editor
  },
  data(){
    return {
      selected:false,
      selected_s:false,
      currentIndex:-1,
      currentIndex_s:-1,
      currentIndex_txt:'',
      currentIndex_score:'',
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
  methods:{
    open_select(){
      this.selected = !this.selected
    },
    open_select_s(){
      this.selected_s = !this.selected_s
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
          this.currentIndex_txt = '提问'
          break;
        case 1:
          this.currentIndex_txt = '分享'
          break;
        case 2:
          this.currentIndex_txt = '讨论'
          break;
        case 3:
          this.currentIndex_txt = '建议'
          break;
        case 4:
          this.currentIndex_txt = '公告'
          break;
        case 5:
          this.currentIndex_txt = '动态'
          break;
      }
    },
    submit(){}
  },
  mounted(){

  }
}
</script>

<style lang="scss" scoped>
.layui-word-aux{
  padding: 8px 5px 30px!important
}
</style>
