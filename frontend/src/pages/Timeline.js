import React, { Component } from 'react';
import socket from 'socket.io-client';

import './Timeline.css';
import twitterLogo from '../twitter.svg';

import api from '../services/api';

import Tweet from '../components/Tweet';

export default class Timeline extends Component {
  state = {
    newTweet: '',
    tweets: []
  }

  async componentDidMount() {
    this.subscribeToEvents();

    const response = await api.get('tweets');

    this.setState({ tweets: response.data });
  }

  handleInputChange = (e) => {
    this.setState({newTweet: e.target.value});
  }

  handleNewTweet = async (e) => {
    if (e.keyCode !== 13) return;

    const content = this.state.newTweet;
    const author = localStorage.getItem("@GoTwitter:username");

    await api.post('tweets', {author, content});

    this.setState({'newTweet': ''});
  }

  subscribeToEvents = () => {
    const io = socket('http://localhost:3000');

    io.on('tweet', data => {
      console.log(data)
      this.setState({ tweets: [data, ...this.state.tweets ]});
    })

    io.on('like', data => {
      this.setState({
        tweets: this.state.tweets.map(tweet => 
          tweet._id === data._id ? data : tweet)
      })
    })
  }

  render() {
    return (
      <div className="timeline-wrapper">
        <img src={twitterLogo} alt="GoTwitter" height={24} />

        <form>
          <textarea 
            value={this.state.newTweet}
            onChange={this.handleInputChange}
            onKeyDown={this.handleNewTweet}
            placeholder="O que está acontecendo agora?"
          ></textarea>
        </form>

        <ul className="tweet-list">
          { this.state.tweets.map(tweet => (
            <Tweet
            key={tweet._id}
            tweet={tweet}
            />
            ))}
        </ul>

      </div>
    )
  }
}
