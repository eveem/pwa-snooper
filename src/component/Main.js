import React, { Component } from 'react'
import firebase from 'firebase'
import { Card, Icon } from 'antd'
import _ from 'lodash'
import moment from 'moment'
import TopBar from './TopBar'
// import { connect } from 'react-firebase'

class Main extends Component {
  state = {
    data: null,
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
      this.setState({
        data: snapshot.val()
      });
    });
  }

  render() {
    return (
      <div>
        <TopBar path="main" />
        {
          <div className="parent">
            {
              _.map(this.state.data, (row, i) => 
                {
                  return <Row send={row} key={i} />
                }
              ) 
            }
          </div>
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
			<Icon onClick={this.onclick} type="star-o" className="icon"/>
    		{ moment(send.timestamp).startOf().fromNow() }
    	</div>
    </Card>
  </div>
)

export default Main