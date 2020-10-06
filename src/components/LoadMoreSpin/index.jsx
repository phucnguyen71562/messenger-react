import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import React from 'react';

const loadIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function LoadMoreSpin() {
  return <Spin indicator={loadIcon} />;
}

export default LoadMoreSpin;
