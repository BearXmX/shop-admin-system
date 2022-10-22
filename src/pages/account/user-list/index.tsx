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
  return <ShopFormTable searchFormItemList={searchFormList}></ShopFormTable>
}

export default UserList
