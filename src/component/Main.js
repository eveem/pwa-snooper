import React, { Component } from 'react'
import firebase from 'firebase'
import { Card, Icon } from 'antd'
import _ from 'lodash'
import moment from 'moment'

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
      <div className="parent">
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
  <div className="child">
    <Card>
    	<div>{ send.text }</div>
    	<div>{ moment(send.timestamp).startOf().fromNow() }</div>
    	// <div> <Icon type="smile-o" /> </div>
    </Card>
  </div>
)

export default Main