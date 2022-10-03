import { LightningElement, api } from 'lwc';

export default class Lwcaura extends LightningElement {

    @api 
    childMethod(message, page_no){
        console.log(message);
        console.log(page_no);
    }
    handleClick(){
        const eve = new CustomEvent(
            "select",
            {
                detail : {
                    message : "LWC Component"
                }
            }
        );
        this.dispatchEvent(eve);
    }
}