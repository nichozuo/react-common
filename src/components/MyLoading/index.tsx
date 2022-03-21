/* eslint-disable react/jsx-key */
import { Spin } from 'antd';
import './index.less';
import React from 'react';

export type MyLoadingProps = {
  /**
   * 当前请求数，大于0，会显示loading
   * @default 0
   */
  count?: number;
};

export const MyLoading = ({ count = 0 }: MyLoadingProps) => {
  return (
    <>
      {count > 0 && (
        <div className="loading-container">
          <Spin size="large" />
        </div>
      )}
      ;
    </>
  );
};
