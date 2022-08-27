import React, { PureComponent } from 'react'
import { Toast, ToastHeader, ToastBody } from 'reactstrap';

export class MyToast extends PureComponent {
  render() {
    return (
      <Toast>
        <ToastHeader toggle={this.props.closeToast}>
          {this.props.title}
        </ToastHeader>
        <ToastBody>
          {this.props.body}
        </ToastBody>
      </Toast>
    )
  }
}

export default MyToast;
