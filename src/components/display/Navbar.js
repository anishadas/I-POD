import React from 'react'

function Navbar() {
    let date = new Date();
    let time = date.toLocaleString([], {
        hour: '2-digit',
        minute: '2-digit'
    });
  return (
      <div className='navbar'>
          <span>{time}</span>
          <div>
              <span><i class="fa-solid fa-wifi"></i></span>
              <span><i class="fa-solid fa-battery-three-quarters"></i></span>
          </div>
    </div>
  )
}

export default Navbar
