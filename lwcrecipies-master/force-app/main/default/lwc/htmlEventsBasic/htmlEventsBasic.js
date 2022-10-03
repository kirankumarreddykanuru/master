/* eslint-disable no-alert */
/* eslint-disable no-console */
import { LightningElement } from 'lwc';

export default class HtmlEventsBasic extends LightningElement {
    message ='Welcome Amit!!';

    handleChange(event){
        const val = event.target.value;
        const lbl = event.target.label;
        console.log(' Value is '+val + ' Label is ', lbl);
    }
}