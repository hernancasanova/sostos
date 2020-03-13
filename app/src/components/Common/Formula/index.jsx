import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loader from '../../../utils/loader';
import { mathMLToUrl } from '../../../utils/formulas';
/* global com, document */

const conversions = [
  {
    from: /=/g,
    to: '%3D'
  },
  {
    from: /:/g,
    to: '%3A'
  },
  {
    from: /\//g,
    to: '%2F'
  },
  {
    from: /-/g,
    to: '%2D'
  },
  {
    from: /&/g,
    to: '%26'
  },
  {
    from: /#/g,
    to: '%23'
  },
  {
    from: /;/g,
    to: '%3B'
  },
  {
    from: /\+/g,
    to: '%2B'
  }
];

class FormulaComponent extends Component {
  static fixImageUrl(url) {
    let urlFixed = url;
    conversions.forEach(conversion => {
      urlFixed = urlFixed.replace(conversion.from, conversion.to);
    });
    return urlFixed;
  }

  constructor(props) {
    super(props);
    this.state = {
      editor: false
    };
    this.getImage = this.getImage.bind(this);
    this.getMathML = this.getMathML.bind(this);
  }

  componentDidMount() {
    const loader = new Loader();
    const that = this;
    const { formula } = this.props;
    loader.require(['https://www.wiris.net/demo/editor/editor'], () => {
      const editor = com.wiris.jsEditor.JsEditor.newInstance({ language: 'en' });
      editor.insertInto(document.getElementById('editorContainer'));
      if (formula) editor.setMathML(formula);
      that.setState({
        editor
      });
    });
  }

  getMathML() {
    const { editor } = this.state;
    return editor.getMathML();
  }

  getImage() {
    const { editor } = this.state;
    return mathMLToUrl(editor.getMathML());
  }

  render() {
    return (
      <React.Fragment>
        <div style={{ width: '100%' }} id="editorContainer" />
      </React.Fragment>
    );
  }
}

FormulaComponent.defaultProps = {
  formula: false
};
FormulaComponent.propTypes = {
  formula: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
};

export default FormulaComponent;
