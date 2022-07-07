<template>
  <div>
    <van-nav-bar :title="title" @click-left="$emit('close')" fixed>
      <template #left>
        <van-icon name="cross" />
      </template>
    </van-nav-bar>
    <CommentItem :item="comment" class="comment"> </CommentItem>
    <van-cell title="全部回复"> </van-cell>
    <CommentItem :item="item" v-for="(item, index) in list" :key="index">
    </CommentItem>
    <div class="comment1"></div>
    <!-- 底部按钮  -->
    <div class="bottom">
      <van-button
        type="primary"
        block
        color="#3296fa"
        @click="addCommentShow = true"
        >评论</van-button
      >
    </div>

    <!-- 点击评论 -->
    <van-popup v-model="addCommentShow" position="bottom">
      <AddComment
        :target="comment.com_id"
        @add-comment="
          list.unshift($event);
          addCommentShow = false;
          comment.reply_count++
        "
        v-if="addCommentShow"
        :art_id="$route.params.article_id"
      ></AddComment>
    </van-popup>
  </div>
</template>

<script>
import { getCommentList } from '@/api/comment.js'
import CommentItem from './CommentItem.vue'
import AddComment from './AddComment.vue'
export default {
  props: {
    comment: {
      type: Object,
      default: () => ({})
    }
  },
  created () {
    this.getCommentList()
  },
  data () {
    return {
      offset: null,
      limit: 10,
      list: [],
      addCommentShow: false
    }
  },
  methods: {
    async getCommentList () {
      try {
        const res = await getCommentList({
          type: 'c', source: this.comment.com_id, offset: this.offset, limit: this.limit
        })
        console.log(res)
        this.list = res.data.data.results
      } catch (err) { console.log(err) }
    }
  },
  computed: {
    title () {
      if (this.comment.reply_count === 0) {
        return '暂无回复'
      } else {
        return this.comment.reply_count + '条评论'
      }
    }
  },
  watch: {},
  filters: {},
  components: { CommentItem, AddComment }
}
</script>

<style scoped lang='less'>
.comment {
  margin-top: 92px;
}
.comment1 {
  margin-bottom: 88px;
}
.bottom {
  position: fixed;
  bottom: 0;
  width: 750px;
}
</style>
