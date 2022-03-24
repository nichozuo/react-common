import { useContext, useState } from 'react';
import { history, request } from 'umi';
import { message } from 'antd';
import { MyModalRefContext } from '../components/MyLayout';
import { getDataFromParams, getParamsFromUrl, getUrl } from '../utils/params';
import type { MyModalRefType } from '../components/MyModal';
import type { ResponseDataType } from '../utils/request';
import type { ParamsType } from '../utils/params';

type DefaultActionType = 'list' | 'store' | 'update' | 'softDelete' | 'restore' | 'delete';

export type Actions = {
  list: () => void;
  store: (data: Record<string, any>) => void;
  update: (data: Record<string, any>) => void;
  softDelete: (data: Record<string, any>) => void;
  restore: (data: Record<string, any>) => void;
  delete: (data: Record<string, any>) => void;
};

export type useActionsProps = {
  /**
   * 请求的地址前面的部分，相当于后端的controllerName
   */
  baseUri: string;
  /**
   * 请求的地址后面的部分，相当于后端的actionName
   */
  uris?: Partial<Record<DefaultActionType, string>>;
  /**
   * 默认的参数
   */
  defaultParams?: Record<string, any>; // search参数
};

export const useActions = ({ baseUri, uris, defaultParams }: useActionsProps) => {
  const modalRef = useContext(MyModalRefContext) as React.MutableRefObject<
    MyModalRefType | undefined
  >;

  const [resData, setResData] = useState<ResponseDataType>();

  const [params, setParams] = useState<ParamsType>(
    () => getParamsFromUrl(history.location.query?.q as string, defaultParams) as ParamsType,
  );

  const actions: Actions = {
    list: () => {
      request(getUrl(baseUri, 'list', uris?.list), getDataFromParams(params)).then((res: any) => {
        setResData(res);
      });
    },
    store: (data) => {
      request(getUrl(baseUri, 'store', uris?.store), { data }).then(() => {
        message.success('保存成功！');
        modalRef.current?.hideModal();
        actions.list();
      });
    },
    update: (data) => {
      request(getUrl(baseUri, 'update', uris?.update), { data }).then(() => {
        message.success('更新成功！');
        modalRef.current?.hideModal();
        actions.list();
      });
    },
    softDelete: (data) => {
      request(getUrl(baseUri, 'soft_delete', uris?.softDelete), { data: { id: data.id } }).then(
        () => {
          message.success('操作成功！');
          actions.list();
        },
      );
    },
    restore: (data) => {
      request(getUrl(baseUri, 'restore', uris?.restore), { data: { id: data.id } }).then(() => {
        message.success('操作成功！');
        actions.list();
      });
    },
    delete: (data) => {
      request(getUrl(baseUri, 'delete', uris?.delete), { data: { id: data.id } }).then(() => {
        message.success('删除成功！');
        actions.list();
      });
    },
  };

  return {
    resData,
    setResData,
    params,
    setParams,
    actions,
    modalRef,
  };
};
