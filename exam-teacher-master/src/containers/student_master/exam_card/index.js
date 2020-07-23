// import React from 'react'
// import { Menu, Icon, Button, Card } from 'antd';
// const SubMenu = Menu.SubMenu;
// const MenuItemGroup = Menu.ItemGroup;
// import * as classinfoActions from '../../actions/classinfo'
// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'

// //路由组件
// import { Route, Link, Switch } from 'react-router-dom';
// import { get_paperId } from '../../../components/interfaceURL';

// import httpServer from '@components/httpServer.js'
// import * as URL from '@components/interfaceURL.js'


// class ExamCard extends React.Component {
//     constructor() {
//         super()
//         this.state = {
//             className: "",
//         }
//     }

//     componentWillMount() {

//         //获取试卷信息
//         httpServer({
//             url: URL.get_paper
//         }, {
//             className: this.props.userinfo.classOfCurStudent
//         })
//         .then((res) =>{

//         })


//     }


// }

// function mapStateToProps(state) {
//     return {
//         userinfo: state.userinfo
//     }
// }

// function mapDispatchToProps(dispatch) {
//     return {
//         classinfoActions: bindActionCreators(classinfoActions, dispatch),
//     }
// }

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(ExamCard)
