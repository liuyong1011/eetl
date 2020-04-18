import React, { Component,Fragment } from 'react';
import { Tabs,Table,Modal,DatePicker,Input,Pagination,Button,message } from 'antd';
import {Task,realTimeLog,showHisLog,startTask} from '@/api/task'
import SockJsClient from 'react-stomp';
// import { ExclamationCircleOutlined } from '@ant-design/icons'
// import connect from '../websocket/app'
const { Search } = Input
// import { Task } from '../api/check'
const { TabPane } = Tabs
const { confirm } = Modal
// let stompClient = null;
// sendMessage = (msg) => {//发送消息
//   this.clientRef.sendMessage('/topics/all', msg);
// }


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
          evt:''
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
                      realTimeLog(record.cId)
                      .then(res=>{
                        if(res.code===200){
                            console.log("空数据",res)
                        }
                      })
                      this.setState({
                        visible:true,
                        cId:record.cId
                      })
                    }}
                    >查看</Button>
                </Fragment>
              )
            }
          },
          {
            title:'任务链',
            render:(h)=>{
              return(
                <Fragment>
                    <Button>查看</Button>
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
                      this.state.evt=e.currentTarget
                      console.log("错误1")
                      confirm({
                        title: '确定启动该任务吗？',
                        // icon: <ExclamationCircleOutlined />,
                        onOk:()=>{
                          console.log("text",text)
                          console.log(record.cId,record.nExecStateDesc);
                          let a = this.state.dataSource1.indexOf(text)
                          this.state.evt.setAttribute("disabled","true")
                          this.state.dataSource1[a].nExecStateDesc='正在执行中'
                          // this.state.dataSource1[a].fws=true
                          // this.state.fws=true
                          startTask(record.cId)
                          .then(res=>{
                            if(res.code===200){
                              console.log(res)
                              message.success("成功",5)
                            }else{
                              message.error("失败",3)
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
                    }}
                    disabled={false}
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
                    <button onClick={()=>{
                      this.setState({
                        visible:true
                      })
                      
                    }}
                    >查看日志</button>
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
          // res.data.list.map((item)=>{
          //   item["fws"] = false
          // })
           this.setState({
            dataSource1:res.data.list,
            total:res.data.total
           })
        }
      })
    }
    render() { 
      let {dataSource1,dataSource2,dataSource3,key,nIfInvalid,msgList,common,iptValue,total,cId,currentPage,msg}=this.state
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
              // if(key===1){
              //   this.setState({
              //     dataSource: dataSource.push
              //   })
              // }
              // if(key=2){
              //   Task()
              // }
            }}>
              <TabPane tab="已激活任务列表" key="1">
                <Table columns={this.columns} 
                    dataSource={dataSource1}
                    rowKey='cId'
                    pagination={false}
                    scroll={{y:350,x:500}}
                    // onRow={record => {
                    //   return {
                    //     onClick: event => {console.log("需要的数据",event)}, // 点击行
                    //     onDoubleClick: event => {},
                    //     onContextMenu: event => {},
                    //     onMouseEnter: event => {}, // 鼠标移入行
                    //     onMouseLeave: event => {},
                    //   };
                    // }}
                ></Table>
                <Modal
                  title="日志"
                  visible={this.state.visible}
                  onOk={()=>{this.setState({
                    visible:false,
                  })}}
                  onCancel={()=>{this.setState({
                    visible:false,
                  },()=>{
                    this.disconnect = (a) => {//断开连接
                      this.clientRef.disconnect()
                     }
                  })}}
                >
                  <Fragment>
                    <DatePicker onChange={(date,dateString)=>{
                      //  console.log(date,dateString)
                      //  const s = dateString.toString()
                      showHisLog(cId,dateString)
                      .then(res=>{
                        console.log(res)
                        this.setState({
                          journal:res.data,
                          msg:""
                        },()=>{
                          this.disconnect = (a) => {//断开连接
                            this.clientRef.disconnect()
                           }
                        })
                      })
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
                      scroll={{y:350,x:500}}
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
                      scroll={{y:350,x:500}}
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
 
export default TaskStatus;