import React from 'react'
import BreadcrumbCustom from '@components/BreadcrumbCustom'
import { Row, Col, Select, Input, Table, Icon, Divider, Button, Modal, Form } from 'antd'
const Option = Select.Option;
const Search = Input.Search;
const FormItem = Form.Item;
const confirm = Modal.confirm;

//路由组件
import { Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";
// import { connect } from 'react-redux'

import httpServer from '@components/httpServer.js';
import * as URL from '@components/interfaceURL.js'


class ScoringPaper extends React.Component {
  constructor() {
    super()
    this.state = {
      data: [],
      pagination: {
        pageSize: 10,
        current: 1,
        total: 0,
        defaultCurrent: 1,
      },
      teacherId: '',
      visibleChangeModal: false,
      curPaperInfo: {}
    }
    this.searchKey = "1";
    this.turnStatus = "NORMAL"; //NORMAL:正常翻页   SEARCH:搜索翻页
    this.searchContent = ""; //搜索内容
  }

  componentWillMount() {
    this.getPageDate();

    this.setState({ teacherId: localStorage.getItem("userId") })
    //如果状态管理中没有内容（用户刷新网页）
    //去取localStorage的用户名
    // if(!this.props.userinfo.userId) {
    //   if(localStorage.getItem("userId")) {
    //     //发送Action  向Store 写入用户名
    //     this.props.userinfoActions.login({
    //       teacherId: localStorage.getItem("userId")
    //     })
    //   }
    // }
  }

  //搜索类型
  handleChange(value) {
    this.searchKey = value;
  }

  //点击搜索
  searchPapers(value) {
    if (value == "") {
      Modal.error({
        content: "搜索内容不能为空！",
        okText: '确定'
      });
      return;
    }
    this.turnStatus = "SEARCH";//把翻页状态置为搜索
    this.state.pagination.current = 1;//当前页置为第一页
    this.setState({ pagination: this.state.pagination });
    this.searchContent = value;
    this.getSearchData();
  }

  //选择某一行
  onSelectChange(selectedRowKeys) {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }

  //得到一页数据
  getPageDate() {
    httpServer({
      url: URL.get_papers
    }, {
      teacherId: this.state.teacherId,
      page: this.state.pagination.current,
      rows: this.state.pagination.pageSize,
      type: 1,
    })
      .then((res) => {
        let respDate = res.data.data;
        const data = [];
        for (let i = 0; i < respDate.length; i++) {

          data.push({
            key: i,
            examId: respDate[i].examId,
            className: respDate[i].className,
            examName: respDate[i].examName,
            examDate: respDate[i].examDate,
            paperId: respDate[i].paperId,
          });

        }

        this.state.pagination.total = parseInt(res.data.total);

        this.setState({
          data: data,
          pagination: this.state.pagination
        })


      })
  }

  //得到一页数据
  getSearchData() {
    httpServer({
      url: URL.search_papers
    }, {
      teacherId: this.state.teacherId,
      page: this.state.pagination.current,
      rows: this.state.pagination.pageSize,
      type: 1,
      searchType: this.searchKey,
      content: this.searchContent,
    })
      .then((res) => {
        let respDate = res.data.data;
        const data = [];
        for (let i = 0; i < respDate.length; i++) {

          data.push({
            key: i,
            examId: respDate[i].examId,
            className: respDate[i].className,
            examName: respDate[i].examName,
            examDate: respDate[i].examDate,
            paperId: respDate[i].paperId,
          });

        }

        this.state.pagination.total = parseInt(res.data.total);

        this.setState({
          data: data,
          pagination: this.state.pagination
        })


      })
  }



  //翻页
  handleTableChange(pagination, filters, sorter) {
    const pager = this.state.pagination;
    pager.current = pagination.current;
    pager.pageSize = pagination.pageSize;
    this.setState({
      pagination: pager,
    });
    if (this.turnStatus === "NORMAL") {
      this.getPageDate();
    }
    else {
      this.getSearchData();
    }
  }


  //点击开始阅卷按钮
  beginScoring(i) {
    this.state.curPaperInfo = this.state.data[i];
    this.setState({ curPaperInfo: this.state.curPaperInfo });
    httpServer({
      url: URL.auto_read
    }, {
      className: this.state.curPaperInfo.className,
      paperId: this.state.curPaperInfo.paperId,
    })
    this.props.history.push("/main/paper_manage/scoring/all_papers/" + this.state.curPaperInfo.paperId + "/" + this.state.curPaperInfo.className + "/" + this.state.teacherId);//react-router 4.0 写法
  }


  //点击展示所有试卷
  showAllPapers() {
    this.getPageDate();
  }

  render() {
    //const { getFieldDecorator } = this.props.form;

    let localeObj = {
      emptyText: '暂无数据'
    }

    const columns = [{
      title: '班级',
      dataIndex: 'className',
      key: 'className',
    }, {
      title: '考试名称',
      dataIndex: 'examName',
      key: 'examName',
    }, {
      title: '考试时间',
      dataIndex: 'examDate',
      key: 'examDate',
    }, {
      title: '阅卷',
      key: 'action1',
      render: (text, record) => (
        <span>
          {
            <Button type="primary" size="small" onClick={this.beginScoring.bind(this, record.key)}>开始阅卷</Button>
          }
        </span>
      ),
    },
    ];



    return (
      <div>
        <BreadcrumbCustom pathList={['试卷管理', ['在线阅卷']]}></BreadcrumbCustom>
        <div className="scoring-paper-content">
          <div className="m-b-20">
            <Row>
              <Col span={24}>
                <Search
                  className="f-r"
                  placeholder="请输入关键字"
                  onSearch={this.searchPapers.bind(this)}
                  enterButton
                  style={{ width: 200 }}
                />
                <Select className="f-r m-r-20" defaultValue="1" style={{ width: 120 }} onChange={this.handleChange.bind(this)}>
                  <Option value="1">班级</Option>
                  <Option value="2">考试名称</Option>
                </Select>
                <Button type="primary" className="f-l" onClick={this.showAllPapers.bind(this)}>所有试卷</Button>
              </Col>
            </Row>
          </div>
          <Table
            // rowSelection={rowSelection}
            columns={columns}
            dataSource={this.state.data}
            pagination={this.state.pagination}
            locale={localeObj}
            onChange={this.handleTableChange.bind(this)}
          />
        </div>

      </div>
    )
  }
}
// export default Form.create()(ScoringPaper)


// connect(mapStateToProps,mapDispatchToProps);

// export default withRouter(
//   connect((state) => {
//     return {
//       userinfo: state.userinfo
//     }
//   })(ScoringPaper)
// );
export default withRouter(Form.create()(ScoringPaper));