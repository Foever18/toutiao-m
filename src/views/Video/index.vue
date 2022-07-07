<template>
  <div>
    <ul>
      <li class="xx" @click="test($event)">6</li>
      <li class="xx">6</li>
      <li class="xx">6</li>
    </ul>
    6
    <van-index-bar @select="fn($event)">
      <van-index-anchor index="A" />
      <van-cell title="文本" @click="xx" />
      <van-cell title="文本" />
      <van-cell title="文本" />

      <van-index-anchor index="B" />
      <van-cell title="文本" />
      <van-cell title="文本" />
      <van-cell title="文本" />
      <van-index-anchor index="z" />
      <van-cell title="文本" />
      <van-cell title="文本" />
      <van-cell title="文本" />
      <van-index-anchor index="x" />
      <van-cell title="文本" />
      <van-cell title="文本" />
      <van-cell title="文本" />
      ...
    </van-index-bar>
  </div>
</template>

<script>

export default {
  mounted () {
    const arr = document.querySelectorAll('.van-index-bar__index')
    arr.forEach((item) => {
      item.onclick = function () {
        arr.forEach(function (item) {
          item.setAttribute('class', 'van-index-bar__index')
        })
        item.setAttribute('class', 'van-index-bar__index myFn')
      }
    })
    console.log(document.querySelectorAll('.van-index-bar__index'))
  },
  created () {
    // for (let i = 0; i < btn.length; i++) {
    //   btn[i].onclick = function () {
    //     for (let i = 0; i < btn.length; i++) {
    //       btn[i].style.backgroundColor = ''
    //     }
    //     this.style.backgroundColor = 'blue'
    //   }
    // }
  },
  data () {
    return {}
  },
  methods: {
    xx (e) {
      console.log(e.target)
    },
    fn (e) {
      console.log(1)
      console.log(e.target)
      console.log(e)
    },
    test (e) {
      console.log(1)
      console.log(e.target)
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped>
</style>
