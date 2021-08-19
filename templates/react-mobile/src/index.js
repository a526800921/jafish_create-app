import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { store as rootStore, updateSafeAreaBottom } from './store/root'

import 'antd-mobile/dist/antd-mobile.css';

const root = document.getElementById('root')

ReactDOM.render(
  // 因 ant-mobile 在严格模式下会出现bug，故不使用严格模式
  // <React.StrictMode>
    <App />,
  // </React.StrictMode>,
  root
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// 解决失焦后ios页面不回弹的问题
let timer = null
document.addEventListener('focus', e => {
  if (rootStore.get().platform === 'ios') {
    if (['input', 'textarea'].indexOf(e.target.nodeName.toLowerCase()) > -1) clearTimeout(timer)
  }
}, { once: false, passive: true, capture: true })
document.addEventListener('blur', e => {
  if (rootStore.get().platform === 'ios') {
    if (['input', 'textarea'].indexOf(e.target.nodeName.toLowerCase()) > -1) {
      timer = setTimeout(() => {
        document.activeElement.scrollIntoViewIfNeeded(true)
        window.scroll(0, 0) // 解决ios13页面错位问题
      }, 300)
    }
  }
}, { once: false, passive: true, capture: true })

// 判断iphone x，底部增高
const resize = () => {
  if (rootStore.get().platform === 'ios') {
    // x, xs, xs max, 11 pro, 12mini, 12, 12pro, 12pro max
    const isIPhoneX = window.devicePixelRatio === 3 && window.screen.width >= 360 && window.screen.width <= 428 && window.screen.height >= 780
    // xr, 11
    const isIPhoneXR = window.devicePixelRatio === 2 && window.screen.width === 414 && window.screen.height === 896

    const flag = isIPhoneX || isIPhoneXR

    // 切换了页面
    const change = flag && (root.offsetHeight < (isIPhoneX ? 700 : 750))

    updateSafeAreaBottom(change ? false : flag)
  }
}

setTimeout(() => resize(), 300)
window.addResizeHook(resize)

