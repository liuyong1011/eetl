import React, { Component,Fragment } from 'react';
import { Tabs,Table,Modal,DatePicker,Input,Pagination,Button,message,Form } from 'antd';
import {Task,realTimeLog,showHisLog,startTask,reservedParameters,taskChain,uploadParameters} from '@/api/task'
import SockJsClient from 'react-stomp';
import moment from 'moment';
import hdfs from '@/img/hdfs.jpg'
const dateFormat = 'YYYY-MM-DD ';
// import { ExclamationCircleOutlined } from '@ant-design/icons'
// import connect from '../websocket/app'
const { Search } = Input
// import { Task } from '../api/check'
const { TabPane } = Tabs
const { confirm } = Modal

const date = new Date();

const y = date.getFullYear()
const m = date.getMonth() + 1 
const d = date.getDate()
const h = date.getHours()
const i = date.getMinutes()
const s = date.getSeconds()
// Date.prototype.format = function(fmt) { 
//   var o = { 
//      "M+" : this.getMonth()+1,                 //月份 
//      "d+" : this.getDate(),                    //日 
//      "h+" : this.getHours(),                   //小时 
//      "m+" : this.getMinutes(),                 //分 
//      "s+" : this.getSeconds(),                 //秒 
//      "q+" : Math.floor((this.getMonth()+3)/3), //季度 
//      "S"  : this.getMilliseconds()             //毫秒 
//  }; 
//  if(/(y+)/.test(fmt)) {
//          fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
//  }
//   for(var k in o) {
//      if(new RegExp("("+ k +")").test(fmt)){
//           fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
//       }
//   }
//  return fmt; 
// }  
// let stompClient = null;
// sendMessage = (msg) => {//发送消息
//   this.clientRef.sendMessage('/topics/all', msg);
// }
// const sb = new Date().format("yyyy-MM-dd")
// console.log(sb)

