<template>
  <van-cell>
    <van-image
      slot="icon"
      round
      width="30"
      height="30"
      style="margin-right: 10px"
      :src="item.aut_photo"
    />
    <span style="color: #466b9d" slot="title">{{ item.aut_name }}</span>
    <div slot="label">
      <p style="color: #363636">{{ item.content }}</p>
      <p>
        <span style="margin-right: 10px">{{ item.pubdate | dateFormat }}</span>
        <van-button size="mini" type="default" @click="$emit('replay_show',item)">回复</van-button>
      </p>
    </div>
    <!-- 点赞功能 -->
    <van-loading v-if="isLoading" />
    <van-icon
      v-else
      slot="right-icon"
      :color="item.is_liking ? 'red' : ''"
      :name="item.is_liking ? 'like' : 'like-o'"
      @click="onClick"
      >{{ item.like_count > 0 ? item.like_count : "赞" }}</van-icon
    >
  </van-cell>
</template>

<script>
import { addLike, delLike } from '@/api/comment'
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  created () {

  },
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
    async onClick () {
      this.isLoading = true
      try {
        if (this.item.is_liking) {
          await delLike(this.item.com_id)
          this.item.is_liking = !this.item.is_liking
          this.item.like_count -= 1
        } else {
          await addLike(this.item.com_id)
          this.item.like_count += 1
          this.item.is_liking = !this.item.is_liking
        }
      } catch (err) {
        console.log(err)
      }
      this.isLoading = false
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>
