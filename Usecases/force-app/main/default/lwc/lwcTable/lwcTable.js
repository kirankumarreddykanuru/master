import { LightningElement, api, wire, track } from 'lwc';
import fetchAccounts from '@salesforce/apex/TableClass.fetchAccounts';
import { NavigationMixin} from 'lightning/navigation';
import { refreshApex } from '@salesforce/apex';


export default class Example extends NavigationMixin(LightningElement) {
  
   
    @track accountsWithContacts = [];
    
    @track selectedCount = 0;
    @track totalRecords = 0;
    @track bShowModal = false;

    connectedCallback(){
        fetchAccounts().then(data =>{
        
        
            this.totalRecords = data.length;
            this.accountsWithContacts= data.map(item => {

                return {

                    consize : item.contCount?true:false,
                    contactCount : item.contactCount,
                    accId: item.accId,
                    accName : item.accName,
                    conwrapList : item.conwrapList,
                    accURL : item.accURL,
                    conURL : item.conURL,
                    rowSelect : false
                }


          })
        });

        this.newOriginalRecords = this.accountsWithContacts;
    }

  


  
            /* let baseUrl = 'https://mouri-c-dev-ed.lightning.force.com';
                        data.forEach(item => {

            
                            this.accUrl = window.location.origin + '/' + item.accRecord.Id ;
                            console.log( this.accUrl);
                        }); */

                        // data.map(item=>{
                         
                        //       this.accId = item.Id;

                        //       console.log( item.Id);
                        //        this.conURL = window.location.origin + '/'+ item.conList.Id;
                        //     });
                          
                            

      

    // navigatetoContact(event){
    //     alert('called new tabresfrsh');
    //     alert( 'kiran Id ' +event.target.value);
    //     this[NavigationMixin.Navigate]({
    //         type: 'standard__recordPage',
    //         attributes: {
    //             recordId: event.target.value,
    //             objectApiName: 'Contact',
    //             actionName: 'view',
    //         },
    //     }
        
        
        
    //     ).then(url => {
    //         window.open(url, "_blank");
    //     });


//   allSelected(event) {
//         let selectedRows = this.template.querySelectorAll('lightning-input');
        
//         for(let i = 0; i < selectedRows.length; i++) {
//             if(selectedRows[i].type === 'checkbox') {
//                 selectedRows[i].checked = event.target.checked;
//             }
//         }
//     }

//     showContacts() {
//         this.bShowModal = true;

//         this.selectedCons = [];

//         let selectedRows = [...this.template.querySelectorAll('lightning-input').filter(element => element.checked).map(element => element.dataset.id)]



// console.log("###" + selectedRows); 
//         // based on selected row getting values of the contact
//         for(let i = 0; i < selectedRows.length; i++) {
//             if(selectedRows[i].checked && selectedRows[i].type === 'checkbox') {

               
//                 this.selectedCons.push({
//                     accName: selectedRows[i].value,
//                     accId: selectedRows[i].dataset.id,
//                    contactCount :  selectedRows[i].dataset.concount,
//                     conwrapList : selectedRows[i].dataset.conwraplist,
//                     accURL : selectedRows[i].dataset.accurl,
//                   consize : selectedRows[i].dataset.consize
                  
//                 })

//                  console.log(selectedRows[i].dataset.concount);
//                    console.log(selectedRows[i].dataset.consize);
//                     console.log(selectedRows[i].dataset.conwraplist);
//                        console.log(selectedRows[i].dataset.accurl);
                        
                
                

//             }
//         }

//         // for(element of selectedRows) {
//         //     if(element.checked && element.type === 'checkbox') {

               
//         //         this.selectedCons.push({
//         //             accName: element.value,
//         //             accId: element.dataset.id,
                  
//         //         })

//         //          console.log(element);
//         //     }
//         // }


        
//     }

  @track selectAll=false;
    
@track accountRecordsData =[];


handleRowSelectChange(event){
  
    let accountsWithContacts = JSON.parse(JSON.stringify(this.accountsWithContacts));

    let element = accountsWithContacts.find((eachRow)=>{
         return eachRow.accId == event.target.dataset.id;
    });

 element.rowSelect = event.target.checked;

console.log(element);

this.accountsWithContacts = [...accountsWithContacts];

//    this.selectAll = this.priceRecordsData.every((everyRow)=>everyRow.rowSelect);
//   console.log(  this.selectAll);
}

  
    handleSelectAllChange(event){
        this.selectAll = event.target.checked;

        console.log( this.selectAll);
       let accountsWithContacts = JSON.parse(JSON.stringify(this.accountsWithContacts));
       accountsWithContacts.forEach((element)=>{
            element.rowSelect = event.target.checked;
           
             
        });
        this.accountsWithContacts = accountsWithContacts;


    }

    newRecords=[];

 showContacts(){

    this.newRecords =[];
        


this.accountRecordsData= this.accountsWithContacts.filter( element => {
return element.rowSelect == true; // 2nd table selected rows
})

this.unselectedData =  this.accountsWithContacts.filter( element => {
return element.rowSelect == false;  // update  unselcted rows  in 1st table
})
console.log(this.newRecords);

  

       this.accountsWithContacts = [...this.accountsWithContacts];


       console.log( this.accountsWithContacts);
          this.newRecords=[this.accountRecordsData];
          this.accountRecordsData =[];
        this.accountsWithContacts=  this.unselectedData;
        this.selectAll =false;
    
        }





    handle2ndtableSelectAllChange(event){
        this.select2ndAll = event.target.checked;

        console.log( this.selectAll);
        let newRecords = JSON.parse(JSON.stringify(this.newRecords));
        newRecords.forEach((element)=>{
            element.rowSelect = event.target.checked;  
        });
        this.newRecords = newRecords;


    }

 

      showsecondTableContacts(){
         
           this.select2ndAll =false;
            this.accountRecordsData= this.accountsWithContacts.filter( element => {
            return element.rowSelect == true; // 2nd table selected rows
            })

            this.unselectedData =  this.accountsWithContacts.filter( element => {
            return element.rowSelect == false;  // update  unselcted rows  in 1st table
            })
            console.log(this.newRecords);
            this.accountsWithContacts = [...this.accountsWithContacts];
            console.log( this.accountsWithContacts);
            this.newRecords=[this.accountRecordsData];
            this.accountRecordsData =[];
            this.accountsWithContacts=  this.unselectedData;
        }
       
}