// boundary.js
import { LightningElement, track } from 'lwc';
export default class Boundary extends LightningElement {
    @track error;
    @track stack;
    errorCallback(error, stack) {
        this.error = error;
        
    }
}