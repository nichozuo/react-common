import _ from 'lodash';

export type ParamsType = {
  search?: Record<string, any>;
  table?: {
    orderBy?: string[];
  };
  pagination?: {
    page: number;
    perPage: number;
    // current_page: number;
    // last_page: number;
    // per_page: number;
    // total: number;
  };
};

export const getDataFromParams = (params: ParamsType) => {
  return {
    data: _.assign(params?.search, params?.table, params?.pagination),
  };
};

export const getParamsFromUrl = (
  query: string | undefined,
  defaultParams: Record<string, any> | undefined = undefined,
) => {
  const q = query == '{}' || query == undefined ? undefined : JSON.parse(query);
  if (!q && !defaultParams) return undefined;
  else if (!q && defaultParams) return { search: defaultParams };
  else if (q && !defaultParams) return q;
  else return q;
};

export const getUrl = (baseUri: string, uri: string, defaultUri: string) => {
  const url = uri == undefined ? defaultUri : uri;
  return baseUri + '/' + url;
};
