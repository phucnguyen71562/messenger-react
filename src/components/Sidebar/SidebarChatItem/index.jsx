import { Avatar, Dropdown, List, Menu, Typography } from 'antd'
import React from 'react'
import './SidebarChatItem.scss'

const { Title, Paragraph } = Typography

const menu = (
  <Menu>
    <Menu.Item key="0">
      <a href="http://www.alipay.com/">1st menu item</a>
    </Menu.Item>
    <Menu.Item key="1">
      <a href="http://www.taobao.com/">2nd menu item</a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3">3rd menu item</Menu.Item>
  </Menu>
)

function SidebarChatItem({ item }) {
  return (
    <List.Item
      className="sidebar__chat"
      actions={[
        <Dropdown overlay={menu} trigger={['click']}>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            ...
          </a>
        </Dropdown>,
      ]}
    >
      <List.Item.Meta
        avatar={
          <Avatar
            size="large"
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          />
        }
        title={<Title level={4}>{item.title}</Title>}
        description={
          <Paragraph ellipsis>
            Ant Design, a design language for background applications, is
            refined by Ant UED Team
          </Paragraph>
        }
      />
    </List.Item>
  )
}

export default SidebarChatItem
