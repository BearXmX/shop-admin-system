import React, { useState, useEffect } from 'react'
import { Breadcrumb, Layout, Menu } from 'antd'
import { useNavigate } from 'react-router-dom'
import MenuInstance, { filterMenuKey } from './menu-instance'
import SvgIcon from '@/components/svg-icon'
import type { IMenus } from './menu-instance'
import './index.less'

const { Content, Sider } = Layout

interface IProps {
  children: React.FC | React.ReactNode
}

const BasicLayout: React.FC<IProps> = props => {
  const [highLight, setHighLight] = useState<string>('')
  const [bread, setBread] = useState<string[]>([])

  const navigate = useNavigate()

  const getBreadcrumb = () => {
    const titleArr: string[] = []
    window.location.pathname
      .split('/')
      .filter(item => item)
      .forEach(item => {
        const label = matchKey(item)
        titleArr.push(label as unknown as string)
      })
    setBread(titleArr)
  }

  const matchKey = (key: string) => {
    return filterMenuKey.find(item => item.key === key)?.label
  }

  /**
   * @description: 点击menu菜单的回调
   * @param {any} e
   */
  const menuClick = (e: { key: string; keyPath: string[] }) => {
    navigate('/' + e.keyPath[1] + '/' + e.keyPath[0])
  }

  useEffect(() => {
    setHighLight(window.location.pathname)
  }, [])

  useEffect(() => {
    getBreadcrumb()
  }, [window.location.pathname])

  return (
    <Layout>
      <Sider breakpoint="lg" collapsedWidth="100" width={300}>
        <div className="layout-logo">
          <div className="left-logo">
            <SvgIcon icon="icon-bear" style={{ fontSize: 52 }} />
          </div>
          <div className="right-text">
            <p className="fix-text">后台系统管理界面</p>
            <p className="fix-user">欢迎您：熊哥哥</p>
          </div>
        </div>
        {highLight && (
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={[highLight.split('/')[2]]}
            defaultOpenKeys={MenuInstance.map((item: IMenus) => item.key)}
            onClick={menuClick}
            items={MenuInstance.map(item => {
              item.children?.forEach(v => {
                v.children = undefined
              })
              return item
            })}
          ></Menu>
        )}
      </Sider>
      <Layout>
        <Content style={{ margin: '16px 16px 0' }}>
          <Breadcrumb style={{ marginBottom: 10 }}>
            {bread.map((item, index) => {
              return (
                <Breadcrumb.Item key={item}>
                  {<span style={{ color: index === bread.length - 1 ? '#5b6aff' : '#9da2ac' }}>{item}</span>}
                </Breadcrumb.Item>
              )
            })}
          </Breadcrumb>
          {props.children as React.ReactNode}
        </Content>
      </Layout>
    </Layout>
  )
}

export default React.memo(BasicLayout)
