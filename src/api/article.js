import request from '@/utils/request'

import {
    getToken,
    setToken,
    removeToken
} from '@/utils/auth'

//更新token
export function fetchToken(data, header) {
    console.log(header)
    return request({
        url: '/fire-service/api/auth/token/refresh',
        method: 'post',
        data,
        headers: {
            'Authorization': header
        }
    })
}

//获取类别
export function fetchTypeList(query, header) {
    return request({
        url: '/fire-service/api/dictionary/get',
        method: 'get',
        params: query,
        headers: {
            'Authorization': header
        }
    })
}

//获取消防重点单位类别
export function fetchsafetyLevelList(query, header) {
    return request({
        url: '/fire-service/api/dictionary/get',
        method: 'get',
        params: query,
        headers: {
            'Authorization': header
        }
    })
}

//获取单位列表
export function fetchUnitDataList(query, header) {
    return request({
        url: '/fire-service/api/company/backend/list',
        method: 'get',
        params: query,
        headers: {
            'Authorization': header
        }
    })
}

//添加单位信息
export function createunitArticle(data, header) {
    console.log(header)
    return request({
        url: '/fire-service/api/company/backend/add',
        method: 'post',
        data,
        headers: {
            'Authorization': header
        }
    })
}

//查看单位信息
export function fetchUnitData(query, companyId, header) {
    return request({
        url: '/fire-service/api/company/info/' + companyId,
        method: 'get',
        params: query,
        headers: {
            'Authorization': header
        }
    })
}

//更新单位信息
export function updateUnitData(data, header) {
    console.log(header)
    return request({
        url: '/fire-service/api/company/backend/update',
        method: 'post',
        data,
        headers: {
            'Authorization': header
        }
    })
}

//建筑物列表
export function fetchBuildDataList(query, header) {
    return request({
        url: '/fire-service/api/building/backend/list',
        method: 'get',
        params: query,
        headers: {
            'Authorization': header
        }
    })
}
//查看建筑信息
export function fetchBuildData(query, buildingId, header) {
    return request({
        url: '/fire-service/api/building/info/' + buildingId,
        method: 'get',
        params: query,
        headers: {
            'Authorization': header
        }
    })
}
//删除上传文件
export function fetchDelImg(data, header) {
    console.log(header)
    return request({
        url: '/fire-service/api/file/delete',
        method: 'post',
        data,
        headers: {
            'Authorization': header
        }
    })
}
//更新建筑物信息
export function updateBuildData(data, header) {
    console.log(header)
    return request({
        url: '/fire-service/api/building/backend/update',
        method: 'post',
        data,
        headers: {
            'Authorization': header
        }
    })
}
//添加建筑信息
export function createbuildArticle(data, header) {
    console.log(header)
    return request({
        url: '/fire-service/api/building/backend/add',
        method: 'post',
        data,
        headers: {
            'Authorization': header
        }
    })
}
//单位下拉
export function fetchUnitDownDataList(query, header) {
    return request({
        url: '/fire-service/api/company/backend/down-list',
        method: 'get',
        params: query,
        headers: {
            'Authorization': header
        }
    })
}
//建筑下拉
export function fetchBuildDownDataList(query, header) {
    return request({
        url: '/fire-service/api/building/backend/down-list',
        method: 'get',
        params: query,
        headers: {
            'Authorization': header
        }
    })
}
//人员列表
export function fetchUserDataList(query, header) {
    return request({
        url: '/fire-service/api/user/backend/list',
        method: 'get',
        params: query,
        headers: {
            'Authorization': header
        }
    })
}

//更新人员信息
export function updateUserData(data, header) {
    console.log(header)
    return request({
        url: '/fire-service/api/user/backend/update',
        method: 'post',
        data,
        headers: {
            'Authorization': header
        }
    })
}
//添加人员信息
export function createUserArticle(data, header) {
    console.log(header)
    return request({
        url: '/fire-service/api/user/backend/add',
        method: 'post',
        data,
        headers: {
            'Authorization': header
        }
    })
}


//查看人员信息
export function fetchUserData(query, userId, header) {
    return request({
        url: '/fire-service/api/user/info/' + userId,
        method: 'get',
        params: query,
        headers: {
            'Authorization': header
        }
    })
}

//添加单位人员信息
export function companyAddApi(data, header) {
    console.log(header)
    return request({
        url: '/fire-service/api/company/backend/user/add',
        method: 'post',
        data,
        headers: {
            'Authorization': header
        }
    })
}

//删除单位人员信息
export function companyDelApi(data, header) {
    console.log(header)
    return request({
        url: '/fire-service/api/company/backend/user/remove',
        method: 'post',
        data,
        headers: {
            'Authorization': header
        }
    })
}

