import { useEffect, useRef, useState } from 'react'
import { Form, Input, Button, FormInstance, message, notification } from 'antd'

import { login } from '@/api/login'

import { useDispatch } from 'react-redux'
import { isWhatTime } from '@/utills'
import { useNavigate } from 'react-router-dom'

import { tips } from '@/index'
import LoginCover from '@/assets/images/login.png'

import './index.less'

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false)

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const form = useRef<
    FormInstance<{
      username: string
      password: string | number
    }>
  >(null)

  const onFinish = async () => {
    setIsLogin(true)

    const formValues = form.current?.getFieldsValue()

    const res = await login(formValues!)

    if (res.status === 200) {
      message.success('登录成功')

      window.localStorage.setItem('currentUser', JSON.stringify(res.data))

      dispatch({
        type: 'login',
        payload: res.data,
      })

      notification.success({
        message: `${isWhatTime()}好，${res.data.nickname}`,
        description: `${tips}`,
        duration: 2,
      })

      setTimeout(() => {
        setIsLogin(false)
        navigate('/')
      }, 1000)

      return
    }

    setIsLogin(false)
  }

  useEffect(() => {
    if (window.localStorage.getItem('currentUser')) {
      message.warning('您已登录，请勿重复登录')

      setTimeout(() => {
        navigate('/')
      }, 300)
    }
  }, [])

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-content-left">
          <img src={LoginCover} alt="" />
        </div>
        <div className="login-content-right">
          <div className="login-content-tips">{isWhatTime() + '好，今天也要好好coding鸭'}</div>
          <div className="login-content-form">
            <Form layout={'vertical'} ref={form} onFinish={onFinish}>
              <Form.Item
                name="username"
                label="账号"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input autoFocus placeholder="请输入账号"></Input>
              </Form.Item>
              <Form.Item
                name="password"
                label="密码"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input.Password placeholder="请输入密码"></Input.Password>
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  span: 24,
                }}
                style={{
                  textAlign: 'right',
                }}
              >
                <Button htmlType="reset" type="default">
                  重置
                </Button>
                <Button disabled={isLogin} htmlType="submit" type="primary" style={{ marginLeft: 10 }}>
                  登录
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
