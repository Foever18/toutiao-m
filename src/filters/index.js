import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn' // 引入国际化语言
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
dayjs.locale('zh-cn')
export const dateFormat = time => { return dayjs(time).fromNow() }
export const myComputer = time => { return time }
