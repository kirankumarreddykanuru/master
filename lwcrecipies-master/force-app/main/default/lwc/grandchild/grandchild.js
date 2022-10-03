/* eslint-disable no-alert */
import { LightningElement } from 'lwc';

export default class Grandchild extends LightningElement {
    handleSimpleEvent(event){
        console.log(event.target.message);
    }
}