import './App.css';
import Ipod from './components/Ipod';
import ZingTouch from 'zingtouch';
import React, { Component } from 'react'
import { myList } from './components/List/List';

class App extends Component {
  constructor(props) {
    super(props)

    this.wheelRef = React.createRef();
    this.distance = 0;
    this.sensitivity = 25;
    this.songIndex = 0;
    this.state = {
      selectedMenu: 0,
      selectedOptn: 0,
      menu: Object.values(myList)[0],
      menuQueue: [0],
      singlePage: false,
      currentSong: new Audio(myList.Songs[0].source)
    };
    this.btnFunction = {
      handleOkBtn: this.handleOkBtn,
      backMenu: this.backMenu,
      playPause: this.playPause,
      forwardBtn: this.forwardBtn,
      backwardBtn: this.backwardBtn
    }
  }
  componentDidMount() {
    const wheel = this.wheelRef.current;
    this.zingTouch = new ZingTouch.Region(wheel);
    this.rotatingGesture();
  }

  rotatingGesture = () => {
    const wheel = this.wheelRef.current;
    const gesture = new ZingTouch.Rotate();
    const menuArr = Object.values(myList)[this.state.selectedMenu];
    
    this.zingTouch.bind(wheel, gesture, (e) => {
      // reset
      if (Math.floor(e.detail.distanceFromOrigin) === 0) {
        this.distance = 0;
      }
      if (Math.abs(this.distance - e.detail.distanceFromOrigin) > this.sensitivity) {
        const menuName = Object.keys(myList)[this.state.selectedMenu];
        // console.log("name", menuName)
        let newState;
        if (this.distance - e.detail.distanceFromOrigin < 0) {
          newState = (this.state.selectedOptn + 1) % menuArr.length;
        } else {
          newState = (this.state.selectedOptn - 1 + menuArr.length) % menuArr.length
        }
        this.setState(prev => {
          if (menuName === "Songs") {
            this.songIndex = newState;
            return {
              currentSong: new Audio(myList.Songs[newState].source),
              selectedOptn: newState
            }
          } else {
            return { selectedOptn: newState }
          }
        });
        this.distance = e.detail.distanceFromOrigin;
      }
    })
  }

  handleOkBtn = (option) => {

    let newMenuQueue = this.state.menuQueue;
    // const len = newMenuQueue.length;

    const newSelectedMenu = Object.values(myList)[this.state.selectedMenu][option].id;
    
    newMenuQueue.push(newSelectedMenu);

    if (newSelectedMenu === this.state.selectedMenu) {
      this.setState({
        singlePage: true,
        menuQueue: newMenuQueue,
        selectedMenu: newSelectedMenu,
        selectedOptn: option,
        menu: Object.values(myList)[option],
      })
      return;
    }
    this.setState({
      singlePage: false,
      menuQueue: newMenuQueue,
      selectedMenu: newSelectedMenu,
      selectedOptn: 0,
      menuArr: Object.values(myList)[option]
    });

  }

  backMenu = () => {
    
    let newMenuQueue = this.state.menuQueue;

    if (newMenuQueue.length === 1 || !this.state.currentSong.paused) {
      alert(`sorry,no effect,${!this.state.currentSong.paused ? "Song is playing" : "you are on top"}`);
      return;
    }
    newMenuQueue.pop();
    const newSelectedMenu = newMenuQueue[newMenuQueue.length - 1];

    this.setState({
      selectedMenu: newSelectedMenu,
      selectedOptn: 0,
      menu: Object.values(myList)[newSelectedMenu],
      menuQueue: newMenuQueue,
      singlePage: false
    })
  }

  playPause = () => {
    if (this.state.currentSong.paused) {
      this.state.currentSong.play();
    } else {
      this.state.currentSong.pause();
    }
  }

  forwardBtn = () => {
    this.state.currentSong.pause();
    this.songIndex = (++this.songIndex % myList.Songs.length);
    const newCurrentSong = new Audio(myList.Songs[this.songIndex].source);
    newCurrentSong.play();

    this.setState({
      currentSong: newCurrentSong,
    })
  }

  backwardBtn = () => {
    this.state.currentSong.pause();
    this.songIndex = this.songIndex === 0 ? myList.Songs.length - 1 : --this.songIndex;
    const newCurrentSong = new Audio(myList.Songs[this.songIndex].source);
    newCurrentSong.play();

    this.setState({
      currentSong: newCurrentSong,
    })
  }

  render() {
    return (
      <div className='App'>
        <Ipod
          wheelRef={this.wheelRef}
          songIndex={this.songIndex}

          selectedMenu={this.state.selectedMenu}
          selectedOptn={this.state.selectedOptn}
          singlePage={this.state.singlePage}
          currentSong={this.state.currentSong}

          btnFunction={this.btnFunction} />
      </div>
    )
  }
}

export default App

