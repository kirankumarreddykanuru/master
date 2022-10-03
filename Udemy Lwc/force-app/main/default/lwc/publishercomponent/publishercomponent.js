import { LightningElement } from 'lwc';
// import pubsub from '../pubsub/pubsub';
import pubsub from 'c/pubsub';

export default class Publishercomponent extends LightningElement {
messege;
    inputHandle(event){

        this.messege = event.target.value;

    }

    PublisherHandle(){

        pubsub.publish('componentA')

    }
}