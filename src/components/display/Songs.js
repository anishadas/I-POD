import React, { Component } from 'react'
import { myList } from '../List/List'

class Songs extends Component {
  constructor(props) {
    super(props)

    this.songDuration = "-:--";
    this.intervalId = null;
    
    // state for displaying time & scroll bar position
    this.state = {
      displayTime: "0:00",
      barVal: 0
    }
  }

  // updating song status on rotation
  componentDidMount() {
    this.songStatus(this.props.currentSong);
  }

  componentDidUpdate(prevProps) {
    console.log(prevProps)
    if (prevProps.songIndex !== this.props.songIndex) {
      const { currentSong } = this.props;
      this.songStatus(currentSong);
    }
  }

  songStatus = (currentSong) => {
    this.songDuration = this.formatTime(myList.Songs[this.props.songIndex].duration);
    
    this.setState({
      barVal: currentSong.currentTime,
      displayTime: this.formatTime(currentSong.currentTime)
    });

  
    this.intervalId ? clearInterval(this.intervalId) : this.intervalId = null;

    this.intervalId = setInterval(() => {
      if (Math.round(currentSong.currentTime) >= Math.round(currentSong.duration)) {

        clearInterval(this.intervalId);
        this.props.btnFunction.forwardBtn();
        return;
      }
      this.setState({
        barVal: currentSong.currentTime,
        displayTime: this.formatTime(currentSong.currentTime),
      });
    }, 1000);

  }

  // creating time formats based on song duration
  formatTime = (t) => {
    let min = Math.floor(t / 60);
    if (min < 10) {
      min = `0${min}`;
    }
    let second = Math.floor(t % 60);
    if (second < 10) {
      second = `0${second}`;
    }
    return `${min} : ${second}`;
  }

  // handling range input
  handleRange = (val) => {
    const { currentSong } = this.props;
    currentSong.currentTime = val;
    this.songStatus(currentSong);
  }

  render() {
    const song = myList.Songs[this.props.songIndex];
    
    return (
      <div className='music'>
        <div className='musicBg' style={{ backgroundImage: `url(${song.icon})` }}></div>
        <div className='musicDetails'>
          <div className='musicIcon'>
            <img src={song.icon} alt={song.title} />
          </div>
          <div className='musicName'>
            {song.title}
          </div>
        </div>
        <div className='musicBar'>
          <div className='range'>
            <input type='range' max={song.duration} value={this.state.barVal} onChange={(e) => this.handleRange(e.target.value)} />
          </div>
          <div className='timeDetails'>
            <div className='currentTime'>
              {this.state.displayTime}
            </div>
            <div className='duration'>
              {this.songDuration}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Songs
