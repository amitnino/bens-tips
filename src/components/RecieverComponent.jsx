import React, { useState } from 'react';
import './RecieverComponent.css';
import globalTipsManager from './../utils/TipsManager';
import buttonHoverStyle from '../utils/buttonHoverStyle';

const RecieverComponent = () => {

    const loaderMessage = 'waiting for the next genius tip!';
    const starterMessage = 'press next tip button!';

    const [currentTip, setCurrentTip] = useState(starterMessage)
    const [isNextTipBtnDisabled, setIsNextTipBtnDisabled] = useState(false);
    
    async function handleNextTipBtn(){
        setCurrentTip(loaderMessage);
        setIsNextTipBtnDisabled(true);
        const tip = await globalTipsManager.getNextTip();
        setCurrentTip(tip?.text);
        setIsNextTipBtnDisabled(false);
    };

    return (
        <div className="reciever-container">
            <h2>{currentTip.toUpperCase()}</h2>
            <button style={!isNextTipBtnDisabled ? buttonHoverStyle : {}} onClick={handleNextTipBtn} disabled={isNextTipBtnDisabled} >NEXT TIP</button>
        </div>
    );

};

export default RecieverComponent;
