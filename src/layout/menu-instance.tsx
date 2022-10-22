import SvgIcon from '@/components/svg-icon'
import CategoryList from '@/pages/commodity/category-list'
import CreateCategory from '@/pages/commodity/category-list/create-category'
import SalesAnalysis from '@/pages/cockpit/sale-analysis'
import UserAnalysis from '@/pages/cockpit/user-analysis'
import CommodityList from '@/pages/commodity/commodity-list'
import CommodityLabel from '@/pages/commodity/commodity-label'
import UserList from '@/pages/account/user-list'
import { IRoutes } from '@/router'

export interface IMenus {
  menus: 'sub-item' | 'menu-item' | 'menu-detail'
  key: string
  label: string
  children?: IMenus[]
  icon?: React.ReactNode
  path?: string
  element?: React.FC | React.ReactNode
}

const MenuInstance: IMenus[] = [
  {
    menus: 'sub-item',
    key: 'cockpit',
    label: '驾驶舱',
    icon: <SvgIcon icon="icon-gongzuotai-copy" />,
    children: [
      {
        menus: 'menu-item',
        key: 'sale',
        label: '销售分析',
        children: [],
        icon: <SvgIcon icon="icon-xiaoshoue" />,
        path: '/cockpit/sale',
        element: <SalesAnalysis />,
      },
      {
        menus: 'menu-item',
        key: 'user',
        label: '用户分析',
        children: [],
        icon: <SvgIcon icon="icon-yonghu" />,
        path: '/cockpit/user',
        element: <UserAnalysis />,
      },
    ],
  },
  {
    menus: 'sub-item',
    key: 'commodity',
    label: '商品',
    icon: <SvgIcon icon="icon-shangpin" />,
    children: [
      {
        menus: 'menu-item',
        key: 'commodity-list',
        label: '商品列表',
        children: [],
        icon: <SvgIcon icon="icon-sp-list" />,
        path: '/commodity/commodity-list',
        element: <CommodityList />,
      },
      {
        menus: 'menu-item',
        key: 'commodity-category',
        label: '商品分类',
        icon: <SvgIcon icon="icon-shangpin-shangpinfenlei" />,
        path: '/commodity/commodity-category',
        element: <CategoryList />,
        children: [
          {
            menus: 'menu-detail',
            key: 'create-category',
            label: '新增商品分类',
            children: [],
            icon: <SvgIcon icon="icon-shangpin-shangpinfenlei" />,
            path: '/commodity/commodity-category/create-category',
            element: <CreateCategory />,
          },
        ],
      },
      {
        menus: 'menu-item',
        key: 'commodity-label',
        label: '商品标签',
        children: [],
        icon: <SvgIcon icon="icon-shangpinbiaoqianguanli" />,
        path: '/commodity/commodity-label',
        element: <CommodityLabel />,
      },
    ],
  },
  {
    menus: 'sub-item',
    label: '账户设置',
    key: 'account-set',
    icon: <SvgIcon icon="icon-yonghu" />,
    children: [
      {
        menus: 'menu-item',
        key: 'account-list',
        label: '账户列表',
        children: [],
        icon: <SvgIcon icon="icon-wxbzhanghu" />,
        path: '/account-set/account-list',
        element: <UserList />,
      },
    ],
  },
]

export const fillMenuRouter: IRoutes[] = []

export const filterMenuKey: IMenus[] = []

const fillMenuArray = (arr: IMenus[]) => {
  arr.forEach(item => {
    filterMenuKey.push(item)
    if (item.menus !== 'sub-item') {
      fillMenuRouter.push({
        title: item.label,
        element: item.element,
        pageType: 'layoutPage',
        layout: true,
        path: item.path,
      } as IRoutes)
    }
    if (item.children) {
      fillMenuArray(item.children)
    }
  })
}

fillMenuArray(MenuInstance)

export default MenuInstance
