import React, { useState, useEffect } from 'react'
import { Breadcrumb, Button, Dropdown, Layout, Menu } from 'antd'

import SvgIcon from '@/components/svg-icon'

import type { IMenus } from './menu-instance'

import { connect, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import MenuInstance, { filterMenuKey } from './menu-instance'

import './index.less'

const { Content, Sider, Header } = Layout

interface IProps {
  children: React.FC | React.ReactNode
  currentUser: LoginResponseType
}

const BasicLayout: React.FC<IProps> = props => {
  const [highLight, setHighLight] = useState<string>('')

  const [bread, setBread] = useState<string[]>([])

  const navigate = useNavigate()

  const dispatch = useDispatch()

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

  const quit = () => {
    dispatch({
      type: 'quit',
      payload: {},
    })
    window.localStorage.removeItem('currentUser')
    navigate('/login')
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
        <div className="shop-layout-logo">
          <div className="shop-logo">
            <SvgIcon icon="icon-bear" style={{ fontSize: 52 }} />
          </div>
          <div className="shop-tips-text">
            <p className="shop-tips-title">shop后台管理系统</p>
            <p className="shop-tips-user">欢迎您：{props.currentUser?.nickname || '-'}</p>
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
        <Header>
          <div className="shop-layout-header">
            <Dropdown
              overlay={
                <Menu
                  items={[
                    {
                      key: '1',
                      label: <Button type="link">个人中心</Button>,
                    },
                    {
                      key: '2',
                      label: (
                        <Button type="link" onClick={quit}>
                          退出
                        </Button>
                      ),
                    },
                  ]}
                />
              }
            >
              <div className="shop-current-user-nickname">{props.currentUser?.nickname || '-'}</div>
            </Dropdown>
            <img className="shop-current-user-avatar" src={props.currentUser.avatar} alt="" />
          </div>
        </Header>
        <Content>
          <Breadcrumb style={{ marginBottom: 10 }}>
            {bread.map((item, index) => {
              return <Breadcrumb.Item key={item}>{<span>{item}</span>}</Breadcrumb.Item>
            })}
          </Breadcrumb>
          <div className="shop-layout-content">{props.children as React.ReactNode}</div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default connect(({ currentUser }: { currentUser: LoginResponseType }) => ({
  currentUser,
}))(BasicLayout)
