import request from '@/utils/request';
//查询树
export async function getTree(params) {
  return request('/api/V1/etl/business/queryTree', {
    method: 'GET',
    params: params,
  });
}
//查询系统和模块树
export async function getOnlyBusinessTree(params) {
  return request('/api/V1/etl/business/queryOnlyBusinessTree', {
    method: 'GET',
    params: params,
  });
}
//新建树
export async function createTree(params) {
  return request('/api/V1/etl/business/create', {
    method: 'POST',
    params: params,
  });
}
//删除树
export async function deleteTree(params) {
  return request('/api/V1/etl/business/delete', {
    method: 'DELETE',
    params: params,
  });
}
//修改树
export async function updateTree(params) {
  return request('/api/V1/etl/business/update', {
    method: 'PUT',
    params: params,
  });
}
//查询前置任务列表树形
export async function getQueryTreeList(params) {
  return request('/api/V1/etl/taskConfig/queryTreeList', {
    method: 'GET',
    params: params,
  });
}

//查询一次性写入大小
export async function getDataxBatchSize(params) {
  return request('/api/V1/etl/extractionRule/getDataxBatchSize', {
    method: 'GET',
    params: params,
  });
}
//获取一次性写入速率
export async function getDataxByte(params) {
  return request('/api/V1/etl/extractionRule/getDataxByte', {
    method: 'GET',
    params: params,
  });
}
//获取datax线程数
export async function getDataxChannel(params) {
  return request('/api/V1/etl/extractionRule/getDataxChannel', {
    method: 'GET',
    params: params,
  });
}
//获取datax行数
export async function getDataxRecord(params) {
  return request('/api/V1/etl/extractionRule/getDataxRecord', {
    method: 'GET',
    params: params,
  });
}

//获取cron表达式
export async function getQueryCron(params) {
  return request('/api/V1/etl/extractionRule/queryCron', {
    method: 'GET',
    params: params,
  });
}
//验证cron
export async function getvalidCron(params) {
  return request('/api/V1/etl/extractionRule/validCron', {
    method: 'GET',
    params: params,
  });
}


//查询抽取规则详情
export async function getExtrQueryDetail(params) {
  return request('/api/V1/etl/extractionRule/queryDetail', {
    method: 'GET',
    params: params,
  });
}

//查询读取端配置详情
export async function getReadQueryDetail(params) {
  return request('/api/V1/etl/read/queryDetail', {
    method: 'GET',
    params: params,
  });
}

//查询读取HDFS文件类型
export async function getHdfsReadFileType(params) {
  return request('/api/V1/etl/read/queryHdfsReadFileType', {
    method: 'GET',
    params: params,
  });
}

//查询编码
export async function getHdfsEncoding(params) {
  return request('/api/V1/etl/read/queryHdfsEncoding', {
    method: 'GET',
    params: params,
  });
}
//获取数据源列表
export async function getTDatasourceNoPageList(params) {
  return request('/api/V1/TDatasource/tDatasourceNoPageList', {
    method: 'GET',
    params: params,
  });
}
//获取写入数据表
export async function getQueryTable(params) {
  return request('/api/V1/etl/write/queryTable', {
    method: 'GET',
    params: params,
  });
}
//查询写入HDFS文件类型
export async function getHafsWriteFieType(params) {
  return request('/api/V1/etl/write/queryHdfsWriteFileType', {
    method: 'GET',
    params: params,
  });
}
//查询写入端压缩方式
export async function getQueryWriteCompress(params) {
  return request('/api/V1/etl/write/queryWriteCompress', {
    method: 'GET',
    params: params,
  });
}
//查询写入端写入方式
export async function getQueryWriteMode(params) {
  return request('/api/V1/etl/write/queryWriteMode', {
    method: 'GET',
    params: params,
  });
}
//获取hdfs_Sql
export async function generateHdfsSql(params) {
  return request('/api/V1/etl/read/generateHdfsSql', {
    method: 'GET',
    params: params,
  });
}
//检验sql
export async function splitSqlCol(params) {
  return request('/api/V1/etl/read/checkSql', {
    method: 'GET',
    params: params,
  });
}
//新增任务配置
export async function createTaskConfig(params) {
  return request('/api/V1/etl/taskConfig/create', {
    method: 'POST',
    params: params,
  });
}
//查询一条任务的详情
export async function querySingleJson(params) {
  return request('/api/V1/etl/taskConfig/querySingleJson', {
    method: 'GET',
    params: params,
  });
}
//字段映射
// 分割字段
export async function TheSqlCol(params){
  return request('/api/V1/etl/write/splitSqlCol', {
    method: 'GET',
    params: params,
  });
}

// 字段映射
export async function Fieldmapping(params){
  return request('/api/V1/etl/write/generateColOrder', {
    method: 'GET',
    params: params,
  });
}

//编辑一条任务配置
export async function uploadTaskConfig(params) {
  return request('/api/V1/etl/taskConfig/update', {
    method: 'PUT',
    params: params,
  });
}

//删除任务
export async function deleteTask(params) {
  return request('/api/V1/etl/taskConfig/delete', {
    method: 'DELETE',
    params: params,
  });
}