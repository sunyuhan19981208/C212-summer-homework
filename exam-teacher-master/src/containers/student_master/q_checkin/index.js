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
      stemOfChoice: [],
      opt: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }



  componentWillMount() {

    this.getPaperList();
    // this.setState(() => {

    //   let list = JSON.parse(localStorage.getItem("questionContent"));
    //   this.state.stem = list.data.stem;
    //   //console.log(this.state.stem);
    //   this.state.type = list.type;
    //   this.state.choiceType = list.choiceType;
    //   this.state.stemOfChoice = list.data.choice.stem;

    //   this.state.questionId = localStorage.getItem("questionId");
    //   //console.log(this.state.questionId);
    
    // })
    // this.getQuestionList();
    // this.getQuestionInfo();

  }

  shouldComponentUpdate(nextState) {
    if (nextState.index !== this.state.index) {
      return true;
    }
    return false;
  }

  componentDidUpdate() {
    //alert(this.state.index);

    this.getQuestionInfo();

    // let list = JSON.parse(localStorage.getItem("questionContent"));

    // this.state.stem = list.data.stem;
    // //console.log(this.state.stem);
    // this.state.type = list.type;
    // this.state.choiceType = list.choiceType;
    // this.state.stemOfChoice = list.data.choice.stem;

    // this.state.questionId = localStorage.getItem("questionId");
    // console.log(this.state.questionId);


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
     
          paperInfo2.push(res.data.data[0].paperId);
          // alert(this.state.questionInfo[i]);
        
        localStorage.setItem("paperList", JSON.stringify(paperInfo2));
        let examId = res.data.data[0].examId;
        localStorage.setItem("examId", examId);


        //let list = JSON.parse(localStorage.getItem("paperList"));
        // alert("paperList:" + list);
      })
    this.getQuestionList();
  }


  //根据paperId获取questionId
  getQuestionList() {
    var questionInfo2 = [];
    let list = JSON.parse(localStorage.getItem("paperList"))
    
      httpServer({
        url: URL.get_questionlist_by_paperId
      }, {
        paperId: list[0]
      })
        .then((res) => {
          for (var i = 0; i < res.data.data.length; i++) {
            questionInfo2.push(res.data.data[i].questionId);
            // alert(this.state.questionInfo[i]);
          }
          localStorage.setItem("questionList", JSON.stringify(questionInfo2));

          //let list2 = JSON.parse(localStorage.getItem("questionList"));
        })
      this.getQuestionInfo();
    
  }



  // 根据questionId获取题目
  getQuestionInfo() {

    let list = JSON.parse(localStorage.getItem("questionList"));

    httpServer({
      url: URL.get_question_by_questionById
    }, {
      questionId: list[this.state.index]
    })
      .then((res) => {
        localStorage.removeItem("questionContent");
        localStorage.removeItem("questionId");
        localStorage.setItem("questionId", list[this.state.index]);
        localStorage.setItem("questionContent", JSON.stringify(res.data));

        // questionInfoList.push(res.data);
        // localStorage.setItem("questionContent", JSON.stringify(questionInfoList));
        // let questionContent = localStorage.getItem("questionContent");
        // console.log(questionContent);
      })

  }





  handleSubmit(e) {
    e.preventDefault();

    if (this.state.index === JSON.parse(localStorage.getItem("questionList")).length - 1) {
      this.props.form.validateFields((err, values) => {
        if (!err) {
          if(this.state.type === 2){
            var entry1 = {
              questionId: this.state.questionId,
              answer: this.state.opt,
            }
            this.state.answerList.push(entry1);
          }
          else{
          var entry2 = {
            questionId: this.state.questionId,
            answer: values.answer,
          };
          this.state.answerList.push(entry2);
        }

          //提交题目信息
          httpServer({
            url: URL.submit,
            method : "post",
          }, {
            answerList: this.state.answerList,
            userId: parseInt(localStorage.getItem("userId"),10),
            examId: parseInt(localStorage.getItem("examId"),10),
          })
        }
      });
    }
    else {
      this.props.form.validateFields((err, values) => {
        if (!err) {
          if(this.state.type === 2){
            var entry3 = {
              questionId: this.state.questionId,
              answer: this.state.opt,
            }
            this.state.answerList.push(entry3);
          }
          else{
          var entry4 = {
            questionId: this.state.questionId,
            answer: values.answer,
          };
          this.state.answerList.push(entry4);
        }

          this.setState({
            index: this.state.index + 1,
          });



        }
      });

    }


  }


  clickOption(option) {          //处理单选选中的问题
    this.setState({ opt: option })
  }

  clickWhichAnswer(option){
    if(this.state.opt.indexOf(option) === -1) {
      this.state.opt.push(option);
    }
    else {
      this.state.opt = this.state.opt.filter(item=>item !== option);
    }

    this.state.opt = this.state.opt.sort();

    this.setState({opt : this.state.opt});
  }


  render() {

  //   {
  //     "userId":4,
  //     "examId":7,
  //     "answerList":[
  //         {
  //             "questionId":1,
  //             "answer":"A"
  //         },
  //         {
  //             "questionId":2,
  //             "answer":"A"
  //         }
  //     ]
  // }

    const { getFieldDecorator } = this.props.form;
    const { setFieldsValue } = this.props.form;

    let list = JSON.parse(localStorage.getItem("questionContent"));

    this.state.stem = list.data.stem;
    //console.log(this.state.stem);
    this.state.type = list.type;
    this.state.choiceType = list.choiceType;
    for(var i=0;i<list.data.choice.length;i++){
    this.state.stemOfChoice.push(list.data.choice[i].stem);
    }

    this.state.questionId = localStorage.getItem("questionId");
    //console.log(this.state.stemOfChoice);

    



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

      if (index === JSON.parse(localStorage.getItem("questionList")).length - 1) {
        return (
          <Button type="primary" htmlType="submit" className="f-r">交卷</Button>
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
                <Radio onClick={this.clickOption.bind(this, item.option)} checked={this.state.opt == item.option} >{item.option}：{this.state.stemOfChoice[i]}</Radio>
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
                <Checkbox onClick={this.clickWhichAnswer.bind(this,item.option)}>{item.option}：{this.state.stemOfChoice[i]}</Checkbox>
              )}
            </FormItem>
          </Col>
        </Row>
      )
    })

    const proList = (thistype, ctype) => {         //题目页面
      if (thistype == "2" && ctype == "0") {     //单选 
        return (
          <div>
            {/* <Radio.Group name="radiogroup" value={this.state.opt}> */}
            {singal_answerList}
            {/* </Radio.Group>  */}
          </div>
        );

      } else if (thistype == "2" && ctype == "1") {       //多选
        return (
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
        alert("数据出错");
        console.log(this.state.type);
        console.log(this.state.choiceType);
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