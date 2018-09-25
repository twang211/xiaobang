import {
    loginByUsername,
    logout
} from '@/api/login'
import {
    getToken,
    setToken,
    removeToken
} from '@/utils/auth'

const user = {
    state: {
        user: '',
        status: '',
        code: '',
        token: getToken(),
        name: '',
        avatar: '',
        introduction: '',
        roles: [],
        setting: {
            articlePlatform: []
        }
    },

    mutations: {
        SET_CODE: (state, code) => {
            state.code = code
        },
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_INTRODUCTION: (state, introduction) => {
            state.introduction = introduction
        },
        SET_SETTING: (state, setting) => {
            state.setting = setting
        },
        SET_STATUS: (state, status) => {
            state.status = status
        },
        SET_NAME: (state, name) => {
            state.name = name
        },
        SET_AVATAR: (state, avatar) => {
            console.log(avatar, "avataravataravataravataravatar")
            state.avatar = avatar
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        },
        SET_USER: (state, user) => {
            state.user = user
        }
    },
    //TODO:用户登录&&用户信息
    actions: {
        // 用户名登录
        LoginByUsername({
            commit
        }, userInfo) {
            const username = userInfo.loginAccount.trim()
            return new Promise((resolve, reject) => {
                loginByUsername(username, userInfo.password, userInfo.beFrom).then(response => {
                    console.log("8888", response.data.resultData)
                    setToken(response.data.resultData)
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 获取用户信息
        GetUserInfo({
            commit,
            state
        }) {
            return new Promise((resolve, reject) => {
                const data = JSON.parse(getToken())
                console.log(data, "datadatadatadatadatadatadatadatadatadata")
                if (data.userInfo.roleLevel) { // 验证返回的roles是否是一个非空数组
                    commit('SET_ROLES', data.userInfo.roleLevel)
                } else {
                    reject('getInfo: roles must be a non-null array !')
                }
                commit('SET_NAME', data.userInfo.userName)
                commit('SET_USER', data.userInfo)
                commit('SET_AVATAR', data.userInfo.headImageUri)
                resolve(state.user)
            })
        },

        // 第三方验证登录
        // LoginByThirdparty({ commit, state }, code) {
        //   return new Promise((resolve, reject) => {
        //     commit('SET_CODE', code)
        //     loginByThirdparty(state.status, state.email, state.code).then(response => {
        //       commit('SET_TOKEN', response.data.token)
        //       setToken(response.data.token)
        //       resolve()
        //     }).catch(error => {
        //       reject(error)
        //     })
        //   })
        // },

        // 登出
        LogOut({
            commit,
            state
        }) {
            console.log(state, "statestatestatestatestatestate")

            const data = JSON.parse(state.token)
            const header = "Bearer " + data.userToken
            return new Promise((resolve, reject) => {
                logout(header).then(() => {
                    commit('SET_TOKEN', '')
                    commit('SET_ROLES', [])
                    removeToken()
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 前端 登出
        FedLogOut({
            commit
        }) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '')
                removeToken()
                resolve()
            })
        },

        // 动态修改权限
        ChangeRoles({
            commit
        }, role) {
            return new Promise(resolve => {
                commit('SET_TOKEN', role)
                setToken(role)
                getUserInfo(role).then(response => {
                    const data = response.data
                    console.log(data, "datadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadata")
                    commit('SET_ROLES', data.userInfo.roleLevel)
                    commit('SET_NAME', data.userInfo.userName)
                    commit('SET_AVATAR', data.userInfo.headImageUri)
                    commit('SET_INTRODUCTION', data.introduction)
                    resolve()
                })
            })
        }
    }
}

export default user