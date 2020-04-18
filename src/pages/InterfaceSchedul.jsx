import React, { Component } from 'react';
import { Tree ,Row,Col,Table,Icon,Modal,Form,Input,Radio} from 'antd';

const columns = [
    {
      title: '任务名称',
      dataIndex: 'name',
    },
    {
      title: '任务状态',
      dataIndex: 'age',
    },
    {
        title: '任务配置',
        dataIndex: 'address',
    },
    {
      title: '模式',
      dataIndex: 'address',
    },
    {
        title: '执行日志',
        dataIndex: 'age',
      },
     
  ];
const data = [];
  for (let i = 0; i < 46; i++) {
    data.push({
      key: i,
      name: `Edward King ${i}`,
      age: 32,
      address: `London, Park Lane no. ${i}`,
    });
  }
class InterfaceSchedul extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            selectedRowKeys: [],
            data:[1,2,3],
        }
    }
    componentDidMount(){
      // setInterval(()=>{
      //   let newdata = this.state.data
      //   console.log(newdata)
      //    this.setState({
      //      data:this.state.data.concat([1])
      //  })
      // },1000)
    }
    render() { 
        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
          selectedRowKeys,
          onChange: this.onSelectChange,
        };
       
        return ( 
            <div style={{paddingLeft:30,paddingRight:30}}>
                <div style={{background:'#fff'}}>
                    <Table rowSelection={rowSelection} columns={columns} dataSource={data}/>
                </div>
                {
                  this.state.data.map((item)=>{
                    return <div>执行日志 :{item} </div>
                  })
                }
            </div>
         );
    }
}
 
export default InterfaceSchedul;