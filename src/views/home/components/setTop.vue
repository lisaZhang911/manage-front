<template>
  <div class="fly-panel">
    <div class="fly-panel-title fly-filter">
      <a>置顶</a>
      <a href="#signin" class="layui-hide-sm layui-show-xs-block fly-right" id="LAY_goSignin" style="color: #FF5722;">去签到</a>
    </div>
    <ul class="fly-list">
      <li>
        <a href="user/home.html" class="fly-avatar">
          <img src="https://tva1.sinaimg.cn/crop.0.0.118.118.180/5db11ff4gw1e77d3nqrv8j203b03cweg.jpg" alt="贤心">
        </a>
        <h2>
          <a class="layui-badge">动态</a>
          <a href="jie/detail.html">基于 layui 的极简社区页面模版</a>
        </h2>
        <div class="fly-list-info">
          <a href="user/home.html" link>
            <cite>贤心</cite>
            <i class="iconfont icon-renzheng" title="认证信息：XXX"></i>
            <i class="layui-badge fly-badge-vip">VIP3</i>
          </a>
          <span>刚刚</span>

          <span class="fly-list-kiss layui-hide-xs" title="悬赏飞吻"><i class="iconfont icon-kiss"></i> 60</span>
          <span class="layui-badge fly-badge-accept layui-hide-xs">已结</span>
          <span class="fly-list-nums">
            <i class="iconfont icon-pinglun1" title="回答"></i> 66
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "",
  data: () => ({

  })
}
</script>
<style lang="scss" scoped>
</style>
