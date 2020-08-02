import React from 'react'
import { Card, Icon,Carousel,Calendar} from 'antd';
import { Link } from 'react-router-dom';

export default class Homepage extends React.Component {
    constructor() {
        super()
        this.state = {

        }
    }

    render() {    
        return (
            <div>
                <Carousel autoplay>    
                    <div className="exam-notice">
                        <el-card className="box-card"> 
                            <div slot="header" className="clearfix">
                                <h2>考试须知</h2>
                            </div>
                            <div className="text">    
                                <p>一、考试为在线考试，有时间限制</p>
                                <p>二、考试期间不得离开考试页面，否则离开两次将自动交卷</p>
                                <p>三、考试请独立思考，不得与他人交流</p>
                                <p>四、若还没开考，请耐心等待</p>
                            </div>
                        </el-card>
                    </div>
                    <div>
                        <span><h1><a href="#/student_master/personal_center/change_password">个人中心</a></h1></span>
                    </div>    
                </Carousel>
            
        </div>
        )
    }

}