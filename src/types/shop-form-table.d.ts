declare type searchItemType = 'input' | 'select' | 'radioButton'

declare type selectOptionProps = {
  label: string
  value: number | string
  disabled?: boolean
}
declare type selectOptionListType = selectOptionProps[]

declare type searchFormItemProps = {
  searchItemType: searchItemType
  name: string
  label: string
  placeholder?: string
  selectOption?: selectOptionListType
}

declare type searchFormItemListProps = searchFormItemProps[]

declare interface IShopFormTableProps {
  searchFormItemList: searchFormItemListProps | false
}
