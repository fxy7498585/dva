import React from 'react';
import { connect } from 'dva';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;





class SliderComponent extends React.Component {
  rootSubmenuKeys = ['blog', 'subscribe', 'sub3'];
  constructor(props) {
    super(props);
    this.state = {
      openKeys: ['blog'],
    };
  }

  onOpenChange = openKeys => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
      this.props.dispatch({type: 'slider/setOpenKey', payload: openKeys })
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      }, () => {
        this.props.dispatch({type: 'slider/setOpenKey', payload: this.state.openKeys })
      });
    }
  };

  onClickMenuItem = ({ item, key, keyPath, domEvent }) => {
    this.props.dispatch({type: 'slider/changeSelectKy', payload: key});
    this.props.history.push(key);
  }
  

  render() {
    return(
      <Layout>
        <Header className="header">
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Layout style={{ padding: '24px 0', background: '#fff' }}>
            <Sider width={200} style={{ background: '#fff' }} onCollapse={(collapsed, type) => {console.log(collapsed)}}>
              <Menu
                mode="inline"
                openKeys={this.props.openKeys}
                onOpenChange={this.onOpenChange}
                defaultSelectedKeys={this.props.defaultSelectedKeys}
                style={{ height: '100%' }}
                onClick={this.onClickMenuItem}
              >
                <SubMenu
                  key="blog"
                  title={
                    <span>
                      <Icon type="user" />
                      博客信息
                    </span>
                  }
                >
                  <Menu.Item key="/">文章列表</Menu.Item>
                  <Menu.Item key="/photo">图片列表</Menu.Item>
                  <Menu.Item key="3">option3</Menu.Item>
                  <Menu.Item key="4">option4</Menu.Item>
                </SubMenu>
                <SubMenu
                  key="subscribe"
                  title={
                    <span>
                      <Icon type="laptop" />
                      订阅消息
                    </span>
                  }
                >
                  <Menu.Item key="/addTemplate">添加模板</Menu.Item>
                  <Menu.Item key="6">option6</Menu.Item>
                  <Menu.Item key="7">option7</Menu.Item>
                  <Menu.Item key="8">option8</Menu.Item>
                </SubMenu>
                <SubMenu
                  key="sub3"
                  title={
                    <span>
                      <Icon type="notification" />
                      subnav 3
                    </span>
                  }
                >
                  <Menu.Item key="9">option9</Menu.Item>
                  <Menu.Item key="10">option10</Menu.Item>
                  <Menu.Item key="11">option11</Menu.Item>
                  <Menu.Item key="12">option12</Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
              {this.props.children}
            </Content>
          </Layout>
        </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
    );
  }


  navigationToCount = () => {
    this.props.history.push('/count');
  }
}

const mapStateToProps = (state) => {
  return {
    defaultSelectedKeys: state.slider.defaultSelectedKeys,
    openKeys: state.slider.openKeys,
  }
}



export default connect(mapStateToProps)(SliderComponent);