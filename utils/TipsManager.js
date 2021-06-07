import { v4 as uuidv4 } from 'uuid';

class TipsManager{

    constructor(){
        this._tips = [];
        this._promiseResolve = null;
    };

    generateTip(tipText){
        return {
            id: uuidv4(),
            text: tipText,
            createdTime: Date.now(),
            recievedTime: null,
        };
    };

    addTip(tipText){
        const tip = this.generateTip(tipText);
        if (!this._tips){
            this._promiseResolve(tip);
            return tip;
        };
        this._tips.push(tip);
        return tip;
    };

    deleteLastTip(){
        return this._tips.pop();
    };
    
    getNextTip(){    
        if(!this._tips){
            const promise = new Promise((resolve, reject)=>{
                try {
                    this._promiseResolve = resolve;
                } catch (error) {
                    reject(error);
                };
            });
            return promise;
        };
        const tip = this._tips.pop();
        return tip;
    };
};

export const globalTipsManager = new TipsManager();
export default TipsManager;