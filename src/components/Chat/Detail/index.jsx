import { EditOutlined, SearchOutlined } from '@ant-design/icons'
import { Avatar, Collapse, Divider, Drawer, Typography } from 'antd'
import React from 'react'
import './Detail.scss'

const { Title, Text } = Typography
const { Panel } = Collapse

function Detail({ visible, setVisible }) {
  return (
    <Drawer
      placement="right"
      width={350}
      visible={visible}
      onClose={() => setVisible(false)}
      className="detail"
      bodyStyle={{ padding: 8 }}
    >
      <div className="detail__title">
        <Avatar
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          size={64}
        />
        <Title level={2} bold style={{ marginTop: 16 }}>
          John
        </Title>
        <Text type="secondary">3 seconds ago</Text>
      </div>
      <Divider />
      <Collapse
        accordion
        ghost
        defaultActiveKey={['1']}
        expandIconPosition="right"
      >
        <Panel header="Hành động khác" key="1">
          <div className="detail__action">
            <Text>Tìm kiếm trong cuộc trò chuyện</Text>
            <SearchOutlined />
          </div>
          <div className="detail__action">
            <Text>Sửa biệt danh</Text>
            <EditOutlined />
          </div>
          <div className="detail__action">
            <Text>Đổi màu chủ đề</Text>
            <EditOutlined />
          </div>
        </Panel>
        <Panel header="Ảnh đã chia sẻ" key="2">
          <div className="detail__action">
            <Text>Tìm kiếm trong cuộc trò chuyện</Text>
            <SearchOutlined />
          </div>
          <div className="detail__action">
            <Text>Sửa biệt danh</Text>
            <EditOutlined />
          </div>
          <div className="detail__action">
            <Text>Đổi màu chủ đề</Text>
            <EditOutlined />
          </div>
        </Panel>
      </Collapse>
    </Drawer>
  )
}

export default Detail
