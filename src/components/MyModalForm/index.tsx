/* eslint-disable react/jsx-key */
import type { ProFormProps } from '@ant-design/pro-form';
import ProForm from '@ant-design/pro-form';
import { Row, Col, Space, Button } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import React from 'react';

export const MyModalForm = ({ children, formRef, onFinish, ...rest }: ProFormProps) => {
  return (
    <ProForm
      labelCol={{ sm: { span: 6 } }}
      wrapperCol={{ sm: { span: 14 } }}
      layout="horizontal"
      formRef={formRef}
      onFinish={onFinish}
      submitter={{
        render: () => {
          return (
            <Row>
              <Col span={4} offset={6}>
                <Space>
                  <Button type="primary" htmlType="submit">
                    <SaveOutlined />
                    保存
                  </Button>
                </Space>
              </Col>
            </Row>
          );
        },
      }}
      {...rest}
    >
      {children}
    </ProForm>
  );
};
