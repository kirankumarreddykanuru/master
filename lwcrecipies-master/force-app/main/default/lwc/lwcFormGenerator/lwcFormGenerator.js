/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import { LightningElement, track } from 'lwc';
import getObjects from '@salesforce/apex/FormGenerator.getObjects';
import getFieldList from '@salesforce/apex/FormGenerator.getFieldList';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
import style from '@salesforce/resourceUrl/style';
export default class LwcFormGenerator extends LightningElement {

    @track objectApiName;
    @track objects = []; 
    @track errors;
    @track value;
    @track fields;
    @track searchInput;
    @track isLoading = true;
    @track recordObject;
    @track selectedObjectName='';


    /* Properties For Generating The Form */
    @track TEMPLATE_START    = '<template>';
    @track TEMPLATE_END      = '</template>';
    @track CARD_START        = '<lightning-card title="Edit Record - New Record" icon-name="standard:record" class="slds-m-around_small">';
    @track BUTTON_SAVE       = '<div class="slds-p-around_small">'+
                                '<lightning-button label="Save Record" value="Save Record" onclick={saveRecord} '+
                                    'variant="brand" '+
                                    '></lightning-button>'+
                                '</div>';
    @track CARD_END          = '</lightning-card>';
    @track FORM_START        = '<div class="slds-grid slds-wrap">';
    @track FORM_END          = '</div>';
    @track INPUT_START       = '<div class="slds-col slds-size_1-of-2 slds-p-around_small">';
    @track INPUT_END         = '</div>';
    @track JAVASCRIPT_CLASS  = '';
    @track COMPLETE_TEMPLATE = '';
    styleInitialized = false;
    connectedCallback(){
        this.getAllObject('');
    }

    renderedCallback(){
        if (this.styleInitialized) {
            return;
        }
        this.styleInitialized = true;
        Promise.all([
            loadStyle(this, style)
        ])
        .then(() => {
            console.log('Style loaded ');
        })
        .catch(error => {
            
        });
    }

