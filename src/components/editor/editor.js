import React from 'react';
import { connect } from 'dva';

import MdEditor from 'react-markdown-editor-lite'
import MarkdownIt from 'markdown-it'
import emoji from 'markdown-it-emoji'
import subscript from 'markdown-it-sub'
import superscript from 'markdown-it-sup'
import footnote from 'markdown-it-footnote'
import deflist from 'markdown-it-deflist'
import abbreviation from 'markdown-it-abbr'
import insert from 'markdown-it-ins'
import mark from 'markdown-it-mark'
import tasklists from 'markdown-it-task-lists'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-light.css'

import fetch from 'dva/fetch';

const MOCK_DATA = ""
class EditorComponent extends React.Component {
  mdEditor = null
  mdParser = null
  constructor(props) {
    super(props);
    this.state = {
      
    };

    this.mdParser = new MarkdownIt({
      html: true,
      linkify: true,
      typographer: true,
      highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return hljs.highlight(lang, str).value
          } catch (__) {}
        }    
        return '' // use external default escaping
      }
    })
    .use(emoji)
    .use(subscript)
    .use(superscript)
    .use(footnote)
    .use(deflist)
    .use(abbreviation)
    .use(insert)
    .use(mark)
    .use(tasklists, { enabled: this.taskLists });
    this.renderHTML = this.renderHTML.bind(this);
  }

  handleEditorChange = ({html, text}, event) => {
    this.props.getEditorContent(text);
  }

  handleImageUpload = (file, callback) => {
    const formData = new FormData();
    formData.append('file', file);

    fetch('http://localhost:3000/api/web/user/related/person/upload', {
      body: formData,
      method: 'POST',
    })
    .then(response => response.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      callback(response.url)
    });
  }

  onCustomImageUpload = () => {
    return new Promise((resolve, reject) => {
      const result = window.prompt('Please enter image url here')
      resolve({ url: result })
      console.log('result', result);
      // custom confirm message pseudo code
      // YourCustomDialog.open(() => {
      //   setTimeout(() => {
      //     // setTimeout 模拟oss异步上传图片
      //     const url = 'https://avatars0.githubusercontent.com/u/21263805?s=80&v=4'
      //     resolve({url: url, name: 'pic'})
      //   }, 1000)
      // })
    })
  }

  renderHTML(text) {
    // 模拟异步渲染Markdown
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.mdParser.render(text))
      }, 100)
    })
  }

  onBeforeClear = () => {
    return new Promise((resolve, reject) => {
      const result = window.confirm('Are you sure you want to clear your markdown :-)')
      const toClear = result ? true : false
      resolve(toClear)
      // custom confirm dialog pseudo code
      // YourCustomDialog.open(() => {
      //   // confirm callback
      //   resolve(true)
      // }, () => {
      //   // cancel callback
      //   resolve(false)
      // })
    })
  }
  handleGetMdValue = () => {   
    this.mdEditor && alert(this.mdEditor.getMdValue())      
  }
  handleGetHtmlValue = () => {    
    this.mdEditor && alert(this.mdEditor.getHtmlValue())
  }

  componentDidMount() {

  }
  render() {
    return(
      <div>
        <nav>
          <button onClick={this.handleGetMdValue} >getMdValue</button>  
          <button onClick={this.handleGetHtmlValue} >getHtmlValue</button>  
        </nav>
        <section style={{height: '500px'}}>
          <MdEditor 
            ref={node => this.mdEditor = node}
            value={MOCK_DATA}
            style={{height: '400px'}}
            renderHTML={this.renderHTML}
            config={{
              view: {
                menu: true,
                md: true,
                html: true,
                fullScreen: true
              },
              imageUrl: 'https://octodex.github.com/images/minion.png'
            }}
            onChange={this.handleEditorChange} 
            onImageUpload={this.handleImageUpload}
            // onCustomImageUpload={this.onCustomImageUpload} // if using onCustomImageUpload, onImageUpload will be not working
            onBeforeClear={this.onBeforeClear}
          />
        </section>                        
      </div>      
    );
  }

}

const mapStateToProps = (state) => {
  return {

  }
}



export default connect(mapStateToProps)(EditorComponent);
