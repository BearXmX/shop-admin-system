/*
 * @Date: 2022-05-01 16:03:02
 * @LastEditors: 熊明祥
 * @LastEditTime: 2022-05-04 17:20:28
 * @Description:
 */
import { Button } from 'antd'
import PageNotFoundImg from '@/assets/images/404error.svg'
import { useNavigate } from 'react-router-dom'

const PageNotFound: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="page-not-found">
      <img src={PageNotFoundImg} alt="" />
      <h2>404页面丢失</h2>
      <Button type="primary" onClick={() => navigate('/')}>
        返回主页
      </Button>
    </div>
  )
}

export default PageNotFound
