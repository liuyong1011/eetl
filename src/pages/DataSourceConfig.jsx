import React, { Component } from 'react';
import styles from './DataSourceConfig.less';
import {changeStr,ImgArr} from '@/utils/utils' //公用组件
import { connect } from 'dva';
import { Tabs ,Row,Col,Card,Drawer,Select,Icon,Button,Form,Input,Radio,message,Modal, Spin,Pagination,Avatar} from 'antd';
const FormItem = Form.Item;
const { Meta } = Card;
// const { Search } = Input;
const { Option } = Select;
const { TabPane } = Tabs;



class DataSourceConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {
        value: 'a',
        showModal: false,
        yuanVisible: '0',
        searchValue:{},
        editorMark: true,
        cMetaState:false,
        textLinkMark:false,
        cPortMark:false,
        cDataFilePathMask:true,
        TDataMask:false,
        detailsSpinning:true,
        TDataKeys: {},
        pageNum:1,
        pageSize:12,
    };
  }
  componentDidMount(){
    let {dispatch} = this.props
    let datas={
      pageNum:1,
      pageSize:12,
    }
    dispatch({
      type: 'DataSourceConfigModel/getTDatasourceList',
      payload: {datas},
    })
  }
  getReturnImg=(parameter)=>{
    let imgURL
    ImgArr.forEach((item)=>{
      if (item.type==parameter) {
        imgURL=item.src
      }
    })
    // console.log(imgURL)
    return imgURL
  }

  onSearch=()=>{
    let {dispatch} = this.props
    const form = this.form2;
    form.validateFields((err, values) => {
      console.log(err,values)
      if (err) {
        return;
      }
      const callback=()=>{
       
      }
      let Searchdatas=changeStr(values)
      let datas={
        ...Searchdatas,
        pageNum:1,
        pageSize:12,
      }
      this.setState({
        pageNum:1,
        pageSize:12,
        searchValue:Searchdatas
      },()=>{
        console.log(datas)
        dispatch({
          type: 'DataSourceConfigModel/getTDatasourceList',
          payload: {datas},
        })
      })
    })
  }
  handleReset=()=>{
    let {dispatch} = this.props
    const form = this.form2;
    form.resetFields();
    this.setState({
      pageNum:1,
      pageSize:12,
      searchValue:{}
    },()=>{
      let datas={
        pageNum:1,
        pageSize:12,
      }
      console.log(datas)
      dispatch({
        type: 'DataSourceConfigModel/getTDatasourceList',
        payload: {datas},
      })
    });
  }
  Tabclick=(key)=>{
    let {dispatch} = this.props
    let datas={
      pageNum:1,
      pageSize:12,
    }
    console.log(key);
    if (key=="1") {
      dispatch({
        type: 'DataSourceConfigModel/getTDatasourceList',
        payload: {datas},
      })
      this.onCancel()
    } else {
      
    }
  }
  onSelectChange=(page, pageSize)=>{
    let {dispatch} = this.props
    let {searchValue}=this.state
    console.log(
      page,
      pageSize
    )
    let datas={
      pageNum:page,
      pageSize:pageSize,
      ...searchValue
    }
    this.setState({
      pageNum:page,
      pageSize:pageSize,
    },()=>{
      dispatch({
        type: 'DataSourceConfigModel/getTDatasourceList',
        payload: {datas},
      })
    })

  }
  //展示数据源详情
  showDrawer = (item) => {
    console.log(item);
    let {dispatch} = this.props
  
    let datas={
      cId:item.cId
    }
    const callback=()=>{
      this.setState({
        visible: true,
        TDataKeys:item
      },()=>{
      setTimeout(() => {
        let {tDataDetails} = this.props
        const form1 = this.form1
        form1.setFieldsValue({
          cDatasourceName: tDataDetails.cDatasourceName,
          cId :  tDataDetails.cId,
          cDbName: tDataDetails.cDbName ,
          nDbType : tDataDetails.nDbType,
          nDbTypeName :  tDataDetails.nDbTypeName, 
          cSchema :   tDataDetails.cSchema,
          cIp :  tDataDetails.cIp ,
          cPort :  tDataDetails.cPort ,
          cUsername :   tDataDetails.cUsername,
          cPassword :  tDataDetails.cPassword ,
          nMetadataDbType :  tDataDetails.nMetadataDbType, 
          nMetadataDbTypeName : tDataDetails.nMetadataDbTypeName, 
          cMetadataDbName :   tDataDetails.cMetadataDbName,
          cMetadataIp :   tDataDetails.cMetadataIp ,
          cMetadataPort :  tDataDetails.cMetadataPort ,
          cMetadataUsername :  tDataDetails.cMetadataUsername,
          cMetadataPassword :  tDataDetails.cMetadataPassword,
          jdbcUrl :  tDataDetails.jdbcUrl,
 
     })
        if (tDataDetails.nDbType==6) {
          this.setState({
            cMetaState: true,
          },()=>{
            form1.setFieldsValue({
              cDataFilePath: tDataDetails.cDataFilePath,
              nMetadataDbType :  tDataDetails.nMetadataDbType, 
              nMetadataDbTypeName : tDataDetails.nMetadataDbTypeName, 
              cMetadataDbName :   tDataDetails.cMetadataDbName,
              cMetadataPassword :  tDataDetails.cMetadataPassword,
              cMetadataIp :   tDataDetails.cMetadataIp ,
              cMetadataPort :  tDataDetails.cMetadataPort ,
              cMetadataUsername :  tDataDetails.cMetadataUsername,
           })
          })
        }
       
        this.setState({
          detailsSpinning:false
        })
        }, 800);
      });
     
    }
    dispatch({
      type: 'DataSourceConfigModel/getTDatasourceDetails',
      payload: {datas,callback},
    })
   
  };
  //删除数据源
  deleteTData=(item)=>{
    let {dispatch} = this.props
    Modal.confirm({
      title: "操作",
      content: "确定删除此数据源吗？",
      okText:"确认",
      cancelText:"取消",
      onOk: () => {
        const datas = {
          cIds: item.cId
        }
        const callback =()=>{
          let datas={
            pageNum:1,
            pageSize:12,
          }
          this.setState({
            pageNum:1,
            pageSize:12,
          },()=>{
            dispatch({
              type: 'DataSourceConfigModel/getTDatasourceList',
              payload: {datas},
            })
          })
        }
        dispatch({type: 'DataSourceConfigModel/deleteTData', payload: { datas,callback}});
      }
    });
  }
  onClose = () => {
    this.setState({
      visible: false,
      editorMark: true, 
      detailsSpinning:true,
      cMetaState: false,
    });
  };
  //取消编辑
  onCancelEditor=()=>{
    Modal.confirm({
      title: "操作",
      content: "确定取消配置此数据源吗？",
      okText:"确认",
      cancelText:"取消",
      onOk: () => {
        this.onCancel()
      }
    });
  }
  showExport = () => {
    this.setState({
      editorMark: false,
    });
  };
  updateTData=()=>{
    let {dispatch} =this.props
    let {TDataKeys,TDataMask} =this.state
    const form = this.form1
    if (!TDataMask) {
      message.warning('请先测试链接成功后才能提交！',4)
      return;
    }
    form.validateFields((err, values) => {
      console.log(err,values)
      if (err) {
        return;
      }
      const callback=()=>{
        this.setState({
          visible: false,
          TDataMask: false,
          editorMark: true, 
          detailsSpinning:true,
          pageNum:1,
          pageSize:12,
        });
        let datas={
          pageNum:1,
          pageSize:12,
        }
        dispatch({
          type: 'DataSourceConfigModel/getTDatasourceList',
          payload: {datas},
        })
      }
      let valuedata=changeStr(values)
      let datas={...valuedata,
                  cId:TDataKeys.cId ,
                  cMetadataId:TDataKeys.cMetadataId ,
                 }
        dispatch({
          type: 'DataSourceConfigModel/updateTData',
          payload: { datas,callback},
        })

    })
  }
  textTDataLink=()=>{
    let {dispatch} =this.props
    let {TDataKeys} =this.state
    const form = this.form1
    form.validateFields((err, values) => {
      console.log(err,values)
      if (err) {
        return;
      }
      const callback=()=>{
        this.setState({
          TDataMask:true
        });
      }
      let valuedata=changeStr(values)
      let datas={...valuedata,
                  cId:TDataKeys.cId ,
                  cMetadataId:TDataKeys.cMetadataId,
                 }
        dispatch({
          type: 'DataSourceConfigModel/textLinkSubitem',
          payload: { datas,callback},
        })

    })
  }
  cancelEditor= () => {
    this.setState({
      editorMark: true,
    });
  };
  onChange = e => {
    this.setState({
      placement: e.target.value,
    });
  };
 
  onRadio=e=>{
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
      cPortMark:false,
      cDataFilePathMask:true,
    });
    this.onCancel()
  }

  onCancel=()=>{
    const form = this.form;
    form.resetFields();
    this.setState({
      yuanVisible: '0',
      textLinkMark:false,
    });
  }
  changValue=(value)=>{
    console.log('radio 11checked', value);
    if (value==3||value==4||value==5) {
      this.setState({
        cPortMark:true,
        cDataFilePathMask:true,
        yuanVisible:0,
      });
    }else if(value==6){
      this.setState({
        cDataFilePathMask:false,
        cPortMark:false,
      });
    } else {
      this.setState({
        cPortMark:false,
        cDataFilePathMask:true,
        yuanVisible:0,
      });
    }
  }
  ChangejdbcUrl=(e)=>{
    if (e.target.value.length>3) {
      let jdbc=e.target.value.slice(0,4)
      if(jdbc==='hdfs') {
        this.setState({
          cDataFilePathMask:false,
        })
      }else{
        this.setState({
          cDataFilePathMask:true,
        })
      }
    }else{
      this.setState({
        cDataFilePathMask:true,
      });
    }
  }
  nIfProcess = e =>{ 
    const form = this.form;
    console.log('radio checked', e.target.value);
    let {value} = this.state
    form.validateFields((err, values) => {
      console.log(err,values)
      if (value==='b') {
        let jdbcUrl=typeof(values.jdbcUrl)
        if(jdbcUrl==='undefined'||values.jdbcUrl==='') {
          console.log(jdbcUrl)
          form.resetFields();
          message.warning('请先填写JDBC_URL！',4)
          return
        }
        let jdbc=values.jdbcUrl.slice(0,4)
        if(jdbc==='hdfs') {
          this.setState({
            yuanVisible: e.target.value,
          });
        }else{
          this.setState({
            yuanVisible:0,
          });
        }
      } else {
        let nDbType=typeof(values.nDbType)
        if(nDbType==='undefined') {
          console.log(nDbType)
          form.resetFields();
          message.warning('请先选择数据库类型！',4)
          return
        }
        if (values.nDbType==6) {
          this.setState({
            yuanVisible: e.target.value,
          });
        }else{
          this.setState({
            yuanVisible:0,
          });
        }
       
      }
    })
   
  
  }
  onCreate=()=>{
    const form = this.form;
    let {value,textLinkMark} = this.state
    if (!textLinkMark) {
      message.warning('请先进行链接测试，成功后方可提交！',4)
      return;
    }
    form.validateFields((err, values) => {
      console.log(err,values)
      if (err) {
        return;
      }
      console.log('提交',value)
      const callback=()=>{
        this.onCancel()
      }
      let datas=changeStr(values)
      if (value==='b') {
        this.props.dispatch({
          type: 'DataSourceConfigModel/createByJdbc',
          payload: { datas,callback},
        })
      } else {
        this.props.dispatch({
          type: 'DataSourceConfigModel/createSubitem',
          payload: { datas,callback},
        })
      }

      })
  }
  textLink=()=>{
    const form = this.form;
    let {value} = this.state
    let {dispatch} =this.props

    form.validateFields((err, values) => {
      console.log(err,values,value)
      if (err) {
        return;
      }
      console.log('测试链接')
      const callback=()=>{
        this.setState({
          textLinkMark:true
        })
      }
      let datas=changeStr(values)
      if (value==='a') {
        dispatch({
          type: 'DataSourceConfigModel/textLinkSubitem',
          payload: { datas,callback},
        })
      } else {
        dispatch({
          type: 'DataSourceConfigModel/textLinkByJdbc',
          payload: { datas,callback},
        })
      }
    })
  }
    
  correctURL=()=>{
    let {dispatch} = this.props
    const form = this.form1;
    form.validateFields((err, values) => {
      console.log(err,values)
      if (err) {
        return;
      }
      const callback=(data)=>{
        console.log(data)
        form.setFieldsValue({
          jdbcUrl:data,
       })
      }
     let datas={
         nDbType:values.nDbType,
         cDbName:values.cDbName,
         cIp:values.cIp,
         cSchema:values.cSchema,
         cPort:values.cPort,
       
     }
    dispatch({
          type: 'DataSourceConfigModel/getCreateJdbcUrl',
          payload: { datas,callback},
        })
    })
  }
  correctSingle=()=>{
    let {dispatch} = this.props
    const form = this.form1;
    form.validateFields((err, values) => {
      console.log(err,values)
      if (err) {
        return;
      }
      const callback=(data)=>{
        console.log(data)
          form.setFieldsValue({
            nDbType:data.nDbType,
            cDbName:data.cDbName,
            cIp:data.cIp,
            cSchema:data.cSchema,
            cPort:data.cPort,
         })
      }
     let datas={
      jdbcUrl:values.jdbcUrl,
     }
    dispatch({
          type: 'DataSourceConfigModel/getCutJdbcUrl',
          payload: { datas,callback},
        })

    })

  }
  saveFormRef = (form) => {
    this.form = form;
  }
  saveFormRefDrawer= (form) => {
    this.form1 = form;
    console.log(form,this.form1)

  }
  saveFormRefSearchfrom= (form) => {
    this.form2 = form;
    console.log(form,this.form2)

  }
  render() {
    const { tDataFlag, tDataList,detailsFlag } = this.props;
    return (
      <div  style={{paddingLeft:30,paddingRight:30}}>
        <Tabs defaultActiveKey="1" onChange={this.Tabclick} style={{background:'#fff',paddingBottom:20}}>
            <TabPane tab="已配置数据源" key="1">
           
          {tDataFlag?
             <div>
                <div>
                  <Searchfrom
                         ref={this.saveFormRefSearchfrom}
                          onSearch={this.onSearch}
                          handleReset={this.handleReset}
                       />

                </div>
                <Row gutter={17} style={{marginLeft:4,marginRight:4}}>

                {
                  tDataList.list.length==0?
                  <div style={{textAlign:'center'}}>
                    暂无数据
                  </div>
                  :
                  tDataList.list.map((item,index)=>{
                    return (
                      <Col span={6} style={{marginBottom:20}} key={item.key}>
                       <Card hoverable bordered={true}
                        actions={[
                          <Button  onClick={()=>{this.showDrawer(item)}} type="primary">详情</Button>,
                          <Button  onClick={()=>{this.deleteTData(item)}} type="dashed">删除</Button>
                        ]}>
                        <div>
                          <Meta
                            avatar={
                              this.getReturnImg(item.nDbTypeName)
                            }
                            title={item.cDatasourceName}
                            description={item.nDbTypeName}
                          />
                        </div>
                        </Card>
                      </Col>
                    )
                    
                  })
                }     
                </Row>
                <div style={{float:"right"}}>
                  <Pagination defaultCurrent={1} defaultPageSize={12} current={this.state.pageNum} onChange={this.onSelectChange} total={tDataList.total} />          
                </div>
                </div>
            :
                <div style={{textAlign:'center'}}>
                  <Spin/>
                </div>
            }
         
            <Drawer
                title="数据源内容详情"
                placement={'right'}
                width={800}
                onClose={this.onClose}
                visible={this.state.visible}
                >
                <Spin spinning={this.state.detailsSpinning}>
                   <div>
                   <div style={{height:58,width:'100%'}}>
                           <div style={{float:'right'}}>
                               <div style={{marginRight:20,display:'inline-block'}}>
                                   <a className='updateBtn' style={{marginRight:20}} type="primary" onClick={this.showExport}><Icon type="edit" />编辑</a>
                               </div>
                           </div>
                   </div>
                     <DrawerForm
                       visible={this.state.editorMark}
                       title={this.state.title}
                       ref={this.saveFormRefDrawer}
                       correctURL={this.correctURL}
                       correctSingle={this.correctSingle}
                       cMetaState={this.state.cMetaState}
                       thisObj={this}
                   /> 
                  { this.state.editorMark?null:
                  <>
                   <Row style={{height:60,paddingLeft:80,}}>
                      <Col > 
                          <Button type="primary" onClick={this.textTDataLink}>测试链接</Button>
                      </Col>
                    </Row>
                    <Row style={{height:60,paddingLeft:80,}}>
                      <Col >
                         <Button type="primary" onClick={this.updateTData} style={{marginRight:20}}>确定</Button>
                         <Button onClick={this.cancelEditor}>取消</Button>
                      </Col>
                    </Row>
                    </>
                    }
                 </div>
                 </Spin>
             
                </Drawer>
            </TabPane>
            <TabPane tab="数据源配置" key="2">

               <div>
                 <div  style={{marginLeft:20,}}>
                    <span style={{marginRight:20,fontWeight:"bold"}}>数据源配置方式:</span>
                    <Radio.Group name="radiogroup" defaultValue={"a"} buttonStyle="solid"  onChange={this.onRadio}>
                        <Radio.Button value="a">分类单项配置</Radio.Button>
                        <Radio.Button value="b">JDBC_URL配置</Radio.Button>
                    </Radio.Group>
                 </div>
                 <TaskForm
                    visible={this.state.value}
                    title={this.state.title}
                    yuanVisible={this.state.yuanVisible}
                    nIfProcess={this.nIfProcess}
                    cPortMark={this.state.cPortMark}
                    cDataFilePathMask={this.state.cDataFilePathMask}
                    changValue={this.changValue}
                    ChangejdbcUrl={this.ChangejdbcUrl}
                    ref={this.saveFormRef}
                 /> 
                   <Row style={{height:60,paddingLeft:160,}}>
                      <Col span={4}>
                          <Button type="primary" onClick={this.textLink}>测试链接</Button>
                      </Col>
                   </Row>
                   <Row style={{height:60,paddingLeft:160,}}>
                     <Col >
                        <Button type="primary" onClick={this.onCreate} style={{marginRight:20}}>确定提交</Button>
                        <Button onClick={this.onCancelEditor}>取消编辑</Button>
                     </Col>
                   </Row>
               </div>

            </TabPane>
        </Tabs>
      </div>
    );
  }
}


