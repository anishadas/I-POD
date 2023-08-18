import React from 'react'
import Display from './display/Display'
import Buttons from './Buttons'

const Ipod = (props) => {
    return (
        <div className='container'>
            <Display {...props} />
            <Buttons {...props} />
        </div>
    )
}

export default Ipod;

