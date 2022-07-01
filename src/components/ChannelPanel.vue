<template>
  <div>
    <!-- 我的频道 -->
    <div class="channel-container">
      <div class="title">
        <h3>我的频道</h3>
        <van-button
          plain
          round
          type="danger"
          size="small"
          @click="isCloseShow = !isCloseShow"
          >{{ isCloseShow ? "完成" : "编辑" }}</van-button
        >
      </div>
      <van-row type="flex">
        <van-col span="6" v-for="(item, index) in channels" :key="item.id">
          <div
            class="inner"
            :style="{ color: active === index ? 'red' : '' }"
            @click="changeFn(index, item.id)"
          >
            {{ item.name }}
            <van-icon name="close" v-if="index !== 0 && isCloseShow" />
          </div>
        </van-col>
      </van-row>
    </div>

    <!-- 推荐频道 -->
    <div class="channel-container">
      <div class="title">
        <h3>推荐频道</h3>
      </div>
      <van-row type="flex">
        <van-col span="6" v-for="item in recommendChannels" :key="item.id"
          ><div class="inner" @click="add(item.id)">
            +{{ item.name }}
          </div></van-col
        >
      </van-row>
    </div>
  </div>
</template>

<script>
import { getAllArticleList, saveChannels } from '@/api/home'
import { setItem, getItem } from '@/utils/storage'
const CHANNELS = 'CHANNELS'
export default {
  name: 'ChannelPanel',
  props: {
    channels: { // 我的频道
      type: Array, require: true
    },
    active: {
      type: Number, require: true
    }
  },
  async created () {
    try {
      // 请求所有频道列表
      const res = await getAllArticleList()
      // 筛选id值和我的面板不同的项
      this.recommendChannels = res.data.data.channels.filter(item => this.channels.every(item1 => item1.id !== item.id))
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  },
  data () {
    return {
      recommendChannels: [],
      isCloseShow: false
    }
  },
  methods: {
    changeFn (index) {
      // 判断按钮是否出现
      if (this.isCloseShow) {
        if (index === 0) return
        this.recommendChannels.push(this.channels[index])
        this.channels.splice(index, 1)
        if (this.active > index) { this.$emit('sub-active', this.active - 1) }
      } else {
        this.$emit('change-active', index)
      }
    },
    add (id) {
      // 根据id找到索引,并添加到我的频道中
      const index = this.recommendChannels.findIndex(item => item.id === id)
      // 根据匹配出来的索引,匹配推荐频道的项,删除推荐频道的值,并添加到我的频道
      this.channels.push(this.recommendChannels[index])
      this.recommendChannels.splice(index, 1)
    }
  },
  computed: {},
  watch: {
    // 用户列表数据持久化
    channels: {
      async handler (newVal) {
        if (this.$store.state.user && this.$store.state.user.token) {
          // 登陆过
          const arr = []
          newVal.forEach((item, index) => {
            arr.push({ id: item.id, seq: index })
          })
          console.log(arr)
          try {
            const res = await saveChannels(arr)
            console.log(res)
          } catch (err) {
            console.log(err)
          }
        } else {
          // 没登录
          setItem(CHANNELS, newVal)
        }
      }
    }
  },
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.van-icon-close {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1;
}
.van-col {
  margin-top: 16px;
  margin-bottom: 13px;
  padding-left: 12px;
  .inner {
    text-align: center;
    width: 160px;
    height: 86px;
    background-color: #f4f5f6;
    border-radius: 6px;
    line-height: 86px;
    font-size: 28px;
    font-weight: normal;
    font-stretch: normal;
    color: #222222;
    position: relative;
    .van-icon-close {
      position: absolute;
      top: 0;
      right: 0;
      // 移动自身的百分之50
      transform: translate(50%, -50%);
    }
  }
}
.title {
  display: flex;
  justify-content: space-between;
  align-content: center;
  padding: 0 16px 0 24px;
  h3 {
    font-size: 32px;
    font-weight: normal;
    line-height: 36px;
    color: #333333;
  }
  .van-button {
    width: 104px;
    height: 50px;
    border-radius: 20px;
  }
}
</style>
