// These do not use ES6 imports, because the evaluated code requires un-mangled
// variable names.
import { transform } from 'babel-standalone';
import CodeExample from './CodeExample';

/* eslint-disable */
const classNames = require('classnames');
const React = require('react');
const PropTypes = require('prop-types');
const ReactDOM = require('react-dom');

// Keep these in sync with src/index.js.
const Accordion = require('../../components/Accordion');
const Alert = require('../../components/Alert');
const Badge = require('../../components/Badge');
const Breadcrumb = require('../../components/Breadcrumb');
const Button = require('../../components/Button');
const ButtonGroup = require('../../components/ButtonGroup');
const ButtonToolbar = require('../../components/ButtonToolbar');
const Carousel = require('../../components/Carousel');
const CarouselItem = require('../../components/CarouselItem');
const Checkbox = require('../../components/Checkbox');
const Clearfix = require('../../components/Clearfix');
const Col = require('../../components/Col');
const Collapse = require('../../components/Collapse');
const ControlLabel = require('../../components/ControlLabel');
const Dropdown = require('../../components/Dropdown');
const DropdownButton = require('../../components/DropdownButton');
const Fade = require('../../components/Fade');
const Form = require('../../components/Form');
const FormControl = require('../../components/FormControl');
const FormGroup = require('../../components/FormGroup');
const Glyphicon = require('../../components/Glyphicon');
const Grid = require('../../components/Grid');
const HelpBlock = require('../../components/HelpBlock');
const Image = require('../../components/Image');
const InputGroup = require('../../components/InputGroup');
const Jumbotron = require('../../components/Jumbotron');
const Label = require('../../components/Label');
const ListGroup = require('../../components/ListGroup');
const ListGroupItem = require('../../components/ListGroupItem');
const Media = require('../../components/Media');
const MenuItem = require('../../components/MenuItem');
const Modal = require('../../components/Modal');
const Nav = require('../../components/Nav');
const Navbar = require('../../components/Navbar');
const NavbarBrand = require('../../components/NavbarBrand');
const NavDropdown = require('../../components/NavDropdown');
const NavItem = require('../../components/NavItem');
const Overlay = require('../../components/Overlay');
const OverlayTrigger = require('../../components/OverlayTrigger');
const PageHeader = require('../../components/PageHeader');
const Pager = require('../../components/Pager');
const Pagination = require('../../components/Pagination');
const Panel = require('../../components/Panel');
const PanelGroup = require('../../components/PanelGroup');
const Popover = require('../../components/Popover');
const ProgressBar = require('../../components/ProgressBar');
const Radio = require('../../components/Radio');
const ResponsiveEmbed = require('../../components/ResponsiveEmbed');
const Row = require('../../components/Row');
const SafeAnchor = require('../../components/SafeAnchor');
const SplitButton = require('../../components/SplitButton');
const Tab = require('../../components/Tab');
const TabContainer = require('../../components/TabContainer');
const TabContent = require('../../components/TabContent');
const Table = require('../../components/Table');
const TabPane = require('../../components/TabPane');
const Tabs = require('../../components/Tabs');
const Thumbnail = require('../../components/Thumbnail');
const ToggleButton = require('../../components/ToggleButton');
const ToggleButtonGroup = require('../../components/ToggleButtonGroup');
const Tooltip = require('../../components/Tooltip');
const Well = require('../../components/Well');

const bootstrapUtils = require('../../components/utils/bootstrapUtils');

/* eslint-enable */


const IS_MOBILE = typeof navigator !== 'undefined' && (
  navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/webOS/i)
    || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPad/i)
    || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i)
    || navigator.userAgent.match(/Windows Phone/i)
);

class CodeMirrorEditor extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    if (IS_MOBILE || CodeMirror === undefined) {
      return;
    }

    this.editor = CodeMirror.fromTextArea(this.refs.editor, {
      mode: 'jsx',
      lineNumbers: false,
      lineWrapping: false,
      matchBrackets: true,
      tabSize: 2,
      theme: 'solarized light',
      readOnly: this.props.readOnly,
    });
    this.editor.on('change', this.handleChange);
  }

  componentDidUpdate() {
    if (this.props.readOnly) {
      this.editor.setValue(this.props.codeText);
    }
  }

  handleChange() {
    if (!this.props.readOnly && this.props.onChange) {
      this.props.onChange(this.editor.getValue());
    }
  }

  render() {
    // wrap in a div to fully contain CodeMirror
    let editor;

    if (IS_MOBILE) {
      editor = (
        <CodeExample
          mode="jsx"
          codeText={this.props.codeText}
        />
      );
    } else {
      editor = <textarea ref="editor" defaultValue={this.props.codeText} />;
    }

    return (
      <div style={this.props.style} className={this.props.className}>
        {editor}
      </div>
    );
  }
}

