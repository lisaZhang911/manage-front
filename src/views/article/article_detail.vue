<template>
  <div class="layui-container">
    <div class="layui-row layui-col-space15">
      <div class="layui-col-md12 content detail">
        <div class="fly-panel detail-box">
          <h1>{{detail_info.title}}</h1>
          <div class="fly-detail-info">
            <!-- <span class="layui-badge">审核中</span> -->
            <span v-show="detail_info.catalog == 'notice'" class="layui-badge layui-bg-green fly-detail-column">动态</span>

            <span v-show="detail_info.tags == '1'" class="layui-badge" style="background-color: #999;">未结</span>
            <!-- <span class="layui-badge" style="background-color: #5FB878;">已结</span> -->

            <span v-show="detail_info.isTop == '1'" class="layui-badge layui-bg-black">置顶</span>
            <!-- <span class="layui-badge layui-bg-red">精帖</span> -->

            <div class="fly-admin-box" data-id="123">
              <span class="layui-btn layui-btn-xs jie-admin" type="del">删除</span>

              <!-- <span class="layui-btn layui-btn-xs jie-admin" type="set" field="stick" rank="1">置顶</span> -->
              <!-- <span class="layui-btn layui-btn-xs jie-admin" type="set" field="stick" rank="0" style="background-color:#ccc;">取消置顶</span> -->

              <!-- <span class="layui-btn layui-btn-xs jie-admin" type="set" field="status" rank="1">加精</span> -->
              <!-- <span class="layui-btn layui-btn-xs jie-admin" type="set" field="status" rank="0" style="background-color:#ccc;">取消加精</span> -->
            </div>
            <span class="fly-list-nums">
              <a href="#comment"><i class="iconfont" title="回答">&#xe60c;</i>{{detail_info.answ_s}}</a>
              <i class="iconfont" title="人气">&#xe60b;</i>{{detail_info.read_s}}
            </span>
          </div>
          <div class="detail-about">
            <a class="fly-avatar" href="../user/home.html">
              <img :src="$store.state.baseUrl+detail_info_user.avar">
            </a>
            <div class="fly-detail-user">
              <a href="../user/home.html" class="fly-link">
                <cite>{{detail_info_user.name}}</cite>
                <i class="layui-badge fly-badge-vip" v-show="detail_info_user.isVip!=0">VIP{{detail_info_user.isVip}}</i>
              </a>
              <span>{{detail_info.create_time}}</span>
            </div>
            <div class="detail-hits" id="LAY_jieAdmin" data-id="123">
              <span style="padding-right: 10px; color: #FF7200">悬赏：{{detail_info.score}}飞吻</span>
              <span class="layui-btn layui-btn-xs jie-admin" @click="go_editPage" v-show="edit_btn"><a>编辑此贴</a></span>
              <span class="layui-btn layui-btn-xs jie-admin" @click="collectPost"><a>{{isCollect=='0'?'收藏此贴':'取消收藏'}}</a></span>
            </div>
          </div>
          <div class="detail-body photos" v-html="detail_info.content">
          内容。。。。。



          </div>
        </div>

        <div class="fly-panel detail-box" id="flyReply">
          <fieldset class="layui-elem-field layui-field-title" style="text-align: center;">
            <legend>回帖</legend>
          </fieldset>
          <!-- 评论列表 -->
          <ul class="jieda">
            <li class="jieda-daan" v-for="(i,index) in comment_list" :key="i._id">
              <div class="detail-about detail-about-reply">
                <a class="fly-avatar" href="">
                  <img :src="$store.state.baseUrl+i.uid.avar" alt=" ">
                </a>
                <div class="fly-detail-user">
                  <a href="" class="fly-link">
                    <cite>{{i.uid.name}}</cite>
                    <i class="layui-badge fly-badge-vip" v-show="i.uid.isVip!=0">VIP{{i.uid.isVip}}</i>
                  </a>
                  <span v-show="i.uid._id == uid">(楼主)</span>
                </div>
                <div class="detail-hits">
                  <span>{{i.create_time}}</span>
                </div>
                <i v-show="i.isBest=='1'" class="iconfont icon-caina" title="最佳答案"></i>
              </div>
              <div class="detail-body jieda-body photos">
                <p>{{i.content}}</p>
              </div>
              <div class="jieda-reply">
                <span class="jieda-zan zanok" @click="setGood(i._id)">
                  <i class="iconfont icon-zan"></i>
                  <em>{{i.good_count}}</em>
                </span>
                <!-- <span type="reply">
                  <i class="iconfont icon-svgmoban53"></i>
                  回复
                </span> -->
                <div class="jieda-admin">
                  <!-- <span type="edit">编辑</span> -->
                  <!-- <span type="del">删除</span> -->
                  <span class="jieda-accept" v-show="i.isBest=='0' && i.tags!='2'" @click="setBest(i._id,index)">采纳</span>
                </div>
              </div>
            </li>
            <!-- 无数据时 -->
            <li class="fly-none" v-show="comment_list.length<1">消灭零回复</li>
          </ul>
          <!-- 分页 -->
          <Page class="page" :total="pageTotal" />
          <!-- 回复区域 -->
          <div class="layui-form layui-form-pane">
            <ValidationObserver ref="observer" v-slot="{validate}">
              <form method="post" @submit.prevent="validate(submit_commit)">
                <div class="layui-form-item layui-form-text">
                  <ValidationProvider name="content" rules="required" v-slot="{errors}">
                    <div class="layui-input-block">
                      <textarea v-model="content" placeholder="请输入内容"  class="layui-textarea fly-editor" style="height: 150px;"></textarea>
                    </div>
                    <div class="error layui-form-mid">{{errors[0]}}</div>
                  </ValidationProvider >
                </div>
                <div class="layui-form-item">
                  <button class="layui-btn" @click="submit_commit">提交回复</button>
                </div>
              </form>
            </ValidationObserver>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { get_list_detail, add_comment, get_comments, set_best, set_good, get_collectState, collect_post } from '@/service/articleService.js'
