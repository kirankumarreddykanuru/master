import { LightningElement } from 'lwc';
import {NavigationMixin} from 'lightning/navigation'

export default class QlineItems extends NavigationMixin(LightningElement){
    navigation(){
        this[NavigationMixin.Navigate]({
                type:'standard__objectPage',
                attributes:{
                  objectApiName : 'QuoteLineItem',
                  actionName :'Add Products'
                }
        })
    }
   
}