import React, { Component } from 'react'
import firebase from 'firebase'
import { Card, Icon, Button } from 'antd'
import _ from 'lodash'
import moment from 'moment'
// import { connect } from 'react-firebase'

class Main extends Component {
  state = {
    data: [],
  }

  likeLog = (like_id, timestamp) => {
  	firebase.database().ref().child('post').push({
  		like_id: firebase.database().ref().child('post').push().key,
  		timestamp: firebase.database.ServerValue.TIMESTAMP
  	})
  }

  onclick = () => {
  	this.likeLog ()
  }

  componentDidMount() {
    firebase.database().ref().child('post').once('value', (snapshot) => {
      // console.log(snapshot.val())
      this.setState({
        data: snapshot.val()
      });
    });
  }

  render() {
  	// console.log(this.state.data.length)
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
    	<div className="top-div">{ send.text }</div>
    	<div className="bot-div">
			<Button onClick={this.onclick}/>
    		{ moment(send.timestamp).startOf().fromNow() }
    	</div>
    </Card>
  </div>
)

export default Main