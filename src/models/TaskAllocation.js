import { getTree,getOnlyBusinessTree,createTree,deleteTree,updateTree,
  getQueryTreeList,
  getDataxBatchSize,
  getDataxByte,
  getDataxRecord,
  getDataxChannel,
  createTaskConfig,
  getQueryCron,
  getvalidCron,
  getHdfsReadFileType,
  getHdfsEncoding,
  getTDatasourceNoPageList,
  getQueryTable,
  getHafsWriteFieType,
  getQueryWriteCompress,
  getQueryWriteMode,
  querySingleJson,
  uploadTaskConfig,
  deleteTask,
  splitSqlCol,
  TheSqlCol,
  generateHdfsSql
  
} from '@/services/TaskAllocationServices';
import {message} from 'antd';

const TaskAllocationModel = {
  namespace: 'TaskAllocationModel',
  state: {
    treeFlag: true,
    treeData:[
      {
          key: "dbea00029e5947fdb677906a7939f033" ,
          cId: "dbea00029e5947fdb677906a7939f033",
          cPid: null,
          cName:"业务系统一号",
          nLevel: 1,
          dtCreateDate: " 2020-02-20 12:16:08",
          dtUpdateDate: "2020-02-20 12:16:08",
          nState: 1,
          taskList:{},
          childrenList: [
            {
              key: "1544cd95987c4d8b8f1bb6e1191c50d2",
              cId: "1544cd95987c4d8b8f1bb6e1191c50d2",
              cPid: "dbea00029e5947fdb677906a7939f033" ,
              cName:"模块1",
              nLevel: 2,
              dtCreateDate: "2020-02-2012:18:50",
              dtUpdateDate:"2020-02-2012:18:50",
              taskList:{
                key: "dbea00029e5947fdb677906a7939f033" ,
                cId: "dbea00029e5947fdb677906a7939f033",
                cPid: null,
                cName:"业务系统一号",
                nLevel: 1,
                dtCreateDate: " 2020-02-20 12:16:08",
                dtUpdateDate: "2020-02-20 12:16:08",
                nState: 1,
              },
              childrenList: [
                              {
                                key: "b674316ffb764d589be2fcc1cfff0d43",
                                cId: "b674316ffb764d589be2fcc1cfff0d43",
                                cPid: "1544cd95987c4d8b8f1bb6e1191c50d2" ,
                                cName: "模块1.1",
                                nLevel: 3,
                                dtCreateDate: " 2020-02-2012:19:13",
                                dtUpdateDate: " 2020-02-2012:19:44",
                                nState: 1,
                                childrenList: [
                                  {
                                    key: "a174316ffb764d589be2fcc1cfff0d43",
                                    cId: "a174316ffb764d589be2fcc1cfff0d43",
                                    cPid: "b674316ffb764d589be2fcc1cfff0d43" ,
                                    cName: "模块1.1-任务1",
                                    nLevel: '',
                                    dtCreateDate: " 2020-02-2012:19:13",
                                    dtUpdateDate: " 2020-02-2012:19:44",
                                    nState: 1,
                                  },
                                  {
                                    key: "a1O000dak89be2fcc1cfff0d43",
                                    cId: "a1O000dak89be2fcc1cfff0d43",
                                    cPid: "b674316ffb764d589be2fcc1cfff0d43" ,
                                    cName: "模块1.1-任务2",
                                    nLevel: '',
                                    dtCreateDate: " 2020-02-2012:19:13",
                                    dtUpdateDate: " 2020-02-2012:19:44",
                                    nState: 1,
                                  }
                                ],
                                taskList: {
                                    key: "1544cd95987c4d8b8f1bb6e1191c50d2",
                                    cId: "1544cd95987c4d8b8f1bb6e1191c50d2",
                                    cPid: "dbea00029e5947fdb677906a7939f033" ,
                                    cName:"模块1",
                                    nLeve1: 2,
                                    dtCreateDate: "2020-02-2012:18:50",
                                    dtUpdateDate:"2020-02-2012:18:50",
                                  },
                              },
                      ],
             
            }
        ]
        
      }
    ]
    ,
    BusinessTreeData:[
      {
        key: "dbea00029e5947fdb677906a7939f033" ,
        cId: "dbea00029e5947fdb677906a7939f033",
        cPid: null,
        cName:"业务系统一号",
        nLevel: 1,
        dtCreateDate: " 2020-02-20 12:16:08",
        dtUpdateDate: "2020-02-20 12:16:08",
        nState: 1,
        taskList:{},
        childrenList: [
          {
            key: "1544cd95987c4d8b8f1bb6e1191c50d2",
            cId: "1544cd95987c4d8b8f1bb6e1191c50d2",
            cPid: "dbea00029e5947fdb677906a7939f033" ,
            cName:"模块1",
            nLevel: 2,
            dtCreateDate: "2020-02-2012:18:50",
            dtUpdateDate:"2020-02-2012:18:50",
            taskList:{
              key: "dbea00029e5947fdb677906a7939f033" ,
              cId: "dbea00029e5947fdb677906a7939f033",
              cPid: null,
              cName:"业务系统一号",
              nLevel: 1,
              dtCreateDate: " 2020-02-20 12:16:08",
              dtUpdateDate: "2020-02-20 12:16:08",
              nState: 1,
            },
            childrenList: [
                            {
                              key: "b674316ffb764d589be2fcc1cfff0d43",
                              cId: "b674316ffb764d589be2fcc1cfff0d43",
                              cPid: "1544cd95987c4d8b8f1bb6e1191c50d2" ,
                              cName: "模块1.1",
                              nLevel: 3,
                              dtCreateDate: " 2020-02-2012:19:13",
                              dtUpdateDate: " 2020-02-2012:19:44",
                              nState: 1,
                              childrenList: [
                                
                              ],
                              taskList: {
                                  key: "1544cd95987c4d8b8f1bb6e1191c50d2",
                                  cId: "1544cd95987c4d8b8f1bb6e1191c50d2",
                                  cPid: "dbea00029e5947fdb677906a7939f033" ,
                                  cName:"模块1",
                                  nLeve1: 2,
                                  dtCreateDate: "2020-02-2012:18:50",
                                  dtUpdateDate:"2020-02-2012:18:50",
                                },
                            },
                    ],
           
          }
      ]
      
    }
    ],
    QueryTreeList:[
        {
            cBusinessId: "",
             cBusinessName : "",
             cId : "100",
             cName : "1-1",
             cPid : null,
             cReadDbSourceName : "",
             cWriteDbSourceName : "",
             childList : [
                {
                     cBusinessId : "",
                     cBusinessName : "",
                     cId : "110",
                     cName : "1-1-1",
                     cPid : "100",
                     cReadDbSourceName : "",
                     cWriteDbSourceName : "",
                     childList : [
                        {
                          cId : "111",
                          cName : "1-1-1-1",
                          key : "111",
                        },
                        {
                          cId : "222",
                          cName : "1-1-1-2",
                          key : "222",
                        }
                    ],
                     dtBeginDate : "",
                     isChosePre : 0,
                     key : "110",
                     nExecState : 0,
                     nExecStateDesc :0
                },
                {
                  cBusinessId : "",
                  cBusinessName : "",
                  cId : "112",
                  cName : "1-1-2",
                  cPid : "100",
                  cReadDbSourceName : "",
                  cWriteDbSourceName : "",
                  childList : [
                     {
                       cId : "1112",
                       cName : "1-1-2-1",
                       key : "121",
                     },
                     {
                       cId : "2222",
                       cName : "1-1-2-2",
                       key : "2222",
                     }
                 ],
                  dtBeginDate : "",
                  isChosePre : 0,
                  key : "110",
                  nExecState : 0,
                  nExecStateDesc :0
             }
            ],
             dtBeginDate : "",
             isChosePre : 0,
             key : "100",
             nExecState : 0,
            nExecStateDesc: ""
        }
    ]
    ,BatchSize:[
      {
        cTypeId: "100011",  //代码类型编号
        cCode: "1" ,     //代码
        cCodeName: "1024" , //代码名称
        nDisplayOrder: 1,   //显示顺序
        dtCreateDate: null, //创建时间
        dtUpdateDate: null, //最后修改时间
        nState: 1           //状态.
     },
     { cTypeId: "100012",  //代码类型编号
       cCode: "2" ,     //代码
       cCodeName: "2048" , //代码名称
       nDisplayOrder: 1,   //显示顺序
       dtCreateDate: null, //创建时间
       dtUpdateDate: null, //最后修改时间
       nState: 1           //状态.
     },
     {
       cTypeId: "100013",  //代码类型编号
       cCode: "3" ,     //代码
       cCodeName: "4096" , //代码名称
       nDisplayOrder: 1,   //显示顺序
       dtCreateDate: null, //创建时间
       dtUpdateDate: null, //最后修改时间
       nState: 1           //状态.
     },
    ]
    ,Byte:[
      {
        cTypeId: "100011",  //代码类型编号
        cCode: "1" ,     //代码
        cCodeName: "1M/s" , //代码名称
        nDisplayOrder: 1,   //显示顺序
        dtCreateDate: null, //创建时间
        dtUpdateDate: null, //最后修改时间
        nState: 1           //状态.
     },
     { cTypeId: "100012",  //代码类型编号
       cCode: "2" ,     //代码
       cCodeName: "10M/s" , //代码名称
       nDisplayOrder: 1,   //显示顺序
       dtCreateDate: null, //创建时间
       dtUpdateDate: null, //最后修改时间
       nState: 1           //状态.
     },
     {
       cTypeId: "100013",  //代码类型编号
       cCode: "3" ,     //代码
       cCodeName: "50M/s" , //代码名称
       nDisplayOrder: 1,   //显示顺序
       dtCreateDate: null, //创建时间
       dtUpdateDate: null, //最后修改时间
       nState: 1           //状态.
     },
    ],
    Channel:[
      {
        cTypeId: "100011",  //代码类型编号
        cCode: "1" ,     //代码
        cCodeName: "1" , //代码名称
        nDisplayOrder: 1,   //显示顺序
        dtCreateDate: null, //创建时间
        dtUpdateDate: null, //最后修改时间
        nState: 1           //状态.
     },
     { cTypeId: "100012",  //代码类型编号
       cCode: "2" ,     //代码
       cCodeName: "3" , //代码名称
       nDisplayOrder: 1,   //显示顺序
       dtCreateDate: null, //创建时间
       dtUpdateDate: null, //最后修改时间
       nState: 1           //状态.
     },
     {
       cTypeId: "100013",  //代码类型编号
       cCode: "3" ,     //代码
       cCodeName: "4" , //代码名称
       nDisplayOrder: 1,   //显示顺序
       dtCreateDate: null, //创建时间
       dtUpdateDate: null, //最后修改时间
       nState: 1           //状态.
     },
    ],
    Record:[
      {
         cTypeId: "100011",  //代码类型编号
         cCode: "1000" ,     //代码
         cCodeName: "1000" , //代码名称
         nDisplayOrder: 1,   //显示顺序
         dtCreateDate: null, //创建时间
         dtUpdateDate: null, //最后修改时间
         nState: 1           //状态.
      },
      { cTypeId: "100012",  //代码类型编号
        cCode: "1001" ,     //代码
        cCodeName: "1001" , //代码名称
        nDisplayOrder: 1,   //显示顺序
        dtCreateDate: null, //创建时间
        dtUpdateDate: null, //最后修改时间
        nState: 1           //状态.
      },
      {
        cTypeId: "100013",  //代码类型编号
        cCode: "1002" ,     //代码
        cCodeName: "1002" , //代码名称
        nDisplayOrder: 1,   //显示顺序
        dtCreateDate: null, //创建时间
        dtUpdateDate: null, //最后修改时间
        nState: 1           //状态.
      },
    ],
    TasKData:[
      "7",  "30",  "90",  "180", "365" 
    ],
    HdfsFileTypeData:[
      {
        cTypeId: "100011",  //代码类型编号
        cCode: "TEXT" ,     //代码
        cCodeName: "TEXT" , //代码名称
        nDisplayOrder: 1,   //显示顺序
        dtCreateDate: null, //创建时间
        dtUpdateDate: null, //最后修改时间
        nState: 1           //状态.
     },
     {
      cTypeId: "100012",  //代码类型编号
      cCode: "ORC" ,     //代码
      cCodeName: "ORC" , //代码名称
      nDisplayOrder: 2,   //显示顺序
      dtCreateDate: null, //创建时间
      dtUpdateDate: null, //最后修改时间
      nState: 1           //状态.
     },
    ],
    HdfsEncod:[
      {
        cTypeId: "100011",  //代码类型编号
        cCode: "UTF-8" ,     //代码
        cCodeName: "UTF-8" , //代码名称
        nDisplayOrder: 1,   //显示顺序
        dtCreateDate: null, //创建时间
        dtUpdateDate: null, //最后修改时间
        nState: 1           //状态.
     },
     {
      cTypeId: "100012",  //代码类型编号
      cCode: "GBK" ,     //代码
      cCodeName: "GBK" , //代码名称
      nDisplayOrder: 2,   //显示顺序
      dtCreateDate: null, //创建时间
      dtUpdateDate: null, //最后修改时间
      nState: 1           //状态.
     },
    ],

    TDatasourceNoPageList:[
      {
        key: "22222",
        cId: "22222",
        cDatasourceName: "数据源名称-Oracle" ,
        nDbType:1,
        nDbTypeName: "Oracle"
      },
      {
        key: "111111",
        cId: "111111",
        cDatasourceName: "数据源名称-HDFS" ,
        nDbType:6,
        nDbTypeName: "HDFS"
      },
      {
        key: "333333",
        cId: "333333",
        cDatasourceName: "数据源名称-HDFS-2" ,
        nDbType:6,
        nDbTypeName: "HDFS"
      },
      {
        key: "444444",
        cId: "444444",
        cDatasourceName: "数据源名称-AOracle" ,
        nDbType:5,
        nDbTypeName: "AOracle"
      }
    ],
    // QueryTableList:[
    //   {
    //     tableName: "AC_AGENCY_NET",
    //     key: "2544cd95987c4d8b8f1bb6e1191c50d4",
    //   },
    //   {
    //     tableName: "AC_BUSINESS_CODE",
    //     key: "1544cd95987c4d8b8f1bb6e1191c50d4",
    //   }
      
    // ],
    QueryTableList:null,
    HafsWriteFieType:[
    ],
    QueryWriteCompress:[],
    QueryWriteMode:[],
    //完整的任务配置的数据
    SingleJson:{
      tTaskConfig: {
        cBusinessId: "选择的模块或系统的cId",
        cName: "任务名称",
        nIfActivate: 1, //是否激活 1是0不是
        nIfInvalid: 1,//是否有效 1 是0不是
        nLogRetainTime: 30,// 日志保留时长
        preTaskIds: "100,110" //选择的前置任务的cid 多个逗号分开传string
      },
      tExtractionRuleConfig: {
        nIfSchedule: 0,   //是否定时 1是0不是
        cCron: "000**?",  //cron表达式
        nBatchSize: 2048, //-次性写入大小
        nChannel: 5,      //线程 数
        nByte: "5242880",  //读取速率
        nRecord: ""       //读取大小
      },
      tReadConfig: {
        cDatasourceId: "选择的数据源的id",
        cReadSqlMain: "select 大from test", //写入端的sq1语句
        cParam: null,          //预留参数，先 暂时不传。
        cFilePath: null,       //文件路径
        cFileType: null,       //文件类型
        cFieldDelimiter: null, //文件分割符
        cEncoding: null,       //编码
        dbReadType: 4
      },
      tWriteConfig: {
        cDatasourceId: "选择的数据源的id",
        cDbName: "数据库名",
        cTabName: "表名",
        cPreSql: "delete frodm student",   //写入前sq1
        cPostSql: "update studddddent set date=' 2019-01-01'",  //写入后sq1
        cWriteMode: "insert", //写入方式
        cFilePath: null,  //文件路径
        cFileType: null,  //文件类型
        cFieldDelimiter: null, //文件分割符
        cCompress: null,     //压缩方式
        cFieldOrder: "id, nadme, age, date",//字段映射，hdfs的不一样，细节再说
        dbwriteType: 6
      }
    },
    cParamData:[],
    
  },
  effects: {
   
//查询树
    *getTreeData({payload:{ datas }},{ call, put, select }) {
        const data = yield call(getTree,datas);
        console.log(data) 
        if(data.code === 200&&data.data!=[]){
          yield put({ type: 'showTree', payload:{treeFlag:true}});
          yield put({ type: 'setTreeData', payload: {
            treeData: data.data
          }});
        }else {
            message.error(data.message , 4);
            console.log(data)
      }
       
    },
  //查询树
  *getOnlyBusinessTree({payload:{ datas }},{ call, put, select }) {
    const data = yield call(getOnlyBusinessTree,datas);
    console.log(data) 
    if(data.code === 200&&data.data!=[]){
      yield put({ type: 'setBusinessTreeData', payload: {
        BusinessTreeData: data.data
      }});
    }else {
        message.error(data.message , 4);
        console.log(data)
  }
   
},
  
//新建树
    *createTree({payload:{ datas,callback }},{ call, put, select }) {
      console.log(datas) 
      const data = yield call(createTree,datas);
      if(data.code === 200){
            message.success(data.message , 3);
            callback();
        }else {
            message.error(data.message , 4);
            console.log(data)
            callback();
      }
     
    },
//删除树
    *deleteTree({payload:{ datas,callback }},{ call, put, select }) {
      console.log(datas) 
      const data = yield call(deleteTree,datas);
      if(data.code === 200){
            message.success(data.message , 3);
          callback();
      }else {
          message.error(data.message , 4);
          console.log(data)
          callback();
     }
     
    },
//编辑树
    *updateTree({payload:{ datas,callback }},{ call, put, select }) {
      console.log(datas) 
      const data = yield call(updateTree,datas);
      if(data.code === 200){
          message.success(data.message , 3);
          callback();
      }else {
          message.error(data.message , 4);
          console.log(data)
          callback();
    }
     
    },
    //查询前置任务列表树形
    *getQueryTreeList({payload:{ datas,callback }},{ call, put, select }) {
      console.log(datas) 
      const data = yield call(getQueryTreeList,datas);
      if(data.code === 200){
          yield put({ type: 'setQueryTreeList', payload:{
            QueryTreeList: data.data.list
          }});
          callback();
      }else {
          message.error(data.message , 4);
          console.log(data)
          callback();
    }
     
    },
     //查询一次性写入大小
     *getDataxBatchSize({payload:{ datas,callback }},{ call, put, select }) {
      console.log(datas) 
      const data = yield call(getDataxBatchSize,datas);
      if(data.code === 200){
         yield put({ type: 'setBatchSize', payload: {BatchSize:data.data}});
          callback();
      }else {
          message.error(data.message , 4);
          console.log(data)
          callback();
    }
     
    },
    //获取一次性写入速率
    *getDataxByte({payload:{ datas,callback }},{ call, put, select }) {
      console.log(datas) 
      const data = yield call(getDataxByte,datas);
      if(data.code === 200){
          yield put({ type: 'setByte', payload:{Byte:data.data} });
          callback();
      }else {
          message.error(data.message , 4);
          console.log(data)
          callback();
    }
   
    },
    //获取线程数
    *getDataxChannel({payload:{ datas,callback }},{ call, put, select }) {
      console.log(datas) 
      const data = yield call(getDataxChannel,datas);
      if(data.code === 200){
          yield put({ type: 'setChannel', payload:{Channel:data.data}});
          callback();
      }else {
          message.error(data.message , 4);
          console.log(data)
          callback();
    }
   
    },
    //获取datax行数
     *getDataxRecord({payload:{ datas,callback }},{ call, put, select }) {
      console.log(datas) 
      const data = yield call(getDataxRecord,datas);
      if(data.code === 200){
          yield put({ type: 'setRecord', payload:{Record:data.data}});
          callback();
      }else {
          message.error(data.message , 4);
          console.log(data)
          callback();
    }
    },
    //获取cron
    *getQueryCron({payload:{ datas,callback }},{ call, put, select }) {
      console.log(datas) 
      const data = yield call(getQueryCron,datas);
      if(data.code === 200){
          callback(data.data)
      }else {
          message.error(data.message , 4);
      }
    },
    //验证cron
    *getvalidCron({payload:{ datas,callback }},{ call, put, select }) {
      console.log(datas) 
      const data = yield call(getvalidCron,datas);
      if(data.code === 200){
          if(data.data){
            message.success("cron验证成功！", 3);
            callback(1);
          }else{
            message.error("cron验证失败请重新填写！" , 3);
            callback(0);
          }
      }else {
          message.error(data.message , 4);
          callback(0);
      }
    },
    
    //获取文件类型
    *getHdfsReadFileType({payload:{ datas,callback }},{ call, put, select }) {
      console.log(datas) 
      const data = yield call(getHdfsReadFileType,datas);
      if(data.code === 200){
          yield put({ type: 'setHdfsFileTypeData', payload:{HdfsFileTypeData:data.data}});
          callback();
      }else {
          message.error(data.message , 4);
          console.log(data)
          callback();
    }
    },
    //获取编码
    *getHdfsEncoding({payload:{ datas,callback }},{ call, put, select }) {
      console.log(datas) 
      const data = yield call(getHdfsEncoding,datas);
      if(data.code === 200){
          yield put({ type: 'setHdfsEncod', payload:{HdfsEncod:data.data}});
          callback();
      }else {
          message.error(data.message , 4);
          console.log(data)
          callback();
    }
    },
    
    //获取数据源
    *getTDatasourceNoPageList({payload:{ datas,callback }},{ call, put, select }) {
      console.log(datas) 
      const data = yield call(getTDatasourceNoPageList,datas);
      if(data.code === 200){
          yield put({ type: 'setTDatasourceNoPageList', payload:{TDatasourceNoPageList:data.data}});
          callback();
      }else {
          message.error(data.message , 4);
          console.log(data)
          callback();
    }
    },
     //获取数据表
     *getQueryTable({payload:{ datas,callback }},{ call, put, select }) {
      console.log(datas) 
      const data = yield call(getQueryTable,datas);
      if(data.code === 200){
          yield put({ type: 'setQueryTableList', payload:{QueryTableList:data.data}});
          callback();
      }else {
          message.error(data.message , 4);
          console.log(data)
          callback();
    }
    },
    
    //获取写入端HDFS文件类型
    *getHafsWriteFieType({payload:{ datas,callback }},{ call, put, select }) {
      console.log(datas) 
      const data = yield call(getHafsWriteFieType,datas);
      if(data.code === 200){
          yield put({ type: 'setHafsWriteFieType', payload:{HafsWriteFieType:data.data}});
          callback();
      }else {
          message.error(data.message , 4);
          console.log(data)
          callback();
    }
    },
  
    //获取写入端压缩方式
    *getQueryWriteCompress({payload:{ writedatas,writecallback }},{ call, put, select }) {
      console.log(writedatas) 
      const data = yield call(getQueryWriteCompress,writedatas);
      if(data.code === 200){
          yield put({ type: 'setQueryWriteCompress', payload:{QueryWriteCompress:data.data}});
          writecallback();
      }else {
          message.error(data.message , 4);
          console.log(data)
          writecallback();
    }
    },
    
     //获取写入端写入方式
     *getQueryWriteMode({payload:{ theDatas,Tcallback }},{ call, put, select }) {
      console.log(theDatas) 
      const data = yield call(getQueryWriteMode,theDatas);
      if(data.code === 200){
          yield put({ type: 'setQueryWriteMode', payload:{QueryWriteMode:data.data}});
          Tcallback();
      }else {
          message.error(data.message , 4);
          console.log(data)
          Tcallback();
    }
    },
    //检验sql
    *getSplitSqlCol({payload:{ datas,callback }},{ call, put, select }) {
      console.log(datas) 
      const data = yield call(splitSqlCol,datas);
      if(data.code === 200){
            if(data.data){
              message.success("sql验证成功！", 3);
              callback();
            }else{
              message.error("sql验证失败请重新填写！" , 3);
            }
      }else {
          message.error(data.message , 4);
          console.log(data)
      }
    },
    //获取sql
    *getTheSqlCol({payload:{ datas,callback }},{ call, put, select }) {
      console.log(datas) 
      const data = yield call(TheSqlCol,datas);
      if(data.code === 200){
          yield put({ type: 'setTheSqlCol', payload:{cParamData:data.data}});
          callback();
      }else {
          message.error(data.message , 4);
          console.log(data)
      }
    },
    //
    *generateHdfsSql({payload:{ datas,callback }},{ call, put, select }) {
      console.log(datas) 
      const data = yield call(generateHdfsSql,datas);
      if(data.code === 200){
          callback(data.data);
      }else {
          message.error(data.message , 4);
          console.log(data)
      }
    },
    
    
    //完成新增任务配置
    *createTaskConfig({payload:{ datas,callback }},{ call, put, select }) {
      console.log(datas) 
      const data = yield call(createTaskConfig,datas);
      if(data.code === 200){
          callback("SUC");
      }else {
          message.error(data.message , 4);
          console.log(data)
          callback("ERR");
     }
    },
    //查询一条任务详情
    *querySingleJson({payload:{ taskData,taskcallback }},{ call, put, select }) {
      console.log(taskData) 
      const data = yield call(querySingleJson,taskData);
      if(data.code === 200){
          yield put({ type: 'setSingleJson', payload:{SingleJson:data.data}});
          taskcallback();
      }else {
          message.error(data.message , 4);
          console.log(data)
    }
    },
    //编辑任务配置
    *uploadTaskConfig({payload:{ datas,callback }},{ call, put, select }) {
      console.log(datas) 
      const data = yield call(uploadTaskConfig,datas);
      if(data.code === 200){
          callback("SUC");
      }else {
          message.error(data.message , 4);
          console.log(data)
          callback("ERR");
    }
    },
    //删除任务
    *deleteTask({payload:{ datas,callback }},{ call, put, select }) {
      console.log(datas) 
      const data = yield call(deleteTask,datas);
      if(data.code === 200){
            message.success(data.message , 3);
            callback();
      }else {
          message.error(data.message , 4);
          console.log(data)
          callback();
     }
    },

  },
  reducers: {
    showTree(state, { payload: { treeFlag } }) {
        return { ...state, treeFlag };
    },
    setTreeData(state, { payload: { treeData } }) {
      return { ...state, treeData };
    },
    setBusinessTreeData(state, { payload: { BusinessTreeData } }) {
      return { ...state, BusinessTreeData };
    },
    setQueryTreeList(state, { payload: { QueryTreeList } }) {
      return { ...state, QueryTreeList };
    },
    setBatchSize(state, { payload: { BatchSize } }) {
      return { ...state, BatchSize };
    },
    setByte(state, { payload: { Byte } }) {
      return { ...state, Byte };
    },
    setChannel(state, { payload: { Channel } }) {
      return { ...state, Channel };
    },
    
    setRecord(state, { payload: { Record } }) {
      return { ...state, Record };
    },
    setHdfsFileTypeData(state, { payload: { HdfsFileTypeData } }) {
      return { ...state, HdfsFileTypeData };
    },
    
    setHdfsEncod(state, { payload: { HdfsEncod } }) {
      return { ...state, HdfsEncod };
    },
    setTDatasourceNoPageList(state, { payload: { TDatasourceNoPageList } }) {
      return { ...state, TDatasourceNoPageList };
    },
    setQueryTableList(state, { payload: { QueryTableList } }) {
      return { ...state, QueryTableList };
    },
    setHafsWriteFieType(state, { payload: { HafsWriteFieType } }) {
      return { ...state, HafsWriteFieType };
    },
    setQueryWriteCompress(state, { payload: { QueryWriteCompress } }) {
      return { ...state, QueryWriteCompress };
    },
    setQueryWriteMode(state, { payload: { QueryWriteMode } }) {
      return { ...state, QueryWriteMode };
    },
    setSingleJson(state, { payload: { SingleJson } }) {
      return { ...state, SingleJson };
    },
    setTheSqlCol(state, { payload: { cParamData } }) {
      return { ...state, cParamData };
    }
    
  },
  subscriptions: {
    setup({ history }) {
      history.listen(({ pathname, search }) => {
        if (typeof window.ga !== 'undefined') {
          window.ga('send', 'pageview', pathname + search);
        }
      });
    },
  },
};
export default TaskAllocationModel;