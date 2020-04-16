<template>
  <div class="layui-row layui-col-space15">
    <div class="layui-col-md8">
      <SetTop></SetTop>
      <PanelSearch></PanelSearch>
    </div>

    <div class="layui-col-md4">
      <Channel></Channel>
      <Sign></Sign>
      <WeekBoard></WeekBoard>
      <Adver></Adver>
      <LinkShare></LinkShare>
    </div>
  </div>
</template>

<script>
import SetTop from './components/setTop.vue'
import PanelSearch from './components/Panel_search.vue'
import Channel from './components/channel.vue'
import Sign from './components/sign.vue'
import WeekBoard from './components/week_board.vue'
import Adver from './components/adv.vue'
import LinkShare from './components/link.vue'

export default {
  name: "",
  components: {
    SetTop,
    PanelSearch,
    Channel,
    Sign,
    WeekBoard,
    Adver,
    LinkShare
  },
  data: () => ({

  })
}
</script>

<style lang="scss" scoped>
</style>
