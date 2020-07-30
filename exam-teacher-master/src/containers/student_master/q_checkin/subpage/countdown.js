import React, { Component } from 'react';
  
class CountDown extends Component {
    constructor(props) {
        super(props)
        this.state = {

            hour: 0,
            minute: 0,
            second: 0
        }
    }
    render() {
        return (
            <CountDown>
                <span>{this.state.hour}:{this.state.minute}:{this.state.second}</span>
            </CountDown>
        )
    }
 
    componentDidMount() {
       const end = Date.parse(new Date('2018-11-29 24:00'))
       this.countFun(end);
    }
   
   //卸载组件取消倒计时
   componentWillUnmount(){
     clearInterval(this.timer);
   }
   
   countFun = (end) => {
 
     let now_time = Date.parse(new Date());
    var remaining = end - now_time;
  
     this.timer = setInterval(() => {
         //防止出现负数
       if (remaining > 1000) {
         remaining -= 1000;
         let hour = Math.floor((remaining / 1000 / 3600) % 24);
         let minute = Math.floor((remaining / 1000 / 60) % 60);
         let second = Math.floor(remaining / 1000 % 60);
 
         this.setState({
             hour:hour < 10 ? "0" + hour : hour,
             minute:minute < 10 ? "0" + minute : minute,
             second:second < 10 ? "0" + second : second
         })
       } else {
         clearInterval(this.timer);
         //倒计时结束时触发父组件的方法
         //this.props.timeEnd();
       }
     }, 1000);   }
 
 }

export default CountDown;