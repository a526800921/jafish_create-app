import NotFound from '../pages/not-found'

const context = require.context('../pages', true, /router\.js$/)
const pages = context.keys().map(item => context(item).default || context(item))

// 路由集成
export default pages.concat([
    {
        path: '/404',
        exact: true,
        component: NotFound,
    }
])
