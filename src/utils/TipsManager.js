import { v4 as uuidv4 } from 'uuid';

export class TipsManager{

    constructor(){
        this._tips = [];
        this._promiseResolve = null;
        this._onTipRecievedSubscribers = [];
    };

    addOnTipRecievedSubscriber(func){
        this._onTipRecievedSubscribers.push(func);
    };

    alertSubscribers(subscribersArr, params){
        subscribersArr.map(subscriberFunc=>subscriberFunc(params));
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
        if (this._promiseResolve){
            tip.recievedTime = Date.now();
            this.alertSubscribers(this._onTipRecievedSubscribers, tip);
            this._promiseResolve(tip);
            this._promiseResolve = undefined;
            return tip;
        };
        this._tips.push(tip);
        return tip;
    };

    deleteLastTip(){
        return this._tips.pop();
    };
    
    async getNextTip(){    
        if(!this._tips.length){
            const promise = new Promise((resolve, reject)=>{
                try {
                    this._promiseResolve = resolve;
                } catch (error) {
                    console.log(error);
                    reject(error);
                };
            });
            return promise;
        };
        const tip = this._tips.shift();
        tip.recievedTime = Date.now();
        this.alertSubscribers(this._onTipRecievedSubscribers, tip);
        return tip;
    };
};

const globalTipsManager = new TipsManager();
export default globalTipsManager;