/* eslint-disable no-console */
import { LightningElement, api, track } from 'lwc';
import { simpleInt } from 'c/ssample';
export default class ChildComp extends LightningElement {
    @api message;
    @api pageno;
    @api contact;
    @track date = new Date();

    constructor(){
        super();
        const si = simpleInt(1000, 1, 10);
        console.log(' Simple interest ', si);
    }
    @api
    childMethod(messageFromParent, page_no){
        this.date = new Date();
        this.message = messageFromParent;
        this.pageno = page_no;
    }

    handleEvent(){
        /* 
            Step 1 - Create EVent
        */
        const eventS = new CustomEvent(
                'simple',
                {
                    bubbles : true,
                    composed : true
                }
            );
        /* 
            Step 2 - Create EVent
            {
                key : value,
                key : value,
                key : value
            }
        */
       this.dispatchEvent(eventS);
    }
}