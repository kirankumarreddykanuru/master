/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import { LightningElement, api, track } from 'lwc';
import describePicklistField from '@salesforce/apex/PicklistController.describePicklistField';
import getRecordTypeId  from '@salesforce/apex/PicklistController.getRecordTypeId';
export default class PicklistComponent extends LightningElement {
    @api objectApiName;
    @api fieldApiName;
    @api recordTypeName;
    @api record;
    @track picklistValues = [];
    @track errors;
    @api label;
    @api value;
    @track placeholder;

    connectedCallback() {
        if( !this.recordTypeName ) {
            this.fetchPicklistValues();
        } else {
            this.picklistValuesWithRecordType();
        }
        
        this.placeholder = 'Select ' +this.label; 
    }

    picklistValuesWithRecordType() {
        getRecordTypeId({
            objectApiName : this.objectApiName,
            fieldApiName  : this.fieldApiName,
            Name          : this.recordTypeName
        })
        .then(result => {
            this.errors = undefined;
            let parsedResp = JSON.parse(result);
            let picklistFieldValues = parsedResp.picklistFieldValues;
            let pick_val = picklistFieldValues[this.fieldApiName].values;
            console.log(' pick_val ', pick_val);
            this.picklistValues = JSON.parse(JSON.stringify(pick_val));
        })
        .catch(error => {
            this.picklistValues = undefined;
            this.errors = error;
        })
    }

    fetchPicklistValues() {
        describePicklistField({
            "objectApiName" : this.objectApiName,
            "fieldApiName"  : this.fieldApiName
        })
        .then(result => {
            this.errors = undefined;
            let opt = [];
            for(let i=0; i < result.length; i ++ ) {
                let pickVal = result[i].split('####');
                opt.push({
                    label : pickVal[0],
                    value : pickVal[1]
                });
            }
            this.picklistValues = JSON.parse(JSON.stringify(opt));
        })
        .catch(error => {
            this.picklistValues = undefined;
            this.errors = error;
        })
    }

    handleChange(event) {
        event.preventDefault();
        let selectedValue = event.target.value;
        const pickListEvent = new CustomEvent(
            'selected',
            {
                detail : {
                    picklistvalue : selectedValue,
                    fieldApiName  : this.fieldApiName
                }
            }
        );
        this.dispatchEvent(pickListEvent);
    }
}