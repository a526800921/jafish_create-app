import AXIOS from 'axios'
import { queryToStr } from '@jafish/utils'
import { store as RootStore } from '../store/root'

// 开发环境代理
if (process.env.NODE_ENV === 'development') AXIOS.defaults.baseURL = '/api'

AXIOS.interceptors.request.use(config => {
    const { loginInfo } = RootStore.get()

    // 设置token
    if (loginInfo.accessToken) config.headers['Authorization'] = `Bearer ${loginInfo.accessToken}`

    return config
})

AXIOS.interceptors.response.use(
    response => {
        console.log(`response ${response.config.method} ${response.config.url}: `, response.data)

        if (response.status >= 200 && response.status < 300) {
            if (response.data && response.data.status === 200) {
                return {
                    status: 200,
                    data: response.data.data || null,
                    msg: '',
                }
            }
        }

        return {
            status: 201,
            data: null,
            msg: (response.data ? (response.data.msg || response.data.message) : '') || '接口错误',
        }
    },
    (err) => {
        console.error(`response error:`, err.toString())
        console.error(`${err.response.config.method} ${err.response.config.url}: `, err.response.data)

        return Promise.resolve({
            status: 201,
            data: null,
            msg: (err.response.data ? (err.response.data.msg || err.response.data.message) : '') || '网络异常，请检查您的网络',
        })
    }
)

const axios = {
    get: (url, data, options) => AXIOS.get(`${url}${queryToStr(data)}`, options),
    post: (url, data, options) => AXIOS.post(url, data, options),
    put: (url, data, options) => AXIOS.put(url, data, options),
}

// 登录
export const login = data => axios.get('/xueguanapi/wechat/auth', data)

