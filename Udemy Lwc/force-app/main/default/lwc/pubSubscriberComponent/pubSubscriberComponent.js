import { LightningElement } from 'lwc';
import pubsub from 'c/pubsub';
export default class PubSubscriberComponent extends LightningElement {

    messege;

    connectedCallback(){
        this.callSubscriber();
    }

    callSubscriber(){
        pubsub.subscribe('componentA', function(messege){
            this.messege = messege;
        })
    }
}