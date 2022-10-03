import { LightningElement,api,track,wire } from 'lwc';
import fetchAccounts from '@salesforce/apex/InsertQuickAction.accounts';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class LightningQuickAction extends LightningElement {
 @api recordId;
        @api invoke() {
            fetchAccounts({accid: this.recordId})
                .then((result) => {
                                 this.dispatchEvent(
                                  new ShowToastEvent({
                                title: 'Success',
                                message: 'Account Contact created',
                                variant: 'success',
                            }),
                        );     
                    })
                .catch((error) => {
                  
                    this.error = error;
            
                });
     
  }

}

