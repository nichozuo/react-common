import { useContext, useState } from 'react';
import { history, request } from 'umi';
import { message } from 'antd';
import type { ParamsType } from '../utils/params';
import { getDataFromParams, getParamsFromUrl, getUrl } from '../utils/params';
import type { MyModalRefType } from '../components/MyModal';
import { MyModalRefContext } from '../components/MyLayout';
import type { ResponseDataType } from '../utils/request';

export type useActionsProps = {
  /**
   * 请求的地址前面的部分，相当于后端的controllerName
   */
  baseUri: string;
  /**
   * 请求的地址后面的部分，相当于后端的actionName
   */
  uris?: Record<string, any>;
  /**
   * 默认的参数
   */
  defaultParams?: Record<string, any> | undefined; // search参数
  otherApi?: Record<string, (...args: any) => void>;
};

export const useActions = ({ baseUri, uris, defaultParams, otherApi }: useActionsProps) => {
  const modalRef = useContext(MyModalRefContext) as React.MutableRefObject<
    MyModalRefType | undefined
  >;

  const [resData, setResData] = useState<ResponseDataType>();

  const [params, setParams] = useState<ParamsType>(
    () => getParamsFromUrl(history.location.query?.q as string, defaultParams) as ParamsType,
  );

  const actions = {
    list: () => {
      request(getUrl(baseUri, uris?.list, 'list'), getDataFromParams(params)).then((res: any) => {
        setResData(res);
      });
    },
    store: (data: any) => {
      request(getUrl(baseUri, uris?.store, 'store'), { data: data }).then(() => {
        message.success('操作成功');
        modalRef.current?.hideModal();
        actions.list();
      });
    },
    update: (data: any) => {
      request(getUrl(baseUri, uris?.update, 'update'), { data: data }).then(() => {
        message.success('操作成功');
        modalRef.current?.hideModal();
        actions.list();
      });
    },
    softDelete: (data: any) => {
      if (!data.deleted_at)
        request(getUrl(baseUri, uris?.softDelete, 'soft_delete'), { data: { id: data.id } }).then(
          () => {
            message.success('软删除成功！');
            actions.list();
          },
        );
      else
        request(getUrl(baseUri, uris?.restore, 'restore'), { data: { id: data.id } }).then(() => {
          message.success('恢复成功！');
          actions.list();
        });
    },
    restore: (data: any) => {
      if (data.deleted_at)
        request(getUrl(baseUri, uris?.restore, 'restore'), { data: data }).then(() => {
          message.success('软删除成功！');
          actions.list();
        });
    },
    delete: (data: any) => {
      request(getUrl(baseUri, uris?.delete, 'delete'), { data: data }).then(() => {
        message.success('删除成功！');
        actions.list();
      });
    },
    ...otherApi,
  } as any;

  return {
    resData,
    setResData,
    params,
    setParams,
    actions,
    modalRef,
  };
};
