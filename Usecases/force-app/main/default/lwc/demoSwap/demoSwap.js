import { LightningElement, wire } from "lwc";
    import getAccountList from "@salesforce/apex/accountCreationController.getAccountList";
    export default class DemoSwap extends LightningElement {
      columns = [
        { label: "Account Name", fieldName: "Name", type: "text" },
        { label: "Industry", fieldName: "Industry", type: "text" },
        { label: "Phone", fieldName: "Phone", type: "Phone" },
      ];
      // To show values on the tables
      data2 = [];
      data1=[];
      @wire(getAccountList)
      wiredAccounts({ data, error }) {
        if (data) {
            // [...data] to make a shallow copy
          this.data1 = [...data]; 
          alert(JSON.stringify(this.data1));
          console.log(JSON.stringify(this.data1));
                } else if (error) {
          this.error = error;
        }
      }
      moveUp() {
        const selectedRows = this.template.querySelector(
          ".table1"
        ).selectedRows;
        if (selectedRows && selectedRows.length) {
          alert(this.selectedRows)
          this.data1 = [...this.data1, ...this.data2.filter((row)=>selectedRows.indexOf(row.id)>-1)];
          this.data2 = this.data2.filter((row)=>selectedRows.indexOf(row.id)===-1);
          this.data1.sort((a,b) => (a.id-b.id));
          this.data2.sort((a,b) => (a.id-b.id));
        }
      }
      moveDown() {
        alert(' methodstarted');
        const selectedRows = this.template.querySelector(
          ".table2"
        ).selectedRows;
        alert(' selectedrows'+selectedRows.length);
        if (selectedRows && selectedRows.length) {
          this.data2 = [...this.data2, ...this.data1.filter((row)=>selectedRows.indexOf(row.id)>-1)];
          this.data1 = this.data1.filter((row)=>selectedRows.indexOf(row.id)===-1);
          this.data1.sort((a,b) => (a.id-b.id));
          this.data2.sort((a,b) => (a.id-b.id));
        }
      }
      moveDown1() {
        const selectedRows = this.template.querySelector(
          ".table1"
        ).selectedRows;
        alert(' ',selectedRows);
        if (selectedRows && selectedRows.length) {
          this.data2 = [...this.data2, ...this.data1.filter((row)=>selectedRows.indexOf(row.id)>-1)];
          this.data1 = this.data1.filter((row)=>selectedRows.indexOf(row.id)===-1);
          this.data1.sort((a,b) => (a.id-b.id));
          this.data2.sort((a,b) => (a.id-b.id));
        }
      }
    }