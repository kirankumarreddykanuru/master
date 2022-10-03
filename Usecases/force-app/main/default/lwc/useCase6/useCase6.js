import { LightningElement,track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getContactList from '@salesforce/apex/ContactController.searchImperativeContactList';
 
 
export default class UseCase6 extends LightningElement {
 
    @track contacts;
    @track error;
 
    searchContact(event){        
        this.searchKey = event.target.value;        
    }
 
    doSearch() {
        getContactList({ contactName: this.searchKey })
            .then(result => {
                this.contacts = result;
                this.error = undefined;
                if(result==0){
                    const toastError = new ShowToastEvent({
                        title: "Contacts Retreiving Failed",
                        message: "Total Number Of Records found : " + result.length ,
                        variant: "error"
                    });
                    this.dispatchEvent(toastError);
                }
                if(result!=0){
                                
                    const toastEvent = new ShowToastEvent({
                    title: "Contacts Successfully Retreived",
                    message: "Total Number Of Records found : " + result.length ,
                    variant: "success"
                    });
                   this.dispatchEvent(toastEvent);
                }
                   
            

            })
            .catch(error => {
                this.error = error;
                this.contacts = undefined;
                
               
            });

           
             
            
    }

    
 
}