import { LightningElement , api} from 'lwc';

export default class P2cAlertComponent extends LightningElement {

//Primitive Data

    @api messege; //string
    @api heading;
    @api number;
    @api valid;
}