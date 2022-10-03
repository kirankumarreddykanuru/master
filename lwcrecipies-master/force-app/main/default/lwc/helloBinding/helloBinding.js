import { LightningElement, track } from 'lwc';

export default class HelloBinding extends LightningElement {

    @track message = 'Test Message';

    handleChange(event){
        this.message = event.target.value;
    }
 
    handleClick(){
        this.message = 'Button Clicked';
    }
}