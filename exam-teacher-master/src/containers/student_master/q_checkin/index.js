//！！！！！试题录入改————考试页面
import React from 'react';
import { Tabs,Form,Input,Select,Radio,Row,Col,Button,message,Card,Checkbox } from 'antd';
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
const RadioGroup = Radio.Group;

import { connect } from 'react-redux'

// import QSingle from './subpage/q_single'
// import QMultiple from './subpage/q_multiple'

// import QFillIn from './subpage/q_fill_in'
// import QShortAnswer from './subpage/q_short_answer'


import httpServer from '@components/httpServer.js'
import * as URL from '@components/interfaceURL.js'

class QCheckin extends React.Component {
  constructor(){
    super();
    this.state = {     
      // q_checkin_type : 'single',//选项卡用户选择的题目类型
      // data:{
      //   stem:"",
      //   A:'',
      //   B:'',
      //   C:'',
      //   D:'',
      //   E:'',
      //   total:'',    
      // },
      // type:'',
      // choiceType:'',
      // key:'choice',  //默认是选择题
    }
  }

  componentWillMount() {
    if(sessionStorage.getItem("q_checkin_type")) {
      //设置选项卡的题目的类型
      console.log(sessionStorage.getItem("q_checkin_type"));
      this.setState({q_checkin_type : sessionStorage.getItem("q_checkin_type")});
    }
    this.getPaperList();
    // this.getQuestionList();
    // this.getQuestionInfoList();

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
        let list = JSON.parse(localStorage.getItem("paperList"));
        alert("paperList:" + list);
      })
    this.getQuestionList();
  }


  //根据paperId获取questionId
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
          let list = JSON.parse(localStorage.getItem("questionList"));
          alert("questionList:" + list);
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
          // alert(this.state.stem[i]);
          // console.log(questionInfoList);
          localStorage.setItem("questionInfoList2", JSON.stringify(questionInfoList));
          let list2 = JSON.parse(localStorage.getItem("questionInfoList2"));
          // console.log(list2);
        })
    }
  }


  componentWillUpdate(nextProps){
    //在这里使用this.setState会导致无限触发
  }

  // componentWillReceiveProps(nextProps){
  //     if (nextProps.location.pathname != this.props.location.pathname) {
  //       this.setState({// 重置q_checkin_type
  //         q_checkin_type : '3'
  //       });
  //       sessionStorage.setItem("q_checkin_type", '3');
  //     }
  // }

  callback(key) {
    this.setState({
      q_checkin_type : key
    });
    sessionStorage.setItem("q_checkin_type", key);//存储用户点击选项卡的题目类型
  }


  
  

  render(){
    var type =3;
    var res="";
    switch(type){
      case (1):return(<QFillIn ></QFillIn>);break;
      case (2):return(<QSingle ></QSingle>);break;
      case (3):return(<QMultiple ></QMultiple>);break;
      case (5):return(<QShortAnswer ></QShortAnswer>);break;
    };
  }
}

function mapStateToProps(state) {
    return {
        subjectinfo: state.subjectinfo
    }
}

export default connect(
    mapStateToProps
)(QCheckin)