import { parse_time, login_state, get_token } from '@/util.js'
import Code from '@/mixin/code.js'
import moment from 'moment'


export default {
  mixins:[Code],
  data(){
    return {
      isCollect:'0',
      token:'',
      tid:'',
      uid:'',
      content:'',
      edit_btn:true,
      page:0,
      page_limit:20,
      detail_info:{},
      detail_info_user:{},
      comment_list:[],
      pageTotal:0
    }
  },
  methods:{
    go_editPage(){
      //判断是否登录 / 判断是否结帖
      if(!login_state()){
        this.$router.replace('/login')
      } else if(this.detail_info.tags ==1){
        this.$alert('已截贴，不可编辑')
        return
      }
      this.$router.replace('/post_Edit?tid='+this.tid)
    },
    async submit_commit(){
      //是否登录
      const token = localStorage.getItem('token')
      if(token == undefined || !moment().isBefore(get_token(token).exp*1000)){
        this.$router.replace('/login')
        return
      }
      //是否有评论内容
      const isValid = await this.$refs.observer.validate()
      if(!isValid){
        return
      }
      //收集信息并提交
      add_comment({
        uid:get_token(this.token)._id,
        tid:this.tid,
        content:this.content
      }).then(r => {
        if(r.code == 200){
          this._getCommentsList()
          this._getPostDetail()
          this.content = ''
          this.$alert(r.data.result)
        } else {
          this.$alert('提交失败')
        }
      })
    },
    _getPostDetail(){
      get_list_detail(this.tid).then(r => {
        if(r.code == 200){
          r.data.create_time = parse_time(r.data.create_time)
          this.detail_info = r.data
          this.detail_info_user = r.data.uid
          if(this.token){
            r.data.uid._id == get_token()._id?this.edit_btn=true:this.edit_btn=false
          }
        } else {
          this.$alert('查询错误')
        }
      })
    },
    _getCommentsList(){
      get_comments({
        tid:this.tid,
        page:this.page,
        page_limit:this.page_limit
      }).then(r => {
        if(r.code == 200){
          this.comment_list = r.data.result.map(x => {
            x.create_time = parse_time(x.create_time)
            return x
          })
          this.pageTotal = r.data.page_total*10
        }
      })
    },
    setGood(cid){
      if(!login_state()){
        this.$router.replace('/login')
        return
      }
      set_good({cid:cid}).then(r => {
        if(r.code == 200){
          this._getCommentsList()
        } else {
          this.$alert(r.err_msg)
        }
      })
    },
    setBest(cid,index){
      set_best({cid:cid}).then(r => {
        if(r.code == 200){
          this.comment_list[index].isBest = '1'
        } else {
          this.$alert(r.err_msg || '操作失败请再试')
        }
      })
    },
    collectPost(){
      //是否登录
      if(!login_state()){
        this.$router.replace('/login')
      }
      //是否已收藏
      if(this.isCollect==0){
        collect_post({
          tid:this.tid,
          title:this.detail_info.title,
          isCollect:'0'
        }).then(r => {
          if(r.code == 200){
            this.isCollect = '1'
          }
        })
      } else {
        collect_post({
          tid:this.tid,
          title:this.detail_info.title,
          isCollect:'1'
        }).then(r => {
          if(r.code == 200){
            this.isCollect = '0'
          }
        })
      }
    }
  },
  mounted(){
    const token = this.token = localStorage.getItem('token')
    this.tid = this.$router.currentRoute.query.id
    //如果未登录
    if(token){
      this.uid = get_token(token)._id
    }
    //获取文章详情
    this._getPostDetail()
    //获取评论
    this._getCommentsList()
    //登录状态-获取该用户收藏该文章的状态
    if(login_state()){
      get_collectState(get_token(token)._id).then(r => {
        this.isCollect = r.data.isCollect
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
