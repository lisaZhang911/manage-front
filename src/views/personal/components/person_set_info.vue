<template>
  <div class="layui-form layui-form-pane person_setInfo">
    <form method="post">
      <div class="layui-form-item">
        <label for="L_email" class="layui-form-label">邮箱</label>
        <div class="layui-input-inline">
          <input type="text" id="L_email" name="email" required lay-verify="email" autocomplete="off" value="" class="layui-input">
        </div>
        <div class="layui-form-mid layui-word-aux">如果您在邮箱已激活的情况下，变更了邮箱，需<a href="activate.html" style="font-size: 12px; color: #4f99cf;">重新验证邮箱</a>。</div>
      </div>
      <div class="layui-form-item">
        <label for="L_username" class="layui-form-label">昵称</label>
        <div class="layui-input-inline">
          <input type="text" id="L_username" name="username" required lay-verify="required" autocomplete="off" value="" class="layui-input">
        </div>
      </div>
      <div class="layui-form-item">
        <label for="L_city" class="layui-form-label">城市</label>
        <div class="layui-input-inline">
          <input type="text" id="L_city" name="city" autocomplete="off" value="" class="layui-input">
        </div>
      </div>
      <div class="layui-form-item layui-form-text">
        <label for="L_sign" class="layui-form-label">签名</label>
        <div class="layui-input-block">
          <textarea placeholder="随便写些什么刷下存在感" id="L_sign"  name="sign" autocomplete="off" class="layui-textarea" style="height: 80px;"></textarea>
        </div>
      </div>
      <div class="layui-form layui-form-pane">
        <div class="layui-form-item">
          <div class="avatar-add">
            <img src="https://tva1.sinaimg.cn/crop.0.0.118.118.180/5db11ff4gw1e77d3nqrv8j203b03cweg.jpg">
            <span class="loading"></span>
            <button type="button" class="layui-btn upload-img">
              <i class="layui-icon">&#xe67c;</i>上传头像
            </button>
            <p>建议尺寸168*168，支持jpg、png、gif，最大不能超过5MB</p>
          </div>

        </div>
      </div>
      <div class="layui-form-item submitBtn">
        <button class="layui-btn" key="set-mine" lay-filter="*" lay-submit>确认修改</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.person_setInfo{
  padding-top: 30px;

  .submitBtn{
    margin-left: 95px;
    margin-top: 35px;
  }
}
</style>
