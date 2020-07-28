import React from 'react'

import { Form, Input, Select, Row, Col, Button, DatePicker } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

import { connect } from 'react-redux'

import BreadcrumbCustom from '@components/BreadcrumbCustom'
import httpServer from '@components/httpServer.js'
import * as URL from '@components/interfaceURL.js'

import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

class CreateExam extends React.Component {
  constructor() {
    super()
    this.state = {
      pathList: ['考试管理', '创建考试'],//面包屑路径
      className: "",
      teacherId: "",
      gradeId: -1,
      subjectId: -1,
      paperIdList: [],
      teacherList: [],
    }
  }

  //选择班级
  handleChange(value) {
    this.className = value;
  }

  //选择阅卷老师
  teacherChange(value) {
    this.teacherId = value;
  }

  //获取试卷编号
  getPaperId() {
    httpServer({
      url: URL.get_paperId
    }, {
      subjectId: this.gradeId,
      gradeId: this.subjectId,
    })
      .then((res) => {
        let respData = res.data.data;
        this.setState({ paperIdList: respData })
      })
  }

  //获取教师信息
  getTeacher() {
    httpServer({
      url: URL.get_teacher
    }, {
    })
      .then((res) => {
        this.state.teacherList = res.data.data;
        this.setState({ teacherList: this.state.teacherList })
      })
  }

  //选择年级
  gradeChange(value) {
    this.gradeId = value;
    if (this.gradeId >= -1 && this.subjectId >= -1) {
      this.getPaperId();

    }
  }

  //选择科目
  subjectChange(value) {
    this.subjectId = value;
    if (this.gradeId >= -1 && this.subjectId >= -1) {
      this.getPaperId();
    }
  }

  //表单提交
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        httpServer({
          url: URL.create_exam,
        }, {
          className: values.className,
          teacherId: values.teacherId,
          paperId: values.paperId,
          startTime: values.startTime.format('YYYY-MM-DD HH:mm:ss'),
          endTime: values.endTime.format('YYYY-MM-DD HH:mm:ss'),
          examName: values.examName,
        })
      }
    });
  }

  componentWillMount(){
    this.getTeacher();
  }


  render() {
    const { getFieldDecorator } = this.props.form;
    //表单布局
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4, offset: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
    };

    //班级信息
    let classtArr = [];
    if (this.props.classinfo.classArr) {
      classtArr = this.props.classinfo.classArr.map((item) => {
        return (
          <Option value={item.className} key={item.className}>{item.className}</Option>
        )
      })
    }


    //试卷编号
    let paperIdList = [];
    paperIdList = this.state.paperIdList.map((item) => {
      return (
        <Option value={item} key={item}>{item}</Option>
      )
    })

    
    //阅卷教师信息
    let teacherList = [];
    if (this.state.teacherList.length != 0) {
      teacherList = this.state.teacherList.map((item) => {
        return (
          <Option value={item.userId} key={item.userId}>{item.username}</Option>
        )
      })
    }




    return (
      <div>
        <BreadcrumbCustom pathList={this.state.pathList}></BreadcrumbCustom>
        <div className="change-password-content">
          <Form onSubmit={this.handleSubmit.bind(this)}>
            <FormItem
              {...formItemLayout}
              label="班级"
            >
              {getFieldDecorator('className')(
                <Select style={{ width: '100%' }} onChange={this.handleChange.bind(this)}>
                  {classtArr}
                </Select>
              )}

            </FormItem>
            <FormItem
              {...formItemLayout}
              label="考试名称"
            >
              {getFieldDecorator('examName')(
                <Input />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="年级"
            >
              {getFieldDecorator('gradeId')(
                <Select style={{ width: 120 }} onChange={this.gradeChange.bind(this)}>
                  <Option value="1">初中</Option>
                  <Option value="2">高中</Option>
                </Select>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="科目"
            >
              {getFieldDecorator('subjectId')(
                <Select style={{ width: 120 }} onChange={this.subjectChange.bind(this)}>
                  <Option value="1">语文</Option>
                  <Option value="2">数学</Option>
                  <Option value="3">英语</Option>
                </Select>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="试卷编号"
            >
              {getFieldDecorator('paperId')(
                <Select notFoundContent="请选择科目和年级" style={{ width: '100%' }}>
                  {paperIdList}
                </Select>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="阅卷老师"
            >
              {getFieldDecorator('teacherId')(
                <Select notFoundContent="请选择阅卷老师" style={{ width: '100%' }} onChange={this.teacherChange.bind(this)}>
                  {teacherList}
                </Select>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="开始时间"
            >
              {getFieldDecorator('startTime')(
                <DatePicker
                  showTime
                  format="YYYY-MM-DD HH:mm:ss"
                  placeholder="选择时间"
                  style={{ width: '100%' }}
                />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="结束时间"
            >
              {getFieldDecorator('endTime')(
                <DatePicker
                  showTime
                  format="YYYY-MM-DD HH:mm:ss"
                  placeholder="选择时间"
                  style={{ width: '100%' }}
                />
              )}
            </FormItem>
            <Row>
              <Col span={12} offset={4}>
                <Button type="primary" htmlType="submit" className="f-r">确定</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    classinfo: state.classinfo,
  }
}

export default connect(
  mapStateToProps
)(Form.create()(CreateExam))
