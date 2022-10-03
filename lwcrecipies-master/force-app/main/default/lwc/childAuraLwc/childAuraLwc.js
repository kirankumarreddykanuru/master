/* eslint-disable no-alert */
import { LightningElement, api } from 'lwc';

export default class ChildAuraLwc extends LightningElement {

    @api 
    childMethod(message){
        alert('Event Handled in Child LWC '+ message);
    }
    handleClick(){
        const selectEve = new CustomEvent(
            "select",
            {
               detail : {
                   message : "I am from Child Event in LWC"
               } 
            }
        );
        this.dispatchEvent(selectEve);
    }
}