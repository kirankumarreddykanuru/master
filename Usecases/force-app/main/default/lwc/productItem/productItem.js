import { LightningElement,wire,track } from 'lwc';
import getProductlist from '@salesforce/apex/getProducts.getProductlist';
import createOLIsMethod from '@salesforce/apex/getProducts.createOLIs';
import OPPORTUNITY_OBJECT from '@salesforce/schema/Opportunity';
import NAME_FIELD from '@salesforce/schema/Opportunity.Name';
import StageName from '@salesforce/schema/Opportunity.StageName';
import CLOSE_DATE from '@salesforce/schema/Opportunity.CloseDate';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import OpportunityLineItem from '@salesforce/schema/OpportunityLineItem.Name';
import AccountId from '@salesforce/schema/Opportunity.AccountId';


export default class useCase202 extends LightningElement {

    opportunityObject = OPPORTUNITY_OBJECT;
    myFields = [NAME_FIELD , CLOSE_DATE, StageName, AccountId];

    productNames='';
    visibleContacts;
   @track products = []; 
    opportunityId = '';
    @wire(getProductlist, {pdtName: '$productNames'})
    wiredfunction({error, data}){
        if(data){
            console.log('data:' , data);
            this.products = data.map(item=>{
                return{
                productId : item.Id,
                productName : item.Name,
                productQuantity: 0,
                
                productPictureUrl : item.Product_Image_Link__c

                }
            });
            
        }
        if(error){
            console.log('error:' , error);
            this.products = undefined;
        }
    }

    handleQuantityIncrease(event){
        let element = this.products.find((row)=>{
            return row.productId == event.target.dataset.id;
        });
        console.log('Enter increase::',element);
        element.productQuantity = element.productQuantity+1;
        const evt = new ShowToastEvent({
            title: "Successfully Added",
            variant: "success"
        });
        this.dispatchEvent(evt);
        console.log('Enter increase::',element.productQuantity);
        this.products = [...this.products];
        console.log('Products:::',this.products);
    }

    handleQuantityDecrease(event){
        let element = this.products.find((row)=>{
            return row.productId == event.target.dataset.id;
        });
        console.log('Enter increase::',element);
        if(element.productQuantity >0){
            element.productQuantity = element.productQuantity-1;
            const evt = new ShowToastEvent({
                title: "Succesfully removed",
               
                variant: "Error"
            });
            this.dispatchEvent(evt);
            console.log('Enter increase::',element.productQuantity);
            this.products = [...this.products];
            console.log('Products:::',this.products);

        }
       
    }

    @track openDialog = false;
    handleQuoteGeneration(event){
        this.openDialog =true;
        
        

    }

    closeDialog(){
        this.openDialog =false;
    }

    handleOppCreation(event){
        const evt = new ShowToastEvent({
            title: "your Quotation Request is Placed",
            message: "Record ID: " + event.detail.id,
            variant: "success"
        });
        this.dispatchEvent(evt);
        this.opportunityId = event.detail.id;
        let productFilterData = this.products.filter(item=>{
            return item.productQuantity>0;
        });
        console.log('Enter quote gen',productFilterData);
        console.log('OppId::',this.opportunityId);

        createOLIsMethod({
            productList: productFilterData,
            oppId: this.opportunityId
        }).then((result)=>{
            console.log(JSON.stringify(result));
        }).catch((error)=>{
            console.log(error.body.message);
        })
    }


    keysearch(event){
        this.productNames = event.target.value;
    }


    updateContactHandler(event){

        this.visibleContacts=[...event.detail.records]

        console.log(event.detail.records);

    }
}