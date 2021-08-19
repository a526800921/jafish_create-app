import './App.css'
import { useEffect } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { addSubscribe, queryToObj, runSubscribe } from '@jafish/utils'
import { createStorerInHook } from '@jafish/store-in-react'

import routers from './router'
import { hideLoading, showAlert, showLoading, showToast } from './utils/interactive'
import { login, store as RootStore } from './store/root'

import Tabbar from './components/Tabbar'

// 格式化路由查询参数
const formatUrl = (Node, params = {}) => props => {
  const query = queryToObj(props.location.search)

  // 路由参数验证
  if (typeof params.verify === 'function') {
    const { allow, message, callback } = params.verify({ ...props, query })

    if (!allow) {
      Promise.resolve().then(() => typeof callback === 'function' ? callback() : showToast(message || '参数有误', 1, () => props.history.goBack()))
      return null
    }
  }

  runSubscribe('RouteChange', params, { ...props, query })
  return <Node {...props} query={query} />
}

addSubscribe('RouteChange', (params, props) => {
  // 切换页面时切换标题
  const dTitle = '个人中心'
  if (typeof params.title === 'function') {
    const title = params.title(props)

    document.title = title || dTitle
  }
  else if (typeof params.title === 'string' && params.title) document.title = params.title
  else document.title = dTitle
})

const isDev = process.env.NODE_ENV === 'development'
const enterPath = window.location.pathname
const authPath = '/wechat/auth'
const query = queryToObj(window.location.href)

const AuthPage = () => {
  useEffect(() => {
    showLoading('登录中..', 1000)
    // 登录
    login({ code: query.code, state: query.state })
      .then(res => {
        hideLoading()
        // 登录失败
        if (!res.success) return showAlert({ title: res.msg || '登陆失败，请退出重试', submitText: '确定', timeout: 10 }).then(() => window.wx.closeWindow())
        // 登录成功
        // 由 accessToken 触发直接切换到首页
      })
  }, [])
  return <></>
}

// 使用状态
const rootStore = createStorerInHook(RootStore, state => ({
  accessToken: state.loginInfo.accessToken,
}))

function App() {
  // const { accessToken } = rootStore()

  // useEffect(() => {
  //   if (
  //     // token不存在
  //     !accessToken &&
  //     // 且非登录页面
  //     enterPath !== authPath
  //   ) {
  //     // 开发环境
  //     if (isDev) {
  //       // 跳转到模拟登录页面
  //       window.location.href = '/wechat/auth?code=061xPcGa1qXoBB0mwbHa1dyP8l4xPcG-&state=611d1f34cf482d3b0d644d7d'
  //     }
  //     // 线上环境需要进行跳转
  //     else {
  //       // 则跳转到登录页面
  //       window.location.href = '/xueguanapi/wechat/authUrl'
  //     }
  //   }
  // }, [accessToken])

  // // 无 token 时拦截处理
  // if (!accessToken) {
  //   if (enterPath === authPath) return <AuthPage />
  //   return null
  // }

  return (
    <BrowserRouter>
      <div className="app">
        <div className="app-main">
          <Switch>
            <Redirect from="/" to="/home" exact />

            {
              routers.map(item => (
                <Route
                  key={item.path}
                  path={item.path}
                  exact={true}
                  component={formatUrl(item.component, item.params)}
                />
              ))
            }

            <Redirect to="/404" />
          </Switch>
        </div>

        <div className="app-tab">
          <Route
            path="/"
            component={formatUrl(Tabbar)}
          />
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
