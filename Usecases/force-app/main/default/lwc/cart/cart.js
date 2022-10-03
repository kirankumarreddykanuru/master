import { LightningElement,api } from 'lwc';
import cartList from '@salesforce/apex/getProducts.oliItems';
export default class Cart extends LightningElement {
    @api items;
    /* cartItems;
    error;
     sCart(){
        cartList().then(records => {
                        this.cartItems = records;
                        console.log('cart items '+ cartItems);
                        
                    })
                    .catch(error => {
                        this.error = error;
                        console.log('error entered');
                    });
              


     }*/

}