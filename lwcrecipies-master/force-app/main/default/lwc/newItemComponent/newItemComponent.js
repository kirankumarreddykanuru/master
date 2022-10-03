/* eslint-disable no-eval */
/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */
/* eslint-disable no-console */
import { LightningElement, track, api } from 'lwc';
import createItems from '@salesforce/apex/ItemController.createItems';
import productPrice from '@salesforce/apex/ItemController.productPrice';
import { showToast } from 'c/utils';
export default class NewItemComponent extends LightningElement {

    @track errors;
    @api recordId;
    @track showSpinner = true;
    @track itemRecords = [{
        Name        : '',
        Price__c    : '',
        Quantity__c : '',
        Weight__c   : ''
    }];

    connectedCallback(){
        this.showSpinner = false;
    }

    addItems(){
        this.itemRecords.push({
            Name        : '',
            Price__c    : '',
            Quantity__c : '',
            Invoice__c  : '',
            Weight__c   : ''
        });
    }

    /* Assign the value to correct Field */
    handleChangeEvent(event){
        event.preventDefault();
        const index = event.target.title;
        const value = event.target.value;
        const fieldAPIName = event.target.name;
        const correctRecord = this.itemRecords[index];
        correctRecord[fieldAPIName] = value;
    }

    removeItems(event){
        let index = event.target.value;
        this.itemRecords.splice(index , 1 );
    }

    saveItems(){
        this.showSpinner = true;
        const allValidItems = this.validateForm();
        if (allValidItems ) {
            createItems({
                itemRecords : JSON.stringify(this.itemRecords),
                invoiceId   : this.recordId
            })
            .then(data => {
                const toast = showToast('dismissable', 'success', 'Items Created', this.itemRecords.length+ ' Items Created');
                this.errors = undefined;
                this.dispatchEvent(toast);
                this.showSpinner = false;
                this.itemRecords = [{
                    Name        : '',
                    Price__c    : '',
                    Quantity__c : '',
                    Invoice__c  : '',
                    Weight__c   : ''
                }];
                eval("$A.get('e.force:refreshView').fire();");
            })
            .catch(error => {
                this.errors = error;
                const toast = showToast('dismissable', 'error', 'Error!', 
                ' Error While Creating the Items');
                this.dispatchEvent(toast);
                this.showSpinner = false;
            })
        } else {
            this.showSpinner = false;
        }
    }
    validateForm(){
        const allValid = [...this.template.querySelectorAll('lightning-input')]
            .reduce((validSoFar, inputCmp) => {
                        inputCmp.reportValidity();
                        return validSoFar && inputCmp.checkValidity();
            }, true);
        const allValidTxtArea = [...this.template.querySelectorAll('lightning-textarea')]
            .reduce((validSoFar, inputCmp) => {
                        inputCmp.reportValidity();
                        return validSoFar && inputCmp.checkValidity();
            }, true);
        
        const isValid = allValid && allValidTxtArea;
        return isValid;
    }

}