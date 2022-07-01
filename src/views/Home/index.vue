<template>
  <div>
    <!-- 标题 -->
    <van-nav-bar fixed left-arrow>
      <template #title
        ><van-button
          round
          type="info"
          icon="search"
          class="search-fn"
          to="search"
          >搜索</van-button
        ></template
      >
    </van-nav-bar>

    <!-- 标签切换栏 -->
    <van-tabs v-model="active" animated>
      <van-tab :title="item.name" v-for="item in channels" :key="item.id">
        <!--信息展示  -->
        <!-- 每次点击标签的时候吧对应的id传过去,根据id发送对应的请求 -->
        <ArticleList :id="item.id"></ArticleList>
      </van-tab>
      <!-- 汉堡按钮 -->
      <template #nav-right>
        <div class="menu" @click="isChannelPanelShow = true">
          <i class="toutiao toutiao-gengduo"></i>
        </div>
        <div class="menu1"></div>
      </template>
    </van-tabs>

    <!-- 底部弹出层 -->
    <van-popup
      v-model="isChannelPanelShow"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '90%', paddingTop: '1.1rem' }"
    >
      <!-- 我的频道插槽 -->
      <ChannelPanel
        :channels="channels"
        :active="active"
        @change-active="
          active = $event;
          isChannelPanelShow = false;
        "
        @sub-active="active = $event"
      ></ChannelPanel>
    </van-popup>
  </div>
</template>

<script>
import { getItem } from '@/utils/storage'
import { getMyChannels } from '@/api/home'
import ArticleList from '@/components/ArticleList.vue'
import ChannelPanel from '@/components/ChannelPanel.vue'
const CHANNELS = 'CHANNELS'
export default {
  name: 'Home',
  created () {
    this.getMyChannels()
  },
  data () {
    return {
      active: 0,
      channels: [],
      isChannelPanelShow: false
    }
  },
  methods: {
    // 封装一个获取用户频道的方法
    async getMyChannels () {
      // 判断本地是否有数据,且用户是否登录
      const channels = getItem(CHANNELS)
      if (!(this.$store.state.user && this.$store.state.user.token) && channels) {
        this.channels = channels
      } else {
        try {
          const res = await getMyChannels()
          this.channels = res.data.data.channels
        } catch (err) {
          console.log(err)
        }
      }
    }
  },
  computed: {},

  filters: {},
  components: { ArticleList, ChannelPanel }
}
</script>

<style scoped lang='less'>
// 定位头部标签栏并提升层级

/deep/.van-tabs__wrap {
  width: 750px;
  position: fixed;
  z-index: 1;
  margin-top: 92px;
  border-bottom: 1px solid #edeff3;
}
// 标签栏汉堡俺妞
.menu {
  min-width: 66px;
  height: 82px;
  background-color: rgb(255, 255, 255);
  position: fixed;
  right: 0;
  text-align: center;
  line-height: 82px;
  .toutiao {
    font-size: 40px;
  }
}
.menu1 {
  min-width: 66px;
  height: 82px;
}
/deep/ .van-tabs__line {
  background-color: #3296fa;
  width: 31px;
}
// /deep/.van-button{width: 555px;}
/deep/ .van-tabs__wrap--scrollable .van-tab {
  padding: 0 69px;
  border-right: 1px solid #edeff3;
}
.search-fn {
  width: 555px;
  height: 64px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 32px;
}
/deep/.van-nav-bar__title {
  max-width: unset;
}
</style>
