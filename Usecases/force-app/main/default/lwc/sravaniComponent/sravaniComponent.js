import { LightningElement , track} from 'lwc';

export default class SravaniComponent extends LightningElement {
  initialName = 'Sravani';
 @track activetabContent = '';
  handleClick(event){ 
    this.activetabContent  = event.target.value;
    this.initialName ='7 Star Performance';
   }
    handle3Click(event){
    
    this.activetabContent  = event.target.value;
    this.initialName ='3 Star Performance';
   }
}