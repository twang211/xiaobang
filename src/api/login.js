import request from '@/utils/request'

export function loginByUsername(loginAccount, password, beFrom) {
    const data = {
        loginAccount,
        password,
        beFrom
    }
    return request({
        url: '/fire-service/api/auth/login',
        method: 'post',
        data
    })
}

export function logout(header) {
    return request({
        url: '/fire-service/api/auth/logout',
        method: 'post',
        datatype: 'jsonp',
        headers: {
            'Authorization': header
        }
    })
}