// 新建
class TaskForm extends React.Component {
    state = {
       
    }
   
    render(){
    const { visible, form,yuanVisible,nIfProcess,changValue ,cPortMark,cDataFilePathMask,ChangejdbcUrl} = this.props;
     const { getFieldDecorator } = form;
     const formItemLayout = {
       labelCol: { span: 5 },
       wrapperCol: { span: 8 },
     };
     return (
        <div style={{marginTop:20}}>
         <Form
           className="ant-advanced-search-form"
         >
          <FormItem label="数据源名称:" {...formItemLayout}>
             {getFieldDecorator('cDatasourceName', {
               rules: [{ required: true, message: '请输入数据源名称!' }, { message: '请不要输入空白字符！', whitespace: true }],
             })(
               <Input/>
             )}
            </FormItem>
         {visible==='b'?
            <div>
                <FormItem {...formItemLayout} label="JDBC_URL:">
                    {getFieldDecorator('jdbcUrl', {
                    rules: [{ required: true, message: '请填写URL！' }, { message: '请不要输入空白字符！', whitespace: true }]
                    })(
                    <Input  onChange={ChangejdbcUrl}/>
                    )}
                </FormItem>
               
            </div>
            :    
            <div>
            <FormItem {...formItemLayout} label="数据库类型:">
                {getFieldDecorator('nDbType', { rules: [{ required: true, message: '请选择数据库类型！' }]
                })(
                  <Select onChange={changValue}>
                        <Option value={1}>oracle</Option>
                        <Option value={2}>mysql</Option>
                        <Option value={3}>Postgres</Option>
                        <Option value={4}>GreenPlum</Option>
                        <Option value={5}>sqlserver</Option>
                        <Option value={6}>Hdfs</Option>
                 </Select>
                )}
            </FormItem>
            
          
            {cDataFilePathMask?
             <FormItem {...formItemLayout} label="数据库名称:">
             {getFieldDecorator('cDbName', {
             rules: [{ required: true, message: '请输入数据库名称！' }, { message: '请不要输入空白字符！', whitespace: true }]
             })(
              <Input />
              
             )}
         </FormItem>
            :
            null
            } 
           
            <FormItem label="IP:" {...formItemLayout}>
                {getFieldDecorator('cIp', {
                rules: [{ required: true, message: '请输入IP!' }, { message: '请不要输入空白字符！', whitespace: true }],
                })(
                <Input />
                )}
            </FormItem>

            <FormItem label="端口:" {...formItemLayout}>
             {getFieldDecorator('cPort', {
               rules: [{ required: true, message: '请输入端口!' }, { message: '请不要输入空白字符！', whitespace: true }],
             })(
               <Input />
             )}
            </FormItem>
            {cPortMark?
              <FormItem {...formItemLayout} label="模式:">
                  {getFieldDecorator('cSchema', {
                  rules: [{ required: true, message: '请输入模式！' }, { message: '请不要输入空白字符！', whitespace: true }]
                  })(
                  <Input />
                  )}
              </FormItem>
             :null}
              
            <FormItem {...formItemLayout} label="是否同步元数据:">
                {getFieldDecorator('nIfProcessMetadata', {
                rules: [{ required: true, message: '请选择是否同步元数据！' }]
                })(
                    <Radio.Group name="radiogroup" onChange={nIfProcess}>
                        <Radio value={1}>是</Radio>
                        <Radio value={0}>否</Radio>
                    </Radio.Group>
                )}
            </FormItem>
            </div>
          }
        {cDataFilePathMask?
            <>
            <FormItem label="用户名:" {...formItemLayout}>
                {getFieldDecorator('cUsername', {
                  rules: [{ required: true, message: '请输入用户名!' }, { message: '请不要输入空白字符！', whitespace: true }],
                })(
                  <Input />
                )}
                </FormItem>    
            <FormItem label="密码:" {...formItemLayout}>

                {getFieldDecorator('cPassword', {
                  rules: [{ required: true, message: '请输入密码!' }, { message: '请不要输入空白字符！', whitespace: true }],
                })(
                  <Input.Password autoComplete="new-password"/>
                )}
            </FormItem>
            </>
            :
            <FormItem label="数据文件地址:" {...formItemLayout}>
                {getFieldDecorator('cDataFilePath', {
                  rules: [{ required: true, message: '请输入数据文件地址!' }, { message: '请不要输入空白字符！', whitespace: true }],
                })(
                  <Input />
                )}
                </FormItem>   
            } 

           
            {
              yuanVisible=='1'?
              <div>
                  <FormItem {...formItemLayout} label="元数据所在库名称:">
                      {getFieldDecorator('cMetadataDbName', {
                      rules: [{ required: true, message: '请输入元数据所在库名称！' }, { message: '请不要输入空白字符！', whitespace: true }]
                      })(
                      <Input />
                      
                      )}
                  </FormItem>
                  <FormItem {...formItemLayout} label="元数据所在库类型:">
                      {getFieldDecorator('nMetadataDbType', {
                      rules: [{ required: true, message: '请输入元数据所在库类型！' }, { message: '请不要输入空白字符！', whitespace: true }]
                      })(
                        <Select >
                              <Option value={1}>oracle</Option>
                              <Option value={2}>mysql</Option>
                              <Option value={3}>Postgres</Option>
                              <Option value={4}>GreenPlum</Option>
                              <Option value={5}>sqlserver</Option>
                        </Select>
                      )}
                  </FormItem>
                  
                
                  <FormItem label="元数据所在库IP:" {...formItemLayout}>
                      {getFieldDecorator('cMetadataIp', {
                      rules: [{ required: true, message: '请输入元数据所在库IP!' }, { message: '请不要输入空白字符！', whitespace: true }],
                      })(
                      <Input />
                      )}
                      </FormItem>
                  <FormItem label="元数据所在库端口:" {...formItemLayout}>
                  {getFieldDecorator('cMetadataPort', {
                    rules: [{ required: true, message: '请输入元数据所在库端口!' }, { message: '请不要输入空白字符！', whitespace: true }],
                  })(
                    <Input />
                  )}
                  </FormItem>
                  <FormItem label="元数据所在库用户名:" {...formItemLayout}>
                    {getFieldDecorator('cMetadataUsername', {
                      rules: [{ required: true, message: '请输入用户名!' }, { message: '请不要输入空白字符！', whitespace: true }],
                    })(
                      <Input />
                    )}
                    </FormItem>    
                  <FormItem label="元数据所在库密码 :" {...formItemLayout}>

                    {getFieldDecorator('cMetadataPassword', {
                      rules: [{ required: true, message: '请输入密码!' }, { message: '请不要输入空白字符！', whitespace: true }],
                    })(
                      <Input.Password autoComplete="new-password"/>

                    )}
                </FormItem>
              </div>
              :null

            }
       
         </Form>
         </div>
     );
   }
  }
  TaskForm = Form.create()(TaskForm)
