import SvgIcon from '../svg-icon'
import './index.less'

const ShopEmpty: React.FC = () => {
  return (
    <div className="shop-empty">
      <SvgIcon style={{ fontSize: 120 }} icon="icon-quesheng-kongkongruye" />
      <p className="shop-empty-desc">空空如也</p>
    </div>
  )
}

export default ShopEmpty
