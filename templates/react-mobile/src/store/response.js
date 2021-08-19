export const failPayload = (msg = 'fail') => ({ success: false, msg, data: null })
export const successPayload = (data = null) => ({ success: true, msg: '', data })