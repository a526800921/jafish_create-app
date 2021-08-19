import MStore, { UseStorage } from '@jafish/m-store'
import * as service from '../serivce'
import { failPayload, successPayload } from './response'

// 设置平台信息
const ua = window.navigator.userAgent.toLowerCase()
const isWechat = () => ua.indexOf('micromessenger') > -1
const isIphone = () => ua.indexOf("iphone") > -1
const isIpad = () => ua.indexOf("ipad") > -1
const isIOS = () => isIphone() || isIpad()
const isAndroid = () => ua.indexOf('android') > -1 || ua.indexOf('linux') > -1

export const store = new MStore({
    platform: isIOS() ? 'ios' : isAndroid() ? 'android' : 'pc',
    wechat: isWechat(),
    safeAreaBottom: false, // 底部安全区

    loginInfo: { // 登陆信息
        accessToken: '',
    },
}, [
    new UseStorage('root', ['loginInfo'])
])

// 设置底部安全区
export const updateSafeAreaBottom = flag => store.set({ safeAreaBottom: flag })

// 登陆
export const login = async ({ code, state }) => {
    const res = await service.login({ code, state })

    if (res.status !== 200) return failPayload(res.msg)

    store.set({ loginInfo: res.data })

    return successPayload()
}


