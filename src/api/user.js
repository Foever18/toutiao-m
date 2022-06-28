import request from '@/utils/request'
import store from '@/store'
export const getSmsCode = (mobile) => {
  return request({
    url: `/sms/codes/${mobile}`
  })
}

export const login = (data) => {
  return request({
    method: 'POST',
    url: '/authorizations',
    data
  })
}
export const getUserInfo = () => {
  return request({
    url: 'user',
    headers: {
      Authorization: 'Bearer ' + store.state.user.token
    }
  })
}
