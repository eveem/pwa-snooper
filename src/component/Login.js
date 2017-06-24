import React, { Component } from 'react'

class Login extends Component {
  state = {
    count: 0
  }
  render() {
    return (
      <div>
        <h1>{ this.state.count }</h1>
        <button onClick={() => {
          this.setState({
            count: this.state.count + 1
          })
        }}>add</button>
      </div>
    )
  }
}

export default Login