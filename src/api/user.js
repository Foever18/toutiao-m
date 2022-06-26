import request from '@/utils/request'

export const getSmsCode = (mobile) => {
    return request({
        url: `/sms/codes/${mobile}`
    })
}

export const login = data => {
    return request({
        method: 'POST',
        url: '/authorizations',
        data
    })
}
