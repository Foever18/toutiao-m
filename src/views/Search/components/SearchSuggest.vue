<template>
  <div>
    <van-cell
      :title="item"
      icon="search"
      v-for="(item, index) in list"
      :key="index"
      @click="$emit('search', item)"
    >
      <template #title>
        <span v-html="highLight(item)" ></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSuggestList } from '@/api/search'
let timer = null
export default {
  props: {
    searchText: {
      type: String,
      require: true
    }
  },
  created () { },
  data () {
    return {
      list: []
    }
  },
  methods: {
    highLight (str) {
      const reg = new RegExp(this.searchText, 'g')
      return str.replace(reg, `<span style="color:red">${this.searchText}</span>`)
    }
  },
  computed: {},
  watch: {
    searchText: {
      handler (newVal) {
        clearTimeout(timer)
        timer = setTimeout(async () => {
          try {
            const res = await getSuggestList(newVal)
            this.list = res.data.data.options
            console.log(this.list)
          } catch (err) {
            console.log(err)
          }
        }, 500)
      },
      immediate: true
    }
  },
  filters: {

  },
  components: {},
  beforeDestroy () {
    clearTimeout(timer)
  }
}
</script>

<style scoped lang='less'>
</style>
