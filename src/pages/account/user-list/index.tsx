import { useState } from 'react'
import ShopFormTable from '@/components/shop-form-table'
import { getAllUser } from '@/api/user'
import { Button } from 'antd'

type ITableItem = Omit<LoginResponseType, 'token' | 'tokenId'>

const UserList: React.FC = () => {
  const [dataSource, setDataSource] = useState<ITableItem[]>([])

  const [loading, setLoading] = useState<boolean>(false)

  const [total, setTotal] = useState<number>(0)

  const searchFormList: searchFormItemListProps = [
    {
      searchItemType: 'input',
      label: '账户名称',
      name: 'username',
      placeholder: '请输入',
    },
    {
      searchItemType: 'select',
      label: '角色',
      name: 'role',
      placeholder: '请选择',
      selectOption: [
        {
          label: '超级管理员',
          value: 1,
        },
        {
          label: '管理员',
          value: 2,
        },
        {
          label: '超级用户',
          value: 3,
        },
        {
          label: '普通用户',
          value: 4,
        },
      ],
    },
  ]

  const columns = [
    {
      title: '账户名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
      key: 'nickname',
      render: (dataIndex: string) => {
        return <>{dataIndex ? dataIndex : '-'}</>
      },
    },
    {
      title: '性别',
      dataIndex: 'gender',
      key: 'gender',
      render: (dataIndex: number) => {
        return <>{dataIndex === 1 ? '男' : '女'}</>
      },
    },
    {
      title: '角色',
      dataIndex: 'roleDescription',
      key: 'roleDescription',
    },
    {
      title: '操作',
      render: (record: ITableItem) => {
        return (
          <>
            <Button style={{ padding: 0 }} type="link">
              编辑
            </Button>
          </>
        )
      },
    },
  ]

  const getUser = async (params: { username?: string; role?: number; page: number; pageSize: number }) => {
    const res = await getAllUser(params)
    if (res.status === 200) {
      setDataSource(res.data?.list || [])
      setLoading(false)
      setTotal(res.data?.total)
    }
  }

  const onSearch: onSearchType<{
    username?: string
    role?: number
  }> = params => {
    setLoading(true)
    getUser(params)
  }

  return (
    <ShopFormTable
      actionButton={[
        {
          type: 'primary',
          onClick: () => {
            console.log('primary')
          },
          text: '新增',
          icon: 'plus',
        },
      ]}
      searchTableProps={{
        dataSource,
        columns,
        total,
        loading,
        rowKey: 'id',
      }}
      searchFormItemList={searchFormList}
      onSearch={onSearch}
    ></ShopFormTable>
  )
}

export default UserList
