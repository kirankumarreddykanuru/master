/* eslint-disable no-console */
import { LightningElement, wire, api, track } from 'lwc';
import getAllCases from '@salesforce/apex/CaseController.getAllCases';
export default class WireMethod extends LightningElement {

    @api records;
    @api errors;
    @track subject;

    handleChange(event){
        const sVal = event.target.value;
        this.subject = sVal;
    }
    /*
        @wire(getAllCases) cases;
        cases
            - data
            - error

        @wire(getAllCases)
            wiredCase({ data, error }){
                - data => caseList
                - error => error(An Object)
            }

    */

    //@wire(getAllCases) cases;

    @wire(getAllCases, {
        subject : '$subject'
    })
        wiredCases({
            data, error
        }){
            if(data){
                console.log(' Data information is ', data);
                this.records = data;
                this.errors = undefined;
            }
            if(error){
                console.log(' Error ', error)
                this.errors = error;
                this.records = undefined;
                //
            }
        }
}