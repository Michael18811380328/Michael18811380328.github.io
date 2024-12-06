// 需求分析：段落的样式和代码块的样式不同。不同代码块设计不同的样式。通过children进行传值。

function CodeNode(props) {
  return <pre {...props.attributes}><code>{props.children}</code></pre>
}

class App extends React.Component {

  state = {
    state: initialState,
    schema: {
      nodes: {
        code: CodeNode
      }
    }
  }

  onChange = ({ state }) => {
    this.setState({ state })
  }

  onKeyDown = (event, data, change) => {
    if (event.which != 67 || !event.metaKey || !event.altKey) return

    event.preventDefault()

    // 判断当前选中 block 是否为代码块。
    const isCode = change.state.blocks.some(block => block.type == 'code')

    // 根据 `isCode` 设置 block 类型。
    change.setBlock(isCode ? 'paragraph' : 'code')
    return true
  }

  render() {
    return (
      <Editor
        schema={this.state.schema}
        state={this.state.state}
        onChange={this.onChange}
        onKeyDown={this.onKeyDown}
      />
    )
  }

}