// 封装项目中需要使用本地存储的功能

// 获取本地信息
export function getItem (key) {
  const res = window.localStorage.getItem(key)
  try {
    return JSON.parse(res)
  } catch (err) {
    return res
  }
}
// 信息存储本地
export function setItem (key, value) {
  if (typeof value === 'object') {
    window.localStorage.setItem(key, JSON.stringify(value))
  } else {
    window.localStorage.setItem(key, value)
  }
}

// 根据key删除对应的本地信息
export function removeItem (key) {
  window.localStorage.removeItem(key)
}

// 清楚本地存储
export function clearItem () {
  window.localStorage.clearItem()
}
