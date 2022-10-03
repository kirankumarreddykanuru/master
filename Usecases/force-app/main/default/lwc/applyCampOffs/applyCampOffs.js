
import { api, LightningElement,track} from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { createRecord } from 'lightning/uiRecordApi';
export default class Leaveexample extends LightningElement {
@api recordId;
@api myRecordId;
@track leavesresult;
@track showDate= "";
@track errors;
NoOfLeave__c = 0;;
strStart_Date__c;
strEnd_Date__c;
strNote__c;
halfTime =0;
result;
range;
twobt=false;
sd;
ed;
@track modalPopUpToggleFlag = false;
val = false;
checkvalue =false;
c(){
this.val =true;
}
checkboxval(event) {
    
if (event.target.checked)
{
   
this.halfTime= 0.5;
this.result= ((this.ed - this.sd) / (1000*60*60*24)) ;
this.range= this.result+1;

        if(this.range>1){
      
        this.twobt=true;
        this.checkvalue=false;
        }
        else{
            this.checkvalue=true;
            this.twobt=false;
            }
console.log('Check box is checked');
}
else
{
   
console.log('check box is unchecked');
this.checkvalue=false;
this.twobt=false;
}
}






handleClick(){
    
this.modalPopUpToggleFlag = true;
}
handleCancel(){
this.modalPopUpToggleFlag = false;
}
// Change Handlers.
startdatechange(event){
    
this.strStart_Date__c = event.target.value;
this.sd=new Date(this.strStart_Date__c);

console.log(this.strStart_Date__c);
}
enddatechange(event){
this.strEnd_Date__c = event.target.value;
this.ed=new Date(this.strEnd_Date__c);
this.result= ((this.ed - this.sd) / (1000*60*60*24)) ;
this.range= this.result+1;

this.showDate = this.strStart_Date__c + "  " +"  -    " + this.strEnd_Date__c;


}


notechange(event){
this.strNote__c = event.target.value;

}

handleSuccess(event) {
this.modalPopUpToggleFlag = false;
const evt = new ShowToastEvent({
title: "Comp Offs",
message: "Applied successfully",
variant: "success"
});
this.dispatchEvent(evt);
}
get acceptedFormats() {
return ['.pdf', '.png'];
}


handleUploadFinished(event) {
    
// Get the list of uploaded files
const uploadedFiles = event.detail.files;
alert('No. of files uploaded : ' + uploadedFiles.length);
}
 
yesSelection(){
    this.template.querySelector('.yesBtn').classList.add('dynamicCSS'); 
    this.template.querySelector('.noBtn').classList.remove('dynamicCSS');
    this.RequestOftheDay__c ='First Off';
    }

noSelection(){
    this.template.querySelector('.noBtn').classList.add('dynamicCSS');
    this.template.querySelector('.yesBtn').classList.remove('dynamicCSS');
    this.RequestOftheDay__c ='Second Off';
    }

    syesSelection(){
        this.template.querySelector('.syesBtn').classList.add('dynamicCSS'); 
        this.template.querySelector('.snoBtn').classList.remove('dynamicCSS');
        this.RequestOftheDay__c ='First Off';
        }
    
    snoSelection(){
        this.template.querySelector('.snoBtn').classList.add('dynamicCSS');
        this.template.querySelector('.syesBtn').classList.remove('dynamicCSS');
        this.RequestOftheDay__c ='Second Off';
        }

   

    

    // Insert record.
Confirm(){
   
    const diffInMs   = new Date(this.strEnd_Date__c) - new Date(this.strStart_Date__c);
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    console.log (diffInDays);
    this.NoOfLeave__c = diffInDays + this.halfTime;
    console.log( this.NoOfLeave__c);
    // Creating mapping of fields of Leave with values
    var fields = {'Start_Date__c' : this.strStart_Date__c, 'End_Date__c' : this.strEnd_Date__c, 'Note__c' : this.strNote__c, 'Contact__c' : this.recordId , 'NoOfLeave__c' : this.NoOfLeave__c ,'RequestOftheDay__c': this.RequestOftheDay__c};
    // Record details to pass to create method with api name of Object.
    var objRecordInput = {'apiName' : 'Leave__c', fields};
    // LDS method to create record.
    createRecord(objRecordInput).then(response => {
        this.modalPopUpToggleFlag = false;

        const evt = new ShowToastEvent({
                title: "Comp Offs Leave Applied Successfully",
                message: "Leave created with Id: " +response.id,
                variant: "success"
                });
            this.dispatchEvent(evt);

    }).catch(error => {
    alert('Error: ' +JSON.stringify(error));
    });
    }



        changeHandler(event) {
            this.greeting = event.target.value;
        }
    
    
     
    
}

