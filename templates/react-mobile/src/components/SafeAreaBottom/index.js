import './index.css'
import { store as RootStore } from '../../store/root'
import { createStorerInHook } from '@jafish/store-in-react'

const rootStorer = createStorerInHook(RootStore, state => ({
    safeAreaBottom: state.safeAreaBottom,
}))

// iphone x 的底部安全区
export default function SafeAreaBottom() {
    const { safeAreaBottom } = rootStorer()

    if (!safeAreaBottom) return null
    return <div className="safe-area-bottom"></div>
}