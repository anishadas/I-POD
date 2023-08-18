import React from 'react'
import { myList } from '../List/List';

// display sing pages lke cover flow, settings
function SinglePage({ selectedMenu, selectedOptn }) {
    const page = Object.values(myList)[selectedMenu][selectedOptn];
    
    return (
        <div className='page' style={{backgroundImage:`url(${page.bgImage})`}}>
            {page.title === 'CoverFlow' ? (<div className='page-img'>
                <img src={page.icon} alt={page.title} />
            </div>) : null}
            <p className={page.title}>{page.title}</p>
        </div>
    )
}

export default SinglePage
