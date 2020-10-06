import { CheckOutlined } from '@ant-design/icons';
import {
  Avatar,
  Button,
  Collapse,
  Divider,
  Drawer,
  Modal,
  Typography,
} from 'antd';
import chatThemeConfig from 'configs/chatTheme';
import { AVATAR_DEFAULT } from 'configs/common';
import { selectReceiver, selectTheme } from 'features/chat/chatSlice';
import { selectOnlineFriends } from 'features/friend/friendSlice';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getRelativeTime } from 'services/helpers';
import './ChatSettings.scss';

const { Title, Text } = Typography;
const { Panel } = Collapse;

function ChatSettings({ visible, setVisible, handleChangeTheme }) {
  const onlineFriends = useSelector(selectOnlineFriends);
  const receiver = useSelector(selectReceiver);
  const { name: themeName, value: themeValue } = useSelector(selectTheme);
  const [showModal, setShowModal] = useState(false);

  const isOnline = onlineFriends.includes(receiver?.id);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleOk = () => {
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const changeTheme = (theme) => {
    handleChangeTheme(theme);
    setShowModal(false);
  };

  return (
    <Drawer
      placement="right"
      width={350}
      visible={visible}
      onClose={() => setVisible(false)}
      className="chat__settings"
      bodyStyle={{ padding: 8 }}
    >
      <div className="chat__settingsTitle">
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
          <div className="chat__settingsAction" onClick={handleShowModal}>
            <Text>Đổi màu chủ đề</Text>
            <div className="chatTheme__label" style={themeValue}>
              <span />
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
            <Title level={4} className="theme-picker__title">
              Chọn màu cho cuộc trò chuyện này
            </Title>
            <div className="theme-picker">
              {chatThemeConfig.map((theme) => {
                return (
                  <div
                    key={theme.name}
                    className="theme-picker__item"
                    style={theme.value}
                    onClick={() => changeTheme(theme)}
                  >
                    {theme.name === themeName && (
                      <CheckOutlined style={{ color: '#fff', fontSize: 22 }} />
                    )}
                  </div>
                );
              })}
            </div>
          </Modal>
        </Panel>
      </Collapse>
    </Drawer>
  );
}

ChatSettings.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  handleChangeTheme: PropTypes.func.isRequired,
};

export default ChatSettings;
