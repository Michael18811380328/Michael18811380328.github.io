// npm install keycode

// 导入 keycode 模块。
import keycode from `keycode`

function MarkHotkey(options) {
  // 将选项转换为接受一个 `key`。
  const { type, key, isAltKey = false } = options

  return {
    onKeyDown(event, data, change) {
      // 改变比较方式，使用按键名称进行比较。
      if (!event.metaKey || keycode(event.which) != key || event.altKey != isAltKey) return
      event.preventDefault()
      change.toggleMark(type)
      return true
    }
  }
}


// 使用清晰得多的按键名称而不是按键 code 值！
const plugins = [
  MarkHotkey({ key: 'b', type: 'bold' }),
  MarkHotkey({ key: 'c', type: 'code', isAltKey: true }),
  MarkHotkey({ key: 'i', type: 'italic' }),
  MarkHotkey({ key: 'd', type: 'strikethrough' }),
  MarkHotkey({ key: 'u', type: 'underline' })
]

class App extends React.Component {

  state = {
    state: initialState,
    schema: {
      marks: {
        bold: props => <strong>{props.children}</strong>,
        code: props => <code>{props.children}</code>,
        italic: props => <em>{props.children}</em>,
        strikethrough: props => <del>{props.children}</del>,
        underline: props => <u>{props.children}</u>,
      }
    }
  }

  onChange = ({ state }) => {
    this.setState({ state })
  }

  render() {
    return (
      <Editor
        plugins={plugins}
        schema={this.state.schema}
        state={this.state.state}
        onChange={this.onChange}
      />
    )
  }

}