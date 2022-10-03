/* eslint-disable no-console */
import { LightningElement, track } from 'lwc';
import { add } from './shared.js';
import one from './utilities/one.html';
import { add1 } from './utilities/ut.js';
import main from './contactList.html';

export default class ContactList extends LightningElement {

    addition;
    @track switchTemplate = false;
    @track
    title = 'Welcome to Lightning Web Components Playground!';
    constructor(){
        super();
        const value = add(18, 76);
        this.addition = value;
        const val1 = add1(98,34);
        console.log( val1);
        console.log(value);
        console.log(val1+value);
        this.addition = this.addition + val1;
    }

    changeTemplate(){
        console.log(' Switching Template ');
        this.switchTemplate = !this.switchTemplate;
    }

    render(){
        console.log(' rendered called ');
        return this.switchTemplate ? one:main;
    }

    contacts = [
        {
            Id : 1,
            Name : 'Amit Singh',
            Email : 'sfdcpanther@gmail.com',
            Phone : '9876543210'
        },
        {
            Id : 2,
            Name : 'Jhon Doe',
            Email : 'jhon.doe@gmail.com',
            Phone : '9876543210'
        },
        {
            Id : 3,
            Name : 'Andrew John',
            Email : 'andrew.jhon@hotmail.com',
            Phone : '9876543210'
        }
    ];
}