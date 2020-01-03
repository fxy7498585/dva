import React from 'react';
import { connect } from 'dva';
import { Button, Table, Input, message } from 'antd';

import './addTemplate.css';

class addTemplatePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tid: '',
      ids: '',
    }
  }
  UNSAFE_componentWillMount() {
    this.props.dispatch({type: 'subscribeMessage/getAccessToken'})
    .then((result) => {
       this.props.dispatch({type: 'subscribeMessage/getCategory'});
       this.props.dispatch({type: 'subscribeMessage/getTemplateList'})
    }).catch((err) => {
      
    });
  }
  render() {
    return(
        <div>
          <Button type="primary" onClick={this.getCategory}>获取小程序账号的类目</Button>
          <Table columns={this.inintTable()} rowKey={record => record.id} dataSource={this.props.categoryList} />

          <Button type="primary" onClick={this.getTemplateList}>获取当前帐号下的个人模板列表</Button>
          <Table columns={this.initTempTable()} rowKey={record => record.priTmplId} dataSource={this.props.templateList} />

          <div className="templateTable">
            <Input placeholder="请输入类目id(可输入多个用逗号隔开)" maxLength={100} onChange={this.titleListOnchange} className='input'/>
            <Button type="primary" onClick={this.getPubTemplateTitleList}>获取帐号所属类目下的公共模板标题</Button>
          </div>
          <Table columns={this.initTitleList()} rowKey={record => record.tid} dataSource={this.props.templateTitleList} />
          
          <div className="templateTable">
            <Input placeholder="请输入tid" maxLength={100} onChange={this.inputOnchange} className='input'/>
            <Button type="primary" onClick={this.getPubTemplateKeyWordsById}>获取模板标题下的关键词列表</Button>
          </div>
          <Table columns={this.initKeyWords()} rowKey={record => record.kid} dataSource={this.props.templateKeyWords} />
        </div>
      // </SlicerComponent>
    );
  }


  titleListOnchange = ({
    target
  }) => {
    this.setState({
      ids: target.value
    })
  }

  inputOnchange = ({
    target
  }) => {
    this.setState({
      tid: target.value
    })
  }
  
  initKeyWords = () => {
    return [
      {
        title: 'kid(关键词 id)',
        dataIndex: 'kid',
      },
      {
        title: 'name(关键词内容)',
        dataIndex: 'name',
      },
      {
        title: 'example(关键词内容对应的示例)',
        dataIndex: 'example',
      },
      {
        title: 'rule(参数类型)',
        dataIndex: 'rule',
      },
    ]
  }

  initTitleList = () => {
    return [
      {
        title: 'categoryId(模版所属类目 id)',
        dataIndex: 'categoryId',
      },
      {
        title: 'tid(模版标题 id)',
        dataIndex: 'tid',
      },
      {
        title: 'title(模版标题)',
        dataIndex: 'title',
      },
      {
        title: 'type(2 为一次性订阅，3 为长期订阅)',
        dataIndex: 'type',
      },
    ]
  }

  inintTable = () => {
    return [
      {
        title: 'id(类目id，查询公共库模版时需要)',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'name',
        dataIndex: 'name',
        key: 'name',
      },
    ]
  }

  initTempTable = () => {
    return [
      {
        title: 'priTmplId(模板 id)',
        dataIndex: 'priTmplId',
        ellipsis: true,
      },
      {
        title: 'title(模版标题)',
        dataIndex: 'title',
      },
      {
        title: 'content(模版内容)',
        dataIndex: 'content',
      },
      {
        title: 'example(模板内容示例)',
        dataIndex: 'example',
      },
      {
        title: 'type(模版类型，2 为一次性订阅，3 为长期订阅)',
        dataIndex: 'type',
        ellipsis: true,
      },
    ]
  }

  getCategory = () => {
    this.props.dispatch({type: 'subscribeMessage/getCategory'});
  }

  getTemplateList = () => {
    this.props.dispatch({type: 'subscribeMessage/getTemplateList'})
  }

  getPubTemplateKeyWordsById = () => {
    if (!this.state.tid) {
      message.error('请输入tid');
      return;
    }
    this.props.dispatch({type: 'subscribeMessage/getPubTemplateKeyWordsById', payload: this.state.tid});
  }

  getPubTemplateTitleList = () => {
    if (!this.state.ids) {
      message.error('请输入类目id');
      return;
    }
    this.props.dispatch({
      type: 'subscribeMessage/getPubTemplateTitleList',
      payload: this.state.ids
    })
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    categoryList: state.subscribeMessage.categoryList,
    templateList: state.subscribeMessage.templateList,
    templateTitleList: state.subscribeMessage.templateTitleList,
    templateKeyWords: state.subscribeMessage.templateKeyWords,
  }
}

export default connect(mapStateToProps)(addTemplatePage);