/* eslint-disable no-console */
import { LightningElement } from 'lwc';

export default class ApiFunction extends LightningElement {
    handleClick(){
        console.log(' Calling Child Component Method')
        this.template.querySelector('c-show-date').changeDateTime('After API Function');
    }
}