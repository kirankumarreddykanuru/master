import { LightningElement, api } from 'lwc';

export default class OpportunityDetails extends LightningElement {
    @api recordId; /* to get record Id */
    @api objectApiName; /* Account, Opportunity */

    constructor(){
        super();
        console.log(' record Id ', this.recordId);
        console.log(' Object Info ', this.objectApiName);
    }
}