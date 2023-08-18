import React from 'react'


const Buttons = (props) => {
    const {  btnFunction, selectedOptn } = props;
    return (
        <div className='buttons' id='reflect'>
            <div className='controls' ref={props.wheelRef}>
                <button className='left' onTouchEnd={() => btnFunction.backwardBtn()} onClick={() => btnFunction.backwardBtn()}><i class="fa-solid fa-backward-fast"></i></button>
                <button className='right' onTouchEnd={() => btnFunction.forwardBtn()} onClick={() => btnFunction.forwardBtn()}><i class="fa-solid fa-forward-fast"></i></button>
                <button className='bottom' onTouchEnd={() => btnFunction.playPause()} onClick={() => btnFunction.playPause()}><i class="fa-solid fa-forward-step"></i></button>
                <button className='top' onTouchEnd={() => btnFunction.backMenu()} onClick={() => btnFunction.backMenu()}>Menu</button>
            </div>
            <div className='okBtn' onTouchEnd={() => btnFunction.handleOkBtn(selectedOptn)} onClick={() => btnFunction.handleOkBtn(selectedOptn)}>
                OK
            </div>
        </div>
    )
}

export default Buttons;
