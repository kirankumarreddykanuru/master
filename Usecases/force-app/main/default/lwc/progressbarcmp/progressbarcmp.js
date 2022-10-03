import { LightningElement } from 'lwc';

export default class Progressbarcmp extends LightningElement {
        tick = 0;
    
        get percentile(){
            return `${(this.tick / 10)*1}`
        }
    
        get widthPercentage(){
            return `width:${this.percentile}%`
        }
    
        increase(){
            this.tick +=10
        }
        decrease(){
            this.tick -=10
        }
    
    }