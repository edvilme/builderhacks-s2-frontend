import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { hop } from '@onehop/client';
import Chat from './Chat';
import { hopServer } from './hop-server';


// Init hop client
hop.init({
	projectId: "project_NTAzNjE5MjU4MTQ1MDU5ODg"// replace with your project ID
});


class App extends React.Component {
  constructor(){
    super();
    const searchParams = new URLSearchParams(window.location.search);
    this.roomIdInitial = searchParams.get('room');
    this.state = {
      safeRoomId: this.roomIdInitial
    }
    // If not set
    if(!this.roomIdInitial){
      this.roomIdInitial = Math.random().toString(16).substring(5);
      searchParams.set('room', this.roomIdInitial);
      window.location.search = searchParams.toString();
    }
  }
  async componentDidMount(){
    // Get username
    if(!localStorage.getItem("username")){
      localStorage.setItem("username", prompt("Please enter your username"))
    }
    // Get channel
    try{
      await hopServer.channels.get(this.roomIdInitial);
    } catch(e) {
      if(e.status == 404){
        try{
          await hopServer.channels.create('unprotected', this.roomIdInitial)
          this.forceUpdate();
        } catch(e){
          console.log(e)
          //this.setState({safeRoomId: null});
          return;
        }
      }
    }
    // Send joined message
    await hopServer.channels.publishMessage(this.state.safeRoomId, 'USER_MESSAGE', {
      user: localStorage.getItem("username"),
      type: "join"
    });
  }
  render(){
    return <Chat roomId={this.state.safeRoomId}></Chat>
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App></App>
);

