/* eslint-disable no-unused-vars */
import {
    LightningElement,
    track,
    api,
    wire
} from 'lwc';
import createRecord from '@salesforce/apex/AccountController.createRecord';
export default class AccountObject extends LightningElement {
    @track AccountObject = {
        Name: '',
        Type: '',
        Parentid: '',
        Billingstreet: '',
        Billingcity: '',
        Billingstate: '',
        Billingpostalcode: '',
        Billingcountry: '',
        Billinglatitude: '',
        Billinglongitude: '',
        Billinggeocodeaccuracy: '',
        Shippingstreet: '',
        Shippingcity: '',
        Shippingstate: '',
        Shippingpostalcode: '',
        Shippingcountry: '',
        Shippinglatitude: '',
        Shippinglongitude: '',
        Shippinggeocodeaccuracy: '',
        Phone: '',
        Fax: '',
        Accountnumber: '',
        Website: '',
        Sic: '',
        Industry: '',
        Annualrevenue: '',
        Numberofemployees: '',
        Ownership: '',
        Tickersymbol: '',
        Description: '',
        Rating: '',
        Site: '',
        Ownerid: '',
        Jigsaw: '',
        Accountsource: '',
        Dunsnumber: '',
        Tradestyle: '',
        Naicscode: '',
        Naicsdesc: '',
        Yearstarted: '',
        Sicdesc: '',
        Dandbcompanyid: '',
        Customerpriority__c: '',
        Sla__c: '',
        Active__c: '',
        Numberoflocations__c: '',
        Upsellopportunity__c: '',
        Slaserialnumber__c: '',
        Slaexpirationdate__c: '',
        Created_time__c: '',
        Benifit__c: '',
        Email__c: '',
        Description__c: '',
        Type__c: ''
    }
    handleInputChange(event) {
        let apiName = event.target.name;
        let inputval = event.target.value;
        this.AccountObject[apiName] = inputval
    }
    handleLookupSelect(event) {
        let selectedRecordId = event.detail.recordId;
        let lookupfield = event.detail.relationshipfield; /* Get Index in case lookup is being used in Multiline Edit Form */
        let index = event.detail.index;
        this.AccountObject[lookupfield] = selectedRecordId
    }
    handlePickListSelect(event) {
        let pickVal = event.detail.picklistvalue;
        let fieldApiName = event.detail.fieldApiName;
        this.AccountObject[fieldApiName] = pickVal
    }
    validateForm() {
        const allValid = [...this.template.querySelectorAll('lightning-input')].reduce((validSoFar, inputCmp) => {
            inputCmp.reportValidity();
            return validSoFar && inputCmp.checkValidity();
        }, true);
        let txtArea = [...this.template.querySelectorAll('lightning-textarea')];
        let allValidTxtArea;
        if (txtArea) {
            allValidTxtArea = txtArea.reduce((validSoFar, inputCmp) => {
                inputCmp.reportValidity();
                return validSoFar && inputCmp.checkValidity();
            }, true);
        }
        let isValid = allValid;
        if (txtArea) {
            isValid = allValid && allValidTxtArea;
        }
        return isValid;
    }
    saveRecord() {
        let allValid = this.validateForm();
        if (allValid) {
            createRecord({
                recordInfo : JSON.stringify(this.AccountObject)
            })
            .then(record => {
                window.console.log('record ', record);
            })
            .catch(error => {
                window.console.log(error)
            });
        }
    }
}