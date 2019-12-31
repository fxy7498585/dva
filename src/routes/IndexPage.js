import React from 'react';
import { connect } from 'dva';
import SlicerComponent from '../components/slider/slider';
import './IndexPage.css'
import EditorComponent from '../components/editor/editor';
import { Table, Divider, Tag, Modal, Button } from 'antd';



class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      visible: false,
      editorContent: '',
      initTableData: [
        {
          key: '1',
          name: 'John Brown',
          content: '阿斯顿发斯蒂芬撒的发生的阿斯蒂芬撒地方撒地方撒地方阿士大夫撒打发斯蒂芬',
          address: 'New York No. 1 Lake Park',
          tags: ['nice', 'developer'],
        },
        {
          key: '2',
          name: 'Jim Green',
          content: '阿斯顿发斯蒂芬撒的发生的阿斯蒂芬撒地方撒地方撒地方阿士大夫撒打发斯蒂芬',
          address: 'London No. 1 Lake Park',
          tags: ['loser'],
        },
        {
          key: '3',
          name: 'Joe Black',
          content: '阿斯顿发斯蒂芬撒的发生的阿斯蒂芬撒地方撒地方撒地方阿士大夫撒打发斯蒂芬',
          address: 'Sidney No. 1 Lake Park',
          tags: ['cool', 'teacher'],
        },
      ]
    }
  }
  
  initColumns = () => {
    return [
      {
        title: '文章标题',
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>,
      },
      {
        title: '标签',
        key: 'tags',
        dataIndex: 'tags',
        render: tags => (
          <span>
            {tags.map(tag => {
              let color = tag.length > 5 ? 'geekblue' : 'green';
              if (tag === 'loser') {
                color = 'volcano';
              }
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </span>
        ),
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
    const content = this.child.handleGetMdValue();
    this.setState({
      editorContent: content,
      isible: false,
    })
    console.log('content', content);
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  onRef = (ref) => {
    this.child = ref;
  }

  render() {
    const {history, location} = this.props;
    const { visible, loading } = this.state;
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
              onOk={this.handleOk}
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
             <EditorComponent onRef={this.onRef}></EditorComponent>
            </Modal>
          </div>
          {/* 表格数据 */}
          <Table columns={this.initColumns()} dataSource={this.state.initTableData} />
        </div>
      </SlicerComponent>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    
  }
}

export default connect(mapStateToProps)(IndexPage);