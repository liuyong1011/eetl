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

export async function queryTask(nIfSubscribe,pageNum,pageSize) {
  return request('/api/V1/etl/taskConfig/querySubList', {
    method: 'GET',
    params: {
      nIfSubscribe:nIfSubscribe,
      pageNum:pageNum,
      pageSize: pageSize
    }
  });
}

// 查询
export async function queryTaskTree(cName,nIfSubscribe) {
  return request('/api/V1/etl/taskConfig/querySubList', {
    method: 'GET',
    params: {
      cName:cName,
      nIfSubscribe:nIfSubscribe
    }
  });
}

// 下拉树
export async function queryTreeList() {
  return request('/api/V1/etl/taskConfig/queryTreeList', {
    method: 'GET',
    params: {}
  });
}

// 发布按钮
export async function subTask(subState,taskId) {
  return request('/api/V1/etl/taskConfig/subTask', {
    method: 'PUT',
    params: {
      subState:subState,
      taskId:taskId,
    }
  });
}

//取消发布
export async function cancelSubTask(subState,taskId) {
  return request('/api/V1/etl/taskConfig/subTask', {
    method: 'PUT',
    params: {
      subState:subState,
      taskId:taskId,
    }
  });
}

// 预留参数
export async function reservedParameters(taskId) {
  return request('/api/V1/etl/read/queryParams', {
    method: 'GET',
    params: {
      taskId:taskId,
    }
  });
}

// 任务链
export async function taskChain(cId) {
  return request('/api/V1/etl/taskConfig/queryTaskChain', {
    method: 'GET',
    params: {
      cId:cId,
    }
  });
}

// // 上传预留参数
// export async function uploadParameters(cId,params) {
//   return request('/api/V1/etl/taskConfig/queryTaskChain', {
//     method: 'POST',
//     params: {
//       cId:cId,
//       params:params
//     }
//   });
// }

// 上传预留参数
export async function uploadParameters(cId,params) {
  return request('/api/V1/etl/taskConfig/taskjob/start', {
    method: 'POST',
    params: {
      cId:cId,
      params:params
    }
  });
}

// 字段映射
export async function fieldMapping(dbType,json){
  return request('/api/V1/etl/write/generateColOrder', {
    method: 'GET',
    params: {
      dbType:dbType,
      json:json
    }
  });
}

// 预留参数返回是否可选定触发状态
export async function paramsValueState(param){
  return request('/api/V1/etl/read/aboutParamsAndSchedule', {
    method: 'GET',
    params: {
      param:param
    }
  });
}