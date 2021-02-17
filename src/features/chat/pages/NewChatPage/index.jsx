import { ArrowLeftOutlined } from '@ant-design/icons';
import { AutoComplete, Avatar, Button } from 'antd';
import { AVATAR_DEFAULT } from 'configs/common';
import { selectFriends } from 'features/friend/friendSlice';
import useMediaQuery from 'hooks/useMediaQuery';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import './NewChatPage.scss';

const renderItem = (data) => {
  return data.map((item) => {
    return {
      value: item.id,
      label: (
        <Link to={item.id} className="newChat__link">
          <Avatar size="large" icon={AVATAR_DEFAULT} src={item.photoUrl} />
          <span>{item.username}</span>
        </Link>
      ),
    };
  });
};

function NewChatPage() {
  const isDesktopMode = useMediaQuery('(min-width: 62em)');
  const friends = useSelector(selectFriends);
  const [options, setOptions] = useState([]);
  const history = useHistory();

  const handleSearch = (search) => {
    if (search !== '') {
      const data = friends.filter(
        (user) => user.username.toLowerCase().indexOf(search.toLowerCase()) > -1
      );
      setOptions(renderItem(data));
    } else {
      setOptions([]);
    }
  };

  const handleSelect = (value) => {
    history.push(`/messages/${value}`);
  };

  const handleBack = () => {
    history.push('/messages');
  };

  return (
    <div className="newChat">
      <div className="newChat__header">
        {!isDesktopMode && (
          <Button type="link" className="newChat__back" onClick={handleBack}>
            <ArrowLeftOutlined />
          </Button>
        )}

        <span>Đến:</span>
        <AutoComplete
          placeholder="Nhập tên..."
          onSearch={handleSearch}
          onSelect={handleSelect}
          options={options}
          autoFocus
          className="newChat__input"
        />
      </div>
      <div className="newChat__body" />
    </div>
  );
}

export default NewChatPage;
