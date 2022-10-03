import { LightningElement, api } from 'lwc';

export default class P2cSliderComponent extends LightningElement {
 volume =20;
    changeHandler(event){
       this.volume= event.target.value;
    } 

   @api resetSlider(){
        this.volume =50;
    }
}