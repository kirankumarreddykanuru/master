import { LightningElement, api } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
export default class LdsCreateRecord extends LightningElement {

    @api recordId;
    strName;
    strAccountId;
    strPhone;
    // Change Handlers.
    nameChangedHandler(event){
        this.strName = event.target.value;
    }
  
    phoneChangedHandler(event){
        this.strPhone = event.target.value;
    }
  
    // Insert record.
    createConatct(){
        // Creating mapping of fields of Account with values
        var fields = {'LastName' : this.strName, 'Phone' : this.strPhone, 'AccountId' : this.recordId};
        // Record details to pass to create method with api name of Object.
        var objRecordInput = {'apiName' : 'Contact', fields};
        // LDS method to create record.
        createRecord(objRecordInput).then(response => {
            alert('conatct created with Id: ' +response.id);
        }).catch(error => {
            alert('Error: ' +JSON.stringify(error));
        });
    }
}