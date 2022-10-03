/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import { LightningElement, wire, track } from 'lwc';

import { getObjectInfo , getPicklistValues, getPicklistValuesByRecordType } from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
export default class ObjectInfoAPI extends LightningElement {

    @track value;
    @track pickval;
    @wire( getObjectInfo, { objectApiName : ACCOUNT_OBJECT })
        wiredAccount({ data, error }){
            if( data ) {
                console.log(' Object Information ', data)
            }
            if ( error ) {
                console.log(' Error Occured ', error);
            }
        }

    @wire( getPicklistValues ,  { recordTypeId : '012000000000000AAA', fieldApiName : INDUSTRY_FIELD})
        wiredField({ data, error }){
            console.log(' Data ', data);
            if( data ){
                this.pickval = data.values;
            }
        }
    @wire( getPicklistValuesByRecordType, {
        objectApiName : ACCOUNT_OBJECT,
        recordTypeId : '0129A000000Zp6s'
    })
    wiredRecordTypeInfo({ data, error }){
        
        if( data ){
            console.log(' Data ', data);
            this.pickval = data.picklistFieldValues.Industry.values;
            //this.pickval = data.values;
        }
    }

}