import { ProFormSelect } from '@ant-design/pro-form';
import type { ProFormSelectProps } from '@ant-design/pro-form/lib/components/Select';
import React from 'react';

export const MyProFormSelect = ({
  name,
  label,
  rules,
  placeholder,
  request,
  ...rest
}: ProFormSelectProps) => {
  return (
    <ProFormSelect
      name={name}
      label={label}
      rules={rules}
      placeholder={placeholder}
      request={request}
      {...rest}
    />
  );
};
