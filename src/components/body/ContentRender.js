import { Component } from 'react';
import { Remarkable } from 'remarkable';
import mermaid from 'mermaid';
import hljs from 'highlight.js';
import ReactHtmlParser from 'react-html-parser';
import PropTypes from 'prop-types';

class ContentRender extends Component {
  state = {
    md: null,
  };

  componentDidMount() {
    const { isHtml } = this.props;
    this.setState({
      md: new Remarkable('full', {
        html: isHtml, // Enable HTML tags in source
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

  shouldComponentUpdate(nextProps) {
    const { isHtml } = this.props;
    if (nextProps.isHtml !== isHtml) {
      const { md } = this.state;
      md.set({ html: nextProps.isHtml });
    }
    return true;
  }

  render() {
    const { md } = this.state;
    const { data } = this.props;
    return md && ReactHtmlParser(md.render(data));
  }
}

ContentRender.propTypes = {
  data: PropTypes.string,
  isHtml: PropTypes.bool,
};

ContentRender.defaultProps = {
  data: '',
  isHtml: false,
};

export default ContentRender;
