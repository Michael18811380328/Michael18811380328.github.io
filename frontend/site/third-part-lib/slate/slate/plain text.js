import React from 'react'
import Plain from 'slate-plain-serializer'
import { Editor } from 'slate-react'

class PlainText extends React.Component {

  state = {
    value: Plain.deserialize(
      'This is editable plain text, just like a <textarea>!'
    ),
  }
  onChange = ({ value }) => {
    this.setState({ value })
  }
  render() {
    return (
      <Editor
        placeholder="Michael test plain slate"
        value={this.state.value}
        onChange={this.onChange}
      />
    )
  }
}

export default PlainText