<template>
  <van-field
    v-model.trim="message"
    rows="2"
    autosize
    type="textarea"
    maxlength="80"
    placeholder="请输入留言"
    show-word-limit
    center
    ref="field"
  >
    <template #extra
      ><van-button type="default" :disabled="message === ''" @click="onClick"
        >发布</van-button
      ></template
    >
  </van-field>
</template>

<script>
import { addComment } from '@/api/comment'
export default {
  props: {
    target: {
      type: [String, Number],
      require: true
    },
    art_id: {
      type: [String, Number]
    }
  },
  created () { },
  data () {
    return {
      message: ''
    }
  },
  methods: {
    async onClick () {
      console.log(1)
      try {
        const res = await addComment({
          target: this.target,
          content: this.message,
          art_id: this.art_id
        })
        console.log(res)
        this.$emit('add-comment', res.data.data.new_obj)
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {},
  mounted () {
    // this.$refs.field.focus()
    this.$refs.field.$el.querySelector('textarea').focus()
    // this.$nextTick(
    //   this.$refs.field.$el.querySelector('textarea').focus()
    // )
  },
  updated () {
    this.$refs.field.$el.querySelector('textarea').focus()
  }
}
</script>

<style scoped lang='less'>
.van-button--default {
  border: unset;
}
</style>
