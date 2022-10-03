import { LightningElement, track, wire, api } from 'lwc';
import getContactsRelatedToAccount from '@salesforce/apex/ContactListOpportunity.getContactList';
import { NavigationMixin } from 'lightning/navigation';
export default class BharathContactList extends LightningElement {


    @api recordId;
    @track contacts;
    @track contacturl;
    @track columns = [
        { label: 'First Name', fieldName: 'Name', type: 'text' },
        
    ];
 @track contactSize;
    @wire(getContactsRelatedToAccount, {RecordId: '$recordId'}) 
    WireContactRecords({error, data}){
        if(data){
            this.contacts = data;
            this.contactSize=this.contacts.length ;
           
            this.error = undefined;
        }else{
            this.error = error;
            this.contacts = undefined;
        }
    }

handleClick(event){
    alert('link opened');
    let recordsId = event.target.dataset.conid;
    this[NavigationMixin.Navigate]({
        type: 'standard__recordPage',
        attributes: {
            actionName: "view",
            recordId: recordsId
        }
    });
}
}

