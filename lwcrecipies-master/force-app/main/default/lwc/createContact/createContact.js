/* eslint-disable no-alert */
/*
    Author      : Amit Singh
    Company     : SFDCPanther
    Built Date  : 2nd October 2019
    Web         : https://sfdcpanther.com
    LinkedIn    : https://www.linkedin.com/in/simplyamit/
    YouTube     : https://www.youtube.com/c/SFDCPanther
    Twitter     : https://twitter.com/cloudyamit
    Version     : 0.1

    *************************** Modified History *************************
        Modified Date :- 
        Version       :- 
        Modified By   :- 
        Description   :- 
    *************************** Modified History *************************

*/
/* eslint-disable no-console */
import { LightningElement, track, api } from 'lwc';
import createContact from '@salesforce/apex/ContactController.createContact';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'
export default class CreateContact extends LightningElement {

    @api recordId;
    @api errors;
    @track contactInfo = {
        FirstName : '',
        LastName : '',
        Email : '',
        Title : '',
        Phone : ''
    }

    handleCreate(){
        console.log(this.contactInfo.FirstName);
        let isValid = this.validateInput();
        if(!isValid)
            return;
        
        createContact({
            "contactObj" : JSON.stringify(this.contactInfo),
            "accountId" : this.recordId
        })
        .then(result => {
            // Show the Success Messgae
            const event = new ShowToastEvent({
                "title": "Success!",
                "message": "Record {0} created! See it {1}!",
                "variant" : "success",
                "messageData": [
                    this.contactInfo.FirstName + ' ' + this.contactInfo.LastName,
                    {
                        url: '/'+result.Id,
                        label: 'here'
                    }
                ]
            });
            this.dispatchEvent(event);
            // Create and dispatch the custom event
            let contactEvent = new CustomEvent('create',
                {
                    detail : result
                }
            );
            this.dispatchEvent(contactEvent);
            // Make all fields Blank in the input Form
            this.contactInfo = {
                FirstName : '',
                LastName : '',
                Email : '',
                Title : '',
                Phone : ''
            }
            this.errors = undefined;
        })
        .catch(error => {
            console.log(' Error Occured ', error)
            this.errors = error;
        })
    }

    handleOnChange(event){
        let name = event.target.name;
        let value = event.target.value;
        this.contactInfo[name] = value;
    }

    validateInput(){
        console.log('Current value of the input: ');
        const allValid = [...this.template.querySelectorAll('lightning-input')]
            .reduce((validSoFar, inputCmp) => {
                inputCmp.reportValidity();
                inputCmp.setCustomValidity('Please provide a valid value for this field!!');
                return validSoFar && inputCmp.checkValidity();
            }, true);
        return allValid;
    }

}