//单位人员列表
export function fetchcompanyData(query, header) {
    return request({
        url: '/fire-service/api/user/company',
        method: 'get',
        params: query,
        headers: {
            'Authorization': header
        }
    })
}

//设备系统列表
export function fetchSystemDataList(query, header) {
    return request({
        url: '/fire-service/api/apparatus/backend/type/list',
        method: 'get',
        params: query,
        headers: {
            'Authorization': header
        }
    })
}

//添加设备信息
export function createSystemArticle(data, header) {
    console.log(header)
    return request({
        url: '/fire-service/api/apparatus/backend/type/add',
        method: 'post',
        data,
        headers: {
            'Authorization': header
        }
    })
}
//设备名称列表
export function fetchNameDataList(query, header) {
    return request({
        url: '/fire-service/api/apparatus/backend/name/list',
        method: 'get',
        params: query,
        headers: {
            'Authorization': header
        }
    })
}

//添加设备名称信息
export function createNameArticle(data, header) {
    console.log(header)
    return request({
        url: '/fire-service/api/apparatus/backend/name/add',
        method: 'post',
        data,
        headers: {
            'Authorization': header
        }
    })
}
//巡查要点列表
export function fetchCheckPointDataList(query, header) {
    return request({
        url: '/fire-service/api/check-point/list',
        method: 'get',
        params: query,
        headers: {
            'Authorization': header
        }
    })
}

//添加巡查要点信息
export function createCheckPointArticle(data, header) {
    console.log(header)
    return request({
        url: '/fire-service/api/check-point/backend/add',
        method: 'post',
        data,
        headers: {
            'Authorization': header
        }
    })
}

//更新巡查要点信息
export function createCheckPointUpdate(data, header) {
    console.log(header)
    return request({
        url: '/fire-service/api/check-point/backend/update',
        method: 'post',
        data,
        headers: {
            'Authorization': header
        }
    })
}
//设备管理列表
export function fetchAdminDataList(query, header) {
    return request({
        url: '/fire-service/api/apparatus/backend/list',
        method: 'get',
        params: query,
        headers: {
            'Authorization': header
        }
    })
}

//添加设备管理信息
export function createAdminArticle(data, header) {
    console.log(header)
    return request({
        url: '/fire-service/api/apparatus/backend/add',
        method: 'post',
        data,
        headers: {
            'Authorization': header
        }
    })
}
//查看设备管理信息
export function fetchAdminData(query, header) {
    return request({
        url: '/fire-service/api/apparatus/backend/info',
        method: 'get',
        params: query,
        headers: {
            'Authorization': header
        }
    })
}

//更新设备管理信息
export function createAdminUpdate(data, header) {
    console.log(header)
    return request({
        url: '/fire-service/api/apparatus/backend/update',
        method: 'post',
        data,
        headers: {
            'Authorization': header
        }
    })
}









export function fetchAllinfos(data) {
    return request({
        url: '/kyhadoop/getkv_thread',
        method: 'post',
        data
    })
}

export function fetchAppList(data) {
    return request({
        url: '/kyhadoop/kvtag/taglist',
        method: 'post',
        data
    })
}

export function fetchDataList(data) {
    return request({
        url: '/kyhadoop/grid',
        method: 'post',
        data
    })
}

export function fetchList(query) {
    return request({
        url: '/article/list',
        method: 'get',
        params: query
    })
}

export function fetchArticle(id) {
    return request({
        url: '/article/detail',
        method: 'get',
        params: { id }
    })
}

export function fetchPv(pv) {
    return request({
        url: '/article/pv',
        method: 'get',
        params: { pv }
    })
}

export function createArticle(data) {
    return request({
        url: '/article/create',
        method: 'post',
        data
    })
}

export function updateArticle(data) {
    return request({
        url: '/article/update',
        method: 'post',
        data
    })
}
// 短信数据统计
export function msgdataList(data) {
    console.log(data)
    return request({
        url: '/sms/list',
        method: 'post',
        data
    })
}

//模板列表数据
export function msgmodalList(data) {
    console.log(data)
    return request({
        url: '/sms/sendlist',
        method: 'post',
        data
    })
}
export function updateMsgmodel(data) {
    console.log(data)
    return request({
        url: '/sms/sendupdate',
        method: 'post',
        data
    })
}
export function createMsgmodel(data) {
    console.log(data)
    return request({
        url: '/sms/send',
        method: 'post',
        data
    })
}
export function accountList(query) {
    console.log(query)
    return request({
        url: '/sms/smsmultiinfo',
        method: 'get',
        params: query
    })
}
export function getShorturl() {
    return request({
        url: '/sms/shorturl',
        method: 'get'
    })
}
export function getItem(id) {
    return request({
        url: 'sms/getsmssend/' + id,
        method: 'post'
    })
}
export function getTagitem() {
    return request({
        url: 'sms/tags',
        method: 'get'
    })
}