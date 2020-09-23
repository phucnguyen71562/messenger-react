import { CheckOutlined } from '@ant-design/icons'
import {
  Avatar,
  Button,
  Collapse,
  Divider,
  Drawer,
  Modal,
  Typography,
} from 'antd'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AVATAR_DEFAULT, colorThemeConfig } from '../../../app/config'
import { useSocket } from '../../../contexts/SocketProvider'
import { getRelativeTime } from '../../../services/helpers'
import { setColorTheme } from '../../../slices/chatSlice'
import './Detail.scss'

const { Title, Text } = Typography
const { Panel } = Collapse

function Detail({ visible, setVisible }) {
  const onlineFriends = useSelector((state) => state.friend.onlineFriends)
  const receiver = useSelector((state) => state.chat.receiver)
  const { name: colorName, value: colorTheme } = useSelector(
    (state) => state.chat.colorTheme
  )
  const [showModal, setShowModal] = useState(false)
  const dispatch = useDispatch()
  const socket = useSocket()

  const isOnline = onlineFriends.includes(receiver?._id)

  const handleShowModal = () => {
    setShowModal(true)
  }

  const handleOk = () => {
    setShowModal(false)
  }

  const handleCancel = () => {
    setShowModal(false)
  }

  const handleChangeColor = (params) => {
    dispatch(setColorTheme(params))
    socket.emit('change-color', {
      color: params,
      receiverId: receiver._id,
    })
    setShowModal(false)
  }

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
        <Avatar icon={AVATAR_DEFAULT} src={receiver.photoUrl} size={64} />
        <Title level={2} style={{ marginTop: 16 }}>
          {receiver?.username}
        </Title>
        <Text type="secondary">
          {isOnline ? 'Đang hoạt động' : getRelativeTime(receiver?.lastLogin)}
        </Text>
      </div>
      <Divider />
      <Collapse
        accordion
        ghost
        defaultActiveKey={['1']}
        expandIconPosition="right"
      >
        <Panel header="Hành động khác" key="1">
          <div className="detail__action" onClick={handleShowModal}>
            <Text>Đổi màu chủ đề</Text>
            <div className="color__label" style={colorTheme}>
              <div className="color__dot"></div>
            </div>
          </div>
          <Modal
            width={335}
            closable={false}
            visible={showModal}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
              <Button key="submit" type="link" onClick={handleCancel}>
                Hủy
              </Button>,
            ]}
          >
            <Title level={4} className="color__title">
              Chọn màu cho cuộc trò chuyện này
            </Title>
            <div className="color-box">
              {colorThemeConfig.map((color) => {
                return (
                  <div
                    key={color.name}
                    className="color-box__item"
                    style={color.value}
                    onClick={() => handleChangeColor(color)}
                  >
                    {color.name === colorName && (
                      <CheckOutlined style={{ color: '#fff', fontSize: 22 }} />
                    )}
                  </div>
                )
              })}
            </div>
          </Modal>
        </Panel>
      </Collapse>
    </Drawer>
  )
}

export default Detail
