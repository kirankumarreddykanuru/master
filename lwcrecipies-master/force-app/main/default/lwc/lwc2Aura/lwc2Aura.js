import { LightningElement, api } from 'lwc';

export default class Lwc2Aura extends LightningElement {

    @api
    childMethod(message, pageNo){
        console.log(' Child Method Called ', message );
        console.log(' Child Method Called ', pageNo );
    }

    handleClick(){
        const eve = new CustomEvent(
            "select",
            {
                detail : {  message : "Message From Child Component" }
            }
        );
        this.dispatchEvent(eve);
    }
}