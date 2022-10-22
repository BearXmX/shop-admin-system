import { useEffect, useRef, useState } from 'react'

import { Button, Col, Form, Input, Row, Select, FormInstance, Space, Table } from 'antd'

const Option = Select.Option

const ShopFormTable: React.FC<IShopFormTableProps> = props => {
  const [open, setOpen] = useState(true)

  const [formInfo, setFormInfo] = useState({
    length: 0,
    restCount: 0,
  })

  const [hideIndex, setHideIndex] = useState<number[]>([])

  const [current, setCurrent] = useState<number>(1)

  const [pageSize, setPageSize] = useState<number>(10)

  const formInstance = useRef<FormInstance>(null)

  const foldShowCount = 1

  const { dataSource = [], columns = [], total = 0, loading = false } = props.searchTableProps || {}

  const matchFormItem = (formProps: searchFormItemProps, index: number) => {
    const { searchItemType, placeholder, selectOption } = formProps

    switch (searchItemType) {
      case 'input':
        return <Input placeholder={placeholder} key={index}></Input>
      case 'select':
        const selectOptionList = Array.isArray(selectOption) ? selectOption : []

        return (
          <Select allowClear placeholder={placeholder}>
            {selectOptionList.map((optionItem, optionItemIndex) => {
              return (
                <Option disabled={optionItem.disabled} value={optionItem.value} key={optionItemIndex}>
                  {optionItem.label}
                </Option>
              )
            })}
          </Select>
        )
      default:
        return null
    }
  }

  const renderSearchFormItem = (formProps: searchFormItemListProps) => {
    return formProps.map((item, index) => {
      return (
        <Col span={8} key={index} style={{ display: hideIndex.includes(index) ? 'none' : 'block' }}>
          <Form.Item label={item.label} name={item.name} key={index}>
            {matchFormItem(item, index)}
          </Form.Item>
        </Col>
      )
    })
  }

  const renderAction = () => {
    return (
      <>
        <Col span={open ? (!formInfo.restCount ? 8 : 16 / formInfo.restCount) : 16 / foldShowCount} style={{ textAlign: 'right' }}>
          <Space style={{ height: '100%' }}>
            <Form.Item style={{ marginBottom: 0 }}>
              {formInfo.length >= 3 && (
                <Button type="link" onClick={onFold}>
                  {open ? '折叠' : '展开'}
                </Button>
              )}
            </Form.Item>
            <Form.Item style={{ marginBottom: 0 }}>
              <Button type="default" onClick={onReset}>
                重置
              </Button>
            </Form.Item>
            <Form.Item style={{ marginBottom: 0 }}>
              <Button type="primary" onClick={onSearch}>
                查询
              </Button>
            </Form.Item>
          </Space>
        </Col>
      </>
    )
  }

  const onFold = () => {
    setOpen(!open)

    const searchFormItemList = props.searchFormItemList as searchFormItemListProps

    setHideIndex(
      hideIndex.length
        ? []
        : searchFormItemList
            .map((v, index) => {
              return index
            })
            .filter((v, index) => index >= foldShowCount)
    )
  }

  const onPageChange = (page: number, size: number) => {
    if (size === pageSize) {
      setCurrent(page)
      props.onSearch({
        page: page,
        pageSize,
        ...(formInfo.length && formInstance.current?.getFieldsValue()),
      })
    }
  }

  const onPageSizeChange = (_page: number, size: number) => {
    setCurrent(1)
    setPageSize(size)
    props.onSearch({
      page: 1,
      pageSize: size,
      ...(formInfo.length && formInstance.current?.getFieldsValue()),
    })
  }

  const onReset = () => {
    formInstance.current?.resetFields()
    props.onSearch({
      page: 1,
      pageSize,
      ...(formInfo.length && formInstance.current?.getFieldsValue()),
    })
  }

  const onSearch = () => {
    const formValue = formInstance.current?.getFieldsValue()
    props.onSearch({
      page: 1,
      pageSize,
      ...(formInfo.length && formValue),
    })
  }

  useEffect(() => {
    const formItemLength = (props.searchFormItemList as searchFormItemListProps)?.length || 0

    if (formItemLength) {
      setFormInfo({
        length: formItemLength,
        restCount: formItemLength > 3 ? formItemLength % 3 : 0,
      })
    }
    props.onSearch({
      page: current,
      pageSize,
      ...(formItemLength && formInstance.current?.getFieldsValue()),
    })
  }, [props.searchFormItemList])

  return (
    <div className="shop-form-table">
      <>
        {Array.isArray(props.searchFormItemList) && !!props.searchFormItemList?.length && (
          <Form layout="vertical" ref={formInstance}>
            <Row gutter={12}>
              <>
                {renderSearchFormItem(props.searchFormItemList || [])}
                {(!open || !!formInfo.restCount || formInfo.length < 3) && renderAction()}
              </>
            </Row>
            {formInfo.length >= 3 && open && !formInfo.restCount && (
              <Row justify="end" gutter={10}>
                {renderAction()}
              </Row>
            )}
          </Form>
        )}
      </>
      <Table
        dataSource={dataSource}
        columns={columns}
        loading={loading}
        pagination={{
          total,
          current,
          pageSize,
          showQuickJumper: true,
          showSizeChanger: true,
          hideOnSinglePage: false,
          pageSizeOptions: ['10', '20', '50', '100'],
          onChange: onPageChange,
          onShowSizeChange: onPageSizeChange,
        }}
      ></Table>
    </div>
  )
}

export default ShopFormTable
