<template>
  <div>
    <keep-alive :include="['Home']">
      <router-view class="main"></router-view>
    </keep-alive>

    <van-tabbar route>
      <van-tabbar-item icon="home-o" replace to="/home"
        >首页
        <i class="toutiao toutiao-shouye" slot="icon"></i>
      </van-tabbar-item>
      <van-tabbar-item icon="search" replace to="/video"
        >视频
        <i class="toutiao toutiao-shipin" slot="icon"></i>
      </van-tabbar-item>
      <van-tabbar-item icon="friends-o" replace to="/question"
        >问答
        <i class="toutiao toutiao-wenda" slot="icon"></i>
      </van-tabbar-item>
      <van-tabbar-item icon="setting-o" replace to="/my"
        >我的
        <i class="toutiao toutiao-wode" slot="icon"></i>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script scoped >
export default {

}
</script>

<style scoped lang='less'>
.main {
  padding-bottom: 100px;
  background-color: #f5f7f9;
}
.toutiao {
  font-size: 40px;
}
/deep/ .van-tabbar-item__text {
  font-size: 20px !important;
}
</style>
