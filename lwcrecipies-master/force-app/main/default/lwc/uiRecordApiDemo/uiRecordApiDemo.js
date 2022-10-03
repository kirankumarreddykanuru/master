/* eslint-disable no-console */
import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi'
export default class UiRecordApiDemo extends LightningElement {
    @api recordId;


    @wire( getRecord, { recordId: '$recordId', layoutTypes: ['Full'], modes: ['View'] }) 
        wiredRecord({data,error}){
            console.log(data)
        }

    
    
}