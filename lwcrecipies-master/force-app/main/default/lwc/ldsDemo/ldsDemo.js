/* eslint-disable no-console */
import { LightningElement, api, wire, track } from 'lwc';
import { getRecord, getFieldValue, createRecord } from 'lightning/uiRecordApi';
import OPP_NAME from '@salesforce/schema/Opportunity.Name';
export default class LdsDemo extends LightningElement {
    @api recordId;
    @track record;
    @wire( getRecord , { recordId : '$recordId' , layoutTypes : ['Full'], modes : ['View']})
        wiredRecord({ data, error }){
            if(data) {
                console.log(' record info ', data);
                const name = data.fields.Name.value;
                console.log(' Record Name ', name)
                this.record = data;
            }
            if( error ) {
                console.error(error);
            }
        }

    get name(){
        console.log(' OPP_NAME ', OPP_NAME);
        return getFieldValue(this.record, OPP_NAME);
    }

    handleCreate(){
        
    }
}