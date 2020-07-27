//单选题
import React from 'react';
import ReactDOM from 'react-dom'

import { Form,Input,Select,Icon,Radio,Row,Col,Button,Upload,message,Modal,Card } from 'antd';
const FormItem = Form.Item;

import httpServer from '@components/httpServer.js'
import * as URL from '@components/interfaceURL.js'

let localCounter = 4;
class QSingle extends React.Component {
  constructor(){
    super();
    this.state = {
      fileList : [],
      rightAnswer : '',
    }
  }

  //提交
  handleSubmit(e){
    e.preventDefault();


    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if(this.state.rightAnswer === '') {
          Modal.warning({
            content: '请务必选择一个选项',
            okText : '确定'
          });
          return;
        }
        let choice = "";
        for(let variable in values) {
          if (/^option/.test(variable)) {
            choice=choice+values[variable]+",";
          }
        }
        alert(choice);

        //！！！！！提交题目信息，此处修改删除题干的提交
        httpServer({
          url : URL.q_checkin,
          contentType: "application/x-www-form-urlencoded;charset=utf-8"
          // charset=utf-8
        },{
          // className : 'QuestionInfoServiceImpl',
          // gradeId : this.props.level,
          pointId : values.knowledgePoint,
          questionStem : values.tigan,
          // imageSrc : '',
          type : 2,
          answer : this.state.rightAnswer,    //！！！答案信息
          choice : choice,
          choiceType : 0
        })

      }
    });
  }

  //点击答案
  clickWhichAnswer(option){
    this.setState({rightAnswer : option})
    // console.log(this.state.rightAnswer)
  }


  //选项输入框改变
  optionInputChange(i,e){
    this.state.answerOptions[i].answer = e.target.value;
  }


  render(){
    //验证
    const { getFieldDecorator,getFieldValue } = this.props.form;
    getFieldDecorator('keys', { initialValue: [{
      option : 'A',
      key : 0
    },{
      option : 'B',
      key : 1
    },{
      option : 'C',
      key : 2
    },{
      option : 'D',
      key : 3
    }] });
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

    const keys = getFieldValue('keys');
    const answerList = keys.map((item, i) => {      //此处是选项，包括abcd和选项内容，待修改
      return (
        <Row key = {item.key}>
          <Col span={21}>
            <FormItem
              // {...formItemLayout}
              // label={'选项'+item.option}
            >
              {/* {getFieldDecorator('option'+item.option)(
                  <Input addonAfter={<Radio checked={this.state.rightAnswer === item.option} onClick={this.clickWhichAnswer.bind(this,item.option)}>下一题</Radio>}/>
              )} */}
              <Radio checked={this.state.rightAnswer === item.option} onClick={this.clickWhichAnswer.bind(this,item.option)}>{item.option}：选型内容</Radio>
            </FormItem>
          </Col>
        </Row>
      )
    })

    
  
    return(     
      <div>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <FormItem>          
            <Row>
              <Col span={24}>
                <Card>题目：</Card>     {/*此处添加题干 ，this.state.stem */}
              </Col>
            </Row>
          </FormItem>
          {answerList}
          <FormItem>
            <Row>
              <Col sm={3} xs={0}> </Col>
              <Col sm={20} xs={24}>
                <Row> 
                  <Col sm={4} xs={4}>       {/* ！！！点击下一题提交答案，同时跳转到下一题 */}
                    <Button type="primary" htmlType="submit" className="f-r">下一题</Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </FormItem>
        </Form>
      </div>
    )
  }

}

export default Form.create()(QSingle);
