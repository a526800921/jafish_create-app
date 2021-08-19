import { Modal, Toast } from 'antd-mobile'
import { store as RootStore } from '../store/root'

// 提示弹窗
export const showAlert = ({
    title = '',
    message = '',
    submitText = '',
    cancelText = '',
    timeout = 60,
}) => {
    const { platform } = RootStore.get()

    return new Promise(resolve => {
        const close = target => {
            resolve(target)
            clearTimeout(timer)
        }
        const timer = setTimeout(() => close('timeout'), 1000 * timeout)

        Modal.alert(
            title,
            message,
            (cancelText ? [
                {
                    text: cancelText,
                    // style: '',
                    onPress: () => close('cancel')
                }
            ] : []).concat([
                {
                    text: submitText,
                    onPress: () => close('submit')
                }
            ]),
            platform
        )
    })
}

// 提示
export const showToast = (message, time = 2, callback) => {
    if (!message) return
    stopLoading()
    Toast.info(message, time, callback, false)
}

// 失败提示
export const failToast = (message, time = 2, callback) => {
    if (!message) return
    stopLoading()
    Toast.fail(message, time, callback, false)
}

// loading
let loadingTimer = null
// 在loading展示过程中，如果展示了toast，则hideLoading无效
let isLoading = false
let isLoadingTimer = null
const stopLoading = () => {
    isLoading = false
    clearTimeout(isLoadingTimer)
}
export const showLoading = (message, time = 3, callback, mask = false) => {
    if (!message) return
    // 部分数据有缓存，可以不展示loading
    loadingTimer = setTimeout(() => {
        isLoading = true
        isLoadingTimer = setTimeout(() => isLoading = false, time * 1000)

        Toast.loading(message, time, callback, mask)
    }, 10)
}
export const hideLoading = () => {
    clearTimeout(loadingTimer)

    if (isLoading) {
        stopLoading()
        Toast.hide()
    }
}

