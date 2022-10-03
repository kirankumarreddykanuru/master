import {LightningElement,track,api, wire} from 'lwc';
import getcombo from '@salesforce/apex/BhuviClass.noleave';
export default class Bhuvancampoffs extends LightningElement {
    @api recordId;

    @track val=false;

        value(){

            this.val=true;

        }

        cal(){

            this.val=false;

   

        }

   // @wire (getLeave,{conLeaveId: '$recordId'}) Compoffs;

    @wire (getcombo,{idd:'$recordId'}) com;
}