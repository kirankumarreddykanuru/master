import { LightningElement, api } from 'lwc';

export default class MetaExaples extends LightningElement {
    @api message;
    @api pageno;

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
    ]
}