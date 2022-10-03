/* eslint-disable no-console */
import { LightningElement, track, api } from 'lwc';

export default class PropDemo extends LightningElement {
    @track message = 'Reactive Property';

    @api message1 = 'Reactive Property using @api decorators';

    get name(){
        return 'Amit Singh';
    }

    get changedMessage(){
        
        return this.message1+' Added Value using get prop!';
    }

    handleChange(event){
        this.message1 = event.target.value;
        console.log(' Updated Message is ', this.message1);
    }

    renderedCallback(){
        console.log(' Rendered Callback');
    }

    connectedCallback(){
        console.log(' connected Callback');
    }

    disconnectedCallback(){

    }

    errorCallback(error, stack){
        console.error(error);
        console.log(stack)
    }
}