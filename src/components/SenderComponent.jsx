import React, { useEffect, useRef, useState } from 'react';
import './SenderComponent.css';
import globalTipsManager from './../utils/TipsManager';

const SenderComponent = () => {

    const [tipText, setTipText] = useState('');
    const [isDeleteLastTipBtnDisabled, setIsDeleteLastTipBtnDisabled] = useState(true);
    const lastAddedTipId = useRef('');

    function handleAddTipBtn() {
        const tip = globalTipsManager.addTip(tipText);
        setTipText('');
        if (!globalTipsManager._tips.length) {
            setIsDeleteLastTipBtnDisabled(true);
            return;
        };
        lastAddedTipId.current = tip.id;
        setIsDeleteLastTipBtnDisabled(false);
    };

    function handleDeleteLastTipBtn() {
        globalTipsManager.deleteLastTip();
        setIsDeleteLastTipBtnDisabled(true);
    };

    useEffect(() => {
        globalTipsManager.addOnTipRecievedSubscriber((tip) => {
            if (lastAddedTipId.current === tip.id) {
                setIsDeleteLastTipBtnDisabled(true)
            };
        });
        // eslint-disable-next-line
    }, []);

    return (
        <div className='sender-container' >
            <h1>Welcome to Ben's Tips!</h1>
            <p>Enter your tip:</p>
            <textarea type="textfiled" value={tipText} onChange={(e) => { setTipText(e.target.value) }} />
            <div className="buttons-container">
                <button onClick={handleAddTipBtn} disabled={!tipText} >ADD TIP</button>
                <button onClick={handleDeleteLastTipBtn} disabled={isDeleteLastTipBtnDisabled} >DELETE LAST TIP</button>
            </div>
        </div>
    );
};

export default SenderComponent;
