import ShopFormTable from '@/components/shop-form-table'

const UserList: React.FC = () => {
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
      ],
    },
  ]

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    },
  ]

  const dataSource = Array(21)
    .fill(null)
    .map((v, index) => {
      return {
        key: index + 1 + '',
        name: '胡彦斌' + index + 1 + '',
        age: index + 1,
        address: `西湖区湖底公园${index + 1 + ''}号`,
      }
    })

  const onSearch: IShopFormTableProps['onSearch'] = params => {
    console.log(params, '---')
  }

  return (
    <ShopFormTable
      searchTableProps={{
        dataSource,
        columns,
        total: dataSource.length,
        loading: false,
      }}
      searchFormItemList={searchFormList}
      onSearch={onSearch}
    ></ShopFormTable>
  )
}

export default UserList
