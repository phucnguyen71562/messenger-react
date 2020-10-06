import { ArrowLeftOutlined, FrownTwoTone } from '@ant-design/icons';
import { Button, Typography } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.scss';

const { Title } = Typography;

function NotFound() {
  return (
    <div className="notfound">
      <div className="notfound__header">
        <FrownTwoTone twoToneColor="#f43f54" style={{ fontSize: 128 }} />
      </div>
      <div className="notfound__body">
        <Title level={2}>Oops... Không tìm thấy trang</Title>
        <Link to="/">
          <Button type="link" icon={<ArrowLeftOutlined />}>
            Quay lại trang chủ
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
