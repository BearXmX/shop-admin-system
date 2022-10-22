import React, { ReactNode } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import routes from '@/router'
import BasicLayout from '@/layout'
import type { IRoutes } from '@/router'

const App: React.FC = () => {
  const getRoutes = (routesArr: IRoutes[]) => {
    return (
      <>
        {routesArr.map((item: IRoutes) => {
          return (
            <Route
              key={item.path}
              path={item.path}
              element={item.layout ? <BasicLayout>{item.element}</BasicLayout> : (item.element as ReactNode)}
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
