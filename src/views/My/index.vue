<template>
  <div>
    <!-- 登录效果 -->
    <div class="header header-login" v-if="user && user.token">
      <div class="avatar">
        <div class="left">
          <van-image
            width="1.76rem"
            height="1.76rem"
            round
            :src='userInfo.photo'
          />
          <span>黑马头条号</span>
        </div>
        <div class="btn">编辑资料</div>
      </div>
      <ul class="list">
        <li>
          <p>{{userInfo.art_count}}</p>
          <p>头条</p>
        </li>
        <li>
          <p>{{userInfo.fans_count}}</p>
          <p>粉丝</p>
        </li>
        <li>
          <p>{{userInfo.follow_count}}</p>
          <p>关注</p>
        </li>
        <li>
          <p>{{userInfo.like_count}}</p>
          <p>获赞</p>
        </li>
      </ul>
    </div>
    <!-- 未登录效果 -->
    <div class="header header-notLogin" v-else>
      <div class="inner">
        <img src="@/assets/mobile.png" alt="" />
        <p @click="$router.push({ path: 'login' })">登录/注册</p>
      </div>
    </div>
    <!-- 收藏 -->
    <van-grid :column-num="2">
      <van-grid-item text="收藏">
        <template #icon>
          <i class="toutiao toutiao-shoucang"></i>
        </template>
      </van-grid-item>
      <van-grid-item text="历史">
        <template #icon>
          <i class="toutiao toutiao-lishi"></i>
        </template>
      </van-grid-item>
    </van-grid>
    <!-- 单元格 -->
    <van-cell-group>
      <van-cell title="单元格" is-link />
      <van-cell title="单元格" is-link />
    </van-cell-group>
    <!-- 退出登录 -->
    <van-button
      type="default"
      block
      class="logout"
      v-if="user && user.token"
      @click="logout"
      >退出登录</van-button
    >
  </div>
</template >

<script>
import { getUserInfo } from '@/api/user'
import { mapState } from 'vuex'
export default {
  name: 'My',
  async created () {
    try {
      if (this.user && this.user.token) {
        const res = await getUserInfo()
        console.log(res)
        this.userInfo = res.data.data
      }
    } catch (err) {
      console.log(err)
    }
  },
  data () {
    return {
      userInfo: {}
    }
  },
  methods: {
    async logout () {
      try {
        await this.$dialog.confirm({ message: '确定退出吗' })
        this.$store.commit('setUser', {})
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.logout {
  color: #eb5253;
}

.van-cell-group {
  margin: 9px 0;
}
/deep/.van-grid-item__text {
  font-size: 28px;
}
.van-grid-item {
  &:nth-child(1) {
    color: #eb5253;
  }
  &:nth-child(2) {
    color: #ff9d1d;
  }
}
.toutiao {
  font-size: 45px;
}
.header {
  width: 750px;
  height: 401px;
  background: rgba(51, 150, 250, 0.7) url("@/assets/banner.png") no-repeat;
  background-size: cover;
}
.header-notLogin {
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 132px;
    height: 132px;
    margin-bottom: 15px;
  }
  p {
    font-size: 28px;
    font-weight: normal;
    color: #fff;
    padding: 0;
    margin: 0;
  }
}
.header-login {
  padding-top: 116px;
  .avatar {
    margin-bottom: 55px;
    margin-left: 33px;
    margin-right: 33px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      align-items: center;
      span {
        margin-left: 22px;
        font-size: 30px;
        font-weight: normal;
        color: #fff;
      }
    }

    .btn {
      width: 116px;
      height: 33px;
      text-align: center;
      background-color: #ffffff;
      border-radius: 16px;
      font-family: MicrosoftYaHei;
      font-size: 20px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 1px;
      color: #666666;
    }
  }
  .list {
    display: flex;
    li {
      flex: 1;
      text-align: center;
      p {
        font-weight: normal;
        letter-spacing: 1px;
        color: #ffffff;
        &:nth-child(1) {
          font-family: ArialMT;
          font-size: 36px;
        }
        &:nth-child(2) {
          font-family: MicrosoftYaHei;
          font-size: 23px;
        }
      }
    }
  }
}
</style>
