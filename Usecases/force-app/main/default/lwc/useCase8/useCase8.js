import { LightningElement,wire } from 'lwc';
import getContacts from '@salesforce/apex/ContactController.getContacts';
import PhotoUrl from '@salesforce/schema/Contact.PhotoUrl';
export default class useCase8 extends LightningElement {
    contacts; 
    @wire(getContacts)
    wiredfunction({error, data}){
        if(data){
            console.log('data:' , data);
            this.contacts = data;
            this.img__c =PhotoUrl;
        }
        if(error){
            console.log('error:' , error);
            this.contacts = undefined;
        }
    }

}