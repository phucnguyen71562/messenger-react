import { Avatar, Dropdown, List, Menu, Modal, Typography } from 'antd'
import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import chatApi from '../../../apis/chatApi'
import { AVATAR_DEFAULT } from '../../../app/config'
import { deleteChat } from '../../../slices/chatSlice'
import './SidebarChatItem.scss'

const { Paragraph } = Typography
const { confirm } = Modal

function SidebarChatItem({ item }) {
  const chatReceiver = useSelector((state) => state.chat.receiver)
  const isSearchFriend = useSelector((state) => state.search.isSearchFriend)
  const dispatch = useDispatch()
  const history = useHistory()

  const showDeleteConfirm = useCallback(
    (value) => {
      confirm({
        title: 'Xóa cuộc trò chuyện này?',
        content: 'Hành động này sẽ xóa vĩnh viễn cuộc trò chuyện',
        okText: 'Xóa',
        okType: 'link',
        cancelText: 'Hủy',
        okButtonProps: { danger: true },
        cancelButtonProps: { type: 'link', style: { color: '#333' } },
        onOk() {
          chatApi.deleteChat(value)
          dispatch(deleteChat(value))
          if (chatReceiver._id === value) {
            history.push('/messages')
          }
        },
        onCancel() {},
      })
    },
    [chatReceiver._id, dispatch, history]
  )

  if (!isSearchFriend) {
    const { receiver, chat } = item

    return (
      <List.Item
        className="sidebar__chat"
        actions={[
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item
                  key="0"
                  onClick={() => showDeleteConfirm(receiver._id)}
                >
                  Xóa
                </Menu.Item>
              </Menu>
            }
            trigger={['click']}
            arrow
            placement="bottomCenter"
          >
            <span>...</span>
          </Dropdown>,
        ]}
      >
        <Link to={`/messages/${receiver._id}`} style={{ width: '100%' }}>
          <List.Item.Meta
            avatar={
              <Avatar
                size="large"
                icon={AVATAR_DEFAULT}
                src={receiver.photoUrl}
              />
            }
            title={receiver.username}
            description={<Paragraph ellipsis>{chat.message}</Paragraph>}
          />
        </Link>
      </List.Item>
    )
  }

  return (
    <Link to={`/messages/${item._id}`}>
      <List.Item className="sidebar__chat">
        <List.Item.Meta
          avatar={
            <Avatar size="large" icon={AVATAR_DEFAULT} src={item.photoUrl} />
          }
          title={item.username}
        />
      </List.Item>
    </Link>
  )
}

export default SidebarChatItem
