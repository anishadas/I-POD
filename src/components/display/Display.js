import React from 'react'
import Navbar from './Navbar'
import Menu from './Menu'
import { myList } from '../List/List';
import Songs from './Songs';
import SinglePage from './SinglePage';

const Display = (props) => {
  const { singlePage, selectedMenu,currentSong } = props;
  const menuName = Object.keys(myList)[selectedMenu];
  // console.log("song",currentSong.paused)
  const isSongMenu = (menuName === 'Songs' && singlePage);
  console.log("menuname", isSongMenu,singlePage);
  return (
    <div className='display'>
      <div className='display-container'>
        <Navbar />
        {!currentSong.paused || isSongMenu ? <Songs {...props} /> : !singlePage ? <Menu {...props} /> : <SinglePage {...props} />}
      </div>

    </div>
  )
}
export default Display;