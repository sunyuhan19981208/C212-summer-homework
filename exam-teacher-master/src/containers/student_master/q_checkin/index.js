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

  

  componentWillMount(){

    if(sessionStorage.getItem("q_checkin_type")) {
      //设置选项卡的题目的类型
      console.log(sessionStorage.getItem("q_checkin_type"));
      this.setState({q_checkin_type : sessionStorage.getItem("q_checkin_type")});
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
