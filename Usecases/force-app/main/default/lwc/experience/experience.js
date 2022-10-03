import { LightningElement, track } from 'lwc';

export default class Experience extends LightningElement {
    selectedItem;
    
    activeTab ='1';

    get bDisableBackBtn(){
        return Number(this.activeTab) == 1 ? true : false;
    }
    get bDisableNextBtn(){
        return Number(this.activeTab) == 4 ? true : false;
    }
    handleActive(event){
        this.activetab=event.target.value;
    }
    goNext(){
        let activeTabValue = Number(this.activeTab) + 1;
        this.activeTab = activeTabValue.toString();
      }

    handleSelect(event) {
        this.selectedItem  = event.detail.name;  
    }
    
     handleClick(event) {
    this.clickedButtonLabel = event.target.label;  
    
    }
    
    get reportrecent() {
        return this.selectedItem === 'reports_recent';
     }
    
     get privatereport() {
         return this.selectedItem === 'reports_private';
     }
    
      get pubreport() {
         return this.selectedItem === 'reports_public';
     }
}