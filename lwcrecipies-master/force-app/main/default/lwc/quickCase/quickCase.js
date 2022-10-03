import { LightningElement } from 'lwc';

export default class QuickCase extends LightningElement {
    subject;
    description;
    stausValue;
    priortyVal;
    originVal;

    handleChange(event){
        let name = event.target.name;
        let val = event.target.value;
        if( name === 'subject'){
            this.subject = val;
        } else if ( name === 'description'){
            this.description = val;
        }
    }
    get status() {
        return [
            { label: 'New', value: 'New' },
            { label: 'Closed', value: 'Closed' }
        ];
    }
    get origin() {
        return [
            { label: 'Web', value: 'Web' },
            { label: 'Phone', value: 'Phone' },
            { label: 'Email', value: 'Email' },
        ];
    }
    get priorty() {
        return [
            { label: 'High', value: 'High' },
            { label: 'Low', value: 'Low' },
            { label: 'Medium', value: 'Medium' },
        ];
    }

    handleCreate(){

    }

}