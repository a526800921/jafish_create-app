// 默认头像
export const defaultAvatar = require('./images/default-avatar.png').default

// 路由返回参数
export const routerPayload = (allow = true, message = '', callback) => ({ allow, message, callback })

// 退出页面延迟 ms
export const outPageTime = 800