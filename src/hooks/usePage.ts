import type { ProFormInstance } from '@ant-design/pro-form';
import type { ProTableProps } from '@ant-design/pro-table';
import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useRef } from 'react';
import type { ValueType } from 'rc-cascader/lib/Cascader';
import { history } from 'umi';
import type { ParamsType } from '../utils/params';

type ResDataType = {
  code: number;
  data: any;
  meta?: any;
  additions?: any;
};

type UsePageProps = {
  resData: ResDataType | undefined;
  params?: ParamsType;
  setParams: Dispatch<SetStateAction<ParamsType>>;
  actions: Record<string, (...args: any) => void>;
};

export const usePage = ({ resData, params, setParams, actions }: UsePageProps) => {
  const pagination = {
    meta: resData?.meta,
    onChange: (page: number, pageSize: number) => {
      setParams({
        ...params,
        pagination: {
          page: page,
          perPage: pageSize,
        },
      });
    },
  };

  const statistic = {
    items: resData?.additions?.statistics,
  };

  const search = {
    formRef: useRef<ProFormInstance>(),
    onFinish: (values: any) => {
      setParams({
        ...params,
        search: values,
      });
      return Promise.resolve();
    },
    onReset: () => {
      setParams({
        ...params,
        search: {},
      });
    },
  };

  const table: ProTableProps<Record<string, any>, ValueType, 'text'> = {
    rowKey: 'id',
    pagination: false,
    search: false,
    defaultSize: 'small',
    dataSource: resData?.data,
    options: {
      reload: () => actions.list(),
    },
    onChange: (_1: any, _2: any, sorter: any) => {
      setParams({
        ...params,
        table: sorter.order != undefined ? { orderBy: [sorter.field, sorter.order] } : {},
      });
    },
  };

  const columns = {
    id: {
      title: 'id',
      dataIndex: 'id',
    },
    created_at: (title: string = '创建时间') => {
      return {
        title: title,
        dataIndex: 'created_at',
      };
    },
  };

  useEffect(() => {
    search.formRef.current?.setFieldsValue(params?.search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (JSON.stringify(params) !== '{}' && params) {
      history.replace({
        query: { q: JSON.stringify(params) },
      });
    }
    actions.list();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return {
    pagination,
    statistic,
    search,
    table,
    columns,
  };
};
