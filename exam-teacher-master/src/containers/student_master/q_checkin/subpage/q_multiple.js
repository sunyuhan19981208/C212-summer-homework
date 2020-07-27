//多选题
import React from 'react';
import ReactDOM from 'react-dom'

import { Form,Input,Select,Icon,Radio,Row,Col,Button,Upload,message,Modal,Checkbox,Card } from 'antd';
const FormItem = Form.Item;


import httpServer from '@components/httpServer.js'
import * as URL from '@components/interfaceURL.js'

let localCounter = 4;
class QMultiple extends React.Component {
  constructor(){
    super();
    this.state = {
      fileList : [],
      rightAnswer : [],
    }
  }

  //！！！！！提交题目信息，此处修改删除题干的提交
  handleSubmit(e){
    e.preventDefault();

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if(this.state.rightAnswer.length === 0) {
          Modal.warning({
            content: '请至少选择两个选项',
            okText : '确定'
          });
          return;
        }
        // let choice = [];
        // for(let variable in values) {
        //   if (/^option/.test(variable)) {
        //     choice.push(values[variable]);
        //   }
        // }
        let choice = "";
        for(let variable in values) {
          if (/^option/.test(variable)) {
            choice=choice+values[variable]+",";
          }
        }
        let answer ="";
        for(let i=0;i<this.state.rightAnswer.length;i++)
          answer+=this.state.rightAnswer[i]+",";

                         //！！！！！提交题目信息，此处修改删除题干的提交
        httpServer({
          url : URL.q_checkin,

        },{
          // className : 'QuestionInfoServiceImpl',
          // gradeId : this.props.level,
          pointId : values.knowledgePoint,
          questionStem : values.tigan,
          // imageSrc : '',
          type : 2,
          answer : answer,       //答案消息
          choice : choice,
          choiceType : 1
        })

      }
    });
  }

  //点击答案
  clickWhichAnswer(option){
    if(this.state.rightAnswer.indexOf(option) === -1) {
      this.state.rightAnswer.push(option);
    }
    else {
      this.state.rightAnswer = this.state.rightAnswer.filter(item=>item !== option);
    }

    this.state.rightAnswer = this.state.rightAnswer.sort();

    this.setState({rightAnswer : this.state.rightAnswer});
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

    //答案列表
    const keys = getFieldValue('keys');
    const answerList = keys.map((item, i) => {     // //此处是选项，包括选项和选项内容，待修改
      return (
        <Row key = {item.key}>
          <Col span={21}>
            <FormItem
              // {...formItemLayout}
              // label={'选项'+item.option}
            >
              {/* {getFieldDecorator('option'+item.option)(
                  <Input addonAfter={<Checkbox onClick={this.clickWhichAnswer.bind(this,item.option)}>正确答案</Checkbox>}/>
              )} */}
            <Checkbox  onClick={this.clickWhichAnswer.bind(this,item.option)}>{item.option}：选型内容</Checkbox>
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
          <FormItem >
            <Row>
                <Col sm={3} xs={0}> </Col>
                <Col sm={20} xs={24}>
                  <Row> 
                    <Col sm={4} xs={4}>    {/* ！！！点击下一题提交答案，同时跳转到下一题 */}
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

export default Form.create()(QMultiple);
