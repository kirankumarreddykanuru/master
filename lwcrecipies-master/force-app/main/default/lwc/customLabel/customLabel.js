/* eslint-disable no-undef */
/* eslint-disable no-console */
import { LightningElement, track } from 'lwc';
import salesforceLogoDescription from '@salesforce/label/c.salesforceLogoDescription';
import Salesforce_LOGo from '@salesforce/resourceUrl/salesforceLogo';
import moment from '@salesforce/resourceUrl/moment';
import css_file from '@salesforce/resourceUrl/CSS';
import { loadScript, loadStyle } from 'lightning/platformResourceLoader';
export default class CustomLabel extends LightningElement {
    @track LOGO_DESC = salesforceLogoDescription;
    @track logo = Salesforce_LOGo;

    connectedCallback(){
        Promise.all(
            loadScript(this, moment),
            loadStyle(this, css_file)
        )
        .then(() => {

        })
        .catch(error => {

        });

    }
}