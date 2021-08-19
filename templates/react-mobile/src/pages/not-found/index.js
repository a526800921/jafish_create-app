import './index.css'
import React from 'react'

export default function NotFound(props) {

    return (
        <div className="not-found">
            <span>404</span>
            <span>页面不存在</span>
            <button onClick={() => props.history.replace('/')}>返回首页</button>
        </div>
    )
} 