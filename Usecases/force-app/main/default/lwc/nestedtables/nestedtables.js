import { LightningElement } from 'lwc';

export default class Nestedtables extends LightningElement {
    handleSubChange(event) {
    //handle subscription level row selection
    this.selectedSubscription = event.target.dataset.key;
     
    const childRows = this.template.querySelectorAll('tr[data-name="child-table"]');
    console.log(childRows);
    console.log(this.selectedSubscription);
        childRows.forEach(row => {
            console.log(row.dataset.key);
        if(row.dataset.key === this.selectedSubscription) {
            row.style.display = "table-row";
        }
        else {
            row.style.display = "none";
        }
    }); 

    this.template.querySelector("c-subscription-products[data-active-key='" + this.selectedSubscription + "']").handleProductSelect(this.productsTable, this.selectedSubscription);
    }
}