// 编辑
class DrawerForm extends React.Component {
  state = {
     
  }
  changDrawerValue=(e)=>{
    let {thisObj}=this.props
    console.log(e)
    if (e==6) {
      thisObj.setState({
        cMetaState:true
      })
    } else {
      thisObj.setState({
        cMetaState:false
      })
    }
    this.props.correctURL()
  }
  render(){
  
  const { visible, form,correctURL,correctSingle,cMetaState, } = this.props;
   const { getFieldDecorator } = form;
   const formItemLayout = {
     labelCol: { span: 6 },
     wrapperCol: { span: 6 },
   };
   const formItemLayout1 = {
    labelCol: { span: 8 },
    wrapperCol: { span: 12 },
  };
  const formItemLayout2 = {
    labelCol: { span: 4 },
    wrapperCol: { span: 18},
  };
   return (
      <div style={{marginTop:4,borderTop:1}}>
       <Form
         className="ant-advanced-search-form"
       >
       <Row span={24}>
         <Col span={12} style={{height:60}}>
                <FormItem label="数据源名称:" {...formItemLayout1}>
                    {getFieldDecorator('cDatasourceName', {
                      rules: [{ required: true, message: '请输入数据源名称!' }, { message: '请不要输入空白字符！', whitespace: true }],
                    })(
                    <Input onBlur={correctURL} disabled={visible}/>
                  )}
                </FormItem>
         </Col>
         <Col span={12} style={{height:60}}>
                 <FormItem {...formItemLayout1} label="数据库类型:">
                        {getFieldDecorator('nDbType', { rules: [{ required: true, message: '请选择数据库类型！' }]
                        })(
                          <Select onChange={this.changDrawerValue} disabled={visible}>
                                <Option value={1}>oracle</Option>
                                <Option value={2}>mysql</Option>
                                <Option value={3}>Postgres</Option>
                                <Option value={4}>GreenPlum</Option>
                                <Option value={5}>sqlserver</Option>
                                <Option value={6}>Hdfs</Option>
                        </Select>
                        )}
                  </FormItem>
         </Col>
        
        
         <Col span={12} style={{height:60}}>
                  <FormItem label="IP:" {...formItemLayout1}>
                        {getFieldDecorator('cIp', {
                        rules: [{ required: true, message: '请输入IP!' }, { message: '请不要输入空白字符！', whitespace: true }],
                        })(
                      <Input onBlur={correctURL} disabled={visible}/>
                      
                      )}
                  </FormItem>     
         </Col>
         <Col span={12} style={{height:60}}>
             <FormItem label="端口:" {...formItemLayout1}>
                    {getFieldDecorator('cPort', {
                      rules: [{ required: true, message: '请输入端口!' }, { message: '请不要输入空白字符！', whitespace: true }],
                    })(
                      <Input onBlur={correctURL} disabled={visible}/>
                      
                      )}
                  </FormItem>
                  
         </Col>
       
        
         {cMetaState?
             <Col span={20} style={{height:60}}>
            
                <FormItem label="数据文件地址:" {...formItemLayout}>
                    {getFieldDecorator('cDataFilePath', {
                      rules: [{ required: true, message: '请输入数据文件地址!' }, { message: '请不要输入空白字符！', whitespace: true }],
                    })(
                      <Input disabled={visible}/>
                    )}
                    </FormItem> 
              </Col>
                 :
                 <>
                 <Col span={12} style={{height:60}}>
                      <FormItem {...formItemLayout1} label="数据库名称:">
                                {getFieldDecorator('cDbName', {
                                rules: [{ required: true, message: '请输入数据库名称！' }, { message: '请不要输入空白字符！', whitespace: true }]
                                })(
                              <Input onBlur={correctURL} disabled={visible}/>
                              
                              )}
                          </FormItem>
                </Col>
                 <Col span={12} style={{height:60}}>
                      <FormItem {...formItemLayout1} label="模式:">
                            {getFieldDecorator('cSchema', {
                            })(
                          <Input disabled={visible}/>
                            
                            )}
                      </FormItem>
                 </Col>
                 <Col span={12} style={{height:60}}>
                      <FormItem label="用户名:" {...formItemLayout1}>
                            {getFieldDecorator('cUsername', {
                              rules: [{ required: true, message: '请输入用户名!' }, { message: '请不要输入空白字符！', whitespace: true }],
                            })(
                          <Input disabled={visible}/>
                          
                          )}
                      </FormItem>
                  </Col>
                 <Col span={12} style={{height:60}}>
                            <FormItem label="密码:" {...formItemLayout1}>
                                  {getFieldDecorator('cPassword', {
                                    rules: [{ required: true, message: '请输入密码!' }, { message: '请不要输入空白字符！', whitespace: true }],
                                  })(
                                <Input.Password disabled={visible} autoComplete="new-password"/>
                                
                                )}
                            </FormItem>
                  </Col>
                </> 
            }
   
       </Row>
       {/* <Row span={24}>
        <div style={{marginBottom:20,marginRight:60,float:"right"}}>
            <Button disabled={visible} onClick={correctURL} type="primary">修正URL</Button>
        </div>
       </Row> */}
       <Row span={24}>
       <Col span={24}>
                  <FormItem {...formItemLayout2} label="JDBC_URL:">
                      {getFieldDecorator('jdbcUrl', {
                      rules: [{ required: true, message: '请填写URL！' }, { message: '请不要输入空白字符！', whitespace: true }]
                      })(
                      <Input onBlur={correctSingle} disabled={visible}/>
                      )}
                  </FormItem>
        </Col>
      
       </Row>
       {cMetaState?
             <>
                  <FormItem {...formItemLayout} label="是否同步元数据:">
                      {getFieldDecorator('nIfProcessMetadata', { 
                        initialValue:cMetaState?0:1
                      // rules: [{ required: true, message: '请填写备注！' },]
                      })(
                          <Radio.Group name="radiogroup" disabled={visible}>
                              <Radio value={1}>是</Radio>
                              <Radio value={0}>否</Radio>
                          </Radio.Group>
                      )}
                  </FormItem>
                  <FormItem {...formItemLayout} label="元数据所在库名称:">
                      {getFieldDecorator('cMetadataDbName', {
                      // rules: [{ required: true, message: '请输入元数据所在库名称！' }, { message: '请不要输入空白字符！', whitespace: true }]
                      })(
                      <Input disabled={visible}/>
                      
                      )}
                  </FormItem>
                  <FormItem {...formItemLayout} label="元数据所在库类型:">
                      {getFieldDecorator('nMetadataDbType', {
                      // rules: [{ required: true, message: '请输入元数据所在库类型！' },]
                      })(
                        <Select disabled={visible}>
                              <Option value={1}>oracle</Option>
                              <Option value={2}>mysql</Option>
                              <Option value={3}>Postgres</Option>
                              <Option value={4}>GreenPlum</Option>
                              <Option value={5}>sqlserver</Option>
                        </Select>
                      )}
                  </FormItem>
                
                  <FormItem label="元数据所在库IP:" {...formItemLayout}>
                      {getFieldDecorator('cMetadataIp', {
                      // rules: [{ required: true, message: '请输入元数据所在库IP!' }, { message: '请不要输入空白字符！', whitespace: true }],
                      })(
                      <Input disabled={visible}/>
                      )}
                      </FormItem>
                  <FormItem label="元数据所在库端口:" {...formItemLayout}>
                  {getFieldDecorator('cMetadataPort', {
                    // rules: [{ required: true, message: '请输入元数据所在库端口!' }, { message: '请不要输入空白字符！', whitespace: true }],
                  })(
                    <Input disabled={visible}/>
                  )}
                  </FormItem>
                  <FormItem label="元数据所在库用户名:" {...formItemLayout}>
                    {getFieldDecorator('cMetadataUsername', {
                      // rules: [{ required: true, message: '请输入用户名!' }, { message: '请不要输入空白字符！', whitespace: true }],
                    })(
                      <Input disabled={visible}/>
                    )}
                    </FormItem>    
                  <FormItem label="元数据所在库密码 :" {...formItemLayout}>

                    {getFieldDecorator('cMetadataPassword', {
                      // rules: [{ required: true, message: '请输入密码!' }, { message: '请不要输入空白字符！', whitespace: true }],
                    })(
                      <Input.Password disabled={visible} autoComplete="new-password"/>

                    )}
                </FormItem>
                 
            </>
        :null}
               
       </Form>
       </div>
   );
 }
}
DrawerForm = Form.create()(DrawerForm)

