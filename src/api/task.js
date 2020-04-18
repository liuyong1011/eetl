import request from '../utils/request'


export async function Task(common,nIfActivate,nIfInvalid,pageNum,pageSize,) {
  return request('/api/V1/etl/taskConfig/queryListBySate', {
    method: 'GET',
    params: {
      common:common,
      nIfActivate:nIfActivate,
      nIfInvalid: nIfInvalid,
      pageNum: pageNum || 1 ,
      pageSize: pageSize || 5,
    }
  });
}
export async function realTimeLog(cId) {
  return request('/api/V1/etl/taskLog/realTimeLog', {
    method: 'GET',
    params: {
      cId:cId
    }
  });
}

export async function showHisLog(cId,dtBeginDate) {
  return request('/api/V1/etl/taskLog/showHisLog', {
    method: 'GET',
    params: {
      cId:cId,
      dtBeginDate:dtBeginDate
    }
  });
}

export async function startTask(cId) {
  return request('/api/V1/etl/taskConfig/taskjob/start', {
    method: 'POST',
    params: {
      cId:cId,
    }
  });
}