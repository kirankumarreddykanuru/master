/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { LightningElement , track } from 'lwc';
import { showToast } from 'c/utils';
export default class DragDrop extends LightningElement {

    filesUploaded;
    @track fileName = '';
    @track csvJSON = [{
        Name : ''
    }];

    handleDragEnter(event) {
        console.log(' Drag Enter ')
        event.target.style.border = "3px dotted red";
    }
    handleDragLeave(event) {
        event.target.style.border = "";
    }
    handleDragEnd() {
        console.log(' Drag End ')
    }
    ondragleave() {
        console.log(' Drag Leave ')
    }

    dragStart(event){
        event.dataTransfer.dropEffect = "move";
        event.dataTransfer.setData('text', event.target.innerText);
     }

    handleDrop(event){
        event.preventDefault();
        let parentitem = event.target.id;
        let item = event.dataTransfer.getData('text');
        window.console.log(' Data from div ', item + '   parentitem Id ', parentitem);
    }
    allowDrop(event) {
        event.dataTransfer.dropEffect = 'move';
        event.preventDefault();
    }

    handleUpload(event) {
        event.preventDefault();
        if (!this.filesUploaded) {
            const eventError = showToast(
                'dismissable',
                'error',
                'Select File !!',
                'Please Browse your file which contains the role information !!'
            );
            this.dispatchEvent(eventError);
        }
        if (this.filesUploaded.length > 0) {
            let fileReader = new FileReader();
            let file = this.filesUploaded[0];
            fileReader.onloadend = (() => {
                let fileContent = fileReader.result;
                /*let base64 = 'base64,';
                window.console.log(' parsing csv file ..... ',fileContent);
                let content = fileContent.indexOf(base64) + base64.length;
                fileContent = fileContent.substring(content);
                window.console.log('fileContent ', atob(fileContent));*/
                this.parseCSVString(fileContent);
            });
            fileReader.onerror = (evt) => {
                window.console.error("File could not be read! ", evt.target.error);
            };
            //fileReader.readAsDataURL(file);
            fileReader.readAsBinaryString(file);
        }
    }

    handleChange(event) {
        if(event.target.files.length > 0) {
            this.filesUploaded = event.target.files;
            for(let i=0; i < this.filesUploaded.length; i++){
                if(this.filesUploaded[i]){
                    this.fileName = this.fileName + this.filesUploaded[i].name;
                }
            }
        }
    }

    parseCSVString(csvFile) {
        let csvString = csvFile.split('\n');
        /*let commaSeprated = csvString.split(',');
        window.console.log(commaSeprated);*/
        //window.console.log(csvString);
        
        for ( let i= 0; i < csvString.length; i++ ) {
            let headers ;
            if( i === 0 ) {
                headers = csvString[i].split(',');
                window.console.log(' headers ', headers );
            }
            else {
                let csvRow = csvString[i].split(',');
                /*for ( let j=0; j < csvRow.length; i++) {
                    
                }*/
                console.log(' csvRow ', csvRow);
            }
        }

    }
}