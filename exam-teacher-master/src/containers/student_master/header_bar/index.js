import React from 'react'

import { Menu, Icon, Button } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

//actions
import * as userinfoActions from '../../../actions/userinfo'

//路由组件
import { Link } from 'react-router-dom';

class HeaderBar extends React.Component {
  constructor(){
    super()
  }

  componentWillMount(){
      //如果状态管理中没有内容（用户刷新网页）
      //去取localStorage的用户名
      if(!this.props.userinfo.username) {
        if(localStorage.getItem("username")) {
          //发送Action  向Store 写入用户名
          this.props.userinfoActions.login({
            username: localStorage.getItem("username")
          })
        }
      }
  }

  handleClick(e){
    //退出
    if(e.key == 'sign_out') {
      localStorage.removeItem("username")

      //发送Action  向Store 清除用户名
      this.props.userinfoActions.login({
        username: ""
      })

    }
  }

  render(){
    return(
      <Menu
        mode="horizontal"
        theme="dark"
        onClick={this.handleClick.bind(this)}
      >
        <Menu.Item className="h1" key="h1" ><img className="tlogo" src={require("@assets/images/title-logo.png")}/></Menu.Item>
        <Menu.Item className="h2" key="h2" ><img className="title" src={require("@assets/images/title.png")}/></Menu.Item>

        <SubMenu title={<span><img className="logo-user" src={require("@assets/images/sun.png")}/>{this.props.userinfo.username}</span>} >
            <Menu.Item key="sign_out"><Link to="/login">退出</Link></Menu.Item>
            <Menu.Item key="change_password"><Link to="/main/personal_center/change_password">修改密码</Link></Menu.Item>
        </SubMenu>
      </Menu>
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
        userinfoActions: bindActionCreators(userinfoActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HeaderBar)