    handleSearch(event) {
        let searchValue = event.target.value;
        this.getAllObject(searchValue);
    }
    handleChange(event){
        this.isLoading = true;
        let selectedObject = event.target.value;
        this.selectedObjectName = selectedObject;
        getFieldList({
            selectedSObject : selectedObject
        })
        .then(records => {
            this.fields = records;
            this.errors = undefined;
            this.isLoading = false;
            //window.console.log(' Field Details ', this.fields );
            this.recordObject = '@track '+selectedObject+'Object={'
            for( let i=0; i< this.fields.length; i++) {
                let field = this.fields[i];
                this.recordObject += field.fieldAPIName +':\'\',';
            }
            this.recordObject = this.recordObject.substr(0, this.recordObject.length-1);
            this.recordObject+= '}';
        })
        .catch(errors => {
            this.errors = errors;
            this.fields = undefined;
            this.isLoading = false;
        })
    }
    getAllObject(inputValue) {
        this.isLoading = true;
        getObjects({
            searhInput : inputValue
        })
        .then(records => {
            let opt = [];
            for ( let i =0; i <  records.length; i++) {
                let fullRecord = records[i].split('####');
                opt.push({
                    label : fullRecord[1],
                    value : fullRecord[1]
                })
            }
            this.errors = undefined;
            this.objects = JSON.parse(JSON.stringify(opt))
            this.isLoading = false;
        })
        .catch(errors => {
            this.errors = errors;
            this.objects = undefined;
            this.isLoading = false;
        })
    }
    handleGenerate() {
        let tempTemplate= this.TEMPLATE_START;
        tempTemplate += this.CARD_START;
        tempTemplate += this.BUTTON_SAVE;
        let tempForm = this.FORM_START;
        for( let i=0; i < this.fields.length; i++ ) {
            let field = this.fields[i];
            let tempInput = this.INPUT_START;
            window.console.log(' field.required ', field.required);
            if ( field.fieldType === 'DOUBLE' || field.fieldType === 'INTEGER') {
                if ( field.required === true) {
                    tempInput += '<lightning-input onchange={handleInputChange} type="number" step="1" name="'+field.fieldAPIName+'" label="'+field.fieldLabel+'" value={'+this.selectedObjectName+'Object.'+field.fieldAPIName+'} required></lightning-input>'; 
                } else {
                    tempInput += '<lightning-input onchange={handleInputChange} type="number" step="1" name="'+field.fieldAPIName+'" label="'+field.fieldLabel+'" value={'+this.selectedObjectName+'Object.'+field.fieldAPIName+'} ></lightning-input>';
                }
                tempInput += this.INPUT_END;
                tempForm += tempInput;
            } else if( field.fieldType === 'STRING' || field.fieldType === 'PHONE') {
                if ( field.required === true) {
                    tempInput += '<lightning-input onchange={handleInputChange} type="text" name="'+field.fieldAPIName+'" label="'+field.fieldLabel+'" value={'+this.selectedObjectName+'Object.'+field.fieldAPIName+'} required ></lightning-input>'; 
                } else {
                    tempInput += '<lightning-input onchange={handleInputChange} type="text" name="'+field.fieldAPIName+'" label="'+field.fieldLabel+'" value={'+this.selectedObjectName+'Object.'+field.fieldAPIName+'} ></lightning-input>'; 
                }
                
                tempInput += this.INPUT_END;
                tempForm += tempInput;
            } else if( field.fieldType === 'CURRENCY' ) {
                if ( field.required === true) {
                    tempInput += '<lightning-input onchange={handleInputChange} type="number" step="1" formatter="currency" name="'+field.fieldAPIName+'" label="'+field.fieldLabel+'" value={'+this.selectedObjectName+'Object.'+field.fieldAPIName+'} required ></lightning-input>'; 
                } else {
                    tempInput += '<lightning-input onchange={handleInputChange} type="number" step="1" formatter="currency" name="'+field.fieldAPIName+'" label="'+field.fieldLabel+'" value={'+this.selectedObjectName+'Object.'+field.fieldAPIName+'} ></lightning-input>'; 
                }
                tempInput += this.INPUT_END;
                tempForm += tempInput;
            } else if( field.fieldType === 'PERCENT' ) {
                if ( field.required === true) {
                    tempInput += '<lightning-input onchange={handleInputChange} type="number" step="0.01" formatter="percent" name="'+field.fieldAPIName+'" label="'+field.fieldLabel+'" value={'+this.selectedObjectName+'Object.'+field.fieldAPIName+'} required ></lightning-input>'; 
                } else {
                    tempInput += '<lightning-input onchange={handleInputChange} type="number" step="0.01" formatter="percent" name="'+field.fieldAPIName+'" label="'+field.fieldLabel+'" value={'+this.selectedObjectName+'Object.'+field.fieldAPIName+'} ></lightning-input>'; 
                }
                tempInput += this.INPUT_END;
                tempForm += tempInput;
            } else if ( field.fieldType === 'TEXTAREA') {
                if ( field.required === true) {
                    tempInput += '<lightning-textarea onchange={handleInputChange} name="'+field.fieldAPIName+'" label="'+field.fieldLabel+'" value={'+this.selectedObjectName+'Object.'+field.fieldAPIName+'} required ></lightning-textarea>'; 
                } else {
                    tempInput += '<lightning-textarea onchange={handleInputChange} name="'+field.fieldAPIName+'" label="'+field.fieldLabel+'" value={'+this.selectedObjectName+'Object.'+field.fieldAPIName+'} ></lightning-textarea>'; 
                }
                tempInput += this.INPUT_END;
                tempForm += tempInput;
            } else if ( field.fieldType === 'URL') {
                if ( field.required === true) {
                    tempInput += '<lightning-input onchange={handleInputChange} type="url" name="'+field.fieldAPIName+'" label="'+field.fieldLabel+'" value={'+this.selectedObjectName+'Object.'+field.fieldAPIName+'} required ></lightning-input>'; 
                } else {
                    tempInput += '<lightning-input onchange={handleInputChange} type="url" name="'+field.fieldAPIName+'" label="'+field.fieldLabel+'" value={'+this.selectedObjectName+'Object.'+field.fieldAPIName+'} ></lightning-input>'; 
                }
                tempInput += this.INPUT_END;
                tempForm += tempInput;
            } else if ( field.fieldType === 'DATE') {
                if ( field.required === true) {
                    tempInput += '<lightning-input onchange={handleInputChange} type="date" name="'+field.fieldAPIName+'" date-style="long" label="'+field.fieldLabel+'" value={'+this.selectedObjectName+'Object.'+field.fieldAPIName+'} required ></lightning-input>'; 
                } else {
                    tempInput += '<lightning-input onchange={handleInputChange} type="date" name="'+field.fieldAPIName+'" date-style="long" label="'+field.fieldLabel+'" value={'+this.selectedObjectName+'Object.'+field.fieldAPIName+'} ></lightning-input>'; 
                }
                tempInput += this.INPUT_END;
                tempForm += tempInput;
            } else if ( field.fieldType === 'EMAIL') {
                if ( field.required === true) {
                    tempInput += '<lightning-input onchange={handleInputChange} type="email" name="'+field.fieldAPIName+'" label="'+field.fieldLabel+'" value={'+this.selectedObjectName+'Object.'+field.fieldAPIName+'} required ></lightning-input>'; 
                } else {
                    tempInput += '<lightning-input onchange={handleInputChange} type="email" name="'+field.fieldAPIName+'" label="'+field.fieldLabel+'" value={'+this.selectedObjectName+'Object.'+field.fieldAPIName+'} ></lightning-input>';
                }
                tempInput += this.INPUT_END;
                tempForm += tempInput;
            } else if ( field.fieldType === 'DATETIME') {
                if ( field.required === true) {
                    tempInput += '<lightning-input onchange={handleInputChange} type="datetime" name="'+field.fieldAPIName+'" label="'+field.fieldLabel+'" value={'+this.selectedObjectName+'Object.'+field.fieldAPIName+'} required ></lightning-input>'; 
                } else {
                    tempInput += '<lightning-input onchange={handleInputChange} type="datetime" name="'+field.fieldAPIName+'" label="'+field.fieldLabel+'" value={'+this.selectedObjectName+'Object.'+field.fieldAPIName+'} ></lightning-input>'; 
                }
                tempInput += this.INPUT_END;
                tempForm += tempInput; 
            } else if ( field.fieldType === 'MULTIPICKLIST') {
                tempInput += '<c-multi-picklist onmulselected={handlePickListSelect} object-api-name="'+this.selectedObjectName+'" field-api-name="'+field.fieldAPIName+'" label="'+field.fieldLabel+'" ></c-multi-picklist>';
                tempInput += this.INPUT_END;
                tempForm += tempInput;
            } else if ( field.fieldType === 'REFERENCE') {
                let objeName = field.parentObjectName;
                let label = '';
                if (field.fieldLabel.includes('ID')) {
                    label = field.fieldLabel.replace('ID', '');
                } else {
                    label = field.fieldLabel;
                }
                let clookup = '<c-custom-lookup label="'+label+'" variant="label-stacked" object-api-name="'+objeName+'" iconname="standard:record" field-api-name="Name" relationshipfield ="'+field.fieldAPIName+'" onlookup={handleLookupSelect} ></c-custom-lookup>';
                tempInput += clookup;
                tempInput += this.INPUT_END;
                tempForm += tempInput;
            } else if ( field.fieldType === 'PICKLIST') {
                tempInput += '<c-picklist-component onselected={handlePickListSelect} object-api-name="'+this.selectedObjectName+'" field-api-name="'+field.fieldAPIName+'" label="'+field.fieldLabel+'" ></c-picklist-component>';
                tempInput += this.INPUT_END;
                tempForm += tempInput;
            } 
        }
        //console.log(' tempForm ', tempForm+this.FORM_END);

        let completeTemp = tempTemplate + tempForm+this.FORM_END + this.CARD_END +this.TEMPLATE_END;
        //console.log(' completeTemplate ', completeTemplate);
        this.COMPLETE_TEMPLATE = completeTemp;
        let JSCLASS = '';
        JSCLASS += this.prepareJSClass();
        JSCLASS += this.recordObject;
        JSCLASS += this.prepareHandleChangeMethod();
        JSCLASS += this.prepareHandleLookupMethod();
        JSCLASS += this.prepareHandlePickListSelect();
        JSCLASS += this.prepareValidateForm();
        JSCLASS += this.prepareSaveMethod();
        JSCLASS += '}';
        this.JAVASCRIPT_CLASS = JSCLASS;
    }

