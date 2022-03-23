import type { ButtonProps } from 'antd';
import { Tag } from 'antd';
import { Button, Popconfirm } from 'antd';
import {
  PlusSquareOutlined,
  EditOutlined,
  UpOutlined,
  DownOutlined,
  QuestionCircleOutlined,
  DeleteOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import React from 'react';

/**
 * 添加按钮
 */
const CreateButton = ({ title, onClick, ...rest }: ButtonProps) => {
  return (
    <Button
      key="CreateButton"
      type="primary"
      icon={<PlusSquareOutlined />}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(e);
      }}
      {...rest}
    >
      {title}
    </Button>
  );
};

/**
 * 编辑按钮
 */
const EditButton = ({ onClick, ...rest }: ButtonProps) => {
  return (
    <Button
      type="primary"
      size="small"
      ghost
      icon={<EditOutlined />}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(e);
      }}
      {...rest}
    >
      编辑
    </Button>
  );
};

/**
 * 排序按钮
 */
const MoveButton = ({
  direction,
  onClick,
  disabled,
  ...rest
}: {
  direction: 'up' | 'down';
} & ButtonProps) => {
  return (
    <Button
      type="ghost"
      size="small"
      icon={direction === 'up' ? <UpOutlined /> : <DownOutlined />}
      disabled={disabled}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(e);
      }}
      {...rest}
    />
  );
};

/**
 * 删除按钮
 */
const DeleteButton = ({
  onConfirm,
  ...rest
}: ButtonProps & {
  onConfirm: (e?: React.MouseEvent<HTMLElement, MouseEvent> | undefined) => void;
}) => {
  return (
    <Popconfirm
      title="确定要删除？"
      icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
      onConfirm={() => onConfirm()}
    >
      <Button icon={<DeleteOutlined />} danger size="small" {...rest}>
        删除
      </Button>
    </Popconfirm>
  );
};

/**
 * 软删除按钮
 * @param param0
 * @returns
 */
const SoftDelete = ({
  deleted_at,
  onConfirm,
}: {
  deleted_at: string | undefined;
  onConfirm: (e?: React.MouseEvent<HTMLElement, MouseEvent> | undefined) => void;
}) => {
  return (
    <Popconfirm
      title={deleted_at ? '确定要恢复？' : '确定要禁用？'}
      icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
      onConfirm={onConfirm}
    >
      <Tag color={deleted_at ? 'gray' : 'green'} style={{ cursor: 'pointer' }}>
        {deleted_at ? (
          <>
            <CloseCircleOutlined />
            已禁用
          </>
        ) : (
          <>
            <CheckCircleOutlined />
            已启用
          </>
        )}
      </Tag>
    </Popconfirm>
  );
};

const Buttons: {
  Create: typeof CreateButton;
  Edit: typeof EditButton;
  Delete: typeof DeleteButton;
  Move: typeof MoveButton;
  SoftDelete: typeof SoftDelete;
} = {} as any;

Buttons.Create = CreateButton;
Buttons.Edit = EditButton;
Buttons.Delete = DeleteButton;
Buttons.Move = MoveButton;
Buttons.SoftDelete = SoftDelete;

export const MyButton = Buttons;
