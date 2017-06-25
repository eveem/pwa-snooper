import React, { Component } from 'react'
import TopBar from './TopBar'
import firebase from 'firebase'
import moment from 'moment'
import { Card, Icon } from 'antd';
import _ from 'lodash'

export default class Profile extends Component {
  state = {
    data: {}
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      firebase.database().ref().child('post').once('value', (snapshot) => {
        this.setState({
          data: snapshot.val(),
          user: user.uid
        });
      });
    })
  }

  render() {
    return (
      <div>
        <TopBar path="profile" />
        <div className="profileContainer">
          <Card className="timeline">
            {
                _.map(this.state.data, post => 
                  post.created_by === this.state.user ?
                  <div className="tag">
                    <div>
                      <Icon type="message" />
                      <p>{ post.text }</p>
                    </div>
                    <p className="time">{ moment(post.timestamp).startOf().fromNow() }</p>
                  </div> : null
                )
            }
          </Card>
        </div>
      </div>
    )
  }
}