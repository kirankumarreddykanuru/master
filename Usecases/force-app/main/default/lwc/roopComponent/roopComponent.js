import { LightningElement,track,wire } from 'lwc';
import getContactList from '@salesforce/apex/ControllerClass.retrieveContactData';
export default class RoopComponent extends LightningElement {

    @track name;
    @track email;

    onChangename(event){
     this.name=event.target.value;
    
    }
    onChangeemail(event){
       this.email=event.target.value;
    }
  
    
@track contacts;

handleSearch(){
getContactList({Name: this.name , Email: this.email })
        .then(result => {
            this.contacts = result;
            alert(JSON.stringify(this.contacts));
        })
        .catch(error => {
            this.error = error;
            this.contacts=undefined;
            alert(JSON.stringify(this.contacts));
        });
}
 
        
  
}