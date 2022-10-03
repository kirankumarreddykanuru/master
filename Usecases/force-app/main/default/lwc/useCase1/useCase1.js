import { LightningElement,wire } from 'lwc';
import getContacts from '@salesforce/apex/ContactController.getContacts';

export default class useCase2 extends LightningElement {
    contacts; 
    @wire(getContacts)
    wiredfunction({error, data}){
        if(data){
            console.log('data:' , data);
            this.contacts = data;
        }
        if(error){
            console.log('error:' , error);
            this.contacts = undefined;
        }
    }

}