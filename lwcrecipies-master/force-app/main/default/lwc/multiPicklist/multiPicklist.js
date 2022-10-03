import { LightningElement, api, track } from 'lwc';
import describePicklistField from '@salesforce/apex/PicklistController.describePicklistField';
export default class MultiPicklist extends LightningElement {
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
        this.fetchPicklistValues();
        this.placeholder = 'Select ' +this.label; 
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
        let selectedValue = event.detail.value.toString();
        
        const pickListEvent = new CustomEvent(
            'mulselected',
            {
                detail : {
                    picklistvalue : selectedValue.replace(/,/g, ";"),
                    fieldApiName  : this.fieldApiName
                }
            }
        );
        this.dispatchEvent(pickListEvent);
    }
}