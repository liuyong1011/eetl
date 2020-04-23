import { createByJdbcUrl,createSubitem, textLinkSubitem,textLinkByJdbc,getTDatasourceList,deleteTData,updateTData,getTDatasourceDetails,getCutJdbcUrl,getCreateJdbcUrl} from '@/services/DataSourceConfigServices';
import {message} from 'antd';

const DataSourceConfigModel = {
  namespace: 'DataSourceConfigModel',
  state: {
    tDataFlag: true,
    tDataList:{
        list:[
            {
                cDatasourceName:'卡片标题1',
                nDbTypeName:'Oracle',
                key:'1'
              },
              {
                cDatasourceName:'卡片标题2',
                nDbTypeName:'Mysql',
                key:'2'
          
              },
              {
                cDatasourceName:'卡片标题3',
                nDbTypeName:'Oracle',
                key:'3'
              },
              {
                cDatasourceName:'卡片标题4',
                nDbTypeName:'Oracle',
                key:'4'
              },
              {
                cDatasourceName:'卡片标题1',
                nDbTypeName:'Oracle',
                key:'5'
              },
              {
                cDatasourceName:'卡片标题2',
                nDbTypeName:'Mysql',
                key:'6'
          
              },
              {
                cDatasourceName:'卡片标题3',
                nDbTypeName:'Oracle',
                key:'7'
              },
              {
                cDatasourceName:'卡片标题4',
                nDbTypeName:'Oracle',
                key:'8'
              },
              {
                cDatasourceName:'卡片标题1',
                nDbTypeName:'Oracle',
                key:'9'
              },
              {
                cDatasourceName:'卡片标题2',
                nDbTypeName:'Mysql',
                key:'10'
          
              },
              {
                cDatasourceName:'卡片标题3',
                nDbTypeName:'Oracle',
                key:'11'
              },
              {
                cDatasourceName:'卡片标题4',
                nDbTypeName:'Oracle',
                key:'12'
              },
              {
                cDatasourceName:'卡片标题1',
                nDbTypeName:'Oracle',
                key:'13'
              },
              {
                cDatasourceName:'卡片标题2',
                nDbTypeName:'Mysql',
                key:'14'
          
              },
              {
                cDatasourceName:'卡片标题3',
                nDbTypeName:'Oracle',
                key:'15'
              },
              {
                cDatasourceName:'卡片标题4',
                nDbTypeName:'Oracle',
                key:'16'
              },
              {
                cDatasourceName:'卡片标题1',
                nDbTypeName:'Oracle',
                key:'17'
              },
              {
                cDatasourceName:'卡片标题2',
                nDbTypeName:'Mysql',
                key:'19'
          
              },
              {
                cDatasourceName:'卡片标题3',
                nDbTypeName:'Oracle',
                key:'20'
              },
             
            ],
        total:20
    },
    detailsFlag: false,
    tDataDetails: {
        // cDatasourceName: '1',
        // cId :  '1',
        // cDbName:   '1' ,
        //  nDbType : 6,
        //  nDbTypeName :  '1', 
        //  cSchema :   '1',
        //  cIp :  '1' ,
        //  cPort :   '1' ,
        //  cUsername :   '1' ,
        //  cPassword :   '1' ,
        //  cMetadataDbName :   '1' ,
        //  nMetadataDbType :   '1' ,
        //  nMetadataDbTypeName :   '1' ,
        //  cMetadataIp :   '1' ,
        //  cMetadataPort :   '1' ,
        //  cMetadataUsername :   '1' ,
        //  cMetadataPassword :   '1' ,
        //  jdbcUrl :   '1' ,
    }
  },
  effects: {
    *createByJdbc({payload:{ datas,callback }}, { call, put, select }) {
      console.log(datas) 
      const data  = yield call(createByJdbcUrl,datas);
      console.log(data)
      if(data.code === 200){
        message.success(data.message , 4);
        callback();
      }else {
          message.error(data.message , 4);
          console.log(data)
        //   callback();
    }
    
    },
    *createSubitem({payload:{ datas,callback }}, { call, put, select }) {
        console.log(datas) 
        const data  = yield call(createSubitem,datas);
        console.log(data)
        if(data.code === 200){
            message.success(data.message , 4);

          // callback();
        }else {
            message.error(data.message , 4);
            console.log(data)
          // callback();
      }
      
    },
    *textLinkByJdbc({payload:{ datas,callback }},{ call, put, select }) {
        console.log(datas) 
        const data  = yield call(textLinkByJdbc,datas);
        console.log(data)
        if(data.code === 200){
            message.success(data.message , 4);
            callback();
        }else {
            message.error(data.message , 4);
            console.log(data)
      }
      
    },
    *textLinkSubitem({payload:{ datas,callback }}, { call, put, select }) {
        console.log(datas) 
        const data  = yield call(textLinkSubitem,datas);
        console.log(data)
        if(data.code === 200){
            message.success(data.message , 4);
            callback();
        }else {
            message.error(data.message , 4);
            console.log(data)
      }
    },
    *deleteTData({payload:{ datas,callback }}, { call, put, select }) {
        console.log(datas) 
        const data  = yield call(deleteTData,datas);
        console.log(data)
        if(data.code === 200){
            message.success(data.message , 4);
          callback();
        }else {
            message.error(data.message , 4);
            console.log(data)
        }
    },
    *updateTData({payload:{ datas,callback }}, { call, put, select }) {
        console.log(datas) 
        const data  = yield call(updateTData,datas);
        console.log(data)
        if(data.code === 200){
            message.success(data.message , 4);
          callback();
        }else {
            message.error(data.message , 4);
            console.log(data)
        }
    },
    
    *getTDatasourceList({payload:{ datas,callback }},{ call, put, select }) {
        console.log(datas) 
        const data = yield call(getTDatasourceList,datas);
        if(data.code === 200){
            yield put({ type: 'showTData', payload: {
                tDataFlag:true
            },});
            yield put({ type: 'getTData', payload: {
                tDataList: data.data
            },});
            //callback();
        }else {
            message.error(data.message , 4);
            console.log(data)
            callback();
      }
       
    },
    *getTDatasourceDetails({payload:{ datas,callback }},{ call, put, select }) {
        console.log(datas) 
        const data = yield call(getTDatasourceDetails,datas);
        if(data.code === 200){
            yield put({ type: 'showDetails', payload:{
                detailsFlag:true
              },});
            yield put({ type: 'getDetails', payload:{
                tDataDetails: data.data
              }});
            callback();
        }else {
            message.error(data.message , 4);
      }
       
    },
    *getCutJdbcUrl({payload:{ datas,callback }},{ call, put, select }) {
        console.log(datas) 
        const data = yield call(getCutJdbcUrl,datas);
        if(data.code === 200){
            callback(data.data);
        }else {
            message.error(data.message , 4);
            console.log(data)
      }
       
    },
    *getCreateJdbcUrl({payload:{ datas,callback }},{ call, put, select }) {
        console.log(datas) 
        const data = yield call(getCreateJdbcUrl,datas);
        if(data.code === 200){
            callback(data.data);
        }else {
            message.error(data.message , 4);
            console.log(data)
      }
       
    },
 

  },
  reducers: {
    showTData(state, { payload: { tDataFlag } }) {
        return { ...state, tDataFlag };
    },
    getTData(state, { payload: { tDataList } }) {
        return { ...state, tDataList };
    },
    showDetails(state, { payload: { detailsFlag } }) {
        return { ...state, detailsFlag };
    },
    getDetails(state, { payload: { tDataDetails } }) {
        return { ...state, tDataDetails };
    },
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
export default DataSourceConfigModel;