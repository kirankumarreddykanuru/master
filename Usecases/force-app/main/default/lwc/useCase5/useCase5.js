import { LightningElement, track } from 'lwc';
import searchImperativeContactList from '@salesforce/apex/ContactController.searchImperativeContactList';
 
 
export default class contactsearch extends LightningElement {
 
    @track contacts;
    @track error;
 
    searchContact(event){        
        this.searchKey = event.target.value;        
    }
 
    doSearch() {
        searchImperativeContactList({ contactName: this.searchKey })
            .then(result => {
                this.contacts = result;
                this.error = undefined;
            })
            .catch(error => {
                this.error = error;
                this.contacts = undefined;
            });
    }
 
}