import React from 'react'
import BreadcrumbCustom from '@components/BreadcrumbCustom'
import { Form,Input,Select,Icon,Radio,Row,Col,Button,message,InputNumber,Card,DatePicker,Modal} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
const RadioGroup = Radio.Group;

import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

import { connect } from 'react-redux'

import ChooseCard from './subpage/choose_card'

import httpServer from '@components/httpServer.js'
import * as URL from '@components/interfaceURL.js'

class ChooseQuestions extends React.Component {
  constructor(){
    super()
    this.state = {
      pathList : ['出卷'],
      localCounter : 0,
      ChooseQuestionList :[{//出卷列表
         "score": 0,
        // "num" : 0,
        "questionType": 1,  //选择
        "knowledgePointInfo": [],
        "questionId" :[]
      },{
         "score": 0,
        // "num" : 0,
        "questionType": 2,  //多选
        "knowledgePointInfo": [],
        "questionId" :[]
      },
      /*{
         "score": 0,
        // "num" : 0,
        "questionType": 3,  //判断
        "knowledgePointInfo": []
      },*/
      {
         "score": 0,
        // "num" : 0,
        "questionType": 3,  //填空
        "knowledgePointInfo": [],
        "questionId" :[]
      },{
         "score": 0,
        // "num" : 0,
        "questionType": 4,  //简答
        "knowledgePointInfo": [],
        "questionId" :[]
      }
      // {
      //   "score": 0,
      //   "num" : 0,
      //   "questionType": 6,  //程序
      //   "knowledgePointInfo": []
      // }
    ],
      knowledgePointInfo : [] , //知识点列表
      //questionInfo : [] //题目列表
    }
    this.subjectId = -1;
    this.gradeId = -1;
  }

  //发送出卷请求
  sendChooseQuestion(sendObj){
    httpServer({
      method : "post",
      url : URL.paper_info
    },sendObj)
  }

  //提交
  handleSubmit(e){
    e.preventDefault();
    let notSendObj = {
      "questionObjects" : [],
      "subjectId": this.gradeId,
      "gradeId": this.subjectId,
    };
    //整合出题信息
    this.state.ChooseQuestionList.forEach((item)=>{
        let obj = {
          "score": item.score,
          "questionId" : item.questionId
        }
        notSendObj.questionObjects.push(obj);
      
    })

    let sendOutObj = JSON.stringify(notSendObj);
    this.sendChooseQuestion(sendOutObj);
  }

  getKnowledgePoint(){
    //获取知识点
    httpServer({
      url : URL.knowledge_point
    },{
      //className : 'KnowledgePointInfoServiceImpl',
      gradeId : this.subjectId,
      subjectId : this.gradeId
    })
    .then((res)=>{
      this.state.knowledgePointInfo = res.data.data;
      this.setState({knowledgePointInfo : this.state.knowledgePointInfo});
    })

  }
  

  //选择科目
  subjectChange(value){
    this.subjectId = value;
    //科目和等级都已经选择
    if(this.subjectId >=0 && this.gradeId >=0) {

        this.getKnowledgePoint();
    }
  }

  //选择等级
  gradeChange(value){
    this.gradeId = value;
    //科目和等级都已经选择
    if(this.subjectId >=0 && this.gradeId >=0) {

        this.getKnowledgePoint();
    }
  }

  render(){
    //验证
    const { getFieldDecorator } = this.props.form;

    //表单项布局
    const formItemLayout = {
      labelCol: {
        sm: { span: 12 },
      },
      wrapperCol: {
        sm: { span: 12 },
      },
    };

    const formItemLayoutTop = {
      labelCol: {
        sm: { span: 24 },
        md: { span: 6 }
      },
      wrapperCol: {
        sm: { span: 24 },
        md: { span: 18 }
      },
    }


    return (
      <div>
        <BreadcrumbCustom pathList={this.state.pathList}></BreadcrumbCustom>
        <div className="choose-questions-content" style={{ background: 'rgba(240,242,245,0.4)', padding: '30px' }}>
          <Form onSubmit={this.handleSubmit.bind(this)} className="ant-advanced-search-form">
            <Row>
              <Col span={8}>
                <FormItem
                  label="年级"
                  {...formItemLayoutTop}
                >
                  {getFieldDecorator('subjectId')(
                    <Select style={{ width: 120 }} onChange={this.subjectChange.bind(this)}>
                      <Option value="1">初中</Option>
                      <Option value="2">高中</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem
                  label="科目"
                  {...formItemLayoutTop}
                >
                  {getFieldDecorator('gradeId')(
                    <Select style={{ width: 120 }} onChange={this.gradeChange.bind(this)}>
                      <Option value="1">语文</Option>
                      <Option value="2">数学</Option>
                      <Option value="3">英语</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Row>
            <ChooseCard title="选择题" knowledgePointInfo={this.state.knowledgePointInfo} singleQuestion={this.state.ChooseQuestionList[0]}></ChooseCard>
            <ChooseCard title="多选题" knowledgePointInfo={this.state.knowledgePointInfo} singleQuestion={this.state.ChooseQuestionList[1]}></ChooseCard>
            {/* <ChooseCard title="判断题" knowledgePointInfo={this.state.knowledgePointInfo} singleQuestion={this.state.ChooseQuestionList[2]}></ChooseCard> */}
            <ChooseCard title="填空题" knowledgePointInfo={this.state.knowledgePointInfo} singleQuestion={this.state.ChooseQuestionList[2]}></ChooseCard>
            <ChooseCard title="简答题" knowledgePointInfo={this.state.knowledgePointInfo} singleQuestion={this.state.ChooseQuestionList[3]}></ChooseCard>
            {/* <ChooseCard title="程序题" knowledgePointInfo={this.state.knowledgePointInfo} singleQuestion={this.state.ChooseQuestionList[5]}></ChooseCard> */}

            <FormItem
            >
              <Row>
                  <Col span={22} style={{paddingRight : '24px'}}>
                    <Button type="primary" htmlType="submit" className="f-r">生成试卷</Button>
                  </Col>
              </Row>
            </FormItem>
          </Form>
        </div>
      </div>
    )
  }
}


export default (Form.create()(ChooseQuestions))
