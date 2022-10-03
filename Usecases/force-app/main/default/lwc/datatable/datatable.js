import { LightningElement } from 'lwc';

export default class Datatable extends LightningElement {
    
        columns = [
            {label:'Account Name',fieldName:'Name',type:'text'},
            {label:'Industry',fieldName:'Industry',type:'text'},       
            {label:'Phone', fieldName:'Phone', type:'Phone'}
         ];
         data1= [{id:"1", Name:'vignesh',Industry: "Apparel", Phone:"101-9704587657"},
                {id:"2", Name:'pettor',Industry: "Apparel", Phone:"98-9704587657"},
                {id:"3", Name:'harry',Industry: "Energy", Phone:"21-894587657"},
                {id:"4", Name:'AB solutions',Industry: "Banking", Phone:"80-98020203"},
                {id:"5", Name:'CID solutions',Industry: "Energy", Phone:"97-04587657"},
                {id:"6", Name:'CL gulfy',Industry: "Banking", Phone:"(010)-9704587657"}, ];
        // @track data1;
        // @wire(getAccountList)
        //     wiredAccounts({
        //         error,
        //         data
        //     }) {
        //         if (data) {
        //             this.data1 = data;
        //         } else if (error) {
        //             this.error = error;
        //         }
        //     }
          data2 = [];
          moveUp() {
            const selectedRows = this.template.querySelector(
              ".table2"
            ).selectedRows;
            alert('move up ',selectedRows);
            if (selectedRows && selectedRows.length) {
              this.data1 = [...this.data1, ...this.data2.filter((row)=>selectedRows.indexOf(row.id)>-1)];
              this.data2 = this.data2.filter((row)=>selectedRows.indexOf(row.id)===-1);
              this.data1.sort((a,b) => (a.id-b.id));
              this.data2.sort((a,b) => (a.id-b.id));
            }
         
          }
          moveDown() {
            const selectedRows = this.template.querySelector(
              ".table1"
            ).selectedRows;
            alert('selectedrows '+selectedRows.length);
            if (selectedRows && selectedRows.length) {
              this.data2 = [...this.data2, ...this.data1.filter((row)=>selectedRows.indexOf(row.id)>-1)];
              this.data1 = this.data1.filter((row)=>selectedRows.indexOf(row.id)===-1);
              this.data1.sort((a,b) => (a.id-b.id));
              this.data2.sort((a,b) => (a.id-b.id));
            }
          }
        
    }