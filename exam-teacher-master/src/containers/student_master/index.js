import React from 'react'
import { Menu, Icon, Button, Card } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import * as classinfoActions from '../../actions/classinfo'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

//路由组件
import { Route,Link,Switch  } from 'react-router-dom';

//头部条
import HeaderBar from './header_bar/index.js'

//首页
import Homepage from './homepage/index.js'

//个人中心
import ChangePassword from './personal_center/change_password';

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
        //判断用户是否已经登录
        if (!localStorage.getItem("username")) {
            this.props.history.push('/login');//跳转至登录页
        }

        this.setState({ roleSet: localStorage.getItem("roleSet") })

        //获取班级信息
        httpServer({
            method: 'get',
            url: URL.get_class_info
        }, {
            //type: 5
        })
            .then((res) => {
                //状态存储
                this.props.classinfoActions.setClassInfo({
                    classArr: res.data.data
                })
            })

        //菜单选择情况
        this.whoIsChecked();
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
        return (
            <div>
                <div id="leftMenu">
                    {/* <img className="logo" src="/sxt_exam/lqw/images/logo.jpg"/> */}
                    <img className="logo" src={require("@assets/images/logo.jpg")} />
                    <div>
                        <Menu
                            mode="inline"
                            defaultOpenKeys={this.state.defaultOpenKeys}
                            defaultSelectedKeys={this.state.defaultSelectedKeys}
                            openKeys={this.state.openKeys}
                            onOpenChange={this.onOpenChange.bind(this)}
                        >

                            <Menu.Item key="exam_card">
                                <Link to="/student_master/exam_card">
                                    <Icon type="profile" />
                                    <span>开始考试</span>
                                </Link>
                            </Menu.Item>
                            <SubMenu key="personal_center" title={<span><Icon type="user" /><span>个人中心</span></span>}>
                                <Menu.Item key="change_password"><Link to="/student_master/personal_center/change_password">修改密码</Link></Menu.Item>
                            </SubMenu>
                        </Menu>
                    </div>
                </div>
                <div id="rightWrap">
                    <HeaderBar></HeaderBar>
                    <div className="right-box">
                        <Switch>
                            {/* 主页 */}
                            <Route path="/student_master/homepage" component={Homepage} />
                            {/* 个人中心 */}
                            <Route path="/student_master/personal_center/change_password" component={ChangePassword} />

                        </Switch>
                    </div>
                </div>
            </div>


        )
    }


}


function mapDispatchToProps(dispatch) {
    return {
        classinfoActions: bindActionCreators(classinfoActions, dispatch),
    }
}

export default connect(
    mapDispatchToProps
)(StuMaster)
