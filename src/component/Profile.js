import React, { Component } from 'react'
import TopBar from './TopBar'
import firebase from 'firebase'
import { Timeline, Card } from 'antd';
import _ from 'lodash'

export default class Profile extends Component {
  state = {
    data: {}
  }

  componentDidMount() {
    // firebase.auth().onAuthStateChanged(user => {
      firebase.database().ref().child('post').once('value', (snapshot) => {
        this.setState({
          data: snapshot.val(),
          // user: user.uid
        });
      });
    // })
  }

  render() {
    return (
      <div>
        <TopBar path="profile" />
        <div className="profileContainer">
          <Card className="timeline">
            <Timeline>
              <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
            </Timeline>
          </Card>
        </div>
      </div>
    )
  }
}