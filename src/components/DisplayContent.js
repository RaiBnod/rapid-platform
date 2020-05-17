import React, { Component } from 'react';
import hljs from 'highlight.js';
import { Remarkable } from 'remarkable';
import mermaid from 'mermaid';
import ReactHtmlParser from 'react-html-parser';
import PropTypes from 'prop-types';

class DisplayContent extends Component {
  state = {
    md: null,
  };

  componentDidMount() {
    this.setState({
      md: new Remarkable('full', {
        html: true, // Enable HTML tags in source
        xhtmlOut: false, // Use '/' to close single tags (<br />)
        breaks: false, // Convert '\n' in paragraphs into <br>
        langPrefix: 'language-', // CSS language prefix for fenced blocks
        linkTarget: '', // set target to open link in

        // Enable some language-neutral replacements + quotes beautification
        typographer: false,

        // Double + single quotes replacement pairs, when typographer enabled,
        // and smartquotes on. Set doubles to '«»' for Russian, '„“' for German.
        quotes: '“”‘’',

        // Highlighter function. Should return escaped HTML,
        // or '' if input not changed
        highlight(str, lang) {
          if (lang === 'mermaid') {
            try {
              return mermaid.mermaidAPI.render('divs', str);
              // eslint-disable-next-line no-empty
            } catch (__) {}
          }
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
      }),
    });
  }

  render() {
    const { md } = this.state;
    const {
      page: { data },
    } = this.props;
    return <>{md && ReactHtmlParser(md.render(data))}</>;
  }
}

DisplayContent.propTypes = {
  page: PropTypes.shape({
    data: PropTypes.string,
  }).isRequired,
};

export default DisplayContent;
