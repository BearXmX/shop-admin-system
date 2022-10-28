import { useEffect, useRef, useState } from 'react'

import { Button, Col, Form, Input, Row, Select, FormInstance, Space, Table } from 'antd'

const Option = Select.Option

const ShopFormTable: React.FC<IShopFormTableProps> = props => {
  const [open, setOpen] = useState(true)

  const [span, setSpan] = useState<number>(0)

  const [btnSpan, setBtnSpan] = useState<number>(0)

  const [btnColFlex, setBtnColFlex] = useState<{
    colCount: number
    btnCloseCol: number
    btnOpenCol: number
  }>({
    colCount: 0,
    btnCloseCol: 0,
    btnOpenCol: 0,
  })

  const [hideIndex, setHideIndex] = useState<number[]>([])

  const [current, setCurrent] = useState<number>(1)

  const [pageSize, setPageSize] = useState<number>(10)

  const formInstance = useRef<FormInstance>(null)

  const divRef = useRef<HTMLDivElement>(null)

  const closeStatusColCount = 2

  const { dataSource = [], columns = [], total = 0, loading = false } = props.searchTableProps || {}

  const searchFormItemList = props.searchFormItemList as searchFormItemListProps

  const countLength = searchFormItemList.length

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

  const computedSpan = (colCount: number, colSpan: number) => {
    const rest = countLength % colCount

    const btnOpenCol = rest === 0 ? 24 : (colCount - rest) * colSpan

    setBtnSpan(btnOpenCol)

    setSpan(colSpan)

    setBtnColFlex({
      colCount,
      btnCloseCol: colSpan,
      btnOpenCol,
    })

    setOpen(!open)

    setHideIndex([])
  }

  const renderSearchFormItem = (formProps: searchFormItemListProps) => {
    return formProps.map((item, index) => {
      return (
        <Col span={span} key={index} style={{ display: hideIndex.includes(index) ? 'none' : 'block' }}>
          <Form.Item label={item.label} name={item.name} key={index}>
            {matchFormItem(item, index)}
          </Form.Item>
        </Col>
      )
    })
  }

  const onFold = () => {
    setHideIndex(hideIndex.length ? [] : searchFormItemList.filter((item, index) => index >= closeStatusColCount).map((item, index) => index))

    const count = btnColFlex.colCount - (closeStatusColCount % btnColFlex.colCount)

    setBtnSpan(hideIndex.length ? btnColFlex.btnOpenCol : count === 0 ? 24 : count * btnColFlex.btnCloseCol)

    setOpen(!open)
  }

  const onPageChange = (page: number, size: number) => {
    if (size === pageSize) {
      setCurrent(page)
      props.onSearch({
        page: page,
        pageSize,
        ...(!!countLength && formInstance.current?.getFieldsValue()),
      })
    }
  }

  const onPageSizeChange = (_page: number, size: number) => {
    setCurrent(1)
    setPageSize(size)
    props.onSearch({
      page: 1,
      pageSize: size,
      ...(!!countLength && formInstance.current?.getFieldsValue()),
    })
  }

  const onReset = () => {
    formInstance.current?.resetFields()
    props.onSearch({
      page: 1,
      pageSize,
      ...(!!countLength && formInstance.current?.getFieldsValue()),
    })
  }

  const onSearch = () => {
    const formValue = formInstance.current?.getFieldsValue()
    props.onSearch({
      page: 1,
      pageSize,
      ...(!!countLength && formValue),
    })
  }

  const resetSpan = (width: number) => {
    if (width <= 768) {
      computedSpan(2, 12)
    } else if (width > 768 && width <= 1200) {
      computedSpan(3, 8)
    } else {
      computedSpan(4, 6)
    }
  }

  useEffect(() => {
    const width = divRef.current?.offsetWidth!
    resetSpan(width)
  }, [])

  useEffect(() => {
    window.onresize = function (e) {
      const width = divRef.current?.offsetWidth!
      resetSpan(width)
    }
    return () => {
      window.onresize = null
    }
  }, [])

  useEffect(() => {
    props.onSearch({
      page: current,
      pageSize,
      ...(!!countLength && formInstance.current?.getFieldsValue()),
    })
  }, [props.searchFormItemList])

  return (
    <div className="shop-form-table" ref={divRef}>
      <>
        {Array.isArray(props.searchFormItemList) && !!props.searchFormItemList?.length && (
          <Form layout="vertical" ref={formInstance} style={{ marginBottom: 20 }}>
            <Row gutter={12}>
              <>
                {renderSearchFormItem(props.searchFormItemList || [])}
                <Col span={btnSpan} style={{ textAlign: 'right' }}>
                  <Space style={{ height: '100%' }}>
                    {props.searchFormItemList.length > 3 && (
                      <Button type="link" onClick={() => onFold()}>
                        {hideIndex.length ? '展开' : '收起'}
                      </Button>
                    )}
                    <Button type="default" onClick={onReset}>
                      重置
                    </Button>
                    <Button type="primary" onClick={onSearch}>
                      查询
                    </Button>
                  </Space>
                </Col>
              </>
            </Row>
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
