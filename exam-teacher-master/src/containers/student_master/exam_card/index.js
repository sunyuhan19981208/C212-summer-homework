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
            data: {
                stem: "",
                A: '',
                B: '',
                C: '',
                D: '',
                E: '',
                total: '',
            },
            type: '',
            choiceType: '',
            key: 'choice',  //默认是选择题

        }
    }


    componentWillMount() {
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

    render() {
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
