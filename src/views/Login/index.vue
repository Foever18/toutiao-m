<template>
  <div>
    <van-nav-bar title="登录">
      <van-icon name="cross" slot="left" />
    </van-nav-bar>
    <van-form @submit="onSubmit" ref="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="[
          { required: true },
          {
            pattern: /^(?:(?:\+|00)86)?1\d{10}$/,
            message: '请输入正确的手机格式',
          },
        ]"
      >
        <i class="toutiao toutiao-shouji" slot="left-icon"></i>
      </van-field>
      <van-field
        v-model="password"
        type="password"
        name="验证码"
        placeholder="请输入验证码"
        :rules="[
          { required: true },
          { pattern: /^\d{6}$/, message: '验证码必须是6位' },
        ]"
      >
        <i class="toutiao toutiao-yanzhengma" slot="left-icon"></i>
        <template #button>
          <!-- 倒计时 -->
          <van-count-down
            :time="time"
            v-if="isCountDown"
            format="ss s"
            @finish="isCountDown = false"
          />
          <!-- 发送验证码 -->
          <van-button
            @click="onSendSms"
            v-else
            size="small"
            type="primary"
            class="yzm"
            native-type="button"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button
          round
          block
          type="info"
          native-type="submit"
          class="login-btn"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { getSmsCode } from '@/api/user'
export default {
  created () { },
  data () {
    return {
      mobile: '13900000000',
      password: '246810',
      time: 5 * 1000,
      isCountDown: false
    }
  },
  methods: {
    onSubmit (val) {
      console.log(val)
      this.$store.commit('setUser', { name: 1 })
    },
    async onSendSms () {
      try {
        await this.$refs.form.validate('mobile')
        this.isCountDown = true
        try {
          await getSmsCode(this.mobile)
          this.$toast.fail('发送成功')
        } catch (err) {
          this.$toast.fail('发送失败')
        }
      } catch (err) {
        // console.log(err)
        console.log('失败')
        this.$toast.fail('手机格式不对')
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang="less">
.toutiao {
  font-size: 40px;
}
.yzm {
  line-height: 46px;
  width: 152px;
  height: 46px;
  background-color: #ededed;
  border-radius: 23px;
  font-size: 22px;
  color: #666;
  position: fixed;
  right: 20px;
  bottom: 1080px;
  .van-button__text {
    zoom: 0.96;
  }
}
.login-btn {
  width: 694px;
  height: 88px;
  background-color: #6db4fb;
  border-radius: 10px;
  .van-button__text {
    font-size: 30px;
  }
}
.van-count-down {
  position: fixed;
  right: 28px;
  bottom: 1080px;
}
</style>
