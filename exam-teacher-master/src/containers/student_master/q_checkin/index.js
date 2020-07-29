//！！！！！试题录入改————考试页面
import React from 'react';
import { Tabs, Form, Input, Select, Radio, Row, Col, Button, message, Card, Checkbox } from 'antd';

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
const RadioGroup = Radio.Group;


import { connect } from 'react-redux'

import QSingle from './subpage/q_single'
import QMultiple from './subpage/q_multiple'

import QFillIn from './subpage/q_fill_in'
import QShortAnswer from './subpage/q_short_answer'


import httpServer from '@components/httpServer.js'
import * as URL from '@components/interfaceURL.js'

class QCheckin extends React.Component {
  constructor() {
    super();  
    this.state = {
      index: 0,
      stem: '',
      type: 0,
      choiceType: 0,
      questionId: 0,
      answerList: [],
      stemOfChoice: '',
      opt:'',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }



  componentWillMount() {

    this.getPaperList();
    this.setState(() => {
      let list = JSON.parse(localStorage.getItem("questionContent"));
      this.state.stem = list[this.state.index].data.stem;
      //console.log(this.state.stem);
      this.state.type = list[this.state.index].type;
      this.state.choiceType = list[this.state.index].choiceType;
      this.state.questionId = list[this.state.index].data.questionId;
      this.state.stemOfChoice = list[this.state.index].data.choice.stem;

    })
    // this.getQuestionList();
    // this.getQuestionInfoList();
    

  }

  shouldComponentUpdate() {
    return true;
  }

  componentDidUpdate() {
    //alert(this.state.index);

    let list = JSON.parse(localStorage.getItem("questionContent"));
    this.state.stem = list[this.state.index].data.stem;
    //console.log(this.state.stem);
    this.state.type = list[this.state.index].type;
    this.state.choiceType = list[this.state.index].choiceType;
    this.state.questionId = list[this.state.index].data.questionId;
    this.state.stemOfChoice = list[this.state.index].data.choice.stem;


  }

  //根据className获取paperId（查询考试）
  getPaperList() {
    var paperInfo2 = [];
    httpServer({
      url: URL.get_paper
    }, {
      className: localStorage.getItem("classOfCurStudent")
    })
      .then((res) => {
        for (var i = 0; i < res.data.data.length; i++) {
          paperInfo2.push(res.data.data[i].paperId);
          // alert(this.state.questionInfo[i]);
        }
        localStorage.setItem("paperList", JSON.stringify(paperInfo2));
        let examId = res.data.data[0].examId;
        localStorage.setItem("examId", examId);


        //let list = JSON.parse(localStorage.getItem("paperList"));
        // alert("paperList:" + list);
      })
    this.getQuestionList();
  }


  根据paperId获取questionId
  getQuestionList() {
    var questionInfo2 = [];
    let list = JSON.parse(localStorage.getItem("paperList"))
    for (var j = 0; j < list.length; j++) {
      httpServer({
        url: URL.get_questionlist_by_paperId
      }, {
        paperId: list[j]
      })
        .then((res) => {
          for (var i = 0; i < res.data.data.length; i++) {
            questionInfo2.push(res.data.data[i].questionId);
            // alert(this.state.questionInfo[i]);
          }
          localStorage.setItem("questionList", JSON.stringify(questionInfo2));

          //let list2 = JSON.parse(localStorage.getItem("questionList"));
        })
      this.getQuestionInfoList();
    }
  }



  // 根据questionId获取题目
  getQuestionInfoList() {
    var questionInfoList = [];
    let list = JSON.parse(localStorage.getItem("questionList"));
    for (var j = 0; j < list.length; j++) {
      httpServer({
        url: URL.get_question_by_questionById
      }, {
        questionId: list[j]
      })
        .then((res) => {
          questionInfoList.push(res.data);
          localStorage.setItem("questionContent", JSON.stringify(questionInfoList));
          // let questionContent = localStorage.getItem("questionContent");
          // console.log(questionContent);
        })
    }
  }





  handleSubmit(e) {
    e.preventDefault();

    if (this.state.index === localStorage.getItem("questionList").length - 1) {
      this.props.form.validateFields((err, values) => {
        if (!err) {
          var entry2 = {
            questionId: this.state.questionId,
            answer: values.answer,
          };
          this.state.answerList.push(entry2);

          //提交题目信息
          httpServer({
            url: URL.submit,
            method: post
          }, {
            answerList: this.state.answerList,
            userId: localStorage.getItem("userId"),
            examId: localStorage.getItem("examId"),
          })
        }
      });
    }
    else {
      this.props.form.validateFields((err, values) => {
        if (!err) {
          alert("进入下一题");
          var entry = {
            questionId: this.state.questionId,
            answer: values.answer,
          };
          this.state.answerList.push(entry);

          this.setState({
            index: this.state.index + 1,
          });



        }
      });

    }


  }
  
  clickOption(option){          //处理单选选中的问题
    this.setState({opt:option})   
  }
  render() {

    const { getFieldDecorator } = this.props.form;
    const { setFieldsValue} = this.props.form;

    // let list = JSON.parse(localStorage.getItem("questionContent"));
    // this.state.stem = list[this.state.index].data.stem;
    // //console.log(this.state.stem);
    // this.state.type = list[this.state.index].type;
    // this.state.choiceType = list[this.state.index].choiceType;
    // this.state.questionId = list[this.state.index].data.questionId;
    // this.state.stemOfChoice = list[this.state.index].data.choice.stem;





    const item = [{       //选项，用于保存选项数目
      option: 'A',
      key: 0
    }, {
      option: 'B',
      key: 1
    }, {
      option: 'C',
      key: 2
    }, {
      option: 'D',
      key: 3
    }]






    const is_submit = (index) => {
      //console.log(JSON.parse(localStorage.getItem("questionList")).length);
      if (index === localStorage.getItem("questionList").length - 1) {
        return (
          <Button type="primary" htmlType="submit" className="f-r">提交</Button>
        )
      }
      else {
        return (
          <Button id="next_question" type="primary" htmlType="submit" className="f-r">下一题</Button>
        )
      }

    }

    const singal_answerList = item.map((item, i) => {      //!！单选，此处是选项，包括abcd和选项内容，待修改
      return (
        <Row key={item.key}>
          <Col span={21}>
            <FormItem>
              {getFieldDecorator('answer' + item.option)(
                <Radio onClick={this.clickOption.bind(this,item.option)} checked={this.state.opt == item.option} >{item.option}：{this.state.stemOfChoice}</Radio>
              )}
            </FormItem>
          </Col>
        </Row>
      )
    })

    const multi_answerList = item.map((item, i) => {     // !！多选   此处是选项，包括选项和选项内容，待修改
      return (
        <Row key={item.key}>
          <Col span={21}>
            <FormItem >
              {getFieldDecorator('answer' + item.option)(
                <Checkbox >{item.option}：{this.state.stemOfChoice}</Checkbox>
              )}
            </FormItem>
          </Col>
        </Row>
      )
    })

    const proList = (thistype,ctype) => {         //题目页面
        if (thistype=="2"&&ctype=="0"){     //单选 
          return(
            <div>
               {/* <Radio.Group name="radiogroup" value={this.state.opt}> */}
                {singal_answerList} 
               {/* </Radio.Group>  */}
            </div>      
          );
    
        }else if(thistype=="2"&&ctype=="1"){       //多选
          return(
          <div>
            {multi_answerList}
          </div>
        );
      } else if (thistype === 1) {      //填空
        return (
          <div>
            <FormItem>
              {getFieldDecorator('answer', {})(
                <Row>
                  <Col sm={3} xs={0}></Col>
                  <Col>
                    <TextArea rows={3} placeholder="请输入你的答案" />
                  </Col>
                </Row>
              )}
            </FormItem>
          </div>
        )
      } else if (thistype === 5) {        //简答
        return (
          <div>
            <FormItem>
              {getFieldDecorator('answer', {})(
                <Row gutter={[0, 10]}>
                  <Col sm={3} xs={0}></Col>
                  <Col>
                    <TextArea rows={3} placeholder="请输入你的答案" />
                  </Col>
                </Row>
              )}
            </FormItem>
          </div>
        );
      } else {
        alert("数据出错")
        console.log(this.state.type)
        console.log(this.state.choiceType)
      }
    }


    return (
      <div className="q-checkin">
        <div className="q-checkin-content">
          <div className="card-container">
            <Form onSubmit={this.handleSubmit.bind(this)}>
              <FormItem>
                <Row>
                  <Col span={24}>
                    <Card>第{this.state.index + 1}题：{this.state.stem}</Card>       {/* //题干this.state.stem */}
                  </Col>
                </Row>
              </FormItem>

              {proList(this.state.type, this.state.choiceType)}

              <FormItem>
                <Row>
                  <Col span={3} offset={11}>
                    {/* <Button type="primary" htmlType="submit" className="nextpro">下一题</Button> */}
                    {is_submit(this.state.index)}
                  </Col>
                  {/* ！！！点击下一题提交答案，同时跳转到下一题 */}
                </Row>
              </FormItem>

            </Form>

          </div>
        </div>
      </div>
    )

  }
}



// export default connect(
//   mapStateToProps
// )(Form.create(QCheckin))

export default Form.create()(QCheckin);