import React from 'react';
import { connect } from 'dva';
import './IndexPage.css'
import EditorComponent from '../components/editor/editor';
import { Table, Divider, Modal, Button, Select, Form, message } from 'antd';

const { Option } = Select;



class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      visible: false,
      editorContent: '', // 文章内容
      type: '', // 文章类型
      buttonType: 'add',
    }
  }
  
  initColumns = () => {
    return [
      {
        title: '文章类型',
        dataIndex: 'type',
        key: 'type',
        render: text => <a>{text}</a>,
      },
      {
        title: '文章内容',
        key: 'content',
        dataIndex: 'content',
        render: content => {
          return <a>{content.length > 50 ? content.slice(1,50) + '...' : content}</a>
        },
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <a onClick={() => this.updateTable(record)}>修改</a>
            <Divider type="vertical" />
            <a onClick={() => {this.handleDelete(record)}}>删除</a>
          </span>
        ),
      },
    ];
  }

  handleDelete = (record) => {
    this.props.dispatch({
      type: 'article/delete',
      payload: {
        id: record.id
      }
    })
    .then(res => {
      if(res.code === 0) {
        message.success('删除成功');
        this.props.dispatch({
          type: 'article/findAll',
        });
        this.setState({
          // editorContent: content,
          visible: false,
        })
      } else {
        message.error('删除失败');
      }
    });
  }

  updateTable = (value) => {
    console.log(value.content);
    this.setState({
      buttonType: 'update',
      type: value.type,
      editorContent: {
        ...value,
        content: JSON.parse(value.content)
      } 
    }, () => {
      console.log(this.state.type);
    });
    this.showModal(false);
  }

  showModal = (flag = true) => {
    // 每次弹出markdown编辑器的时候清楚上一次的内容
    if(flag) {
      this.setState({
        buttonType: 'add',
      });
      this.child && this.child.clearTextHtml();
    }
    
    this.setState({
      visible: true,
    });
  };

  handleOkAndUpdate = () => {
    this.state.buttonType === 'add' ? this.handleOk() : this.handlerUpdate();
  }

  handlerUpdate = () => {
    const content = this.child.handleGetMdValue();
    console.log(this.state.type, content);
    if (!this.state.type || !content) {
      message.warning('请填写完整内容');
    } else {
      console.log(content);
      this.props.dispatch({
        type: 'article/update',
        payload: {
          editorContent: JSON.stringify(content),
          type: this.state.type,
          id: this.state.editorContent ? this.state.editorContent.id : ''
        }
      })
      .then(res => {
        if(res.code === 0) {
          message.success('更新成功');
          this.props.dispatch({
            type: 'article/findAll',
          });
          this.setState({
            // editorContent: content,
            visible: false,
          })
        } else {
          message.error('更新失败');
        }
      });
    }
  }

  handleOk = () => {
    console.log(this.state.type, this.state.editorContent);
    const content = this.child.handleGetMdValue();
    console.log(this.state.type, content);
    if (!this.state.type || !content) {
      message.warning('请填写完整内容');
    } else {
      console.log(content);
      this.props.dispatch({
        type: 'article/add',
        payload: {
          editorContent: JSON.stringify(content),
          type: this.state.type,
        }
      })
      .then(res => {
        if(res.code === 0) {
          message.success('添加成功');
          this.props.dispatch({
            type: 'article/findAll',
          });
          this.setState({
            // editorContent: content,
            visible: false,
          })
        } else {
          message.error('添加失败');
        }
      });
    }
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  onRef = (ref) => {
    this.child = ref;
  }

  UNSAFE_componentWillMount() {
    this.props.dispatch({
      type: 'article/findAll',
    });
  }

  initButton = () => {
    return this.state.buttonType === 'add' ?
    <Button key="confirm" onClick={this.handleOk}>确定</Button>: 
    <Button key="update" onClick={this.handleUpdate}>
      更新
    </Button>
  }

  render() {
    const { visible } = this.state;
    const { getFieldDecorator } = this.props.form;
    return(
      // <SlicerComponent history={history} location = {location}>
        <div className='content'>
          <div className='topButton'>
            <Button type="primary" onClick={this.showModal}>
              增加
            </Button>
            <Modal
              width={'100%'}
              visible={visible}
              title="Title"
              // onOk={this.handleOk}
              onCancel={this.handleCancel}
              footer={[
                <Button key="back" onClick={this.handleCancel}>
                  取消
                </Button>,
                <Button key="confirm" onClick={this.handleOkAndUpdate}>确定</Button>
              ]}
            >
              <Form>
                <Form.Item label="文章类型">
                  <Select
                    value={this.state.type ? this.state.type : '请选择分类'}
                    showSearch
                    style={{ width: 200 }}
                    placeholder="请选择分类"
                    optionFilterProp="children"
                    onChange={this.onChange}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                    onSearch={this.onSearch}
                    filterOption={(input, option) =>
                      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="tom">Tom</Option>
                  </Select>
                </Form.Item>
                <EditorComponent onRef={this.onRef} editorContent={this.state.editorContent}></EditorComponent>
              </Form>
            </Modal>
          </div>
          {/* 表格数据 */}
          <Table columns={this.initColumns()} rowKey={record => record.id} dataSource={this.props.articleList} />
        </div>
      // </SlicerComponent>
    );
  }



  onChange = (value) => {
    console.log(`selected ${value}`);
    this.setState({
      type: value
    });
  }

  onBlur = () => {
    console.log('blur');
  }

  onFocus = () => {
    console.log('focus');
  }

  onSearch = (val) => {
    console.log('search:', val);
  }
}

const mapStateToProps = (state) => {
  return {
    articleList: state.article.articleList
  }
}

const ArticleForm = Form.create({ name: 'IndexPage' })(IndexPage);


export default connect(mapStateToProps)(ArticleForm);