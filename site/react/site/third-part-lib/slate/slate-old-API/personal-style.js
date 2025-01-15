function BoldMark(props) {
  return <strong>{props.children}</strong>
}

class App extends React.Component {

  state = {
    state: initialState,
    schema: {
      nodes: {
        code: CodeNode
      },
      // 添加 "bold" mark 到 schema 中…
      marks: {
        bold: BoldMark
      }
    }
  }

  onChange = ({ state }) => {
    this.setState({ state })
  }

  onKeyDown = (event, data, change) => {
    if (!event.metaKey) return

    switch (event.which) {
      case 66: {
        event.preventDefault()
        change.toggleMark('bold')
        return true
      }
      case 67: {
        if (!event.altKey) return
        const isCode = change.state.blocks.some(block => block.type == 'code')
        event.preventDefault()
        state.setBlock(isCode ? 'paragraph' : 'code')
        return true
      }
    }
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