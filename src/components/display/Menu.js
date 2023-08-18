import React from 'react'
import { myList } from '../List/List'
function Menu({ selectedMenu, selectedOptn }) {
  const menus = Object.values(myList)[selectedMenu];
  
  return (
      <div className='menu'>
        <header>{Object.keys(myList)[selectedMenu]}</header>
        <ul className='categories'>
          {menus.map((item,index) =>
            <li key={index} className={index === selectedOptn ? 'active' : ""}>
              <div className='menu-name'>
                {item.title}
              </div>
              <div className='menu-icon'>
                <img src={item.icon} alt={item.title} />
              </div>
            </li>)}
        </ul>
      </div>

  )
}

export default Menu
