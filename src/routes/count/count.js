import React from 'react';
import { connect } from 'dva';
import { Upload, Button, Icon, message } from 'antd';
import EditorComponent from '../../components/editor/editor';

import CodeBlock from '../../components/react-syntax-highlighter/react-syntax-highlighter';

// mark-down 
import ReactMarkdown from 'react-markdown';
import 'github-markdown-css';



const props = {
  name: 'file',
  // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  action: 'http://localhost:3000/api/web/user/related/person/upload',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    console.log('info', info);
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};


class CountComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorContent: '',
    };
  }

  render() {
    return(
      <div className="markdown-body">
        <EditorComponent getEditorContent={this.getEditorContent} />
        <ReactMarkdown 
          source={this.state.editorContent} 
          renderers={{
            code: CodeBlock,
            // heading: HeadingBlock
          }}
        />
        <div>
          <div>Highest Record: {this.props.count.record}</div>
          <div>{this.props.count.current}</div>
          <div>
            <button onClick={() => { this.props.dispatch({type: 'count/add', payload: {num: 1}}); }}>+</button>
          </div>
          <div>
            <Upload {...props}>
              <Button>
                <Icon type="upload" /> Click to Upload
              </Button>
            </Upload>
          </div>
        </div>
        <Button onClick={this.submit}>提交</Button>
        <div>
          <pre>
            <code>qwerqwrqwer</code>
          </pre>
          <p>
            
          </p>
          {/* <pre><code>https://fxy-admin.oss-cn-shanghai.aliyuncs.com/82a4cd4de4c120ab99e22850e40b1992.jpg</code></pre><p><br></p><p>&lt;b&gt;asdsad&lt;/b&gt;</p><p>qwefqfasdfasdfasdfeqwr<img src="https://fxy-admin.oss-cn-shanghai.aliyuncs.com/82a4cd4de4c120ab99e22850e40b1992.jpg" style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;; max-width: 100%;"></p> */}
        </div>
      </div>
    );
  }

  getEditorContent = (content) => {
    console.log('content', content);
    this.setState({
      editorContent: content
    });
  }

  submit = () => {
    console.log('editorState', this.state);
  }
}

const mapStateToProps = (state) => {
  return {
    count: state.count
  }
}



export default connect(mapStateToProps)(CountComponent);
