/*
    Author      : Amit Singh
    Company     : SFDCPanther
    Built Date  : 2nd October 2019
    Web         : https://sfdcpanther.com
    LinkedIn    : https://www.linkedin.com/in/simplyamit/
    YouTube     : https://www.youtube.com/c/SFDCPanther
    Twitter     : https://twitter.com/cloudyamit
    Version     : 1.0

    *************************** Modified History *************************
        Modified Date :- 
        Version       :- 
        Modified By   :- 
        Description   :- 
*/
/* eslint-disable no-console */
import { LightningElement, api, track } from 'lwc';
import getRelatedContacts from '@salesforce/apex/ContactController.getRelatedContacts';
import pubsub from 'c/pubsub';

const columns = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Title', fieldName: 'Title' },
    { label: 'Email', fieldName: 'Email', type: 'email' },
    { label: 'Phone', fieldName: 'Phone', type: 'phone' },
    {
        type:  'button',
        typeAttributes: 
        {
          iconName: 'action:delete',
          label: 'Delete', 
          name: 'delete', 
          title: 'Delete Row', 
          disabled: false, 
          value: 'Delete',
          variant : 'destructive'
        }
      }
];

export default class ContactListPubSub extends LightningElement {
    @api recordId;
    eventFiredCallback;
    @api records
    @track error;
    @api columns = columns;

    get acceptedFormats() {
        return ['.pdf', '.png'];
    }
    handleUploadFinished(event) {
        const uploadedFiles = event.detail.files;
        console.log("No. of files uploaded : " + uploadedFiles.length);
    }

    connectedCallback(){
        this.getContactList();
        this.eventFiredCallback = this.handleEvent.bind(this);
        this.register();
    }

    handleRefresh(){
        this.getContactList();
    }

    handleEvent(payload){
        let stringPayload = JSON.stringify(payload);
        let parsedPayload = JSON.parse(stringPayload);

        let initialList = JSON.stringify(this.records);
        this.records = [];
        let finalList = JSON.parse(initialList);
        finalList.push(parsedPayload);
        this.records = finalList;
    }

    getContactList(){
        getRelatedContacts({
            "accountId" :  this.recordId
        })
        .then(result => {
            this.records = result;
            this.error = undefined;
        })  
        .catch( error => {

            console.log(' Errors ', error)
            this.records = undefined;
            this.error = error;
        })

    }

    @api
    register(){
        pubsub.register('create', this.eventFiredCallback);
    }

    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        switch (actionName) {
            case 'delete':
                this.deleteRow(row);
                break;
            default:
        }
    }

    deleteRow(record){
        console.log(' Selected Record ' , record.Id);
    }
}