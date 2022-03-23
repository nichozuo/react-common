import { ProFormRadio } from '@ant-design/pro-form';
import type { ProFormRadioGroupProps } from '@ant-design/pro-form/lib/components/Radio';
import React from 'react';

export const MyProFormRadioGroup = ({ ...rest }: ProFormRadioGroupProps) => {
  return <ProFormRadio.Group radioType="button" fieldProps={{ buttonStyle: 'solid' }} {...rest} />;
};
