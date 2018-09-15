import request from '@/utils/request'

export function loginByUsername(loginAccount, password, beFrom) {
    const data = {
        loginAccount,
        password,
        beFrom
    }
    console.log(data, "%%%%%%%%%%%%%%%%%%%%")
    return request({
        url: '/fire-service/api/auth/login',
        method: 'post',
        data
    })
}

export function logout(header) {
    console.log(header, "22222222222222222")
    return request({
        url: '/fire-service/api/auth/logout',
        method: 'post',
        datatype: 'jsonp',
        headers: {
            'Authorization': header
        }
    })
}