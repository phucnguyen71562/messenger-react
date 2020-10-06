import { SearchOutlined } from '@ant-design/icons';
import { Avatar, Button, Input, List, Spin } from 'antd';
import { AVATAR_DEFAULT } from 'configs/common';
import { selectFriends } from 'features/friend/friendSlice';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './FriendSearch.scss';

function FriendSearch({
  searchData,
  handleSearch,
  sentRequests,
  createRequests,
  handleCreateFriendRequest,
  handleLoadMoreSearch,
  loadingSearch,
  hasMoreSearch,
}) {
  const friends = useSelector(selectFriends);
  const [search, setSearch] = useState('');
  const waitTimeoutRef = useRef(null);

  const isSentRequest = (id) =>
    sentRequests.find((request) => request.receiver === id);
  const isRequested = (id) => createRequests.includes(id);

  const isFriend = (value) => {
    return friends.find((friend) => friend.id === value);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setSearch(value);

    if (waitTimeoutRef.current) {
      clearTimeout(waitTimeoutRef.current);
    }

    waitTimeoutRef.current = setTimeout(async () => {
      const params = {
        username: value,
      };

      handleSearch(params);
    }, 300);
  };

  const onLoadMoreSearch = () => {
    if (search !== '') {
      const params = {
        username: search,
      };

      handleLoadMoreSearch(params);
    }
  };

  const renderDescription = (id) => {
    if (isFriend(id)) {
      return (
        <Button type="default" shape="round">
          Bạn bè
        </Button>
      );
    }

    if (isRequested(id)) {
      return <span>Đã gửi yêu cầu kết bạn</span>;
    }

    if (isSentRequest(id)) {
      return <span>Đang chờ chấp nhận</span>;
    }

    return (
      <Button
        type="primary"
        shape="round"
        onClick={() => handleCreateFriendRequest(id)}
      >
        Thêm bạn bè
      </Button>
    );
  };

  return (
    <div className="friends__search">
      <Input
        value={search}
        onChange={handleChange}
        placeholder="Tìm kiếm..."
        className="friends__searchInput"
        prefix={<SearchOutlined />}
        autoFocus
        autoComplete="off"
      />

      <div className="friends__searchList">
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={onLoadMoreSearch}
          hasMore={!loadingSearch && hasMoreSearch}
        >
          <List
            grid={{
              gutter: 16,
              xs: 1,
              sm: 1,
              md: 2,
              lg: 2,
              xl: 2,
            }}
            itemLayout="horizontal"
            dataSource={searchData}
            split={false}
            loading={!searchData}
            renderItem={(friend) => (
              <List.Item key={friend.id}>
                <List.Item.Meta
                  style={{ alignItems: 'center' }}
                  avatar={
                    <Avatar icon={AVATAR_DEFAULT} src={friend.photoUrl} />
                  }
                  title={
                    <Link
                      to={`/messages/${friend.id}`}
                      className="text-capitalize"
                    >
                      {friend.username}
                    </Link>
                  }
                  description={renderDescription(friend.id)}
                />
              </List.Item>
            )}
          >
            {loadingSearch && hasMoreSearch && (
              <div className="friends__searchLoading">
                <Spin />
              </div>
            )}
          </List>
        </InfiniteScroll>
      </div>
    </div>
  );
}

FriendSearch.propTypes = {
  searchData: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleSearch: PropTypes.func.isRequired,
  sentRequests: PropTypes.arrayOf(PropTypes.object).isRequired,
  createRequests: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleCreateFriendRequest: PropTypes.func.isRequired,
  handleLoadMoreSearch: PropTypes.func.isRequired,
  loadingSearch: PropTypes.bool.isRequired,
  hasMoreSearch: PropTypes.bool.isRequired,
};

export default FriendSearch;