//首页筛选
class Searchfrom extends React.Component {
  state = {
     
  }
  render(){
  const { visible, form,handleReset,onSearch } = this.props;
   const { getFieldDecorator } = form;
   const formItemLayout = {
     labelCol: { span: 6},
     wrapperCol: { span: 16 },
   };
   return (
      <div style={{marginTop:4,borderTop:1}}>
       <Form
         className="ant-advanced-search-form"
       >
        <Row style={{paddingTop:16}}>
         <Col span={8}>
            <FormItem label="数据源名称:" {...formItemLayout}>

              {getFieldDecorator('cDatasourceName', {
                      // rules: [{ required: true, message: '请输入内容!' }],
                    })(
                      <Input />
                    )}
              </FormItem>
          </Col>
          <Col span={8}>
             <FormItem label="数据源类型:" {...formItemLayout}>
                  {getFieldDecorator('nDbType', {
                          // rules: [{ required: true, message: '请选择数据源类型!' }],
                        })(
                          <Select>
                              <Option value={1}>oracle</Option>
                              <Option value={2}>mysql</Option>
                              <Option value={3}>Postgres</Option>
                              <Option value={4}>GreenPlum</Option>
                              <Option value={5}>sqlserver</Option>
                              <Option value={6}>Hdfs</Option>
                          </Select>

                        )}
                </FormItem>
            </Col>
            <Col span={8}>
                <div style={{marginRight:'30px',marginBottom:6}}>
                  <Button type="primary" style={{ marginLeft: 8 }} onClick={onSearch}>搜索</Button>
                  <Button style={{ marginLeft: 8 }} onClick={handleReset}>清空</Button>
                </div>
            </Col>
        </Row>
        </Form>
       </div>
   );
 }
}
Searchfrom = Form.create()(Searchfrom)

export default connect((state)=>{
  console.log(state)
  return{
    tDataFlag:state.DataSourceConfigModel.tDataFlag,
    tDataList:state.DataSourceConfigModel.tDataList,
    detailsFlag:state.DataSourceConfigModel.detailsFlag,
    tDataDetails:state.DataSourceConfigModel.tDataDetails
  }
})(DataSourceConfig)