    generatePicklistCode(piclListValues) {
        let options = [];
        for(let i=0; i<piclListValues.length; i++) {
            let opt = piclListValues[i].split('####');
            options.push({
                label : opt[0],
                value : opt[1]
            });
        }
        return options;
    }
    prepareJSClass() {
        let tempClass = 'import { LightningElement, track, api, wire } from \'lwc\';';
        tempClass += 'export default class GeneratedComponent extends LightningElement {';
        return tempClass;
    }

    prepareHandleChangeMethod() {
        var methodStructure = 'handleInputChange(event) {'+
            'let apiName  = event.target.name;'+
            'let inputval = event.target.value;'+
            'this.'+this.selectedObjectName+'Object[apiName] = inputval'+
        '}';
        return methodStructure;
    }
    prepareHandleLookupMethod(){
        let tempMethod = 'handleLookupSelect(event){'+
            'let selectedRecordId = event.detail.recordId;'+
            'let lookupfield   = event.detail.relationshipfield;'+
            '/* Get Index in case lookup is being used in Multiline Edit Form */'+
            'let index   = event.detail.index;'+
            'this.'+this.selectedObjectName+'Object[lookupfield] = selectedRecordId'+
        '}';
        return tempMethod;
    }

    prepareHandlePickListSelect() {
        let tempHandleSelect = 'handlePickListSelect(event) {'+
            'let pickVal = event.detail.picklistvalue;'+
            'let fieldApiName = event.detail.fieldApiName;'+
            'this.'+this.selectedObjectName+'Object[fieldApiName] = pickVal'+
        '}';
        return tempHandleSelect;
    }

