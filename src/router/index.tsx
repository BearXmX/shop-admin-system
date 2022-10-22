/*
 * @Date: 2022-05-01 14:46:38
 * @LastEditors: 熊明祥
 * @LastEditTime: 2022-05-04 14:55:15
 * @Description:
 */
import { Navigate } from 'react-router-dom'
import PageNotFound from '@/pages/404'
import Login from '@/pages/login'
import { fillMenuRouter } from '@/layout/menu-instance'

export interface IRoutes {
  path: string
  element: React.FC | React.ReactNode
  layout: boolean
  title: string
  pageType: 'layoutPage' | 'blankPage'
}

const routes: IRoutes[] = [
  ...fillMenuRouter,
  {
    path: '/',
    element: <Navigate to="/cockpit/sale" />,
    layout: true,
    title: '驾驶舱',
    pageType: 'layoutPage',
  },
  {
    path: '/login',
    element: <Login />,
    layout: false,
    title: '登录',
    pageType: 'blankPage',
  },
  {
    path: '*',
    element: <PageNotFound />,
    layout: false,
    title: '404',
    pageType: 'blankPage',
  },
]

export default routes
