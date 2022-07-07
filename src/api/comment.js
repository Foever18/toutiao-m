import { request } from '@/utils/request'

/**
 *获取评论或评论回复0
 * @param {评论类型} type
 * @param {评论id} source
 * @param {评论数据的偏移量} offset
 * @param {评论数据个数} limit
 * @returns
 */
export const getCommentList = ({ type, source, offset, limit }) => {
  return request({
    url: 'comments',
    params: {
      type, source, offset, limit
    }
  })
}

/**
 *用户评论点赞
 * @param {点赞的评论id} target
 * @returns
 */
export const addLike = target => {
  return request({
    method: 'POST',
    url: '/comment/likings',
    data: {
      target
    }
  })
}

// 取消点赞
export const delLike = target => {
  return request({
    method: 'DELETE',
    url: `comment/likings/${target}`
  })
}

/**
 *提交评论
 * @param target{target} 评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
 * @param {评论内容}  是的content
 * @param {art_id} 文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
 * @returns
 */
export const addComment = data => {
  return request({
    method: 'POST',
    url: 'comments',
    data
  })
}
