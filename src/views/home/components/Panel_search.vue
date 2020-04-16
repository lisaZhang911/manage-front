<template>
  <div class="fly-panel" style="margin-bottom: 0;">
    <div class="fly-panel-title fly-filter">
      <a href="" class="layui-this">综合</a>
      <span class="fly-mid"></span>
      <a href="">未结</a>
      <span class="fly-mid"></span>
      <a href="">已结</a>
      <span class="fly-mid"></span>
      <a href="">精华</a>
      <span class="fly-filter-right layui-hide-xs">
        <a href="" class="layui-this">按最新</a>
        <span class="fly-mid"></span>
        <a href="">按热议</a>
      </span>
    </div>
    <!-- 搜索后展示的帖子 -->
    <ul class="fly-list">
      <li>
        <a href="user/home.html" class="fly-avatar">
          <img src="https://tva1.sinaimg.cn/crop.0.0.118.118.180/5db11ff4gw1e77d3nqrv8j203b03cweg.jpg" alt="贤心">
        </a>
        <h2>
          <a class="layui-badge">分享</a>
          <a href="jie/detail.html">基于 layui 的极简社区页面模版</a>
        </h2>
        <div class="fly-list-info">
          <a href="user/home.html" link>
            <cite>贤心</cite>
          </a>
          <span>刚刚</span>

          <span class="fly-list-kiss layui-hide-xs" title="悬赏飞吻"><i class="iconfont icon-kiss"></i> 60</span>
          <span class="fly-list-nums">
            <i class="iconfont icon-pinglun1" title="回答"></i> 66
          </span>
        </div>
        <div class="fly-list-badge">
        </div>
      </li>
    </ul>
    <div style="text-align: center">
      <div class="laypage-main">
        <a href="jie/index.html" class="laypage-next">更多求解</a>
      </div>
    </div>
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