    handleOk(){
        this.COMPLETE_TEMPLATE = undefined;
    }
    prepareValidateForm() {
       let allValid = 'validateForm(){'+
            'const allValid = [...this.template.querySelectorAll(\'lightning-input\')]'+
                '.reduce((validSoFar, inputCmp) => {'+
                            'inputCmp.reportValidity();'+
                            'return validSoFar && inputCmp.checkValidity();'+
                '}, true);'+
            'let txtArea = [...this.template.querySelectorAll(\'lightning-textarea\')];'+
            'let allValidTxtArea;'+
            'if( txtArea ) {'+
                'allValidTxtArea = txtArea'+
                '.reduce((validSoFar, inputCmp) => {'+
                            'inputCmp.reportValidity();'+
                            'return validSoFar && inputCmp.checkValidity();'+
                '}, true);'+
            '}'+
            'let isValid = allValid;'+
            'if( txtArea ) {'+
                'isValid = allValid && allValidTxtArea;'+
            '}'+
            'return isValid;'+
        '}';
        return allValid;
    }

    prepareSaveMethod() {
        let saveMethod = 'saveRecord() {'+
            'let allValid = this.validateForm();'+
            'if ( allValid ) {'+
                '/* Put your Logic here */'+
            '}'+
        '}';
        return saveMethod;
    }
    
}