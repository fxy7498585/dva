import React from 'react';
import { connect } from 'dva';
import SlicerComponent from '../components/slider/slider';
import './IndexPage.css'
import EditorComponent from '../components/editor/editor';
import { Table, Divider, Tag, Modal, Button, Select, Form, message } from 'antd';

const { Option } = Select;



class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      visible: false,
      editorContent: '', // 文章内容
      type: '', // 文章类型
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
            <a>修改</a>
            <Divider type="vertical" />
            <a>删除</a>
          </span>
        ),
      },
    ];
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    console.log(this.state.type, this.state.editorContent);
    const content = this.child.handleGetMdValue();
    if (!this.state.type || !content) {
      message.warning('请填写完整内容');
    } else {
      console.log(content);
      this.props.dispatch({
        type: 'article/add',
        payload: {
          editorContent: JSON.stringify(content),
          type: this.state.type
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
    console.log('getDerivedStateFromProps');
    this.props.dispatch({
      type: 'article/findAll',
    });
  }

  render() {
    const {history, location} = this.props;
    const { visible, loading } = this.state;
    const { getFieldDecorator } = this.props.form;
    return(
      <SlicerComponent history={history} location = {location}>
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
                <Button key="submit" type="primary" onClick={this.handleOk}>
                  确认
                </Button>,
              ]}
            >
              <Form>
                <Form.Item label="文章类型">
                  {getFieldDecorator('type', {
                    rules: [
                      {
                        required: true,
                        message: 'Please input your password!',
                      },
                      {
                        validator: this.validateToNextPassword,
                      },
                    ],
                  })(<Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Select a person"
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
                  </Select>)}
                </Form.Item>
                <EditorComponent onRef={this.onRef}></EditorComponent>
              </Form>
            </Modal>
          </div>
          {/* 表格数据 */}
          <Table columns={this.initColumns()} dataSource={this.props.articleList} />
        </div>
      </SlicerComponent>
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