const selfCleaningTimeout = {
  componentDidUpdate() {
    clearTimeout(this.timeoutID);
  },

  updateTimeout(...args) {
    clearTimeout(this.timeoutID);
    this.timeoutID = setTimeout(...args);
  },
};

const ReactPlayground = React.createClass({
  propTypes: {
    codeText: PropTypes.string.isRequired,
    transformer: PropTypes.func,
  },

  mixins: [selfCleaningTimeout],

  getDefaultProps() {
    return {
      transformer(code) {
        return transform(code, {
          // TODO: Use preset options once babel-standalone v6.13 is released.
          presets: ['es2015-loose', 'react', 'stage-1'],
        }).code;
      },
    };
  },

  getInitialState() {
    return {
      code: this.props.codeText,
      codeChanged: false,
      showCode: false,
    };
  },

  componentWillMount() {
    // For the initial render, we can hijack React.render to intercept the
    // example element and render it normally. This is safe because it's code
    // that we supply, so we can ensure ahead of time that it won't throw an
    // exception while rendering.
    const originalRender = ReactDOM.render;
    ReactDOM.render = (element) => {
      this._initialExample = element;
      return element;
    };

    // Stub out mountNode for the example code.
    const mountNode = null; // eslint-disable-line no-unused-vars

    try {
      const compiledCode = this.props.transformer(this.props.codeText);

      /* eslint-disable */
      eval(compiledCode);
      /* eslint-enable */
    } finally {
      ReactDOM.render = originalRender;
    }
  },

  componentWillUnmount() {
    this.clearExample();
  },

  clearExample() {
    if (!this.state.codeChanged) {
      return null;
    }

    const mountNode = this.refs.mount;
    try {
      ReactDOM.unmountComponentAtNode(mountNode);
    } catch (e) {
      console.error(e); // eslint-disable-line no-console
    }

    return mountNode;
  },

  executeCode() {
    const mountNode = this.clearExample();

    let compiledCode = null;
    try {
      compiledCode = this.props.transformer(this.state.code);

      /* eslint-disable */
      eval(compiledCode);
      /* eslint-enable */
    } catch (err) {
      if (compiledCode !== null) {
        console.log(err, compiledCode); // eslint-disable-line no-console
      } else {
        console.log(err); // eslint-disable-line no-console
      }

      this.updateTimeout(
        () => {
          ReactDOM.render(
            <Alert bsStyle="danger">
              {err.toString()}
            </Alert>,
            mountNode,
          );
        },
        500,
      );
    }
  },

  handleCodeChange(value) {
    this.setState(
      { code: value, codeChanged: true },
      this.executeCode,
    );
  },

  handleCodeModeToggle() {
    this.setState({
      showCode: !this.state.showCode,
    });
  },

  renderEditor() {
    if (!this.state.showCode) {
      return null;
    }

    return (
      <CodeMirrorEditor
        key="jsx"
        onChange={this.handleCodeChange}
        className="highlight"
        codeText={this.state.code}
      />
    );
  },

  renderExample() {
    let example;
    if (this.state.codeChanged) {
      example = (
        <div ref="mount" />
      );
    } else {
      example = (
        <div>{this._initialExample}</div>
      );
    }

    return (
      <div className={classNames('bs-example', this.props.exampleClassName)}>
        {example}
      </div>
    );
  },

  renderToggle() {
    return (
      <SafeAnchor
        className={classNames('code-toggle', { open: this.state.showCode })}
        onClick={this.handleCodeModeToggle}
      >
        {this.state.showCode ? 'hide code' : 'show code'}
      </SafeAnchor>
    );
  },

  render() {
    return (
      <div className="playground">
        {this.renderExample()}

        {this.renderEditor()}
        {this.renderToggle()}
      </div>
    );
  },
});

export default ReactPlayground;
