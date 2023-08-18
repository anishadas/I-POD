import React from 'react'
import { myList } from '../List/List';

function SinglePage({ selectedMenu, selectedOptn }) {
    const page = Object.values(myList)[selectedMenu][selectedOptn];
    console.log("page",selectedMenu,selectedOptn,page)
    return (
        <div className='page' style={{backgroundImage:`url(${page.bgImage})`}}>
            {page.title === 'CoverFlow' ? (<div className='page-img'>
                <img src={page.icon} alt={page.title} />
                {/* <img src='https://cdn-icons-png.flaticon.com/128/555/555195.png' alt='cover' /> */}
            </div>) : null}
            <p className={page.title}>{page.title}</p>
        </div>
    )
}

export default SinglePage
