const React = require('react');
const ReactDOM = require('react-dom');
const PropTypes = require('prop-types');
const className = require('classnames');
const debounce = require('lodash.debounce');
const isEqual = require('lodash.isequal');
const createReactClass = require('create-react-class');

/**
 * [normalizeLineEndings 处理文本内容]
 * @author Michael An
 * @DateTime 2019-02-21T17:54:25+0800
 * @param    {字符串}     如果输入的是空内容，直接返回原始数据；
 * @return   {字符串}     使用正则替代输入字符串中的行结尾（\r 回车 \n 换行 => 换行）。
 */
function normalizeLineEndings (str) {
  if (!str) return str;
  return str.replace(/\r\n|\r/g, '\n');
}


const CodeMirror = createReactClass({

  // 参数数据类型验证
  propTypes: {
    autoFocus: PropTypes.bool,
    className: PropTypes.any,
    codeMirrorInstance: PropTypes.func,
    defaultValue: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    onCursorActivity: PropTypes.func,
    onFocusChange: PropTypes.func,
    onScroll: PropTypes.func,
    options: PropTypes.object,
    path: PropTypes.string,
    value: PropTypes.string,
    preserveScrollPosition: PropTypes.bool,
  },

  // 设置默认的属性值
  getDefaultProps () {
    return {
      preserveScrollPosition: false,
    };
  },

  // 获取 CodeMirror 实例
  getCodeMirrorInstance () {
    return this.props.codeMirrorInstance || require('codemirror');
  },

  // 设置初始值（在ES6中，直接使用 constructor this.state = {} 设置初始值）
  getInitialState () {
    return {
      isFocused: false,
    };
  },

  componentWillMount () {
    // lodash debounce 函数防抖 避免频繁调用函数
    this.componentWillReceiveProps = debounce(this.componentWillReceiveProps, 0);
    if (this.props.path) {
      console.error('Warning: react-codemirror: the `path` prop has been changed to `name`');
    }
  },

  componentDidMount () {
    // 获取初始化 Codemirror 实例
    const codeMirrorInstance = this.getCodeMirrorInstance();

    // 设置 codemirror 内容(textarea文本内容，传入的参数直接设置)
    this.codeMirror = codeMirrorInstance.fromTextArea(this.textareaNode, this.props.options);

    // 绑定事件处理函数
    this.codeMirror.on('change', this.codemirrorValueChanged);
    this.codeMirror.on('cursorActivity', this.cursorActivity);
    this.codeMirror.on('focus', this.focusChanged.bind(this, true));
    this.codeMirror.on('blur', this.focusChanged.bind(this, false));
    this.codeMirror.on('scroll', this.scrollChanged);

    // 设置内部的值（默认值；传入的值；空）
    this.codeMirror.setValue(this.props.defaultValue || this.props.value || '');
  },

  componentWillUnmount () {
    // is there a lighter-weight way to remove the cm instance?
    // 是否有更轻量级方法来移除 codemirror 实例？
    if (this.codeMirror) {
      this.codeMirror.toTextArea();
    }
  },

  componentWillReceiveProps: function (nextProps) {
    // 如果新传入 props 改变值不为空，且不等于之前的值
    if (this.codeMirror && nextProps.value !== undefined && nextProps.value !== this.props.value && normalizeLineEndings(this.codeMirror.getValue()) !== normalizeLineEndings(nextProps.value)) {
      if (this.props.preserveScrollPosition) {
        // 设置新的值
        var prevScrollPosition = this.codeMirror.getScrollInfo();
        this.codeMirror.setValue(nextProps.value);
        this.codeMirror.scrollTo(prevScrollPosition.left, prevScrollPosition.top);
      } else {
        this.codeMirror.setValue(nextProps.value);
      }
    }
    // 如果传入的 options 设置，是 object
    if (typeof nextProps.options === 'object') {
      for (let optionName in nextProps.options) {
        // 遍历设置参数
        if (nextProps.options.hasOwnProperty(optionName)) { 
          // 设置改变的属性（例如 mode）
          this.setOptionIfChanged(optionName, nextProps.options[optionName]);
        }
      }
    }

  },

  setOptionIfChanged (optionName, newValue) {
    // 如果改变配置，调用这个参数
    const oldValue = this.codeMirror.getOption(optionName);
    // 如果旧配置不等于新配置，再设置新配置
    if (!isEqual(oldValue, newValue)) {
      this.codeMirror.setOption(optionName, newValue);
    }
  },

  // 获取 CodeMirror 实例
  getCodeMirror () {
    return this.codeMirror;
  },

  // 获取焦点
  focus () {
    if (this.codeMirror) {
      this.codeMirror.focus();
    }
  },

  focusChanged (focused) {
    // 获取焦点或者失去焦点，设置界面state
    this.setState({
      isFocused: focused,
    });
    this.props.onFocusChange && this.props.onFocusChange(focused);
  },

  cursorActivity (cm) {
    // 处理鼠标活动（传入函数，并执行）这个思路写的很好；
    this.props.onCursorActivity && this.props.onCursorActivity(cm);
  },

  scrollChanged (cm) {
    // 界面滚动后执行回调函数
    this.props.onScroll && this.props.onScroll(cm.getScrollInfo());
  },

  codemirrorValueChanged (doc, change) {
    // 当 codemirror 内容变化时，执行函数；调用回调函数，将原始值和改变情况返回回调函数
    if (this.props.onChange && change.origin !== 'setValue') {
      this.props.onChange(doc.getValue(), change);
    }
  },

  render () {
    const editorClassName = className(
      'ReactCodeMirror',
      this.state.isFocused ? 'ReactCodeMirror--focused' : null,
      this.props.className
    );
    return (
      <div className={editorClassName}>
        <textarea
          ref={ref => this.textareaNode = ref}
          name={this.props.name || this.props.path}
          defaultValue={this.props.value}
          autoComplete="off"
          autoFocus={this.props.autoFocus}
        />
      </div>
    );
  },
});

module.exports = CodeMirror;
