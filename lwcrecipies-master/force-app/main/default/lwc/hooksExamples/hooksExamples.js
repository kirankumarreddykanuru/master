/* eslint-disable no-console */
/* eslint-disable no-useless-constructor */
import { LightningElement } from 'lwc';

export default class HooksExamples extends LightningElement {

    name = 'Amit ';
    constructor(){
        super();
        console.log(' inside construtcor ');
        this.name = this.name +' Singh';
    }

    connectedCallback(){
        console.log(' connectedCallback ');
    }

    disconnectedCallback(){
        console.log(' disconnectedCallback ');
    }

     /*
    render(){
        return
    }
    */
   
    renderedCallback(){
        console.log(' renderedCallback ');
    }
   

    errorCallback(error, stack ){
        console.error(error)
    }
}