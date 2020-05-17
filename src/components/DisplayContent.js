import React, { Component } from 'react';
import hljs from 'highlight.js';
import { Remarkable } from 'remarkable';
import ReactHtmlParser from 'react-html-parser';

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
    const md = new Remarkable('full', {
      html: true, // Enable HTML tags in source
      xhtmlOut: false, // Use '/' to close single tags (<br />)
      breaks: false, // Convert '\n' in paragraphs into <br>
      langPrefix: 'language-', // CSS language prefix for fenced blocks
      // linkify: true, // autoconvert URL-like texts to links
      linkTarget: '', // set target to open link in

      // Enable some language-neutral replacements + quotes beautification
      typographer: false,

      // Double + single quotes replacement pairs, when typographer enabled,
      // and smartquotes on. Set doubles to '«»' for Russian, '„“' for German.
      quotes: '“”‘’',

      // Highlighter function. Should return escaped HTML,
      // or '' if input not changed
      highlight(str, lang) {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return hljs.highlight(lang, str).value;
            // eslint-disable-next-line no-empty
          } catch (__) {}
        }

        try {
          return hljs.highlightAuto(str).value;
          // eslint-disable-next-line no-empty
        } catch (__) {}

        return ''; // use external default escaping
      },
    });
    return <>{ReactHtmlParser(md.render(this.props.page.data))}</>;
  }
}

export default DisplayContent;