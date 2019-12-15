import React from 'react';
import { connect } from 'dva';
import './login.css';
import { Form, Icon, Input, Button, message } from 'antd';

class Login extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    console.log('handleSubmit');
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({type: 'login/login', payload: values})
        .then((result) => {
          result.login === 'success' ?  message.success('登录成功'): message.error('用户不存在')
        });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return(
      <div className='login'>
        <div className="login_content"> 
          <Form onSubmit={this.handleSubmit}>
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Username"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Password"
                />,
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLogin: state.login.isLogin,
    loginSuccess: state.login.loginSuccess,
    message: state.login.message
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);

export default connect(mapStateToProps)(WrappedNormalLoginForm);