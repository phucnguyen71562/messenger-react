import { SearchOutlined } from '@ant-design/icons'
import { Form, Input } from 'antd'
import React from 'react'
import './SidebarSearch.scss'

function SidebarSearch() {
  const onFinish = (values) => {
    console.log('Received values of form: ', values)
  }

  return (
    <Form name="search" onFinish={onFinish} className="sidebar__search">
      <Form.Item name="search">
        <Input
          prefix={<SearchOutlined />}
          placeholder="Tìm kiếm trên Messenger"
        />
      </Form.Item>
    </Form>
  )
}

export default SidebarSearch
