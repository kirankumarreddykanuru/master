import { LightningElement } from 'lwc';

export default class Sibling extends LightningElement {

    connectedCallback(){

    }

    handleClick(){
        const clickEve = new CustomEvent(
            'divclicked',
            {
                detail : 'Pub Sub Model Sibling1'
            }
        );
        this.dispatchEvent(clickEve);
    }
}