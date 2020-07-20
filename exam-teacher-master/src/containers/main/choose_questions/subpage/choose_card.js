import React from 'react'
import { Form, Input, Select, Icon, Radio, Row, Col, Button, message, InputNumber, Card } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
import httpServer from '@components/httpServer.js'
import * as URL from '@components/interfaceURL.js'

let localCounter = 2;
class ChooseCard extends React.Component {
  constructor() {
    super()
    this.state = {
      //num: 0,
      //currentPointId : 0,
      //currentQuestionId : 0,
      questionInfo: [] //题目列表
    }

  }

  //知识点下拉选择
  knowledgeChange(i, value) {
    if (typeof this.props.singleQuestion.knowledgePointInfo[i] === "undefined") {
      this.props.singleQuestion.knowledgePointInfo[i] = {};
    }
    this.props.singleQuestion.knowledgePointInfo[i].knowledge = value;
    this.getQuestion(i);
  }

  //题目下拉选择
  questionChange(i, value) {

    this.props.singleQuestion.questionId[i] = value;

  }

  //个数比改变
  /*countChange(i, value) {
    if (typeof this.props.singleQuestion.knowledgePointInfo[i] === "undefined") {
      this.props.singleQuestion.knowledgePointInfo[i] = {};
    }
    this.props.singleQuestion.knowledgePointInfo[i].count = value;

    let totalCount = 0;
    this.props.singleQuestion.knowledgePointInfo.forEach((item) => {
      totalCount += item.count;
    })
    this.setState({ num: totalCount });
    this.props.singleQuestion.num = totalCount;


  }*/

  //删除选项
  deleteOption(key, i) {
    const { form } = this.props;
    let keys = form.getFieldValue('keys');
    keys = keys.filter(item => item !== key)
    form.setFieldsValue({
      keys: keys,
    });
  }

  //增加选项
  addOption() {
    const { form } = this.props;
    let keys = form.getFieldValue('keys');
    keys.push(++localCounter);
    form.setFieldsValue({
      keys: keys,
    });
  }

  // //个数改变
  // numChange(value){
  //   this.props.singleQuestion.num = value;
  // }

  //分值改变
  scoreChange(value) {
    this.props.singleQuestion.score = value;
  }

  //获取题目
  getQuestion(i) {
    httpServer({
      url: URL.get_question
    }, {
      pointId: this.props.singleQuestion.knowledgePointInfo[i].knowledge
    })
      .then((res) => {
        this.state.questionInfo = res.data.data;
        this.setState({ questionInfo : this.state.questionInfo });
      })
  }



  render() {
    // console.log(this.props.singleQuestion)

    const { getFieldDecorator, getFieldValue } = this.props.form;
    getFieldDecorator('keys', { initialValue: [0, 1] });

    //表单项布局
    const formItemLayout = {
      labelCol: {
        sm: { span: 12 },
      },
      wrapperCol: {
        sm: { span: 12 },
      },
    };


    //知识点列表
    
    let knowledgePointInfo = [];
    if (this.props.knowledgePointInfo.length != 0) {
      knowledgePointInfo = this.props.knowledgePointInfo.map((item) => {
        return (
          <Option value={item.pointId} key={item.pointId}>{item.pointName}</Option>
        )
      })
    }




    //题目列表
    let questionInfo = [];
    if (this.state.questionInfo.length != 0) {
      questionInfo = this.state.questionInfo.map((item) => {
        return (
          <Option value={item.questionId} key={item.questionId}>{item.questionStem}</Option>
        )
      })
    }




    const keys = getFieldValue('keys');

    const singlePointList = keys.map((item, i) => {
      return (
        <Row key={item}>
          <Col span={10}>
            <FormItem
              label="知识点"
              {...formItemLayout}
            >
              <Select notFoundContent="请选择科目和年级" onChange={this.knowledgeChange.bind(this, i)} >
                {knowledgePointInfo}
              </Select>
            </FormItem>
          </Col>
          <Col span={10}>
            <FormItem
              label="题目"
              {...formItemLayout}
            >
              <Select notFoundContent="请选择科目、年级和知识点" onChange={this.questionChange.bind(this, i)}>
                {questionInfo}
              </Select>
            </FormItem>
          </Col>
          <Col span={2}>
            <Button className="f-r" onClick={this.deleteOption.bind(this, item)}><Icon type="delete"></Icon></Button>
          </Col>
        </Row>
      )
    })

    return (
      <Card title={this.props.title} bordered={false} style={{ width: '100%', marginBottom: '20px' }}>
        <Row>
        <Col span={10}>
            <FormItem
              label="分值"
              {...formItemLayout}
            >
              {getFieldDecorator('score', {
                initialValue: '0'
              })(
                <InputNumber min={0} onChange={this.scoreChange.bind(this)} />
              )}
            </FormItem>
          </Col>
        </Row>
        {singlePointList}
        <Row>
          <Col span={22}>
            <FormItem>
              <Button className="f-r" type="primary" onClick={this.addOption.bind(this)}>新增题目</Button>
            </FormItem>
          </Col>
        </Row>
      </Card>
    )
  }
}

export default Form.create()(ChooseCard);
