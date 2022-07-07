<template>
  <van-button
    class="follow-btn"
    :disabled="isAjax"
    :loading="isAjax"
    type="info"
    color="#3296fa"
    round
    size="small"
    :icon="is_followed ? '' : 'plus'"
    :plain="is_followed"
    @click="onclick"
    >{{ is_followed ? "已关注" : "关注" }}</van-button
  >
</template>

<script>
import { addUser, delUser } from '@/api/article'
export default {
  name: 'FollowUser',
  props: {
    is_followed: {
      type: Boolean,
      require: true
    },
    target: {
      type: [Number, String],
      require: true
    }
  },
  created () { },
  data () {
    return {
      isAjax: false
    }
  },
  methods: {
    async onclick () {
      this.isAjax = true
      if (this.is_followed) {
        try {
          await delUser(this.target)
          this.$emit('update:is_followed', !this.is_followed)
        } catch (err) {
          console.log(err)
        }
      } else {
        try {
          await addUser(this.target)
          this.$emit('update:is_followed', !this.is_followed)
        } catch (err) {
          console.log(err)
        }
      }
      this.isAjax = false
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
