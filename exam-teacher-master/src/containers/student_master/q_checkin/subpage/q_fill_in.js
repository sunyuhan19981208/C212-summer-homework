//填空题
import React from 'react';
import ReactDOM from 'react-dom'

import { Form,Input,Select,Icon,Radio,Row,Col,Button,Upload,message,Card } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
const RadioGroup = Radio.Group;

import httpServer from '@components/httpServer.js'
import * as URL from '@components/interfaceURL.js'

class QFillIn extends React.Component {
  constructor(){
    super();
    this.state = {
      fileList : [],
      localCounter : 0
    }
  }

  //！！！原来的提交题干，此处应修改为提交答案
  handleSubmit(e){           
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        //提交题目信息
        httpServer({
          url : URL.q_checkin
        },{
          // className : 'QuestionInfoServiceImpl',
          // gradeId : this.props.level,
          pointId : values.knowledgePoint,
          questionStem : values.tigan,
          answer:"",
          choice:"",
          choiceType : 0,
          // imageSrc : '',
          type : 1,
        })

      }
    });
  }

  handleChange(value) {
    // console.log(`selected ${value}`);
  }

  //选项输入框改变
  optionInputChange(i,e){
    this.state.answerOptions[i].answer = e.target.value;
  }

  render(){
    //验证
    const { getFieldDecorator } = this.props.form;

    //表单项布局
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 3 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };

    return(
      <div>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <FormItem>          
            <Row>
              <Col span={24}>
                  <Card>题目：</Card>
              </Col>
            </Row>
          </FormItem>
          <FormItem>          
            <Row>
              <Col sm={3} xs={0}></Col>
              <Col>
                <TextArea rows={3} placeholder="请输入你的答案，多个答案用空格或逗号隔开" />
              </Col>
            </Row>
          </FormItem>
          <FormItem>              
            <Row>
              <Col sm={20} xs={24}>
                <Button type="primary" htmlType="submit" className="f-r">下一题</Button>
              </Col>
              {/* ！！！点击下一题提交答案，同时跳转到下一题 */}
            </Row>
          </FormItem>
        </Form>
      </div>
    )
  }

}

export default Form.create()(QFillIn);

{/* <Tabs type="card" defaultActiveKey={this.state.q_checkin_type} activeKey={this.state.q_checkin_type} onChange={this.callback.bind(this)}>
              <TabPane tab="单选题" key="single">
                <QSingle  type={this.props.match.params.type} level={this.props.match.params.level}></QSingle>
              </TabPane>
              <TabPane tab="多选题" key="multiple">
                <QMultiple  type={this.props.match.params.type} level={this.props.match.params.level}></QMultiple>
              </TabPane>
              <TabPane tab="填空题" key="4">
                <QFillIn  type={this.props.match.params.type} level={this.props.match.params.level}></QFillIn>
              </TabPane>
              <TabPane tab="简答题" key="5">
                <QShortAnswer  type={this.props.match.params.type} level={this.props.match.params.level}></QShortAnswer>
              </TabPane>
            </Tabs> */}