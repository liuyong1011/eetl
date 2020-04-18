import React, { Component,Fragment } from 'react';
import { Button,Table,Pagination,Input,Modal,TreeSelect, message } from 'antd';
import { queryTask,queryTreeList,queryTaskTree,subTask,cancelSubTask } from '@/api/task'
// import  html  from '@/fws/Spingboot.html'
const { Search } = Input;
const { TreeNode } = TreeSelect;
const { confirm } = Modal;

// 2.<dependency>  
// 3.    <groupId>org.springframework.boot</groupId>  
// 4.    <artifactId>spring-boot-starter-data-redis</artifactId>  
// 5.</dependency>  
// 6.<dependency>  
// 7.    <groupId>org.apache.commons</groupId>  
// 8.    <artifactId>commons-pool2</artifactId>  
// </dependency> 
class InterfaceSchedul extends Component{
  constructor(props) {
    super(props)
    this.state={
      dataSource:[],
      visible: false,
      task:false,
      cId:"",
      total:0,
      value: undefined,
      cName:"",
      queryTreeList:[],
      size:"large",
      state:"",
      page:1,
      content:"{",
      content1:"}"
    }
    this.columns=[
      {
        title:'任务名称',
        dataIndex: 'cName',
        key:"_id",
        align:"center"
      },
      {
        title:'所属系统',
        dataIndex: 'cBusinessName',
        align:"center"
      },
      {
        title:'订阅号',
        dataIndex: 'key',
        // ellipsis: true,
        align:"center",
        width:275
      },
      {
        title:'订阅示例',
        align:"center",
        render:()=>{
          return(
            <Fragment>
              <Button onClick={()=>{
                  this.setState({
                    visible:true
                  })
              }}
              >查看</Button>
            </Fragment>
          )
        }
      },
      {
        title:'取消发布',
        align:"center",
        render:(text,record)=>{
          return(
            <Fragment>
              <Button
                onClick={()=>{
                  confirm({
                    title: '确定要取消发布吗?',
                    // icon: <ExclamationCircleOutlined />,
                    // content: 'Some descriptions',
                    onOk:()=> {
                      console.log(record.cId)
                      const a = record.cId
                      cancelSubTask(0,a)
                      .then(res=>{
                        if(res.code===200){
                          console.log("取消发布数据",res)
                          message.success("取消成功",2)
                          queryTask(1,1,5)
                          .then(res=>{
                            console.log("发布任务列表",res)
                            if(res.code===200){
                              this.setState({
                                dataSource:res.data.list,
                                total:res.data.total
                              })
                            }
                          })
                        }
                      })
                      
                    },
                    onCancel() {
                      console.log('Cancel');
                    },
                  });
                  
                }}
              >取消</Button>
            </Fragment>
          )
        }
      }
    ]
    // for (let i = 0; i < 46; i++) {
    //   this.state.dataSource.push({
    //     key:`dsfaasdfasdfsdafadsfasdfasd订阅号码 ${i}`,
    //     cId:i,
    //     cName: i,
    //     cBusinessName: `Edward King ${i}`,
    //     subscription: 32,
    //     example: `London, Park Lane no. ${i}`,
    //   });
    // }
    
  }
  componentDidMount(){
    queryTask(1,1,5)
    .then(res=>{
      console.log("发布任务列表",res)
      if(res.code===200){
        this.setState({
          dataSource:res.data.list,
          total:res.data.total
        })
      }
    })
  }
  render(){
    const loop = this.state.queryTreeList.map(item=>{
      if(item.childList && item.childList.length){
        return (
          <TreeNode key={item.key} title={item.cName} value={item.cId}>
             {
               item.childList.map(ite=>{
                  return(
                    <TreeNode key={ite.key} title={ite.cName} value={ite.cId}>
                    </TreeNode>
                  )
               })
             }
          </TreeNode>
        )
      }
      return <TreeNode key={item.key} title={item.cName} value={item.cId}/>;
    })
    return(
      <div style={{paddingLeft:30,paddingRight:30}}>
           <Search
              style={{ width: '350px', height: '50px', marginBottom: '10px' }}
              enterButton="搜索"
              size="large"
              onChange={(e)=>{
                 console.log(e.target.value)
              }}
              onSearch={value => 
                queryTaskTree(value,1)
                .then(res=>{
                  if(res.code===200){
                    this.setState({
                      dataSource:res.data.list,
                      total:res.data.total
                    })
                  }
                  console.log(value)
                })
                
              }
            />
            <Button 
              // style={}
              size={this.state.size}
              onClick={()=>{
                this.setState({
                  task:true
                })
                queryTreeList()
                .then(res=>{
                  if(res.code===200){
                    // this.setState({
                    //   cName:res.data.list.cName
                    // },()=>{
                    //   console.log(this.state.cName)
                    // })
                    this.setState({
                      queryTreeList:res.data.list
                    })
                    console.log("下拉树",res)
                  }
                })
            }}
           >发布任务</Button>
           <Modal
              title="发布任务"
              visible={this.state.task}
              onOk={()=>{
                this.setState({
                  task:false
                },()=>{
                  subTask(1,this.state.value)
                  .then(res=>{
                    if(res.code===200){
                      console.log("发布数据",res)
                      message.success("发布成功",2)
                      queryTask(1,this.state.page,5)
                      .then(res=>{
                        console.log("发布任务列表",res)
                        if(res.code===200){
                          this.setState({
                            dataSource:res.data.list,
                            total:res.data.total
                          })
                        }
                      })
                    }
                  })
                })
              }}
              onCancel={()=>{this.setState({task:false})}}
            >
              <TreeSelect
                showSearch
                style={{ width: '100%' }}
                value={this.state.value}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                placeholder="请选择"
                allowClear
                treeDefaultExpandAll
                onChange={(value)=>{
                  console.log(value);
                  this.setState({ value });
                }}
              >
                {loop}
                {/* <TreeNode value="系统任务一" title="系统任务一">
                  <TreeNode value="第一模块" title="第一模块">
                    <TreeNode value="MySQL" title="任务一" />
                    <TreeNode value="node" title="任务二" />
                  </TreeNode>
                  <TreeNode value="第二模块" title="第二模块">
                    <TreeNode value="终极" title={<b style={{ color: '#08c' }}>look</b>} />
                  </TreeNode>
                </TreeNode> */}
              </TreeSelect>
            </Modal>
            <Table 
              dataSource={this.state.dataSource}
              columns={this.columns} 
              pagination={false}
              scroll={{y:350,x:false}}
              rowKey={"cId"}
            />
            <Modal
              bodyStyle={{height:"400px" ,width:"800px" , overflow:"auto"}}
              width={800}
              height={400}
              title="任务订阅"
              visible={this.state.visible}
              onOk={()=>{this.setState({visible:false})}}
              onCancel={()=>{this.setState({visible:false})}}
            >
              {/* {window.open('about:blank').location.href="http://localhost:8000/test.html?oid=123"} */}
              {/* {<div dangerouslySetInnerHTML={{ __html: html }} />} */}
              <div>
                <h4>一、导入所需依赖</h4>
                <p>
                &lt;dependency&gt; <br/>
                    &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt; <br/>
                    &lt;artifactId&gt;spring-boot-starter-data-redis&lt;/artifactId&gt; 
                <br/> &lt;/dependency&gt;
                </p>
                <p>
                &lt;dependency&gt; <br/>
                    &lt;groupId&gt;org.apache.commons&lt;/groupId&gt; <br/>
                    &lt;artifactId&gt;commons-pool2&lt;/artifactId&gt; 
                <br/> &lt;/dependency&gt;
                </p>
                <h4>二、application.yml配置连接redis以及连接池配置信息</h4>
                <p>spring:</p>
                <p>&nbsp;&nbsp;redis:</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;host: #连接redis的ip</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;port: #连接redis的端口号</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;password: #密码</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;lettuce:</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;pool:</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;min-idle: 5</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;max-idle: 20</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;max-active: 100</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;max-wait: 5000</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;timeout: 30000</p>
                <h4>三、新建消息监听类，负责处理订阅到的消息内容</h4>
                <p>import com.alibaba.fastjson.JSONObject;</p>
                <p>import org.springframework.stereotype.Component;</p>
                <p>public void subTask1（String message）{this.state.content}</p>
                <p>System.out.println（"MessageReceiver类subTask1方法监听到消息："+message）;</p>
                <p> ApiResult apiResult = JSONObject.parseObject(message, ApiResult.class);</p>
                <p>System.out.println（"状态码:"+apiResult.getCode（））; </p>
                <p>System.out.println（"返回消息:"+apiResult.getMessage（））; </p>
                <p>System.out.println（"数据:"+apiResult.getData（））; </p>
                <p>System.out.println（"是否成功:"+apiResult.isSuccess（））;</p>
                <p>{this.state.content1}</p>
                <p>public void subTask2（String message）{this.state.content}</p>
                <p>System.out.println（"MessageReceiver类subTask1方法监听到消息："+message）;</p>
                <p> ApiResult apiResult = JSONObject.parseObject（message, ApiResult.class）;</p>
                <p>System.out.println（"状态码:"+apiResult.getCode（））; </p>
                <p>System.out.println（"返回消息:"+apiResult.getMessage（））; </p>
                <p>System.out.println（"数据:"+apiResult.getData（））; </p>
                <p>System.out.println（"是否成功:"+apiResult.isSuccess（））;</p>
                <p>{this.state.content1}</p>
                <h4>四、新建Redis配置类</h4>
                <p>import org.springframework.beans.factory.annotation.Autowired; </p>
                <p>import org.springframework.cache.annotation.EnableCaching; </p>
                <p>import org.springframework.context.annotation.Bean;</p>
                <p>import org.springframework.context.annotation.Configuration; </p>
                <p>import org.springframework.data.redis.connection.RedisConnectionFactory; </p>
                <p>import org.springframework.data.redis.core.RedisTemplate; </p>
                <p>import org.springframework.data.redis.listener.PatternTopic;</p>
                <p>import org.springframework.data.redis.listener.RedisMessageListenerContainer; </p>
                <p>import org.springframework.data.redis.listener.adapter.MessageListenerAdapter;</p>
                <p>import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;</p>
                <p>import org.springframework.data.redis.serializer.StringRedisSerializer;</p>
                <p></p>
                <p>@Configuration</p>
                <p>@EnableCaching </p>
                <p>public class RedisConfig {this.state.content}</p>
                <p></p>
                <p>@Autowired</p>
                <p>private MessageReceiver messageReceiver;</p>
                <p></p>
                <p> @Bean</p>
                <p> public RedisTemplate&lt;String, Object&gt; redisTemplate（RedisConnectionFactory redisConnectionFactory）{this.state.content}</p>
                <p>RedisTemplate&lt;String, Object&gt; redisTemplate = new RedisTemplate&lt;&gt;（）</p>
                <p>redisTemplate.setKeySerializer（new StringRedisSerializer（））; </p>
                <p>redisTemplate.setValueSerializer（new GenericJackson2JsonRedisSerializer（））;</p>
                <p> redisTemplate.setConnectionFactory（redisConnectionFactory）; </p>
                <p>return redisTemplate;</p>
                <p>{this.state.content1}</p>
                <p>/**</p>
                <p> * 将messageReceiver类的subTask1方法注入监听器 </p>
                <p> * @return</p>
                <p> */</p>
                <p>@Bean</p>
                <p>public MessageListenerAdapter messageListenerAdapter1（）{this.state.content}</p>
                <p>return new MessageListenerAdapter（messageReceiver, "subTask1"）;</p>
                <p>{this.state.content1}</p>
                <p> * 将messageReceiver类的subTask2方法注入监听器 </p>
                <p> * @return</p>
                <p> */</p>
                <p>@Bean</p>
                <p>public MessageListenerAdapter messageListenerAdapter1（）{this.state.content}</p>
                <p>return new MessageListenerAdapter（messageReceiver, "subTask1"）;</p>
                <p>{this.state.content1}</p>
                <p>/**</p>
                <p> * 配置消息监听容器  </p>
                <p> * @param redisConnectionFactory </p>
                <p> * @return</p>
                <p> */</p>
                <p>@Bean</p>
                <p>public RedisMessageListenerContainer redisMessageListenerContainer（RedisConnectionFactory redisConnectionFactory）{this.state.content}</p>
                <p> RedisMessageListenerContainer container = new RedisMessageListenerContainer（）;</p>
                <p>container.setConnectionFactory（redisConnectionFactory）;</p>
                <p>//指定哪个方法处理哪个主题</p>
                <p>container.addMessageListener（messageListenerAdapter1（）,new PatternTopic（"task1"））;</p>
                <p>container.addMessageListener（messageListenerAdapter1（）,new PatternTopic（"task2"））;</p>
                <p>return container;  </p>
                <p>{this.state.content1}</p>
                <h4>五、辅助工具类</h4>
                <h4>1. ApiResult</h4>
                <p>public class ApiResult&lt;T&gt;{this.state.content}</p>
                <p>/**</p>
                <p> *状态码 200表示成功</p>
                <p> */</p>
                <p>private int code;</p>
                <p>/**</p>
                <p> *返回消息</p>
                <p> */</p>
                <p>private String message;</p>
                <p>/**</p>
                <p> *数据</p>
                <p> */</p>
                <p>private T data;</p>
                <p>/**</p>
                <p> *是否成功</p>
                <p> */</p>
                <p>private boolean success; </p>
                <p>public int getCode（）{this.state.content}</p>
                <p>return code </p>
                <p>{this.state.content1}</p>
                <p>public void  getCode（int code）{this.state.content}</p>
                <p>this.code = code </p>
                <p>{this.state.content1}</p>
                <p>public String  getMessage（）{this.state.content}</p>
                <p>return message </p>
                <p>{this.state.content1}</p>
                <p>public void  setMessage（String message）{this.state.content}</p>
                <p>this.message = message; </p>
                <p>{this.state.content1}</p>
                <p>public T getData（）{this.state.content}</p>
                <p>return data </p>
                <p>{this.state.content1}</p>
                <p>public void  setData（T data）{this.state.content}</p>
                <p>this.data = data; </p>
                <p>{this.state.content1}</p>
                <p>public boolean isSuccess（）{this.state.content}</p>
                <p>return success </p>
                <p>{this.state.content1}</p>
                <p>public void  setSuccess（boolean success）{this.state.content}</p>
                <p>this.success = success; </p>
                <p>{this.state.content1}</p>
                <p>{this.state.content1}</p>
                <h4>2. TTaskExec</h4>
                <p>import java.util.Date;</p>
                <p>public class TTaskExec {this.state.content}</p>
                <p>/**</p>
                <p> *任务ID</p>
                <p> */</p>
                <p>private String cTaskConfigId;</p>
                <p>/**</p>
                <p> *任务名</p>
                <p> */</p>
                <p>private String cTaskName;</p>
                <p>/**</p>
                <p> *执行状态 1表示成功  2表示失败  3表示进行中 </p>
                <p> */</p>
                <p>private Integer nExecState;</p>
                <p>/**</p>
                <p> *任务开始时间</p>
                <p> */</p>
                <p>private Date dtBeginDate;</p>
                <p>/**</p>
                <p> *任务结束时间</p>
                <p> */</p>
                <p>private Date dtEndDate;</p>
                <p>/**</p>
                <p> *出错原因 </p>
                <p> */</p>
                <p>private String cErrorLog;</p>
                <p>public String getcTaskConfigId（）{this.state.content}</p>
                <p>return cTaskConfigId;</p>
                <p>{this.state.content1}</p>
                <p>public void setcTaskConfigId（String cTaskConfigId）{this.state.content}</p>
                <p>this.cTaskConfigId = cTaskConfigId;</p>
                <p>{this.state.content1}</p>
                <p>public String getcTaskName（）{this.state.content}</p>
                <p>return cTaskName;</p>
                <p>{this.state.content1}</p>
                <p>public void setcTaskName（String cTaskName）{this.state.content}</p>
                <p> this.cTaskName = cTaskName;</p>
                <p>{this.state.content1}</p>
                <p>public Integer getnExecState（）{this.state.content}</p>
                <p> return nExecState;  </p>
                <p>{this.state.content1}</p>
                <p>public void setnExecState（Integer nExecState）{this.state.content}</p>
                <p>  this.nExecState = nExecState;;</p>
                <p>{this.state.content1}</p>
                <p>public Date getDtBeginDate（）{this.state.content}</p>
                <p> return dtBeginDate;  </p>
                <p>{this.state.content1}</p>
                <p> public void setDtBeginDate（Date dtBeginDate）{this.state.content}</p>
                <p>  this.dtBeginDate = dtBeginDate;</p>
                <p>{this.state.content1}</p>
                <p>public Date getDtEndDate（）{this.state.content}</p>
                <p> return dtEndDate;  </p>
                <p>{this.state.content1}</p>
                <p>public void setDtEndDate（Date dtEndDate）{this.state.content}</p>
                <p>  this.dtEndDate = dtEndDate;</p>
                <p>{this.state.content1}</p>
                <p> public String getcErrorLog（）{this.state.content}</p>
                <p> return cErrorLog;   </p>
                <p>{this.state.content1}</p>
                <p>public void setcErrorLog（String cErrorLog）{this.state.content}</p>
                <p>  this.cErrorLog = cErrorLog;</p>
                <p>{this.state.content1}</p>
                <h4>六、编写测试类，模拟发布订阅</h4>
                <p>import org.springframework.beans.factory.annotation.Autowired; </p>
                <p>import org.springframework.data.redis.core.RedisTemplate;</p>
                <p>import org.springframework.web.bind.annotation.GetMapping; </p>
                <p>import org.springframework.web.bind.annotation.PathVariable; </p>
                <p>import org.springframework.web.bind.annotation.RestController;</p>
                <p></p>
                <p>import java.util.Date; </p>
                <p>import java.util.UUID;</p>
                <p></p>
                <p>/**</p>
                <p> * @ClassName: TestSendMessageController</p>
                <p> *@Description:</p>
                <p> * @Author: Chunliang.Li</p>
                <p> * @Date: 2020/4/2 13:41 </p>
                <p> * 本人学识渊博、经验丰富，代码风骚、效率恐怖、无所不精、无所不通</p>
                <p> **/</p>
                <p>@RestController</p>
                <p>public class TestSendMessageController{this.state.content}</p>
                <p>@Autowired </p>
                <p>private RedisTemplate redisTemplate;</p>
                <p>/**</p>
                <p>  * topic 指定发布到哪个主题</p>
                <p>  */</p>
                <p>@GetMapping（"/send/{this.state.content}topic{this.state.content1}"）</p>
                <p>public String sendMessage（@PathVariable String topic）{this.state.content}</p>
                <p></p>
                <p> TTaskExec tTaskExec = new TTaskExec（）;</p>
                <p>tTaskExec.setcTaskConfigId（UUID.randomUUID（）.toString（）.replace（"-", ""））;  </p>
                <p>tTaskExec.setcTaskName（"测试发布任务"）; </p>
                <p>tTaskExec.setDtBeginDate（new Date（））;</p>
                <p>tTaskExec.setDtEndDate（new Date（））;</p>
                <p>tTaskExec.setnExecState（1）;</p>
                <p>tTaskExec.setcErrorLog（"假装出错了，NullPointException"）;</p>
                <p></p>
                <p>ApiResult&lt;TTaskExec&gt; result = new ApiResult&lt;&gt;（）;</p>
                <p>result.setCode（200）;</p>
                <p>result.setMessage（"订阅成功"）;</p>
                <p>result.setData（tTaskExec）;</p>
                <p>result.setSuccess（true）;</p>
                <p>redisTemplate.convertAndSend（topic,result）;</p>
                <p>return "发布成功"</p>
                <p>{this.state.content1}</p>
                <p>{this.state.content1}</p>
              </div>
            </Modal>
            <Pagination
              style={{float:"right"}}
              defaultCurrent={1}
              total={this.state.total}
              pageSize={5}
              onChange={(page)=>{
                console.log('目标页数',page)
                queryTask(1,page,5)
                .then(res=>{
                  console.log("发布任务列表",res)
                  if(res.code===200){
                    this.setState({
                      dataSource:res.data.list,
                      page:page
                    })
                  }
                })
              }}
            />
      </div>
    )
  }
}

export default InterfaceSchedul;