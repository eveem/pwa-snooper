import React, { Component } from 'react'
import firebase from 'firebase'
import { Card } from 'antd'
import _ from 'lodash'

class Main extends Component {
  state = {
    data: []
  }

  componentDidMount() {
    firebase.database().ref().child('post').once('value', (snapshot) => {
      console.log(snapshot.val())
      this.setState({
        data: snapshot.val()
      });
    });
  }

  render() {
  	console.log(this.state.data.length)
    return (
      <div className="Table">
      	{
      		_.map(this.state.data, (row, i) => 
      			{
      				return <Row send={row} key={i} />
      			}
      		) 
      	}
      </div>
    );
  }
}

const Row = ({ send }) => (
  <div className="row">
    <Card>{ send.text }</Card>
  </div>
)

export default Main