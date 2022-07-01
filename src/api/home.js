import { request } from '@/utils/request'

export const getMyChannels = (data) => {
  return request({
    url: 'user/channels',
    data
  })
}

// 获取文章列表
// 结构赋值更好的看出需要请求的数据
// eslint-disable-next-line camelcase
export const getArticleList = ({ channel_id, timestamp }) => {
  return request({
    url: '/articles',
    params: { channel_id, timestamp }
  })
}

// 获取所有列表
export const getAllArticleList = () => {
  return request({
    url: '/channels'
  })
}

// 存储本地信息
export const saveChannels = (channels) => {
  return request({
    method: 'PUT',
    url: 'user/channels',
    data: {
      channels
    }
  })
}
