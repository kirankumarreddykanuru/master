import { LightningElement, track, wire } from 'lwc';
import retrieveContactData from '@salesforce/apex/ContactController.retrieveContactData';
import findContacts from '@salesforce/apex/ContactController.findContacts';
const DELAY = 300;
export default class recomend extends LightningElement {
searchKey = '';
@track currentAccountName;

@track searchAccountName;

handleChangeAccName(event){

this.currentAccountName = event.target.value;
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        this.delayTimeout = setTimeout(() => {
            this.searchKey = currentAccountName;
        }, DELAY);
}



handleAccountSearch(){

this.searchAccountName = this.currentAccountName;

}
handleKeyChange(event) {
        // Debouncing this method: Do not update the reactive property as long as this function is
        // being called within a delay of DELAY. This is to avoid a very large number of Apex method calls.
        window.clearTimeout(this.delayTimeout);
       
    }
@track records;

@track dataNotFound;

@wire (retrieveContactData,  {keySearch:'$searchAccountName'})

wireRecord({data,error}){

if(data){

this.records = data;

this.error = undefined;

this.dataNotFound = '';

if(this.records == ''){

this.dataNotFound = 'There is not Contact fond related to Account name';

}


}else{

this.error = error;

this.data=undefined;

}

}



    @wire(findContacts, { keySearch:'$searchKey' })
    contacts;



}
