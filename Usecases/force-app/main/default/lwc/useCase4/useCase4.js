import { LightningElement, track } from 'lwc';
import getContacts from '@salesforce/apex/ContactController.getContacts';
export default class useCase4 extends LightningElement {
@track contact;
@track error;

 ////imperative
 
getcon(result){
    getContacts()
    .then(result => {
        this.contact=result;
      
    })
    .catch(error=> {
        this.error = error;
    })
}

 


}

 
