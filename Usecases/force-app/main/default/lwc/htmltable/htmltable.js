import { LightningElement, track, wire } from 'lwc';
import retriveCons from '@salesforce/apex/FetchAccountCtrl.getContacts';
export default class AddrowsToTable extends LightningElement {
     // reactive variables
     @track data = [];
     @track error;
     @track bShowModal = false;
     @track selectedCons;
     @track contactsData=[];
     // Getting Contacts using Wire Service
     connectedCallback(){
        retriveCons().then(data =>{
          this.contactsData= data.map(item => {

                return {
                   Name:item.Name,
                   Phone:item.Phone,
                   Email:item.Email,
                   Id:item.Id,
                   rowSelect : false
                }


          })
     })}
      allSelected(event) {
        let selectedRows = this.template.querySelectorAll('lightning-input');
        
        for(let i = 0; i < selectedRows.length; i++) {
            if(selectedRows[i].type === 'checkbox') {
                selectedRows[i].checked = event.target.checked;
            }
        }
    }

  PushDown() {
      console('clicked');
    this.selectedCons = [];

        let selectedRows = this.template.querySelectorAll('lightning-input');

        // based on selected row getting values of the contact
        for(let i = 0; i < selectedRows.length; i++) {
            if(selectedRows[i].checked && selectedRows[i].type === 'checkbox') {
                this.selectedCons.push({
                    Name: selectedRows[i].value,
                    Id: selectedRows[i].dataset.id
                })
            }
        }
        console.log(selectedCons);

  }
          
    }