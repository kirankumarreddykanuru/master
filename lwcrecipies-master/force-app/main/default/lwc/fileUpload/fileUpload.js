/* eslint-disable no-console */
/* eslint-disable no-alert */
import { LightningElement, track } from 'lwc';

export default class FileUpload extends LightningElement {

    filesUploaded;
    @track fileName = '';

    handleChange(event){
        if(event.target.files.length > 0) {
            this.filesUploaded = event.target.files;
            for(let i=0; i < this.filesUploaded.length; i++){
                if(this.filesUploaded[i]){
                    this.fileName = this.fileName + this.filesUploaded[i].name;
                }
            }
        }
    }

    handleUpload(event){
        event.preventDefault();
        for(let i=0; i < this.filesUploaded.length; i++){
            if(this.filesUploaded[i]){
                let fileReader = new FileReader();
                let file = this.filesUploaded[i]; 
                fileReader.onloadend = (() => {
                    let fileContent = fileReader.result;
                    let base64 = 'base64,';
                    let content = fileContent.indexOf(base64) + base64.length;
                    console.log(content);
                    fileContent = fileContent.substring(content);
                    this.saveToFile(fileContent);
                });
                fileReader.onerror = (evt) => {
                    console.error("File could not be read! " , evt.target.error);
                };
                fileReader.readAsDataURL(file);
            }
        }
    }

    saveToFile(content){
        let file = encodeURIComponent(content);
        console.log(file);
    }
}