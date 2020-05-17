import React, { Component } from 'react';
import hljs from 'highlight.js';

class DisplayContent extends Component {
  componentDidMount() {
    this.updateCodeSyntaxHighlighting();
  }

  componentDidUpdate() {
    this.updateCodeSyntaxHighlighting();
  }

  updateCodeSyntaxHighlighting = () => {
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightBlock(block);
    });
  };

  render() {
    return (
      <pre>
        <code className="javascript">{this.props.page.data}</code>
      </pre>
    );
  }
}

export default DisplayContent;
