import React from 'react'
import { Menu, Icon, Button, Card } from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
// import * as classinfoActions from '../../actions/classinfo'
 import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'


import { Route, Link, Switch } from 'react-router-dom';
//import { get_paperId } from '../../../components/interfaceURL';

// import httpServer from '@components/httpServer.js'
// import * as URL from '@components/interfaceURL.js'


class ExamCard extends React.Component {
    constructor() {
        super()
        this.state = {
            data:{
                stem:"",
                A:'',
                B:'',
                C:'',
                D:'',
                E:'',
                total:'',    
            },
            type:'',
            choiceType:'',
            key:'choice',  //默认是选择题

        }
    }

    onTabChange(key, types){     //选项切换函数
        console.log(key, types);
        this.setState({ [types]: key });
    }
    componentWillMount() {

        // //获取试卷信息
        // httpServer({
        //     url: URL.get_paper
        // }, {
        //     className: this.props.userinfo.classOfCurStudent
        // })
        // .then((res) =>{

        // })

        console.log(this);
    }


    render(){
        const typeList = [
            {
                key: 'choice',
                tab: '单选题',
            },
            {
                key: 'multichoice',
                tab: '多选题',
            },
            {
                key: 'tiankong',
                tab: '填空题',
            },
            {
                key: 'jianda',
                tab: '简答题',
            },
          ];
        const contentListNoTitle = {
            choice: <p>单选 content</p>,
            multichoice: <p>多选 content</p>,
            tiankong: <p>填空 content</p>,
            jianda: <p>简答 content</p>,
        }
        return(
            <Card 
            style={{ width: "100%" ,padding:40 }} 
            title="name of paper"
            extra={<a href="#">交卷</a>}  
            tabList={typeList} 
            activeTabKey = {this.state.key}
            onTabChange = { key => {this.onTabChange(key, 'key'); }}
            >   
                这是试题和选项页面
                <div>
                     {this.state.data.stem}题干  {/* 题干 */}
                </div>
                <div>
                    {contentListNoTitle[this.state.key]}
                </div>
                <div className="nextbutton">
                    <Button type="primary">下一题</Button>
                </div>
                               
            </Card>
        )
    }
}

function mapStateToProps(state) {
    return {
        userinfo: state.userinfo
    }
}

// function mapDispatchToProps(dispatch) {
//     return {
//         classinfoActions: bindActionCreators(classinfoActions, dispatch),
//     }
// }

export default connect(
    mapStateToProps,
    // mapDispatchToProps
)(ExamCard)
