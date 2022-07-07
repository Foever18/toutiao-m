<!-- eslint-disable vue/no-parsing-error -->
<template>
  <div>
    <!-- 没有鞥多 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
    <!-- 评论列表块 -->
      <CommentItem
        v-for="item in commentList"
        :key="item.com_id"
        :item="item"
         @replay_show="$emit('replay_show',$event)"
      ></CommentItem>
    </van-list>
  </div>
</template>

<script>
import { getCommentList } from '@/api/comment'
import CommentItem from './CommentItem.vue'
export default {
  props: {
    type: {
      type: String,
      require: true,
      validator (val) {
        return ['a', 'c'].includes(val)
      }
    },
    source: {
      require: true,
      type: [String, Number]
    },
    commentList: {
      type: Array,
      require: true
    }
  },
  created () {
    this.getCommentList()
  },
  data () {
    return {
      paramsObj: {
        type: this.type,
        source: this.source,
        limit: 5,
        offset: null
      },
      finished: false,
      loading: false
      // commentList: []
    }
  },
  methods: {
    async getCommentList () {
      try {
        const res = await getCommentList(this.paramsObj)
        if (res.data.data.results.length === 0) {
          this.finished = true
        }
        this.$emit('set_count', res.data.data.total_count)
        // this.$emit('pushCommentList', res.data.results)
        // 加载数据时,在之前的数据后插入新的数据
        this.commentList.push(...res.data.data.results)
        // 设置偏移量
        this.paramsObj.offset = res.data.data.last_id
        this.loading = false
        console.log(res)
      } catch (err) {
        console.log(err)
      }
    },
    onLoad () {
      this.getCommentList()
      console.log('开启分页')
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { CommentItem }
}
</script>

<style scoped lang='less'>
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}

.van-list {
  margin-bottom: 45px;
}
</style>
