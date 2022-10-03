import { LightningElement, api, track } from 'lwc';

export default class ShowDate extends LightningElement {
    @track message =' Before Api Function';
    @track timestamp = new Date();

    @api
    changeDateTime(messageFromParent){
        this.timestamp = new Date();
        this.message = messageFromParent;
    }
}