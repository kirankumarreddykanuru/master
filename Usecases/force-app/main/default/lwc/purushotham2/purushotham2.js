
import { LightningElement,track,wire,api } from 'lwc';
import getdata from '@salesforce/apex/logindata.getdata';
import getOCT from '@salesforce/apex/logindata.getOCT';
import getSEP from '@salesforce/apex/logindata.getSEP';
import getAUG from '@salesforce/apex/logindata.getAUG';
import getJUL from '@salesforce/apex/logindata.getJUL';
import getJUN from '@salesforce/apex/logindata.getJUN';
import getMAY from '@salesforce/apex/logindata.getMAY';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import Log__c from '@salesforce/schema/LoginDetail__c.Log__c';
const fields = [Log__c];

export default class AttendanceLog extends LightningElement {  
    // reactive variables
    @track data = [];
    @track error;
    @track bShowModal = false;
    @track selectedCons;
    @track contacts;
    @track btn30;
    @track btnOct;
    @track btnSep;
    @track bt;
    @track btnname;
    @track monthArray = [];
    
    
    //@track prograssbarval=50;

    // opening the modal

    lstAccounts = [
        {
           
            Id : '101',
            Name : 'Jan'
        },
        {
            Id : '102',
            Name : 'FEB'
        },
        {
            Id : '103',
            Name : 'MAR'
        },
        {
           
            Id : '104',
            Name : 'APR'
        },
        {
            Id : '105',
            Name : 'MAY'
        },
        {
            Id : '106',
            Name : 'JUN'
        },
        {
           
            Id : '107',
            Name : 'JUL'
        },
        {
            Id : '108',
            Name : 'AUG'
        },
        {
            Id : '109',
            Name : 'SEP'
        },
        {
           
            Id : '110',
            Name : 'OCT'
        },
        {
            Id : '111',
            Name : 'NOV'
        },
        {
            Id : '112',
            Name : 'DEC'
        }
    ];

    // connectedCallback(){
    //     this.last30days();
    //     this.btn30="brand";
    //     this.btnSep="Neutral";
    //    this.btnOct="Neutral";
    //    var d = new Date();
    //    this.month = d.getMonth();
    //    console.log("current month:"+this.month);
    //    for(let i= this.month = d.getMonth(); i>=this.lstAccounts.length-6; i--){
    //     console.log("current month:"+this.lstAccounts[i].Name);
    // }
    // }

    @api recordId;
   
    @wire(getRecord, { recordId: '$recordId', fields })
    log;
    get logvalue() {
        return getFieldValue(this.log.data,Log__c );
    }
   
    
    openModal() { this.bShowModal = true; }
    // closeing the modal
    closeModal() { this.bShowModal = false;}

    // Getting Contacts using Wire Service
    last30days(){
        this.btn30="brand";
        this.btnSep="Neutral";
       this.btnOct="Neutral"; 
       this.btnname="Last 30 Days"  
        getdata({})
        .then(result => {
            
            this.data = result;
            console.log('ClockinTime====> '+ this.data);
            
        })
        .catch(error => {
            this.error = error;
            console.log('error====> '+ JSON.stringify(this.error.body.message));
        });
    }
    getRecentMonths(){
        this.monthArray = [];
        var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var today = new Date();/*from ww w .jav a  2s.  co m*/
        var d;
        var month;
        for(var i = 6; i > 0; i -= 1) {
        d = new Date(today.getFullYear(), today.getMonth() - i, 1);
        month = monthNames[d.getMonth()];
        this.monthArray.push(month);
        console.log(month);
        }
        this.monthArray = this.monthArray.reverse();
    }
    connectedCallback(){
        console.log('initial callllll')
        this.getRecentMonths();
    }

    OCT(event){  
          if(event.target.label === 'October'){
          this.btn30="Neutral";
          //this.October="brand";
          this.September="brand";
          this.btnSep="Neutral";
          this.btnname="October, 2021"  
       
        getOCT({})
        .then(result => {
            
            this.data = result;
            console.log('ClockinTime====> '+ this.data);
            
        })
        .catch(error => {
            this.error = error;
            console.log('error====> '+ JSON.stringify(this.error.body.message));
        });
        }
    
        if(event.target.label === 'September'){
            this.btn30="Neutral";
            this.btnname="September, 2021"  
            getSEP({})
            .then(result => {
                
                this.data = result;
                console.log('sepdata====> '+this.data);
                
            })
            .catch(error => {
                this.error = error;
                console.log('error====> '+ JSON.stringify(this.error.body.message));
            });
         }

         if(event.target.label === 'August'){
            this.btn30="Neutral";
            this.btnname="September, 2021"  
            getAUG({})
            .then(result => {
                
                this.data = result;
                console.log('sepdata====> '+this.data);
                
            })
            .catch(error => {
                this.error = error;
                console.log('error====> '+ JSON.stringify(this.error.body.message));
            });

             if(event.target.label === 'August'){
            this.btn30="Neutral";
            this.btnname="September, 2021"  
            getAUG({})
            .then(result => {
                
                this.data = result;
                console.log('sepdata====> '+this.data);
                
            })
            .catch(error => {
                this.error = error;
                console.log('error====> '+ JSON.stringify(this.error.body.message));
            });
         }


         if(event.target.label === 'JULY'){
            this.btn30="Neutral";
            this.btnname="September, 2021"  
            getJUL({})
            .then(result => {
                
                this.data = result;
                console.log('sepdata====> '+this.data);
                
            })
            .catch(error => {
                this.error = error;
                console.log('error====> '+ JSON.stringify(this.error.body.message));
            });
         }


         if(event.target.label === 'June'){
            this.btn30="Neutral";
            this.btnname="September, 2021"  
            getJUN({})
            .then(result => {
                
                this.data = result;
                console.log('sepdata====> '+this.data);
                
            })
            .catch(error => {
                this.error = error;
                console.log('error====> '+ JSON.stringify(this.error.body.message));
            });
         }


         if(event.target.label === 'May'){
            this.btn30="Neutral";
            this.btnname="September, 2021"  
            getMAY({})
            .then(result => {
                
                this.data = result;
                console.log('sepdata====> '+this.data);
                
            })
            .catch(error => {
                this.error = error;
                console.log('error====> '+ JSON.stringify(this.error.body.message));
            });
         }

       
                

    }

    

}

}
