import React from 'react'
import { Menu, Icon, Layout } from 'antd';

const { Sider, Content, Header } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

import * as classinfoActions from '../../actions/classinfo'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

//路由组件
import { Route, Link, Switch } from 'react-router-dom';

//头部条
import HeaderBar from './header_bar/index.js'

//首页
import Homepage from './homepage/index.js'

//答题卡
import ExamCard from './exam_card/index.js'

//个人中心
import ChangePassword from './personal_center/change_password';

import QCheckin from './q_checkin/index.js';

import httpServer from '@components/httpServer.js'
import * as URL from '@components/interfaceURL.js'

class StuMaster extends React.Component {
    constructor() {
        super()
        this.state = {
            defaultOpenKeys: [],//菜单默认打开项
            defaultSelectedKeys: [],//菜单默认选择项
            openKeys: [],//菜单打开项
            subjectArr: [],//科目数组
            roleSet: '',
        }
        this.rootSubmenuKeys = ['exam_card', 'personal_center'];
    }


    //根据路由判断 用户选择了菜单中的哪一项
    whoIsChecked() {
        if (this.props.location.pathname.indexOf('/student_master/exam_card') != -1) {//考试界面
            this.setState({ defaultSelectedKeys: ['exam_card'] })
        }
        else if (this.props.location.pathname.indexOf('/student_master/personal_center') != -1) {//个人中心
            this.setState({ defaultOpenKeys: ['personal_center'] })
            this.setState({ openKeys: ['personal_center'] })
            let arr = this.props.location.pathname.split('/');
            let str = arr[arr.length - 1];
            this.setState({ defaultSelectedKeys: [str] })
        }
    }

    componentWillMount() {
        console.log("componentWillMount");
        //判断用户是否已经登录
        if (!localStorage.getItem("username")) {
            this.props.history.push('/login');//跳转至登录页
        }

        this.setState({ roleSet: localStorage.getItem("roleSet") })

        //菜单选择情况
        this.whoIsChecked();
        //获取考试
        this.getPaperList();
    }



    //根据班级获取试卷信息
    getPaperList() {
        console.log("getPaperList()");
        var paperInfo2 = [];
        httpServer({
            url: URL.get_paper
        }, {
            className: localStorage.getItem("classOfCurStudent")
        })
            .then((res) => {

                paperInfo2.push(res.data.data[0].paperId);
                localStorage.setItem("paperList", JSON.stringify(paperInfo2));
                let examId = res.data.data[0].examId;
                localStorage.setItem("examId", examId);


            })
         this.getQuestionList();
    }

    //根据paperId获取questionId
    getQuestionList() {
        console.log("getQuestionList()");
        var questionInfo2 = [];
        let list = JSON.parse(localStorage.getItem("paperList"))
        console.log(list);

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
                //console.log(JSON.parse(localStorage.getItem("questionList")));

                //let list2 = JSON.parse(localStorage.getItem("questionList"));
            })
        //this.getQuestionInfo();
    }

    //点击菜单，收起其他展开的所有菜单，保持菜单聚焦简洁。
    onOpenChange(openKeys) {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    }


    render() {
        console.log("render");
        return (
            <Layout>
                <Header className="header">
                    <HeaderBar></HeaderBar>
                </Header>
                <Layout>
                    <Sider>
                        <Menu
                            mode="inline"
                            defaultOpenKeys={this.state.defaultOpenKeys}
                            defaultSelectedKeys={this.state.defaultSelectedKeys}
                            openKeys={this.state.openKeys}
                            onOpenChange={this.onOpenChange.bind(this)}
                            style={{ height: '100%', borderRight: 0 }}>

                            <div><img className="logo" src={require("@assets/images/logo-bg.png")} /></div>

                            <Menu.Item key="exam_card">
                                <Link to="/student_master/q_checkin"><Icon type="profile" /> <span>开始考试</span> </Link>
                            </Menu.Item>

                            <SubMenu key="personal_center" title={<span><Icon type="user" /><span>个人中心</span></span>}>
                                <Menu.Item key="change_password"><Link to="/student_master/personal_center/change_password">修改密码</Link></Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '30px 20px' }}>
                        <Content className="site-layout-background" style={{ padding: 24, margin: 0, minHeight: 280, }}>
                            <div className="right-box">
                                <Switch>
                                    {/* 主页 */}
                                    <Route path="/student_master/homepage" component={Homepage} />
                                    {/* 个人中心 */}
                                    <Route path="/student_master/personal_center/change_password" component={ChangePassword} />
                                    {/* 答题卡 */}
                                    {/* <Route path="/student_master/exam_card" component={ExamCard} /> */}
                                    <Route path="/student_master/q_checkin" component={QCheckin} />

                                </Switch>
                            </div>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>


        )
    }


}


function mapStateToProps(state) {
    return {
        userinfo: state.userinfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
        classinfoActions: bindActionCreators(classinfoActions, dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StuMaster)
