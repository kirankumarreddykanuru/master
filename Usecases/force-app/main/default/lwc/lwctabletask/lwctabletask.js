import { LightningElement, api, wire, track } from 'lwc';
import fetchAccounts from '@salesforce/apex/TableClass.fetchAccounts';


export default class Lwctabletask extends LightningElement {

    @track accountsWithContacts;
    

    @wire(fetchAccounts)
    wiredAccountsWithContacts({ error, data }) {
        if (data) {
            console.log(data.contCount);

            this.accountsWithContacts= data.map(item => {

                return {

                    consize : item.contCount?true:false,
                    contactCount : item.contactCount,
                    accId: item.accId,
                    accName : item.accName,
                    conwrapList : item.conwrapList,
                    accURL : item.accURL,
                    conURL : item.conURL,
                }


          })
         

        } else if (error) {
            console.log(error);
            this.error = error;
        }
    }
}