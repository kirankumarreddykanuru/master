/* eslint-disable no-console */
import { LightningElement, track, api } from 'lwc';
import pubsub from 'c/pubsub' ;
export default class Sibling1 extends LightningElement {

    @track log = 'Before Method Called';
    eventFiredCallback;
    eventFired(payload){ 
        console.log(' Message from message ' , payload);
        this.log=payload  ;   
    }

    connectedCallback(){
        this.eventFiredCallback = this.eventFired.bind(this);
        this.register();
    }
    @api
    register(){
        pubsub.register('divclicked', this.eventFiredCallback, this);
    }
}