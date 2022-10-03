import { LightningElement, api, track } from 'lwc';
import relatedItems from '@salesforce/apex/ItemController.relatedItems';
export default class ItemListComponent extends LightningElement {
    @api recordId;
    @track records;
    @track errors;
    @track columns;
    connectedCallback(){
        this.getrelatedItems();
    }
    getrelatedItems(){
        relatedItems({
            invoiceId : this.recordId
        })
        .then(result => {
            this.records = result;
            this.errors = undefined;
        })
        .catch(error => {
            this.records = undefined;
            this.errors = error;
        })
    }
}