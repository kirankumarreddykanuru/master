/*
    Author      : Amit Singh
    Company     : SFDCPanther
    Built Date  : 2nd October 2019
    Web         : https://sfdcpanther.com
    LinkedIn    : https://www.linkedin.com/in/simplyamit/
    YouTube     : https://www.youtube.com/c/SFDCPanther
    Twitter     : https://twitter.com/cloudyamit
    Version     : 1.0

    *************************** Modified History *************************
        Modified Date :- 
        Version       :- 
        Modified By   :- 
        Description   :- 
*/
/* eslint-disable no-console */
import { LightningElement, track, api } from 'lwc';
import pubsub from 'c/pubsub' ;
export default class PubSubModel extends LightningElement {

    @track log;
    @api recordId;
    handleClick(event){
        this.log = event.detail;
    }

    handleCreate(event){
        let contactInfo = event.detail;
        pubsub.fire('create',contactInfo);
    }
}