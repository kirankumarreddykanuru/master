/* eslint-disable no-alert */
/* eslint-disable no-console */
import { LightningElement, track, wire, api } from 'lwc';
import createContacts from '@salesforce/apex/ContactController.createContacts';
import getpickVal from '@salesforce/apex/ContactController.getpickVal';
import { showToast } from 'c/utils';
export default class Multilineedit extends LightningElement {
    @api errors;
    @track columns = [
        {
            "label" : "First Name",
            "apiName" : "FirstName"
        },
        {
            "label" : "Last Name",
            "apiName" : "LastName"
        },
        {
            "label" : "Email",
            "apiName" : "Email"
        },
        {
            "label" : "Title",
            "apiName" : "Title"
        },
        {
            "label" : "Lead Source",
            "apiName" : "LeadSource"
        },
        {
            "label" : "Account",
            "apiName" : "AccountId"
        }
    ];

    @track leadSource = [];
    /* Prepare the first Record of the List */
    
    @api recordData ={
        "FirstName"   : "",
        "LastName"    : "",
        "Email"       : "",
        "Title"       : "",
        "AccountId"   : ""
    };
    
    @track rows = [
        {
            "FirstName"   : "",
            "LastName"    : "",
            "Email"       : "",
            "Title"       : "",
            "AccountId"   : ""
        }
    ];
    connectedCallback(){
        console.log(' connectedCallback Called ', this.recordData);
    }

    /* Add row to the existing list */
    addRow(event){
        event.preventDefault();
        console.log(' Add Rows ');
        this.rows.push(
            JSON.parse(JSON.stringify(this.recordData))
            
        );
        
    }
    /* Prepare the Title for Contact Object */
    get options() {
        return [
            { label: 'Salesforce Consultant', value: 'Salesforce Consultant' },
            { label: 'Release Manager', value: 'Release Manager' },
            { label: 'Architect', value: 'Architect' },
            { label: 'QA', value: 'QA' },
            { label: 'Salesforce Developer', value: 'Salesforce Developer' },
        ];
    }

    /* Prepare the Picklist Value */
    get leadSourceOptions(){
        console.log(' Options ', this.leadSource)
        return this.leadSource;
    }

    /* Get the Picklist Value for the Given Object and Field */
    @wire(getpickVal, { "ObjectName" : "Contact", "apiName" : "LeadSource" })
        wiredPicklistValue({error, data}){
            if(error){
                console.log(' Error ', error);
                this.errors = error;
            }
            if(data){
                this.errors = undefined;
                console.log(data);
                for(let i=0; i < data.length; i++){
                    let options = data[i].split('####');
                    if(options){
                        this.leadSource.push({
                            label : options[0],
                            value : options[1]
                        });
                    }
                }
                //console.log(' leadSource ', this.leadSource);
            }
        }

    /* Assign the value to correct Field */
    handleChangeEvent(event){
        event.preventDefault();
        const index = event.target.title;
        const value = event.target.value;
        const fieldAPIName = event.target.name;
        const correctRecord = this.rows[index];
        correctRecord[fieldAPIName] = value;
        
    }

    /* Call the Apex Method and Save the Record */
    saveRows(event){
        event.preventDefault();
        console.log(JSON.stringify(this.rows));
        
        createContacts({
            "recordList" : JSON.stringify(this.rows)
        })
        .then( result => {
            if(result){
                console.log(console.table(result));
                this.errors = undefined;
                const eventSuccess = showToast('dismissable',
                    'success',
                    'Record Inserted',
                    'Record Inserted'
                );
                this.dispatchEvent(eventSuccess);
            }
        })
        .catch( error => {
            if(error){
                this.errors = error;
                console.log(' Error Occured ', error);
                const eventSuccess = showToast('dismissable',
                    'error',
                    'Error Occured !!',
                    'An Error Occured While Creating Records.'
                );
                this.dispatchEvent(eventSuccess);
            }
        });
    }

    /* Delete the Selected Row */
    deleteRow(event){
        event.preventDefault();
        const index = event.target.value;
        this.rows.splice(index, 1);
    }

    /* Get the Lookup Selected Record Id */
    getRecordId(event){
        event.preventDefault();
        const params = event.detail; 
        //console.log(' params ', params);
        const index = params.index;
        const recordId = params.recordId;
        const lookupField = params.relationshipfield
        const correctRecord = this.rows[index];
        correctRecord[lookupField] = recordId;
        
    }
}