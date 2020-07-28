//！！！！！试题录入改————考试页面
import React from 'react';
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

import { connect } from 'react-redux'

import QSingle from './subpage/q_single'
import QMultiple from './subpage/q_multiple'

import QFillIn from './subpage/q_fill_in'
import QShortAnswer from './subpage/q_short_answer'


import httpServer from '@components/httpServer.js'
import * as URL from '@components/interfaceURL.js'

class QCheckin extends React.Component {
  constructor(){
    super();
    this.state = {     
      q_checkin_type : 'single',//选项卡用户选择的题目类型
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
      this.setState({q_checkin_type : sessionStorage.getItem("q_checkin_type")})
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

  componentWillReceiveProps(nextProps){
      if (nextProps.location.pathname != this.props.location.pathname) {
        this.setState({// 重置q_checkin_type
          q_checkin_type : 'single'
        });
        sessionStorage.setItem("q_checkin_type", 'single');
      }
  }

  callback(key) {
    this.setState({
      q_checkin_type : key
    });
    sessionStorage.setItem("q_checkin_type", key);//存储用户点击选项卡的题目类型
  }

  render(){
    return(   
      <div className="q-checkin">
        <div className="q-checkin-content">
          <div className="card-container">
            <Tabs type="card" defaultActiveKey={this.state.q_checkin_type} activeKey={this.state.q_checkin_type} onChange={this.callback.bind(this)}>
              <TabPane tab="单选题" key="single">
                <QSingle knowledgePoint={this.state.knowledgePoint} type={this.props.match.params.type} level={this.props.match.params.level}></QSingle>
              </TabPane>
              <TabPane tab="多选题" key="multiple">
                <QMultiple knowledgePoint={this.state.knowledgePoint} type={this.props.match.params.type} level={this.props.match.params.level}></QMultiple>
              </TabPane>
              <TabPane tab="填空题" key="4">
                <QFillIn knowledgePoint={this.state.knowledgePoint} type={this.props.match.params.type} level={this.props.match.params.level}></QFillIn>
              </TabPane>
              <TabPane tab="简答题" key="5">
                <QShortAnswer knowledgePoint={this.state.knowledgePoint} type={this.props.match.params.type} level={this.props.match.params.level}></QShortAnswer>
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    )
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