class TaskStatus extends Component {
    constructor(props) {
        super(props)
        this.state={
          key:1,
          common:"",
          nIfActivate:1,
          nIfInvalid:0,
          visible:false,
          dataSource1:[],
          dataSource2:[],
          dataSource3:[],
          total:0,
          currentPage: 1,
          changeVaule:"",
          totalSize:0,
          journal:[],
          cId:"",
          iptValue:"",
          msgList:[],
          evt:'',
          date:"2020-04-04",
          reserved:false,
          params:[],
          chain:false,
          nExecStateDesc:"",
          localtime: y+'-'+m+'-'+d+' ' +h+':'+i+':'+s,
          Input:"",
          obj:{},
          text:{},
          valuee:"",
          // zhuangtai:false
          // dateString:""
          // fws:false,
        } 
        this.columns=[
          {
            title:'任务名称',
            dataIndex:'cName',
          },
          {
            title:'所属系统',
            dataIndex:'cBusinessName',
          },
          {
            title:'最近一次开始时间',
            dataIndex:'dtBeginDate',
          },
          {
            title:'最近一次结束时间',
            dataIndex:'dtEndDate',
          },
          {
            title:'执行状态',
            dataIndex:'nExecStateDesc',
          },
          {
            title:'执行日志',
            render:(text, record)=>{
              return(
                <Fragment>
                    <Button onClick={()=>{
                      console.log(record.cId)
                      this.connect = () => {//建立连接
                        this.clientRef.connect();
                      }
                      // connect(a.cId)
                      console.log("不一样",record.key)
                      // showHisLog(record.cId,record.dtEndDate)
                      // .then(res=>{
                      //   console.log("日历",res)
                      //   this.setState({
                      //     journal:res.data,
                      //     msg:"",
                      //     date:record.dtEndDate
                      //   })
                      // })
                      console.log("执行日志",record.cId,record.dtBeginDate)
                      realTimeLog(record.cId)
                      .then(res=>{
                        if(res.code===200){
                            console.log("空数据",res)
                        }
                      })
                      this.setState({
                        visible:true,
                        cId:record.cId,
                        date:record.dtBeginDate
                      })
                    }}
                    >查看</Button>
                </Fragment>
              )
            }
          },
          {
            title:'任务链',
            render:(text,record)=>{
              return(
                <Fragment>
                    <Button onClick={()=>{
                      // taskChain(record.cId)
                      // .then(res=>{
                      //   if(res.code===200){
                      //     console.log("任务链",res)
                      //   }
                      // })
                      // this.setState({
                      //   chain:true,
                      //   nExecStateDesc:record.nExecStateDesc,
                      //   date:record.dtBeginDate
                      // })
                    }}>查看</Button>
                </Fragment>
              )
            }
          },
          {
            title:'执行任务',
            render:(text, record)=>{
              return(
                <Fragment>
                    <Button onClick={(e)=>{
                      this.setState({
                        text:text,
                        cId:record.cId
                      })
                      this.state.evt=e.currentTarget
                      console.log("按钮上面得e",e)
                          // 预留接口
                          reservedParameters(record.cId)
                          .then(res=>{
                            if(res.code===200){
                          if(res.data==null){
                            confirm({
                              title: '确定启动该任务吗？',
                              onOk:()=>{
                                console.log("text",text)
                                console.log(record.cId,record.nExecStateDesc);
                                let a = this.state.dataSource1.indexOf(text)
                                startTask(record.cId)
                                .then(res=>{
                                  console.log("成功失败数据",res)
                                  if(res.code===500){
                                    message.error("失败",3)
                                  }
                                  if(res.code===200 && res.data.length==0){
                                    // this.state.evt.setAttribute("disabled","true")
                                    // this.state.dataSource1[a].nExecStateDesc='正在同步中'
                                    // this.state.dataSource1[a].zhuangtai=true
                                    // this.state.dataSource1[a].dtBeginDate= this.state.localtime
                                    // message.success("成功",3)
                                    this.setState({

                                    },()=>{
                                      record.nExecStateDesc='正在同步中'
                                      record.zhuangtai=true
                                      record.dtBeginDate= this.state.localtime
                                      message.success("成功",3)
                                    })
                                    // this.state.dataSource1[a].nExecStateDesc='正在同步中'
                                    // this.state.dataSource1[a].zhuangtai=true
                                    // this.state.dataSource1[a].dtBeginDate= this.state.localtime
                                    // message.success("成功",3)
                                  }
                                  if(res.code===200 && res.data.length!==0){
                                    message.error(res.data,3)
                                  } 
                                })
                                this.setState({
                                  dataSource1:this.state.dataSource1
                                })
                              },
                              onCancel() {
                                console.log('Cancel');
                              },
                            });
                          }else{
                            this.setState({
                              reserved:true,
                              params:res.data
                            })
                          }
                            }
                          })
                      console.log("错误1")
                      
                    }}
                    disabled={record.zhuangtai}
                    >执行开始</Button>
                </Fragment>
              )
            }
          },
        ]
        this.columns1=[
          {
            title:'任务名称',
            dataIndex:'cName',
          },
          {
            title:'所属系统',
            dataIndex:'cBusinessName',
          },
          {
            title:'执行周期',
            dataIndex:'cCron',
          },
          {
            title:'最近一次开始时间',
            dataIndex:'dtBeginDate',
          },
          {
            title:'最近一次结束时间',
            dataIndex:'dtEndDate',
          },
          {
            title:'最近一次执行状态',
            dataIndex:'nExecStateDesc',
          },
          {
            title:'执行日志',
            render:(h)=>{
              return(
                <Fragment>
                    <Button onClick={()=>{
                      this.setState({
                        visible:true
                      })
                      
                    }}
                    >查看日志</Button>
                </Fragment>
              )
            }
          },
        ]
        // this.state.dataSource1 = [];
        // // // this.dataSource2 = [];
        // for (let i = 0; i < 46; i++) {
        //   this.state.dataSource1.push({
        //     key:'i',
        //     cId: i,
        //     cName: `task ${i}`,
        //     cBusinessName:i,
        //     dtBeginDate:33,
        //     dtEndDate:34,
        //     nExecState:"true",
        //   });
        // }
        // for (let i = 0; i < 46; i++) {
        //   this.dataSource2.push({
        //     key:'i',
        //     cBusinessName: `task ${i}`,
        //     cCron:30,
        //     dtBeginDate: 32,
        //     dtEndDate:33,
        //     nExecState:"true",
        //   });
        // }
    }
    componentDidMount(){
      Task("",1,null).then(res=>{
        console.log(1,res)
        if(res.code===200){
           this.setState({
            dataSource1:res.data.list,
            total:res.data.total
           },()=>{
           this.state.dataSource1.map(item=>{
             if(item.nExecStateDesc==="正在同步中"){
               return(
                 item.zhuangtai=true
               )
             }else{
               return(
                 item.zhuangtai=false
               )
             }
            })
           })
        }
      })
    }
    render() { 
      let { resetFields } = this.props.form
      let {dataSource1,dataSource2,dataSource3,key,valuee,msgList,common,iptValue,total,cId,currentPage,msg}=this.state
        return ( 
          <div style={{paddingLeft:30,paddingRight:30}}>
            <Search
                enterButton="搜索"
                size="large"
                value={iptValue}
                onChange={(e)=>{
                  // console.log("打印",e)
                  console.log(e.target.value)
                  this.setState({
                    iptValue: e.target.value
                  })
                }}
                style={{ width: '350px', height: '50px', marginBottom: '10px' }}
                onSearch={value => {
                  console.log(value)
                  this.setState({
                    changeVaule:value,
                    common:value,
                 },()=>{
                   console.log(this.state.common)
                  if(value ===""){
                    return false
                  }else{
                    if(key===1){
                      this.setState({
                         nIfActivate:1,
                         nIfInvalid:null,
                      },()=>{
                        Task(
                          value,
                          1,
                          null
                        ).then(res=>{
                          console.log(2,res)
                          this.setState({
                            dataSource1:res.data.list,
                            total:res.data.total
                          })
                        })
                      })
                    }
                    if(key===2){
                      this.setState({
                         nIfActivate:0,
                         nIfInvalid:null,
                      },()=>{
                        Task(
                          value,
                          0,
                          null
                        ).then(res=>{
                          console.log(2,res)
                          this.setState({
                            dataSource2:res.data.list,
                            total:res.data.total
                          })
                        })
                      })
                      
                    }
                    if(key===3){
                      this.setState({
                         nIfActivate:null,
                         nIfInvalid:1,
                      },()=>{
                        Task(
                          value,
                          null,
                          1
                        ).then(res=>{
                          console.log(2,res)
                          this.setState({
                            dataSource3:res.data.list,
                            total:res.data.total
                          })
                        })
                      })
                      
                    }
                  }
                 
                  console.log(this)
                 })
                  console.log("value",value,key)
                }}
              />
            <Tabs style={{backgroundColor:'#fff'}} onChange={(key) => {
              console.log(3,key)
              const num = Number(key)
              this.setState({
                key:num,
                currentPage: 1,
                iptValue:"",
                common:""
              })
              console.log("bug",num)
              if(num===1){
                Task(
                  "",
                  1,
                  null
                ).then(res=>{
                  console.log(4,res)
                  if(res.code===200){
                     this.setState({
                      changeVaule:"",
                      dataSource1:res.data.list,
                      total: res.data.total,
                      common:""
                     },()=>{
                      this.state.dataSource1.map(item=>{
                        if(item.nExecStateDesc==="正在同步中"){
                          return(
                            item.zhuangtai=true
                          )
                        }else{
                          return(
                            item.zhuangtai=false
                          )
                        }
                       })
                      })
                  }
                })
              }
              if(num===2){
                Task(
                  "",
                  0,
                  null
                ).then(res=>{
                  console.log(5,res)
                  if(res.code===200){
                    this.setState({
                      changeVaule:"",
                      dataSource2:res.data.list,
                      total: res.data.total,
                     })
                  }
                })
              }
              if(num===3){
                Task(
                  "",
                  null,
                  0
                ).then(res=>{
                  console.log(6,res)
                  if(res.code===200){
                     this.setState({
                      changeVaule:"",
                      dataSource3:res.data.list,
                      total: res.data.total
                     })
                  }
                })
              }
            }}>
              <TabPane tab="已激活任务列表" key="1">
                <Table columns={this.columns} 
                    dataSource={dataSource1}
                    rowKey='cId'
                    pagination={false}
                    scroll={{y:350,x:false}}
                ></Table>
                <Modal
                  bodyStyle={{height:"400px" ,width:"800px" , overflow:"auto"}}
                  width={800}
                  height={400}
                  destroyOnClose={true}
                  title="日志"
                  visible={this.state.visible}
                  onOk={()=>{this.setState({
                    date:"",
                    visible:false,
                    journal:[]
                    // dateString:""
                  })}}
                  onCancel={()=>{this.setState({
                    visible:false,
                    date:"",
                    // dateString:""
                    journal:[]
                  },()=>{
                    this.disconnect = (a) => {//断开连接
                      this.clientRef.disconnect()
                     }
                  })}}
                >
                  <Fragment>
                    <DatePicker 
                      defaultValue={moment(this.state.date, dateFormat)} format={dateFormat}
                      onChange={(date,dateString)=>{
                       console.log("点击日期",date,dateString)
                      showHisLog(cId,dateString)
                      .then(res=>{
                        console.log(res)
                        this.setState({
                          journal:res.data,
                        },()=>{
                          this.disconnect = (a) => {//断开连接
                            this.clientRef.disconnect()
                           }
                        })
                      })
                      console.log("有问题",cId,dateString)
                      //  console.log(s)
                    }}/>
                    <br />
                    <SockJsClient url='http://10.16.0.109:7070/etl-service/subTask' topics={['/topic/taskLog/' + cId + '/response']}
                    // <SockJsClient url='http://10.16.100.96:7070/etl-service/subTask' topics={['/topic/taskLog/' + cId + '/response']}
                    onMessage={(msg) => { 
                      msgList.push(msg)
                      this.setState({
                        msgList
                      })
                     }}
                    ref={(client) => { this.clientRef = client }} />
                    
                    {this.state.msgList.map(item=>{
                      return(
                        <div>
                          {item}
                        </div>
                      )
                    })}
                    {this.state.journal.map(item => {
                      return (
                        <div>
                          {item}
                        </div>
                      )
                    })}
                  </Fragment>
                </Modal>
                <Modal
                  title="预留参数"
                  visible={this.state.reserved}
                  onOk={(e)=>{
                    // this.state.evt=e.currentTarget
                    const keywordArr = []
                    const long = this.state.params.length
                    for(let i=0; i<long; i++){
                      let zhi = document.getElementById("a"+i).value
                      keywordArr.push(zhi)
                    }
                    console.log("数组",keywordArr)
                    this.state.params.map((item,index)=>{
                      return(
                        this.state.obj[item]= keywordArr[index]
                      )
                    })
                    console.log("半夜12点了",this.state.obj)
                    let a = this.state.dataSource1.indexOf(this.state.text)
                    // uploadParameters(cId,JSON.stringify(this.state.obj))
                    // .then(res=>{
                    //   if(res.code===200){
                    //     console.log("上传参数",res)
                    //     let a = this.state.dataSource1.indexOf(this.state.text)
                    //     console.log("下标",a)
                    //     // message.success("上传预留参数成功",3)
                    //     startTask(cId)
                    //     .then(res=>{
                    //       console.log("成功失败数据",res)
                    //       if(res.code===500){
                    //         message.error("失败",3)
                    //       }
                    //       if(res.code===200 && res.data.length==0){
                    //         // this.state.dataSource1[a].nExecStateDesc='正在同步中'
                    //         // this.state.dataSource1[a].zhuangtai=true
                    //         // this.state.dataSource1[a].dtBeginDate= this.state.localtime
                    //         // message.success("成功",3)
                    //         this.setState({

                    //         },()=>{
                    //           this.state.text.nExecStateDesc='正在同步中'
                    //           this.state.text.zhuangtai=true
                    //           this.state.text.dtBeginDate= this.state.localtime
                    //           message.success("成功",3)
                    //         })
                    //       }
                    //       if(res.code===200 && res.data.length!==0){
                    //         message.error(res.data,3)
                    //       }
                    //     })
                    //   }
                    // })
                   
                    uploadParameters(cId,JSON.stringify(this.state.obj))
                    .then(res=>{
                          if(res.code===500){
                            message.error("失败",3)
                          }
                          if(res.code===200 && res.data.length==0){
                            // const ly = this.state.dataSource1[a].nExecStateDesc = "正在同步中"
                            // const lyy = this.state.dataSource1[a].zhuangtai = true
                            // this.state.dataSource1[a].nExecStateDesc='正在同步中'
                            // this.state.dataSource1[a].zhuangtai=true
                            // this.state.dataSource1[a].dtBeginDate= this.state.localtime
                            // message.success("成功",3)
                            this.state.text.nExecStateDesc='正在同步中'
                            this.state.text.zhuangtai=true
                            this.state.text.dtBeginDate= this.state.localtime
                            message.success("成功",3)
                            // const data = dataSource1.map((item,index)=>{
                            //    return(
                            //      item
                            //    )
                            // })
                            // this.setState({
                            //   dataSource1:data
                            // },()=>{
                            //   this.state.text.nExecStateDesc='正在同步中'
                            //   this.state.text.zhuangtai=true
                            //   this.state.text.dtBeginDate= this.state.localtime
                            //   message.success("成功",3)
                            // })
                          }
                          if(res.code===200 && res.data.length!==0){
                            message.error(res.data,3)
                          }
                    })
                    this.setState({
                      dataSource1:this.state.dataSource1,
                      reserved:false,
                      text:{},
                      cId:"",
                    },()=>{
                      resetFields()
                    })
                  }}
                  onCancel={()=>{
                    this.setState({
                      reserved:false,
                      cId:"",
                      text:{},
                    })
                  }}
                >
                  {this.state.params.map(function(item,index){
                    return(
                    <div>{item}:<Input placeholder="用户输入值" id={"a" +index } key={"a" + index + index} autocomplete="off"  /></div>
                    )
                  })}
                  {/* {this.state.params.map(function(item){
                    return(
                    <div>{item}:<Input placeholder="用户输入值" ref={{item}} /></div>
                    )
                  })} */}
                </Modal>
                <Modal
                  bodyStyle={{height:"400px" ,width:"800px" , overflow:"auto"}}
                  width={800}
                  height={400}
                  title="任务链"
                  visible={this.state.chain}
                  onOk={()=>{
                    this.setState({
                      chain: false,
                      nExecStateDesc:"",
                      date:"",
                      journal:[]
                    })
                  }}
                  onCancel={()=>{
                    this.setState({
                      chain: false,
                      nExecStateDesc:"",
                      date:"",
                      journal:[]
                    })
                  }}
                >
                  {<div style={{}}>
                    <p>图形</p>
                    <button 
                    onClick={()=>{
                        showHisLog(cId,this.state.date)
                        .then(res=>{
                          console.log(res)
                          this.setState({
                            journal:res.data,
                          }
                          // ,()=>{
                          //   this.disconnect = (a) => {//断开连接
                          //     this.clientRef.disconnect()
                          //   }
                          // }
                          )
                        })
                    }}>
                      {/* <div>
                        假装为一个图形
                      </div> */}
                      <div>
                        <img src={hdfs} alt=""/>
                      </div>
                    </button>
                  </div>}
                  {this.state.journal.map(item => {
                      return (
                        <div>
                          {item}
                        </div>
                      )
                    })}
                </Modal>
                <Pagination  
                  style={{float:"right"}}
                  total={total}
                  pageSize={5}
                  current={currentPage}
                  onChange={(page)=>{
                    console.log('目标页数',page)
                    Task(common,1,null,page).then(res=>{
                      console.log(1,res)
                      if(res.code===200){
                         this.setState({
                          dataSource1:res.data.list,
                          currentPage: page
                         },()=>{
                          this.state.dataSource1.map(item=>{
                            if(item.nExecStateDesc==="正在同步中"){
                              return(
                                item.zhuangtai=true
                              )
                            }else{
                              return(
                                item.zhuangtai=false
                              )
                            }
                           })
                          })
                      }
                    })
                  }}
                />
              </TabPane>
              <TabPane tab="未激活任务列表" key="2">
                <Table columns={this.columns1} 
                      dataSource={dataSource2}
                      rowKey='_id'
                      pagination={false}
                      scroll={{y:350,x:false}}
                ></Table>
                <Pagination
                  style={{float:"right"}}
                  total={total} 
                  pageSize={5}
                  current={currentPage}
                  onChange={(page)=>{
                    console.log('目标页数',page)
                    Task(common,0,null,page).then(res=>{
                      console.log(1,res)
                      if(res.code===200){
                         this.setState({
                          dataSource2:res.data.list,
                          currentPage: page
                         })
                      }
                    })
                  }}
                />
              </TabPane>
              <TabPane tab="已失效任务列表" key="3">
                <Table columns={this.columns1} 
                      dataSource={dataSource3}
                      rowKey='_id'
                      pagination={false}
                      scroll={{y:350,x:false}}
                ></Table>
                <Pagination
                  style={{float:"right"}} 
                  pageSize={5}
                  total={total} 
                  current={currentPage}
                  onChange={(page)=>{
                    console.log('目标页数',page)
                    Task(common,null,0,page).then(res=>{
                      console.log(1,res)
                      if(res.code===200){
                         this.setState({
                          dataSource3:res.data.list,
                          currentPage: page
                         })
                      }
                    })
                  }}
                />
              </TabPane>
            </Tabs>
          </div>
         );
    }
}
 
export default Form.create()(TaskStatus);