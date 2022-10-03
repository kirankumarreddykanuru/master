import { LightningElement } from 'lwc';

export default class IteratorDemo extends LightningElement {
    contacts = [
        {
            Id : 1,
            Name : "Amit Sing",
            Email : "sfdcpanther@gmail.com"
        },
        {       
            Id : 2,
            Name : "Anuj Sing",
            Email : "anuj@outlook.com"
        },
        {
            Id : 3,
            Name : "Ankit Sing",
            Email : "ankit@hotmail.com"
        }
    ];
    myMap = new Map([
        [ "A", 1 ],
        [ "B", 2 ]
    ]);
}