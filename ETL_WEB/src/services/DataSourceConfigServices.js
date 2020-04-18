import request from '@/utils/request';
export async function createByJdbcUrl(params) {
  return request('/api/V1/TDatasource/createByJdbcUrl', {
    method: 'POST',
    data: params,
  });
}
export async function createSubitem(params) {
    return request('/api/V1/TDatasource/createSubitem', {
      method: 'POST',
      data: params,
    });
}
export async function textLinkByJdbc(params) {
    //测试链接jdbc
    return request('/api/V1/TDatasource/testConnectByUrl', {
      method: 'POST',
      data: params,
    });
}
export async function textLinkSubitem(params) {
    //测试链接单项输入
    return request('/api/V1/TDatasource/testConnect', {
      method: 'POST',
      data: params,
    });
}
export async function deleteTData (params) {
    //删除数据源
    return request('/api/V1/TDatasource/delete', {
      method: 'DELETE',
      params: params,
    });
}
export async function updateTData (params) {
    //修改数据源
    return request('/api/V1/TDatasource/update', {
      method: 'PUT',
      data: params,
    });
}
export async function getTDatasourceList (params) {
    //查询数据源
    return request('/api/V1/TDatasource/tDatasourceList', {
      method: 'GET',
      params: params,
    });
}
export async function getTDatasourceDetails (params) {
    //查询数据源详情
    return request('/api/V1/TDatasource/detail', {
      method: 'GET',
      params: params,
    });
}
export async function getCreateJdbcUrl(params) {
  //编辑组合hdfsUrl
  return request('/api/V1/TDatasource/createJdbcUrl', {
    method: 'POST',
    data: params,
  });
}
export async function getCutJdbcUrl (params) {
  //编辑hdfsUrl分成单项
  return request('/api/V1/TDatasource/cutJdbcUrl', {
    method: 'POST',
    data: params,
  });
}

