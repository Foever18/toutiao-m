<template>
  <div>
    <!-- 下拉刷新 -->
    <van-pull-refresh
      v-model="refreshing"
      ref="pullRefresh"
      @refresh="onRefresh"
    >
      <van-cell-group>
        <!-- 下拉加载 -->
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <!-- 用户信息列表 -->
          <ArticleItem
            v-for="(item, index) in articleList"
            :key="index"
            :article="item"
          ></ArticleItem>
        </van-list>
      </van-cell-group>
    </van-pull-refresh>
  </div>
</template>
<script>
import { getArticleList } from '@/api/home' // 多张图片信息
import ArticleItem from './ArticleItem.vue'
// 这两个数据没有必要放到data中,只有需要双向绑定的数据放到data里面,这样性能会更高
let ele = null
let scrollTop = 0
export default {
  mounted () {
    // 获取到组件对应的dom元素
    ele = this.$refs.pullRefresh.$el
    ele.addEventListener('scroll', function () {
      scrollTop = this.scrollTop
    })
  },
  // 由于本组件以被缓存所以要用keep对应的钩子
  activated () {
    ele.scrollTop = scrollTop
  },
  props: {
    id: {
      type: Number,
      require: true
    }
  },
  created () {
    this.getArticleList()
  },
  data () {
    return {
      timestamp: Date.now(),
      articleList: [],
      loading: false,
      finished: false,
      refreshing: false
    }
  },
  methods: {
    // 获取新闻列表
    async getArticleList () {
      try {
        // 判断是否由下拉开启,如果是:则把文章列表和时间戳清空
        if (this.refreshing) {
          this.articleList = []
          this.refreshing = false
        }
        const res = await getArticleList({ channel_id: this.id, timestamp: this.timestamp })
        this.timestamp = res.data.data.pre_timestamp
        // 获取到数据并将其追加到数据后面
        this.articleList.push(...res.data.data.results)
        // 如果没有数据让finish=true
        if (this.timestamp === null) {
          this.finished = true
        }
        // 数据加载完毕关闭loading
        this.loading = false
      } catch (err) {
        console.log(err)
      }
    },
    // 下拉加载
    onLoad () {
      console.log('开启loading')
      this.getArticleList()
    },
    // 下拉刷新
    onRefresh () {
      console.log('下拉刷新开启')
      // 防止用户把数据加载完,不会出发加载数据
      // this.finished = false
      this.loading = true
      this.timestamp = Date.now()
      this.getArticleList()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { ArticleItem }
}
</script>

<style scoped lang='less'>
/deep/.van-pull-refresh {
  height: calc(100vh - 100px);
  overflow: auto;
}
.van-cell-group {
  margin-top: 174px;
}
</style>
