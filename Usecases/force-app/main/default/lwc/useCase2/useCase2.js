import { LightningElement,wire } from 'lwc';
import getContacts from '@salesforce/apex/ContactController.getContacts';

export default class UseCase2 extends LightningElement {
  
    @wire(getContacts)
    contacts; //property
} 