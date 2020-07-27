//简答题
import React from 'react';
import ReactDOM from 'react-dom'

import { Form,Input,Select,Icon,Radio,Row,Col,Button,Upload,message,Card } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
const RadioGroup = Radio.Group;

import httpServer from '@components/httpServer.js'
import * as URL from '@components/interfaceURL.js'

class QShortAnswer extends React.Component {
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
          // imageSrc : '',
          type : 5,
          answer:"",
          choice:"",
          choiceType : 0,
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

    //知识点列表

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
            <Row gutter={[0,10]}>
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

export default Form.create()(QShortAnswer);
