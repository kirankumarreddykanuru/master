import { LightningElement, track, wire } from 'lwc';

// importing Apex Class
import retriveCons from '@salesforce/apex/LWCContactController.getContacts';

export default class CustomHTMLDatatable extends LightningElement {
    // reactive variables
    @track data = [];
    @track error;
    @track bShowModal = false;
    @track selectedCons;

    // opening the modal
    openModal() { this.bShowModal = true; }
    // closeing the modal
    closeModal() { this.bShowModal = false;}

    // Getting Contacts using Wire Service
    @wire(retriveCons)
    contacts(result) {
        if (result.data) {
            this.data = result.data;
            this.error = undefined;

        } else if (result.error) {
            this.error = result.error;
            this.data = undefined;
        }
    }

    // Select the all rows
    allSelected(event) {
        let selectedRows = this.template.querySelectorAll('.table1');
        
        for(let i = 0; i < selectedRows.length; i++) {
            if(selectedRows[i].tabletype === 'checkbox') {
                selectedRows[i].checked = event.target.checked;
            }
        }
    }
    selectall(event) {
    const toggleList = this.template.querySelectorAll('[data-id^="toggle"]');
    for (const toggleElement of toggleList) {
        toggleElement.checked = event.target.checked;
    }
    
}
 selectalltable2(event) {
    const selectedRows = this.template.querySelectorAll('[data-id^="toggles"]');
    for (const toggleElement of selectedRows) {
        selectedRows.checked = event.target.checked;
    }
    
}

    showContacts() {
        this.bShowModal = true;

        this.selectedCons = [];

        let selectedRows = this.template.querySelectorAll('[data-id^="toggle"]');

        // based on selected row getting values of the contact
        for(let i = 0; i < selectedRows.length; i++) {
            if(selectedRows[i].checked && selectedRows[i].type === 'checkbox') {
                this.selectedCons.push({
                    Name: selectedRows[i].value,
                    Id: selectedRows[i].dataset.id,
                    FirstName:selectedRows[i].FirstName
                })
            }
        }
    }

}