import { UserAddOutlined, UserDeleteOutlined } from '@ant-design/icons';
import { Avatar, Badge, Button, List, Space } from 'antd';
import { AVATAR_DEFAULT } from 'configs/common';
import PropTypes from 'prop-types';
import React from 'react';
import './FriendRequest.scss';

function FriendRequest({
  receivedRequests,
  acceptRequests,
  refuseRequests,
  handleAddFriend,
  handleDeleteFriendRequest,
}) {
  const isAccepted = (id) => acceptRequests.includes(id);
  const isRefused = (id) => refuseRequests.includes(id);

  const renderDescription = (id) => {
    if (isAccepted(id)) {
      return <span>Các bạn hiện đã là bạn bè</span>;
    }

    if (isRefused(id)) {
      return <span>Đã từ chối lời mời</span>;
    }

    return (
      <Space>
        <Button
          type="primary"
          size="small"
          shape="round"
          icon={<UserAddOutlined />}
          onClick={() => handleAddFriend(id)}
        >
          Chấp nhận
        </Button>
        <Button
          type="default"
          size="small"
          shape="round"
          icon={<UserDeleteOutlined />}
          onClick={() => handleDeleteFriendRequest(id)}
        >
          Từ chối
        </Button>
      </Space>
    );
  };

  return (
    <div className="friends__request">
      <h5 className="ant-typography">
        <Badge dot count={receivedRequests.length}>
          Lời mời kết bạn
        </Badge>
      </h5>
      <List
        itemLayout="horizontal"
        dataSource={receivedRequests}
        split={false}
        loading={!receivedRequests}
        locale={{ emptyText: 'Không có lời mời mới' }}
        renderItem={({ sender: friend }) => (
          <List.Item key={friend?.id}>
            <List.Item.Meta
              style={{ alignItems: 'center' }}
              avatar={<Avatar icon={AVATAR_DEFAULT} src={friend?.photoUrl} />}
              title={
                <span className="text-capitalize">{friend?.username}</span>
              }
              description={renderDescription(friend?.id)}
            />
          </List.Item>
        )}
      />
    </div>
  );
}

FriendRequest.propTypes = {
  receivedRequests: PropTypes.arrayOf(PropTypes.object).isRequired,
  acceptRequests: PropTypes.arrayOf(PropTypes.string).isRequired,
  refuseRequests: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleAddFriend: PropTypes.func.isRequired,
  handleDeleteFriendRequest: PropTypes.func.isRequired,
};

export default FriendRequest;
