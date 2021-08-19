import './index.css'
import React from 'react'
import { TabBar } from 'antd-mobile'
import SafeAreaBottom from '../SafeAreaBottom'

const tabs = [
    {
        title: '首页',
        path: '/home',
        icon: () => <img className="tabbar-icon" src={require('../../images/home-unselect.png').default} alt="icon" />,
        selectedIcon: () => <img className="tabbar-icon" src={require('../../images/home-select.png').default} alt="icon" />,
    },
    {
        title: '我的',
        path: '/profile',
        icon: () => <img className="tabbar-icon" src={require('../../images/profile-unselect.png').default} alt="icon" />,
        selectedIcon: () => <img className="tabbar-icon" src={require('../../images/profile-select.png').default} alt="icon" />,
    },
]

export default function Tabbar({ location, history }) {
    const { pathname } = location
    const find = tabs.find(tab => tab.path === pathname)

    if (!find) return <></>

    return (
        <>
            <div className="tabbar">
                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#33A3F4"
                    noRenderContent
                >
                    {
                        tabs.map(tab => (
                            <TabBar.Item
                                title={tab.title}
                                key={tab.path}
                                icon={tab.icon()}
                                selectedIcon={tab.selectedIcon()}
                                selected={pathname === tab.path}
                                onPress={() => history.replace(tab.path)}
                            ></TabBar.Item>
                        ))
                    }
                </TabBar>

                <SafeAreaBottom />
            </div>
        </>
    )
}
