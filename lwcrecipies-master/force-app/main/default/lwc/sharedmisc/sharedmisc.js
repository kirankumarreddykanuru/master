/* eslint-disable no-console */
import { LightningElement, track } from 'lwc';
import { si } from 'c/utility';
export default class Sharedmisc extends LightningElement {

    @track p; 
    @track r;
    @track t;
    
    constructor(){
        super();
        const s = si(10000, 1, 10);
        console.log(' Simple Interest is ', s);
    }

    calculateSi(){
        const s = si(this.p, this.t, this.r);
        console.log(' Simple Interest is ', s);
    }
}