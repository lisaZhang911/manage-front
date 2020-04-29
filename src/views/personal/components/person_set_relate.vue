<template>
  <div class="layui-form layui-form-pane person_set_relate">
    <ul class="app-bind">
      <li class="fly-msg app-havebind">
        <i class="iconfont icon-qq"></i>
        <span>已成功绑定，您可以使用QQ帐号直接登录Imooc社区，当然，您也可以</span>
        <a href="javascript:;" class="acc-unbind" type="qq_id">解除绑定</a>
      </li>
      <li class="fly-msg">
        <i class="iconfont icon-weibo"></i>
        <a href="" class="acc-weibo" type="weibo_id"  onclick="layer.msg('正在绑定微博', {icon:16, shade: 0.1, time:0})" >立即绑定</a>
        <span>，即可使用微博帐号登录Imooc社区</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.person_set_relate{
  padding-top: 35px
}
</style>
