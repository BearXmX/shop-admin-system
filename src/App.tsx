import React, { ReactNode } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
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
    <BrowserRouter>
      <Routes>{getRoutes(routes)}</Routes>
    </BrowserRouter>
  )
}

export default App
