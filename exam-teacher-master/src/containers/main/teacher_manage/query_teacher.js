import React from 'react'
import BreadcrumbCustom from '@components/BreadcrumbCustom'
import { Form } from 'antd';
import { Row, Col, Select, Input, Table, Icon, Divider, Button, Modal, message } from 'antd'
const Option = Select.Option;
const Search = Input.Search;
const FormItem = Form.Item;
const confirm = Modal.confirm;

import httpServer from '@components/httpServer.js';
import { connect } from 'react-redux'
import * as URL from '@components/interfaceURL.js'

class QueryTeacher extends React.Component {
  constructor() {
    super()
    this.state = {
      selectedRowKeys: [], //选择的行
      data: [],
      pagination: {
        pageSize: 10,
        current: 1,
        total: 0,
        defaultCurrent: 1,
      },
      visibleChangeModal: false,//修改框是否显示
      curSelectClass: {//当前所选的教师
        key: 0,
        username: '',
        userId: 0,
      },
      classInfo: [],//班级信息
    }
    this.searchKey = "1";//默认按照班级搜索  1班级 2科目  3状态
    this.turnStatus = "NORMAL"; //NORMAL:正常翻页   SEARCH:搜索翻页
    this.searchContent = ""; //搜索内容
  }

  //得到一页数据
  getPageDate() {
    httpServer({
      url: URL.get_teacher
    }, {
      page: this.state.pagination.current,
      rows: this.state.pagination.pageSize,
      type: 2,
    })
      .then((res) => {
        const data = [];
        for (let i = 0; i < res.data.data.length; i++) {
          data.push({
            key: i,
            name: res.data.data[i].username,
            userId: res.data.data[i].userId,
          });
        }

        this.state.pagination.total = res.data.total;

        this.setState({
          data: data,
          pagination: this.state.pagination
        })
      })
  }

  //得到搜索的数据
  getSearchData() {
    httpServer({
      url: URL.search_teacher
    }, {
      username: this.searchContent,
      searchType: this.searchKey,
      page: this.state.pagination.current,
      rows: this.state.pagination.pageSize,
      type: 2
    })
      .then((res) => {
        const data = [];
        for (let i = 0; i < res.data.data.length; i++) {
          data.push({
            key: i,
            name: res.data.data[i].username,
            userId: res.data.data[i].userId,
          });
        }
        this.state.pagination.total = res.data.total;

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


  componentWillMount() {
    this.getPageDate();
  }

  //删除老师
  deleteTeacher(record) {
    this.setState({ curSelectClass: record })
    confirm({
      title: '你确定删除吗？',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        httpServer({
          url: URL.delete_teacher
        }, {
          userId: this.state.curSelectClass.userId,
        })
          .then((res) => {
            this.getPageDate();//重新获取第一页
          })
      },
    });

  }

  // //点击修改
  // changeClass(record) {
  //   //TODO : 第一次点击this.state.curSelectClass.class为空
  //   this.setState({ curSelectClass: record })
  //   const { form } = this.props;
  //   //重新设置修改模态框中三个选项的值
  //   form.setFieldsValue({ 'name': record.name });
  //   this.setState({ visibleChangeModal: true })
  // }

  // //取消修改
  // changeCancel() {
  //   this.setState({ visibleChangeModal: false })
  // }

  // //确认修改
  // changeOk() {
  //   this.setState({ visibleChangeModal: false })

  //   this.props.form.validateFieldsAndScroll((err, values) => {
  //     if (!err) {
  //       httpServer({
  //         url: URL.change_teacher
  //       }, {
  //         //className : "ManagerServiceImpl",
  //         type: 3,
  //         name: values.name,
  //         instId: this.state.curSelectClass.instId,
  //         password: "",
  //         status: 1
  //       })
  //         .then((res) => {
  //           let className = "";
  //           this.props.classinfo.classArr.some((item) => {
  //             if (item.classId == values.class) {
  //               className = item.className;
  //               return true;
  //             }
  //             return false;
  //           })
  //           this.state.data[this.state.curSelectClass.key].name = values.name;
  //           this.state.data[this.state.curSelectClass.key].class = className;
  //           this.setState({ data: this.state.data });
  //         })

  //     }
  //   });

  // }

  //搜索类型选择
  handleChange(value) {
    this.searchKey = value;
  }

  //点击所有教师
  showAllTeacher() {
    this.turnStatus === "NORMAL";
    this.state.pagination.current = 1;//当前页置为第一页
    this.getPageDate();
  }

  //点击搜索
  searchTeacher(value) {
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

  render() {
    const { getFieldDecorator } = this.props.form;

    const columns = [{
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '工号',
      dataIndex: 'userId',
      key: 'userId',
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button type="danger" size="small" onClick={this.deleteTeacher.bind(this, record)}>删除</Button>
          <Divider type="vertical" />
        </span>
      ),
    }];

    //行选择
    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.onSelectChange.bind(this),
    };

    let localeObj = {
      emptyText: '暂无数据'
    }
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

  

    return (
      <div>
        <BreadcrumbCustom pathList={['教师管理', '查询教师']}></BreadcrumbCustom>
        <div className="class-manage-content">
          <Row>
            <Col span={24}>
              <Search
                className="f-r"
                placeholder="请输入关键字"
                onSearch={this.searchTeacher.bind(this)}
                enterButton
                style={{ width: 200 }}
              />
              <Select className="f-r m-r-20" defaultValue="1" style={{ width: 120 }} onChange={this.handleChange.bind(this)}>
                <Option value="1">姓名</Option>
              </Select>
              <Button type="primary" className="f-l" onClick={this.showAllTeacher.bind(this)}>所有教师</Button>
            </Col>
          </Row>
          <div className="m-t-20">
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
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    classinfo: state.classinfo
  }
}

export default connect(
  mapStateToProps
)(Form.create()(QueryTeacher))
