import { LightningElement, api, track } from 'lwc';

export default class DesignAttribute extends LightningElement {
    @api height;
    @api width;
    @api message;
    @track newMessage;
}