import { useEffect, useRef, useState } from 'react'

import { Button, Col, Form, Input, Row, Select, FormInstance, Space } from 'antd'

const Option = Select.Option

const ShopFormTable: React.FC<IShopFormTableProps> = props => {
  const [fold, setFold] = useState(false)

  const [formInfo, setFormInfo] = useState({
    length: 0,
    restCount: 0,
  })

  const foldShowCount = 1

  const [hideIndex, setHideIndex] = useState<number[]>([])

  const formInstance = useRef<FormInstance>(null)

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
        <>
          {
            <Col span={8} key={index} style={{ display: hideIndex.includes(index) ? 'none' : 'block' }}>
              <Form.Item label={item.label} name={item.name} key={index}>
                {matchFormItem(item, index)}
              </Form.Item>
            </Col>
          }
        </>
      )
    })
  }

  const renderAction = () => {
    return (
      <>
        <Col span={fold ? 16 / foldShowCount : !formInfo.restCount ? 8 : 16 / formInfo.restCount} style={{ textAlign: 'right' }}>
          <Space style={{ height: '100%' }}>
            <Form.Item style={{ marginBottom: 0 }}>
              <Button type="link" onClick={onFold}>
                {fold ? '展开' : '折叠'}
              </Button>
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
    setFold(!fold)

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

  const onReset = () => {
    formInstance.current?.resetFields()
  }

  const onSearch = () => {
    const formValue = formInstance.current?.getFieldsValue()
    console.log(formValue)
  }

  useEffect(() => {
    const formItemLength = (props.searchFormItemList as searchFormItemListProps)?.length || 0

    if (formItemLength) {
      setFormInfo({
        length: formItemLength,
        restCount: formItemLength > 3 ? formItemLength % 3 : 0,
      })
    }
  }, [props.searchFormItemList])

  return (
    <div className="shop-form-table">
      {Array.isArray(props.searchFormItemList) && !!props.searchFormItemList?.length && (
        <Form layout="vertical" ref={formInstance}>
          <Row gutter={12}>
            <>
              {renderSearchFormItem(props.searchFormItemList || [])}
              {(fold || !!formInfo.restCount) && formInfo.length > 3 && renderAction()}
            </>
          </Row>
          {formInfo.length > 3 && !fold && !formInfo.restCount && (
            <Row justify="end" gutter={10}>
              {renderAction()}
            </Row>
          )}
        </Form>
      )}
    </div>
  )
}

export default ShopFormTable
