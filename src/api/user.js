import request from '@/utils/request'

export const getSmsCode = (mobile) => {
    request({
        url: `/sms/codes/${mobile}`
    })
}
