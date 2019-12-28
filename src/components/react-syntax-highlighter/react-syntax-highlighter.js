import React,  { PureComponent } from 'react';
import { connect } from 'dva';
import PropTypes from "prop-types";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
// 设置高亮样式
import { coy } from "react-syntax-highlighter/dist/esm/styles/prism";
// 设置高亮的语言
import { jsx, javascript, sass, scss } from "react-syntax-highlighter/dist/esm/languages/prism";





class CodeBlock extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      
    };

  }

  static propTypes = {
    value: PropTypes.string.isRequired,
    language: PropTypes.string
  };

  static defaultProps = {
    language: null
  };



  componentDidMount() {
    SyntaxHighlighter.registerLanguage("jsx", jsx);
    SyntaxHighlighter.registerLanguage("javascript", javascript);
  }
  render() {
    const { language, value } = this.props;
    return (
      <figure className="highlight">
        <SyntaxHighlighter language={language} style={coy}>
          {value}
        </SyntaxHighlighter>
      </figure>
    );
  }

}

const mapStateToProps = (state) => {
  return {

  }
}



export default connect(mapStateToProps)(CodeBlock);
