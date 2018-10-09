import request from '@/utils/request'

import {
    getToken,
    setToken,
    removeToken
} from '@/utils/auth'

//更新token
export function fetchToken(data, header) {
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
    return request({
        url: '/fire-service/api/building/backend/add',
        method: 'post',
        data,
        headers: {
            'Authorization': header
        }
    })
}
//人员下拉
export function fetchUserDownDataList(query, header) {
    return request({
        url: '/fire-service/api/user/backend/down-list',
        method: 'get',
        params: query,
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

    return request({
        url: '/fire-service/api/apparatus/backend/update',
        method: 'post',
        data,
        headers: {
            'Authorization': header
        }
    })
}


//任务查询列表
export function fetchQueryDataList(query, header) {
    return request({
        url: '/fire-service/api/task/backend/list',
        method: 'get',
        params: query,
        headers: {
            'Authorization': header
        }
    })
}

//更新设备管理信息
export function createTaskAdd(data, header) {

    return request({
        url: '/fire-service/api/task/backend/add',
        method: 'post',
        data,
        headers: {
            'Authorization': header
        }
    })
}
//隐患查询列表
export function fetchCheckRecordDataList(query, header) {
    return request({
        url: '/fire-service/api/check-record/backend/list',
        method: 'get',
        params: query,
        headers: {
            'Authorization': header
        }
    })
}
//任务查询详情
export function fetchTaskData(query, header) {
    return request({
        url: '/fire-service/api/task/backend/info',
        method: 'get',
        params: query,
        headers: {
            'Authorization': header
        }
    })
}
//隐患查询详情
export function fetchCheckRecordData(query, header) {
    return request({
        url: '/fire-service/api/check-record/backend/trouble/info',
        method: 'get',
        params: query,
        headers: {
            'Authorization': header
        }
    })
}
//设备巡查查询详情
export function fetchCheckRecordInfosData(query, header) {
    return request({
        url: '/fire-service/api/check-record/backend/info/detail',
        method: 'get',
        params: query,
        headers: {
            'Authorization': header
        }
    })
}
//保养查询列表
export function fetchUpkeepDataList(query, header) {
    return request({
        url: '/fire-service/api/upkeep-record/backend/list',
        method: 'get',
        params: query,
        headers: {
            'Authorization': header
        }
    })
}
//保养查询详情
export function fetchUpkeepRecordData(query, header) {
    return request({
        url: '/fire-service/api/upkeep-record/backend/info',
        method: 'get',
        params: query,
        headers: {
            'Authorization': header
        }
    })
}
//维修查询列表
export function fetchWorkrecordDataList(query, header) {
    return request({
        url: '/fire-service/api/work-record/backend/list',
        method: 'get',
        params: query,
        headers: {
            'Authorization': header
        }
    })
}
//维修查询详情
export function fetchWorkRecordData(query, header) {
    return request({
        url: '/fire-service/api/work-record/backend/info',
        method: 'get',
        params: query,
        headers: {
            'Authorization': header
        }
    })
}

//任务通过
export function taskPassPost(data, header) {

    return request({
        url: '/fire-service/api/task/backend/turn-confirm',
        method: 'post',
        data,
        headers: {
            'Authorization': header
        }
    })
}

//任务驳回
export function taskRejectPost(data, header) {

    return request({
        url: '/fire-service/api/task/backend/turn-down',
        method: 'post',
        data,
        headers: {
            'Authorization': header
        }
    })
}

//任务转发
export function taskDistributePost(data, header) {

    return request({
        url: '/fire-service/api/task/backend/turn-execute',
        method: 'post',
        data,
        headers: {
            'Authorization': header
        }
    })
}
//任务取消
export function taskCancelPost(data, header) {

    return request({
        url: '/fire-service/api/task/backend/cancel',
        method: 'post',
        data,
        headers: {
            'Authorization': header
        }
    })
}
//发送短信
export function sendInfoPost(data, header) {

    return request({
        url: '/fire-service/api/notify/sms/send',
        method: 'post',
        data,
        headers: {
            'Authorization': header
        }
    })
}