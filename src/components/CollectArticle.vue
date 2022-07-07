<template>
  <van-loading v-if="isLoading" size=".53333rem"/>
  <van-icon
    v-else
    color="#777"
    @click="onclick"
    :name="is_collected ? 'star' : 'star-o'"
  />
</template>

<script>
import { addCollect, delCollect } from '@/api/article'
export default {
  props: {
    is_collected: {
      type: Boolean,
      require: true
    },
    target: {
      type: [Number, String],
      require: true
    }
  },
  name: 'CollectArticle',
  created () { },
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
    async onclick () {
      this.isLoading = true
      if (this.is_collected) {
        try {
          await delCollect(this.target)
        } catch (err) {
          console.log(err)
        }
      } else {
        try {
          await addCollect(this.$route.params.article_id)
        } catch (err) {
          console.log(err)
        }
      }
      this.$emit('update:is_collected', !this.is_collected)
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
