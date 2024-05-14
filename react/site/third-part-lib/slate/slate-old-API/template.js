import React from 'react'
import { Editor } from 'slate-react'
import { State } from 'slate'

// initial state - paragraph
const initialState = State.fromJSON({
  document: {
    nodes: [
      {
        kind: 'block',
        type: 'paragraph',
        nodes: [
          {
            kind: 'text',
            ranges: [
              {
                text: 'test paragraph'
              }
            ]
          }
        ]
      }
    ]
  }
})

class App extends React.Component {
  state ={
    state: initialState
  }
  onChange = ({ state }) => {
    this.setState({ state })
    //setState function defined? 
  }
  //callback
  onKeyDown = (event, data, change) => {
    // 若按下的键不是 shift + "7" 则不返回 change。keycode?
    if (event.which != 55 || !event.shiftKey) {
      return
    }
    event.preventDefault();// 阻止插入 "&" 至编辑内容的行为。

    // 在当前光标位置插入 "and" 字符以更改 state。
    change.insertText('and');
    return true;
  }
  render(){
    return (
      <Editor state={ this.state.state} onChange={ this.onChange } onKeyDown={ this.onKeyDown } />
    )
  }
}