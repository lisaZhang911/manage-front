<template>
  <div class="layui-container">
    <div class="layui-row layui-col-space15">
      <div class="layui-col-md12 content detail">
        <div class="fly-panel detail-box">
          <h1>{{detail_info.title}}</h1>
          <div class="fly-detail-info">
            <!-- <span class="layui-badge">审核中</span> -->
            <span v-if="detail_info.catalog == 'notice'" class="layui-badge layui-bg-green fly-detail-column">动态</span>

            <span v-if="detail_info.tags == '1'" class="layui-badge" style="background-color: #999;">未结</span>
            <!-- <span class="layui-badge" style="background-color: #5FB878;">已结</span> -->

            <span v-if="detail_info.isTop == '1'" class="layui-badge layui-bg-black">置顶</span>
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
                <i class="layui-badge fly-badge-vip" v-if="detail_info_user.isVip!=0">VIP{{detail_info_user.isVip}}</i>
              </a>
              <span>{{parse_time}}</span>
            </div>
            <div class="detail-hits" id="LAY_jieAdmin" data-id="123">
              <span style="padding-right: 10px; color: #FF7200">悬赏：{{detail_info.score}}飞吻</span>
              <span class="layui-btn layui-btn-xs jie-admin" type="edit"><a>编辑此贴</a></span>
              <span class="layui-btn layui-btn-xs jie-admin" type="edit"><a>收藏此贴</a></span>
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

          <ul class="jieda" id="jieda">
            <li data-id="111" class="jieda-daan">
              <a name="item-1111111111"></a>
              <div class="detail-about detail-about-reply">
                <a class="fly-avatar" href="">
                  <img src="https://tva1.sinaimg.cn/crop.0.0.118.118.180/5db11ff4gw1e77d3nqrv8j203b03cweg.jpg" alt=" ">
                </a>
                <div class="fly-detail-user">
                  <a href="" class="fly-link">
                    <cite>贤心</cite>
                    <i class="iconfont icon-renzheng" title="认证信息：XXX"></i>
                    <i class="layui-badge fly-badge-vip">VIP3</i>
                  </a>

                  <span>(楼主)</span>
                </div>

                <div class="detail-hits">
                  <span>2017-11-30</span>
                </div>

                <i class="iconfont icon-caina" title="最佳答案"></i>
              </div>
              <div class="detail-body jieda-body photos">
                <p>香菇那个蓝瘦，这是一条被采纳的回帖</p>
              </div>
              <div class="jieda-reply">
                <span class="jieda-zan zanok" type="zan">
                  <i class="iconfont icon-zan"></i>
                  <em>66</em>
                </span>
                <span type="reply">
                  <i class="iconfont icon-svgmoban53"></i>
                  回复
                </span>
                <div class="jieda-admin">
                  <span type="edit">编辑</span>
                  <span type="del">删除</span>
                  <!-- <span class="jieda-accept" type="accept">采纳</span> -->
                </div>
              </div>
            </li>

            <li data-id="111">
              <a name="item-1111111111"></a>
              <div class="detail-about detail-about-reply">
                <a class="fly-avatar" href="">
                  <img src="https://tva1.sinaimg.cn/crop.0.0.118.118.180/5db11ff4gw1e77d3nqrv8j203b03cweg.jpg" alt=" ">
                </a>
                <div class="fly-detail-user">
                  <a href="" class="fly-link">
                    <cite>贤心</cite>
                  </a>
                </div>
                <div class="detail-hits">
                  <span>2017-11-30</span>
                </div>
              </div>
              <div class="detail-body jieda-body photos">
                <p>蓝瘦那个香菇，这是一条没被采纳的回帖</p>
              </div>
              <div class="jieda-reply">
                <span class="jieda-zan" type="zan">
                  <i class="iconfont icon-zan"></i>
                  <em>0</em>
                </span>
                <span type="reply">
                  <i class="iconfont icon-svgmoban53"></i>
                  回复
                </span>
                <div class="jieda-admin">
                  <span type="edit">编辑</span>
                  <span type="del">删除</span>
                  <span class="jieda-accept" type="accept">采纳</span>
                </div>
              </div>
            </li>

            <!-- 无数据时 -->
            <!-- <li class="fly-none">消灭零回复</li> -->
          </ul>
          <!-- 分页 -->
           <Page :total="100" />
          <div class="layui-form layui-form-pane">
            <form action="/jie/reply/" method="post">
              <div class="layui-form-item layui-form-text">
                <a name="comment"></a>
                <div class="layui-input-block">
                  <textarea id="L_content" name="content" required lay-verify="required" placeholder="请输入内容"  class="layui-textarea fly-editor" style="height: 150px;"></textarea>
                </div>
              </div>
              <div class="layui-form-item">
                <input type="hidden" name="jid" value="123">
                <button class="layui-btn" lay-filter="*" lay-submit>提交回复</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { get_list_detail } from '@/service/articleService.js'
import moment from 'moment'

export default {
  data(){
    return {
      detail_info:{},
      detail_info_user:{}
    }
  },
  computed:{
    parse_time(){
      return moment(this.detail_info.create_time).format('YYYY-MM-DD')
    }
  },
  mounted(){
    const id = this.$router.currentRoute.query.id
    get_list_detail(id).then(r => {
      if(r.code == 200){
        this.detail_info = r.data
        this.detail_info_user = r.data.uid
      } else {
        this.$alert('查询错误')
      }
    })
    //获取评论
  }
}
</script>

<style lang="css" scoped>
</style>
