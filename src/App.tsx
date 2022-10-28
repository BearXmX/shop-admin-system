import React, { ReactNode, useEffect, useState } from 'react'
import { Spin } from 'antd'
import { HashRouter, Routes, Route } from 'react-router-dom'
import routes from '@/router'
import BasicLayout from '@/layout'
import type { IRoutes } from '@/router'

interface ILoading {
  children?: React.ReactNode
}

const Loading: React.FC<ILoading> = props => {
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if (!localStorage.getItem('currentUser') && window.location.hash !== '#/login') {
      window.location.href = '/#/login'
    }
    setTimeout(() => {
      setLoading(false)
    }, 200)
  }, [])

  return <>{loading ? <Spin spinning={true} tip={'玩命加载中'}></Spin> : props.children}</>
}

const App: React.FC = () => {
  const getRoutes = (routesArr: IRoutes[]) => {
    return (
      <>
        {routesArr.map((item: IRoutes) => {
          return (
            <Route
              key={item.path}
              path={item.path}
              element={<Loading key={item.path}>{item.layout ? <BasicLayout>{item.element}</BasicLayout> : (item.element as ReactNode)}</Loading>}
            ></Route>
          )
        })}
      </>
    )
  }

  return (
    <HashRouter>
      <Routes>{getRoutes(routes)}</Routes>
    </HashRouter>
  )
}

export default App
