import React, { Component } from 'react'
import { Input } from 'antd'
import firebase from 'firebase'
import { connect } from 'react-firebase'

firebase.initializeApp({
  databaseURL: 'https://pwa-crossword.firebaseio.com/'
})

const Counter = ({ value, setValue }) => (
  <div>
    <button onClick={() => setValue(value - 1)}>-</button>
    <span>{value}</span>
    <button onClick={() => setValue(value + 1)}>+</button>
  </div>
)
 
export default connect((props, ref) => ({
  value: 'counterValue',
  setValue: value => ref('counterValue').set(value)
}))(Counter)

// class Create extends Component {
//   state = { 
//   	user_id: '',
//   	text: ''}

//   onclick = () => {
//   	this.setState({ text: this.state.text })
//   }

//   handleChange = e => {
//     this.setState({ text: e.target.value })
//     console.log(e.target.value)
//   }

//   render() {
//     return (
//       <div>
//         <h1>Create</h1>
//         <Input type="textarea" value={this.state.text} onChange={this.handleChange} placeholder="Tell me your secret." />
//         <button onClick={this.onclick}>click</button>
//       </div>
//     )
//   }
// }

// export default Create