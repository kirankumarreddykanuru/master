import { LightningElement,track,wire } from 'lwc';
import TIMEZONE from '@salesforce/i18n/timezone'
import {loadStyle} from 'lightning/platformResourceLoader';
import COLORS from '@salesforce/resourceUrl/LwcDatatableStylesheet';

import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import {getRecord} from 'lightning/uiRecordApi';
import PROFILE_NAME from '@salesforce/schema/User.Profile.Name';
import DATE_FORMAT from '@salesforce/i18n/dateTime.shortDateFormat';

import CURRENT_USER from '@salesforce/user/Id';
import PRICE_RECORD_OBJECT from '@salesforce/schema/Price_Record_SIG__c';
import STATUS_FIELD from '@salesforce/schema/Price_Record_SIG__c.Status_SIG__c';
import CURRENCY_FIELD from '@salesforce/schema/Price_Record_SIG__c.CurrencyIsoCode';
import PRODUCT_OBJECT from '@salesforce/schema/Product2';
import PRODUCT_FORM_FIELD from '@salesforce/schema/Product2.Product_Form_SIG__c';
import PRODUCT_PACKAGE_FIELD from '@salesforce/schema/Product2.Package_SIG__c';
import PRODUCT_FUNCTIONALITY_FIELD from '@salesforce/schema/Product2.Product_Functionality_SIG__c';

import fetchFiltersMethod from '@salesforce/apex/SI_PriceRecordsClassesUtilityMethods.fetchFiltersMethod';
import filterPlantsMethod from '@salesforce/apex/SI_PriceRecordsClassesUtilityMethods.filterPlantsMethod';
import fetchPricesMethod from '@salesforce/apex/SI_PricingAction_Controller.fetchPricesMethod';
import fetchCurrenciesMethod from '@salesforce/apex/SI_PriceRecordsClassesUtilityMethods.fetchCurrenciesMethod';
import fetchCurrentUserProfileMethod from '@salesforce/apex/SI_PriceRecordsClassesUtilityMethods.fetchCurrentUserProfile';
import pricingActionProfileCustomSettingsMethod from '@salesforce/apex/SI_PricingAction_Controller.pricingActionProfileCustomSettings'
import getPriceRecordsMethod from '@salesforce/apex/SI_PricingAction_Controller.getPriceRecords';
import approvalSubmitMethod from '@salesforce/apex/SI_PricingAction_Controller.approvalSubmitMethod';
import createOpportunityMethod from '@salesforce/apex/SI_PricingAction_Controller.CreateOpportunityMethod';



const actions = [
    { label: 'Custom Scales', name: 'Custom_Scales' }
];
const prColumns = [
{label:'Current Price Record',fieldName:'currentPriceRecordLink',type:'url',hideDefaultActions:'true',sortable:'true',typeAttributes: { label: { fieldName: "Name" }, tooltip:"Name", target: "_blank" },initialWidth:120},
{label:'Product', fieldName:'ProductName', type:'Text',hideDefaultActions:'true',sortable:'true',initialWidth:200,typeAttributes:{tooltip:{fieldName:'ProductName'}}},
{label:'Regional Account', fieldName:'RegionalAccount',type:'Text',hideDefaultActions:'true',sortable:'true',initialWidth:150},
{label:'Incoterm',fieldName:'Incoterm',type:'text',hideDefaultActions:'true',sortable:'true',initialWidth:150},
{label:'Pricing Region',fieldName:'CustomerRegion',type:'text',hideDefaultActions:'true',sortable:'true',initialWidth:120},
/*{label:'UOM',fieldName:'UoM_SIG__c',type:'text',hideDefaultActions:'true',sortable:'true',initialWidth:100},
{label:'per UOM',fieldName:'Per_SIG__c',type:'Text',hideDefaultActions:'true',sortable:'true',initialWidth:100},
{label:'PR Currency',fieldName:'CurrencyIsoCode',type:'text',hideDefaultActions:'true',initialWidth:100},*/
{label:'Previous Price(USD/KG)', fieldName:'Previous_Price_USD_KG_SIG__c',type:'currency',hideDefaultActions:'true',sortable:'true',initialWidth:120,typeAttributes:{currencyCode:"USD",minimumFractionDigits:{fieldName:'decimalPlacesUSD'},maximumFractionDigits:{fieldName:'decimalPlacesUSD'}}},
{label:'Previous Price Record',fieldName:'previousPriceRecordLink',type:'url',hideDefaultActions:'true',sortable:'true',typeAttributes: { label: { fieldName: "previousPriceRecordName" }, tooltip:"Previous Price Record", target: "_blank" },initialWidth:120},
{label:'Floor Price(USD/KG)',fieldName:'floorPrice',type:'currency',hideDefaultActions:'true',sortable:'true',initialWidth:120,typeAttributes:{currencyCode:"USD",minimumFractionDigits:{fieldName:'decimalPlacesUSD'},maximumFractionDigits:{fieldName:'decimalPlacesUSD'}}},
{label:'Target Price(USD/KG)',fieldName:'targetPrice',type:'currency',hideDefaultActions:'true',sortable:'true',initialWidth:120,typeAttributes : {currencyCode:"USD",minimumFractionDigits:{fieldName:'decimalPlacesUSD'},maximumFractionDigits:{fieldName:'decimalPlacesUSD'}}},
{label:'List Price(USD/KG)', fieldName:'listPrice', type:'currency',hideDefaultActions:'true',sortable:'true',initialWidth:120,typeAttributes : {currencyCode:"USD",minimumFractionDigits:{fieldName:'decimalPlacesUSD'},maximumFractionDigits:{fieldName:'decimalPlacesUSD'}}},
//{label:'Current Price',fieldName:'Current_Price_SIG__c',type:'currency',hideDefaultActions:'true',sortable:'true',initialWidth:120,typeAttributes:{currencyCode:{fieldName:'CurrencyIsoCode'},minimumFractionDigits:{fieldName:'decimalPlaces'},maximumFractionDigits:{fieldName:'decimalPlaces'}}},
{label:'Current Price(USD/KG)',fieldName:'Current_Price_USD_KG_SIG__c',type:'currency',hideDefaultActions:'true',sortable:'true',initialWidth:120,typeAttributes:{currencyCode:'USD',minimumFractionDigits:'2',maximumFractionDigits:'2'}},
{label:'Validity From',fieldName:'Validity_From_SIG__c',type:'date-local',hideDefaultActions:'true',sortable:'true',initialWidth:120,},
{label:'Validity To',fieldName:'Validity_to_SIG__c',type:'date-local',hideDefaultActions:'true',sortable:'true',initialWidth:120},
{label:'Nominated Price(USD/KG)',fieldName:'newPriceUSD',type:'currency',hideDefaultActions:'true',sortable:'true',initialWidth:130,typeAttributes:{currencyCode:"USD",minimumFractionDigits:{fieldName:'decimalPlacesUSD'},maximumFractionDigits:{fieldName:'decimalPlacesUSD'}},
cellAttributes:{class:{fieldName:'textColor'}}},
{label:'New Price Valid From',fieldName:'New_Validity_From_SIG__c',type:'date-local',hideDefaultActions:'true',initialWidth:130,sortable:'true',cellAttributes:{class:{fieldName:'textColor'}}},
{label:'New Price Valid To',fieldName:'New_Validity_To_SIG__c',type:'date-local',hideDefaultActions:'true',initialWidth:130,sortable:'true',cellAttributes:{class:{fieldName:'textColor'}}},
{label:'Sold-to Account', fieldName:'Account', type:'Text',hideDefaultActions:'true',sortable:'true',initialWidth:150},
{label:'Ship-To',fieldName:'ShipTo',type:'text',hideDefaultActions:'true',sortable:'true',initialWidth:150},
{label:'Ship-From',fieldName:'ShipFrom',type:'text',hideDefaultActions:'true',sortable:'true',initialWidth:150},
{label:'Account Manager', fieldName:'AccountManager', type:'Text',hideDefaultActions:'true',sortable:'true',initialWidth:150}
]

export default class SI_PricingActionCmp extends LightningElement {
    priceRecordsRealData = [];
    priceRecordsData = [];
    priceData = [];
    newPriceRecords = [];
    //@track newPriceSelectedRows = [];
    //@track selectedRows=[];
    selectedRowsTemp=[];
    priceColumns = [{label:'SKU',fieldName:'skuName',type:'Text',typeAttributes: { tooltip:{fieldName: 'skuName' }}},
                    {label:'PH3',fieldName:'ph3Name',type:'Text',typeAttributes: { tooltip:{fieldName: 'ph3Name' }}},
                    {label:'Product Code',fieldName:'ProductCode',type:'Text'},
                    {label:'Region',fieldName:'region',type:'Text'},
                    {label:'Manufacturing Plant',fieldName:'manufacturingPlant',type:'Text',typeAttributes: { tooltip:{fieldName: 'manufacturingPlant' }}},
                    {label:'package',fieldName:'package',type:'Text'},
                    {label:'Package Size',fieldName:'packageSize',type:'Text'},
                    {label:'Currency',fieldName:'CurrencyIsoCode',type:'Text'},
                    {label:'Avg Material Cost/1000kg',fieldName:'avgMaterialCost',type:'currency',typeAttributes: { currencyCode:{fieldName: 'CurrencyIsoCode' },minimumFractionDigits:{fieldName:'decimalPlaces'},maximumFractionDigits:{fieldName:'decimalPlaces'}},cellAttributes:{alignment:'left'}},
                    {label:'Floor Price',fieldName:'Floor_Price__c',type:'currency',typeAttributes: { currencyCode:{fieldName: 'CurrencyIsoCode' },minimumFractionDigits:{fieldName:'decimalPlaces'},maximumFractionDigits:{fieldName:'decimalPlaces'}},cellAttributes:{alignment:'left'}},
                    {label:'Target Price',fieldName:'Target_Price__c',type:'currency',typeAttributes: { currencyCode:{fieldName: 'CurrencyIsoCode' },minimumFractionDigits:{fieldName:'decimalPlaces'},maximumFractionDigits:{fieldName:'decimalPlaces'}},cellAttributes:{alignment:'left'}},
                    {label:'List Price',fieldName:'UnitPrice',type:'currency',typeAttributes: { currencyCode:{fieldName: 'CurrencyIsoCode' },minimumFractionDigits:{fieldName:'decimalPlaces'},maximumFractionDigits:{fieldName:'decimalPlaces'}},cellAttributes:{alignment:'left'}}]
    priceRecordColumns = prColumns;
    @track filterOptions = {regionOptions:[],plantOptions:[],pmOptions:[],amOptions:[],productPackageOptions:[],productFunctionalityOptions:[],productFormOptions:[],statusOptions:[]};
    prFromOptions = [{label:'All',value:'0'},
                        {label:' last 6 months',value:'6'},
                        {label:'last 1 year',value:'12'},
                        {label:'last 2 years',value:'24'}];
    priceVariantOptions = [{label:'New Nominated Price(USD/Kg)',value:'amount'},{label:'Percentage Increase',value:'percent'},{label:'Number Increase(USD/Kg)',value:'price'}];
    priceTypeOptions = [
		{ label: 'All', value: 'All' },
		{ label: 'Contracted', value: 'Contracted' },
		{ label: 'Formula', value: 'FormulaBased' },
		{ label: 'Contracted and Formula', value: 'ContractedAndFormula' },
		{ label: 'Regular', value: 'Regular' },
		{ label: 'Spot Business', value: 'SpotBusiness' }
	];
    product= null;
    productName = null;
    tempProduct = {Id:null,Name:null};
    prodcutFeildSet = ['ProductCode','Product_Type__c','Description'];
    productExtraSearchField = 'ProductCode';
    productFilters;
    productColumnLabels = ['Product Name','Product Code','Product Type','Description'];

    account = null;
    accountName = null;
    tempAccount = {Id:null,Name:null};
    accountFieldSet = ['SAP_ID_SIG__c','BillingCity','BillingState'];
    accountextraSearchField = 'SAP_ID_SIG__c';
    accountColumnLabels = ['Account Name','SAP Id','Billing City','Billing State'];
    accountFilters = JSON.stringify([{fieldName:'RecordType.DeveloperName',operator:'NOT IN',value:'Global,Prospect',logicalOperator:''}]);
    
    sortBy;
    sortDirection = 'asc';
    startNumber;
    endNumber;
    currentPageNumber = 1;
    region = 'All';
    tempRegion = 'All';
    productForm = 'All';
    tempProductForm = 'All';
    productPackage = 'All';
    tempProductPackage = 'All';
    productFunctionality = 'All';
    tempProductFunctionality = 'All';
    productManager = 'All';
    tempProductManager = 'All';
    accountManager = 'All';
    tempAccountManager = 'All';
    isBelowFloorPrice = false;
    tempIsBelowFloorPrice = false;
    isBelowTargetPrice = false;
    tempIsBelowTargetPrice = false;
    status='New';
    tempStatus = 'New';
    priceRecordType = 'Regular';
    tempPriceRecordType = 'Regular';
    manufacturingPlant = 'All';
    tempManufacturingPlant = 'All'
    priceRecordsFrom='0';
    tempPriceRecordsFrom = '0';
    lastCreatedDate;
    error;
    priceVariant = 'price';
    newPrice;
    newValidFrom;
    newValidTo;
    isModalOpen = false;
    pageSize = 100;
    listLength;
    totalPages;
    isPendingApproval = false;
    showSpinner = false;
    showPopupSpinner = false;
    urlLink;
    isNominated = false;
    isPmCurrentUser = true;
    hideSubmit = false;
    currentUserProfile;
    submitToAmsButtonVisibility;
    createOpportunityButtonVisibility;
    pricingActionProfileCustomSettings;
    isCreateOpportunity;
    hideAmFilter;
    nominatedRecordsSelectAll = false;
    currencyTypes;
    customScalesSpinner = false;
    showCustomScales = false;
    customScalesData = [];
    customScalesColumns = [{label:'Min Pallet Quantity',fieldName:'Minimum_Pallet_Order_Quantity_SIG__c',type:'number',cellAttributes:{alignment:'left'}},
                            {label:'Max Pallet Quantity',fieldName:'Maximum_Pallet_Order_Quantity_SIG__c',type:'number',cellAttributes:{alignment:'left'}},
                            {label:'Upcharge',feildName:'Upcharge_SIG__c',type:'currency',typeAttributes: { currencyCode:{fieldName: 'CurrencyIsoCode' }},cellAttributes:{alignment:'left'}}]
    isCssLoaded = false;
    isInit = true;
    hideCheckbox = false;
    selectAll= false;
    showConfirmationPopUp = false;
    filterBtnBName;
    showSubmittedCol = false;
    showRejectedCol = false;
    showApprovedCol = false;
    dateFormat = DATE_FORMAT;
    
    //to hide update price button
    get isUpdatePrice(){
        return !(this.priceRecordsData.some((element)=>{return element.rowSelect}));
    }
    // to hide submit to Ams buttom
    get isSubmitToAms(){
        return this.newPriceRecords.length == 0;
    }
    
    //@wire(fetchCurrenciesMethod)
    //currencyTypes;

    fetchCurrencies(){
        fetchCurrenciesMethod()
        .then((result)=>{
            this.currencyTypes = result;
            console.log(this.currencyTypes);
        }).catch((error)=>{

        })
    }

    fetchPACustomSettings(){
        pricingActionProfileCustomSettingsMethod()
        .then((result)=>{
            this.pricingActionProfileCustomSettings = result;
            console.log(result);
        }).catch((error)=>{

        })
    }

    fetchCurrentUserProfile(){
		fetchCurrentUserProfileMethod()
		.then((result)=>{
			console.log(result)
			this.currentUserProfile = result;
            this.productManager = this.pricingActionProfileCustomSettings[result].is_PM_Current_User_SIG__c ? CURRENT_USER : 'All';
            this.accountManager = this.pricingActionProfileCustomSettings[result].is_AM_Current_User_SIG__c ? CURRENT_USER : 'All';
            this.createOpportunityButtonVisibility = this.pricingActionProfileCustomSettings[result].Create_Opportunity_Button_Visibility_SIG__c;
            this.submitToAmsButtonVisibility = this.pricingActionProfileCustomSettings[result].Submit_To_AM_Button_Visibility_SIG__c;
            this.hideAmFilter = this.pricingActionProfileCustomSettings[result].AM_Filter_Visibility_SIG__c;
            
            this.fetchPriceRecords();
		})
		.catch((error)=>{

		})
	}

    @wire(getObjectInfo,{objectApiName:PRICE_RECORD_OBJECT})
    priceRecordObject;
    
    @wire(getPicklistValues,
        {   
            recordTypeId:'$priceRecordObject.data.defaultRecordTypeId',
            fieldApiName:STATUS_FIELD
        })
    priceRecordStatusValues({error,data}){
        if(data){
            let options = this.filterOptions;
            data.values.forEach((element)=>{
                options.statusOptions = [...options.statusOptions,{label:element.label,value:element.value}];
            });
            options.statusOptions = [...options.statusOptions,{label:'Under Price Protection',value:'UnderPriceProtection'}];
        }
    }

    @wire(getObjectInfo,{objectApiName:PRODUCT_OBJECT})
    productObject;
    @wire(getPicklistValues,
        {   
            recordTypeId:'$productObject.data.defaultRecordTypeId',
            fieldApiName:PRODUCT_PACKAGE_FIELD
        })
    productPackageValues({error,data}){
        if(data){
            let options = this.filterOptions;
            data.values.forEach((element)=>{
                options.productPackageOptions = [...options.productPackageOptions,{label:element.label,value:element.value}];
            });
            options.productPackageOptions.splice(0,0,{label:'All',value:'All'});
            this.filterOptions = options;
        }
    }
    @wire(getPicklistValues,
        {   recordTypeId:'$productObject.data.defaultRecordTypeId',
            fieldApiName:PRODUCT_FORM_FIELD
        })
    productFormValues({error,data}){
        if(data){
            let options = this.filterOptions;
            data.values.forEach((element)=>{
                options.productFormOptions = [...options.productFormOptions,{label:element.label,value:element.value}];
            });
            options.productFormOptions.splice(0,0,{label:'All',value:'All'});
            this.filterOptions = options;
        }
    }
    
    @wire(getPicklistValues,
        {
            recordTypeId : '$productObject.data.defaultRecordTypeId',
            fieldApiName : PRODUCT_FUNCTIONALITY_FIELD
        })
    productFunctionalityValues({error,data}){
        if(data){
            let options = this.filterOptions;
            data.values.forEach((element)=>{
                options.productFunctionalityOptions = [...options.productFunctionalityOptions,{label:element.label,value:element.value}];
            });
            options.productFunctionalityOptions.splice(0,0,{label:'All',value:'All'});
            this.filterOptions = options;
        }
    }
    
    @wire(fetchFiltersMethod)
    fetchFilters({error,data}){
        if(data){
           let options = this.filterOptions;
            data.regionOptions.forEach((item)=>{
                options.regionOptions = [...options.regionOptions,{label:item.Name,value:item.Id}]
            });
            options.regionOptions.splice(0,0,{label:'All',value:'All'});
            data.plantOptions.forEach((item)=>{
                let city = item.hasOwnProperty('City_SIG__c') ? item.City_SIG__c : '';
				let state = item.hasOwnProperty('State_SIG__c') ? item.State_SIG__c : '';
				let country = item.hasOwnProperty('Country_SIG__r') ? item.Country_SIG__r.Name : '';
				let tempString = '';
				if(city != ''){
					tempString += city+', '; 
				}if(state != ''){
					tempString += state+', ';
				}
				if(country != ''){
					tempString += country;
				}
				if(tempString != ''){
					tempString = '( '+tempString+' )';
				}
                let labelString = item.Name + tempString;
                options.plantOptions = [...options.plantOptions,{label:labelString,value:item.Id}];
            })
            options.plantOptions.splice(0,0,{label:'All',value:'All'});
            data.productManagerOptions.forEach((item)=>{
                options.pmOptions = [...options.pmOptions,{label:item.Name,value:item.Id}];
            })
            options.pmOptions.splice(0,0,{label:'All',value:'All'});
            data.accountManagerOptions.forEach((item)=>{
                options.amOptions = [...options.amOptions,{label:item.Name,value:item.Id}];
            });
            options.amOptions.splice(0,0,{label:'All',value:'All'});
            this.filterOptions = options;
        }else if(error){
        }
    }

    constructor(){
        super();
        this.fetchPACustomSettings();
        this.fetchCurrencies();
        let urlVal = window.location.href;
        this.urlLink = urlVal.substr(0,urlVal.lastIndexOf('/')+1);//url link for email alert for account manager
        let dateVal = new Date();
        //this.fetchPriceRecords();
    }

    connectedCallback(){
        this.fetchCurrentUserProfile();
        //this.fetchPriceRecords();
        //this.isInit = false;
    }

    renderedCallback(){ 
        if(this.isCssLoaded) return
        this.isCssLoaded = true
        loadStyle(this, COLORS).then(()=>{
            console.log("Loaded Successfully")
        }).catch(error=>{ 
            console.error("Error in loading the colors")
        })
    }

    

    handleChange(event){
        try{
        let name=event.target.name;
        switch (name){
            case 'Region':
                this.region = event.detail.value;
                break;
            case 'Status':
                this.status = event.detail.value;
                break;
            case 'ProductForm':
                this.productForm = event.detail.value;
                break;
            case 'ProductPackage':
                this.productPackage = event.detail.value;
                break;
            case 'ProductManager':
                this.productManager = event.detail.value;
                break;
            case 'AccountManager':
                this.accountManager = event.detail.value;
                break;
            case 'ProductFunctionality':
                this.productFunctionality = event.detail.value;
                break;
            case 'BelowFloorPrice':
                this.isBelowFloorPrice = event.target.checked;
                break;
            case 'BelowTargetPrice':
                this.isBelowTargetPrice = event.target.checked;
                break;
            /*case 'CurrencyIsoCodes':
                this.currencyTypeVal = event.detail.value;
                break;*/
            case 'ManufacturingPlant':
                this.manufacturingPlant = event.detail.value;
                break;
            case 'FetchPriceRecordsFrom':
                this.priceRecordsFrom = event.detail.value;
                break;
            case 'PriceRecordType':
                this.priceRecordType = event.detail.value;
                break;
        }
    }catch(err){
        this.handleToastMessage('Error Occured',error.message,'error');
    }
    }
    onProductSelection(event){
        try {
            this.product = event.detail.selectedRecordId;
            this.productName = event.detail.selectedValue;
            this.filterPlants(event.detail.selectedRecordId);
            if(this.product!=null && this.product!=''){
            this.handleFetchPrices();
            }else{
            this.priceData = [];
            }
        } catch (error) {
            this.handleToastMessage('Error Occured',error.message,'error');
        }
    }
    //to filter manufacturing plant based on selected product
    filterPlants(productId){
        filterPlantsMethod({productId:productId})
        .then(result=>{
            let plantOptions = [];
            if(result){
                if(productId!=null && productId!=''){
                    result.forEach((item)=>{
                        let city = item.Manufacturing_Plant_SIG__r.City_SIG__c ? item.Manufacturing_Plant_SIG__r.City_SIG__c : '';
                        let state = item.Manufacturing_Plant_SIG__r.State_SIG__c ? item.Manufacturing_Plant_SIG__r.State_SIG__c : '';
                        let country = item.Manufacturing_Plant_SIG__r.Country_SIG__r ? item.Manufacturing_Plant_SIG__r.Country_SIG__r.Name : '';
                        let tempString = '';
                        if(city != ''){
                            tempString += city+', ';
                        }if(state != ''){
                            tempString += state+', ';
                        }if(country != ''){
                            tempString += country;
                        }
                        if(tempString != ''){
                            tempString = '( '+tempString+' )';
                        }
                        let labelString = item.Manufacturing_Plant_SIG__r.Name + tempString;
                        plantOptions = [...plantOptions,{label:labelString,value:item.Manufacturing_Plant_SIG__r.Id}];
            
                    });
                }else{
                    result.forEach((item)=>{
                        let city = item.hasOwnProperty('City_SIG__c') ? item.City_SIG__c : '';
                        let state = item.hasOwnProperty('State_SIG__c') ? item.State_SIG__c : '';
                        let country = item.hasOwnProperty('Country_SIG__r') ? item.Country_SIG__r.Name : '';
                        let tempString = '';
                        if(city != ''){
                            tempString += city+', '; 
                        }if(state != ''){
                            tempString += state+', ';
                        }
                        if(country != ''){
                            tempString += country;
                        }
                        if(tempString != ''){
                            tempString = '( '+tempString+' )';
                        }
                        let labelString = item.Name + tempString;
                        plantOptions = [...plantOptions,{label:labelString,value:item.Id}];
                    });
                }
                plantOptions.splice(0,0,{label:'All',value:'All'});
                this.filterOptions.plantOptions = plantOptions;
                this.manufacturingPlant = 'All';
                this.error = undefined;
            }
        }).catch(error => {
            this.error = error;
            this.contacts = undefined;
        });
    }

    onAccountSelection(event){
        this.account = event.detail.selectedRecordId;
        this.accountName = event.detail.selectedValue;
    }

    handleApplyFilters(event){
        this.filterBtnBName = event.currentTarget.name;
        if(this.newPriceRecords.length>0){
            this.showConfirmationPopUp = true;
        }else{
            this.assigningTempFilterVaraiables();
            //this.hideCheckbox = this.hideCheckboxMethod();
            this.showColumnsMethod();
            this.currentPageNumber = 1;
            this.fetchPriceRecords();
        }  
    }

    handleConfirmation(event){
        let ans = event.detail.status;
        if(this.filterBtnBName=='ApplyFilters'){
            if(ans==='Yes'){
                this.showConfirmationPopUp = false;
                this.assigningTempFilterVaraiables();
                this.sortBy = null;
                //this.hideCheckbox = this.hideCheckboxMethod();
                this.showColumnsMethod();
                this.currentPageNumber = 1;
                this.fetchPriceRecords();
            }else{
                this.showConfirmationPopUp = false;
                this.assignFilterVarsWithTempFilterVars();
            }
        }else if(this.filterBtnBName=='ClearFilters'){
            if(ans==='Yes'){
                this.showConfirmationPopUp = false;
                this.resetFiltersMethod();
            }else{
                this.showConfirmationPopUp = false;
            }
        }
        
    }
    handleClearFilters(event){
        this.filterBtnBName = event.currentTarget.name;
        if(this.newPriceRecords.length>0){
            this.showConfirmationPopUp = true;
        }else{
           this.resetFiltersMethod();
        }  
    }
    resetFiltersMethod(){
        try {
            this.region = 'All';
            this.productForm = 'All';
            this.productPackage = 'All';
            //this.currencyTypeVal = 'All';
            //this.productManager = (this.currentUserProfile == 'Business Admin' || this.currentUserProfile == 'System Administrator') ? 'All' : CURRENT_USER;
            this.productManager = this.pricingActionProfileCustomSettings[this.currentUserProfile].is_PM_Current_User_SIG__c ? CURRENT_USER : 'All';
            this.accountManager = this.pricingActionProfileCustomSettings[this.currentUserProfile].is_AM_Current_User_SIG__c ? CURRENT_USER : 'All';
            this.manufacturingPlant = 'All',
            this.template.querySelectorAll('c-lwc-reusable-custom-lookup-cmp').forEach(element=>{element.clearLookupValue()});
            this.priceData=[];
            this.priceRecordType = 'Regular';
            this.status = 'New';
            this.priceRecordsFrom = '0';
            this.sortBy = null;
            this.productFunctionality = 'All';
            this.isBelowFloorPrice = false;
            this.isBelowTargetPrice = false;
            this.currentPageNumber = 1;
            this.assigningTempFilterVaraiables();
            //this.hideCheckbox = this.hideCheckboxMethod();
            this.showColumnsMethod();
            this.fetchPriceRecords();
        } catch (error) {
            this.handleToastMessage('Error Occured',error.message,'error');
        }
    }
    hideCheckboxMethod(){
        /*let isPendingApproval = this.status == 'Nominated' || this.status == 'Opportunity created' || this.status == 'UnderPriceProtection';
        let currentUserEditCheck = ((this.currentUserProfile == 'Account Manager' && this.accountManager == CURRENT_USER)||
                                    (this.currentUserProfile == 'Product Management' && this.productManager == CURRENT_USER)|| this.currentUserProfile == 'Business Admin' || this.currentUserProfile == 'System Administrator') ? false : true;
        let recordTypeCheck = this.priceRecordType !== 'Regular';

        return isPendingApproval || currentUserEditCheck || recordTypeCheck;*/
        let PricingActionEditCheck = this.priceRecordsRealData.every((element)=>{return element.Pricing_Action_Edit_Check_SIG__c});
        let recordTypeCheck = this.priceRecordType == 'Regular';
        let pmEditCheck = this.pricingActionProfileCustomSettings[this.currentUserProfile].is_PM_Current_User_SIG__c ? (this.productManager == CURRENT_USER) ? true : false : true;
        return !(PricingActionEditCheck && recordTypeCheck && pmEditCheck);
    }
    showColumnsMethod(){
        this.showSubmittedCol = (this.status == 'Nominated' ||this.status == 'Rejected'||this.status == 'Opportunity created') && this.priceRecordType == 'Regular';
        this.showRejectedCol = this.status == 'Rejected' && this.priceRecordType == 'Regular';
        this.showApprovedCol = this.status == 'Opportunity created' && this.priceRecordType == 'Regular';
    }

    assigningTempFilterVaraiables(){
        this.tempRegion = this.region;
        this.tempProductForm = this.productForm;
        this.tempProductPackage = this.productPackage;
        //this.tempCurrencyTypeVal = this.currencyTypeVal;
        this.tempProductManager = this.productManager;
        this.tempAccountManager = this.accountManager;
        this.tempManufacturingPlant = this.manufacturingPlant;
        this.tempProduct = {Id:null,Name:null};
        this.tempAccount = {Id:null,Name:null};
        this.tempPriceRecordType = this.priceRecordType;
        this.tempStatus = this.status;
        this.tempPriceRecordsFrom = this.priceRecordsFrom;
        this.tempProductFunctionality = this.productFunctionality;
        this.tempIsBelowFloorPrice = this.isBelowFloorPrice;
        this.tempIsBelowTargetPrice = this.isBelowTargetPrice;
    }
    assignFilterVarsWithTempFilterVars(){
        this.region = this.tempRegion;
        this.productForm = this.tempProductForm;
        this.productPackage = this.tempProductPackage;
        //this.currencyTypeVal = this.tempCurrencyTypeVal;
        this.productManager = this.tempProductManager;
        this.accountManager = this.tempAccountManager;
        this.manufacturingPlant = this.tempManufacturingPlant;
        this.product = this.tempProduct.Id;
        this.productName = this.tempProduct.Name;
        this.account = this.tempAccount.Id;
        this.accountName = this.tempAccount.Name;
        this.priceRecordType = this.tempPriceRecordType;
        this.status = this.tempStatus;
        this.priceRecordsFrom = this.tempPriceRecordsFrom;
        this.productFunctionality = this.tempProductFunctionality;
        this.isBelowFloorPrice = this.tempIsBelowFloorPrice;
        this.isBelowTargetPrice = this.tempIsBelowTargetPrice;
    }
    handlePriceVariant(event){
        this.priceVariant = event.detail.value;
    }
    handleNewPrice(event){
        this.newPrice = event.target.value;
    }
    handleNewValidFrom(event){
        let date = (event.target.value!=null && event.target.value!='') ? new Date(event.target.value).setHours(0,0,0,0) : event.target.value;
        let todayDate = new Date().setHours(0,0,0,0);
        if(date!=null && date!=''){
            if(date<todayDate){
                this.handleToastMessage('!Error',"Selected date connot be lessthan today's date",'error');
                this.newValidFrom = '';
            }else{
                if(this.newValidTo != null && this.newValidTo != ''){
                    if(this.newValidTo<event.target.value){
                        this.handleToastMessage('!Error','New Valid from date must be less than or equal to valid to date','error');
                        this.newValidFrom = (this.newValidFrom == '') ? null : '';
                    }else{
                        this.newValidFrom = event.target.value;
                    }
                }else{
                    this.newValidFrom = event.target.value;
                }
            } 
        }else{
            this.newValidFrom = null;
        }
        
    }
    handleNewValidTo(event){
		let date = (event.target.value!=null && event.target.value!='') ? new Date(event.target.value).setHours(0,0,0,0) : event.target.value;
        let todayDate = new Date().setHours(0,0,0,0);
		if (date != null && date != '') {
            if(date<todayDate){
                this.handleToastMessage('!Error',"Selected date connot be lessthan today's date",'error');
                this.newValidTo = (this.newValidTo == '') ? null : '';
            }else{
                if (this.newValidFrom != null && this.newValidFrom != '') {
                    if (this.newValidFrom > event.target.value) {
                        this.handleToastMessage('Error', 'New valid to date must be greater than or equals to from date', 'error');
                        this.newValidTo = (this.newValidTo == '') ? null : '';
                    } else {
                        this.newValidTo = event.target.value;
                    }
                } else {
                    this.newValidTo = event.target.value;
                }
            }
		} else {
			this.newValidTo = null;
		}

    }
    //to update new price and validity from for selected price records
    handleUpdatePrice(){
        try {
            if(this.newPrice != null && this.newPrice != '' && this.newValidFrom != null && this.newValidFrom != '' && this.newValidTo != null && this.newValidTo != ''){
                let selectedRows = this.priceRecordsRealData.filter((element)=>{return element.rowSelect});
                let newPriceRecords = JSON.parse(JSON.stringify(this.newPriceRecords));
                let priceMoreThanListPriceRecords = 0;
                if(selectedRows.length>0){
                    selectedRows.forEach((eachRow)=>{
                        let priceRecord = this.priceRecordsRealData.find((element)=>{return eachRow.Id == element.Id});
                        this.profileCheckMehtod(priceRecord);
                    })
                    /*let stringSet = new Set();
                    if(this.priceVariant === 'price'||this.priceVariant == 'amount'){
                        selectedRows.forEach((element)=>{
                        let uom = (element.hasOwnProperty('UoM_SIG__c')) ? element.UoM_SIG__c : 'uom';
                        let per = (element.hasOwnProperty('Per_SIG__c')) ? element.Per_SIG__c : 'per';
                        let currency = (element.hasOwnProperty('CurrencyIsoCode')) ? element.CurrencyIsoCode : 'currency';
                        stringSet.add(uom+'-'+per+'-'+currency);
                        })
                    }*/
                //if(stringSet.size==1||stringSet.size==0){
                let priceRecordsReal = JSON.parse(JSON.stringify(this.priceRecordsRealData));
                let priceRecords = JSON.parse(JSON.stringify(this.priceRecordsData));
                //let newSelectedRows = JSON.parse(JSON.stringify(this.newPriceSelectedRows));
                selectedRows.forEach((row)=>{
                    //getting row index of selected row from originaldata
                    let rowIndex = priceRecordsReal.findIndex((element)=>{return element.Id==row.Id});
                    if(rowIndex!==-1){
                    //getting current price value for row index
                    let currentPrice = Number(priceRecordsReal[rowIndex].Current_Price_USD_KG_SIG__c);
                    let calculatedPrice = 0;
                    //calculating value based on selected price variant($ OR %)
                    if(this.priceVariant==='percent'){
                         calculatedPrice = Number((((100+Number(this.newPrice))*currentPrice)/100).toFixed(this.currencyTypes['USD'].DecimalPlaces));
                    }else if(this.priceVariant==='price'){
                        calculatedPrice = currentPrice + Number(this.newPrice);
                    }else{
                        calculatedPrice = Number(this.newPrice);
                    }
                    //checking calculated price is less than list price or not
                    priceRecordsReal[rowIndex].newPriceUSD = calculatedPrice;
                    priceRecordsReal[rowIndex].New_Price_SIG__c = (calculatedPrice * priceRecordsReal[rowIndex].Conversion_To_Record_Units_SIG__c).toFixed(priceRecordsReal[rowIndex].decimalPlaces);
                    priceRecordsReal[rowIndex].New_Validity_From_SIG__c = this.newValidFrom;
                    priceRecordsReal[rowIndex].New_Validity_To_SIG__c = this.newValidTo;
                    priceRecordsReal[rowIndex].rowSelect = false;

                    /*if(priceRecordsReal[rowIndex].listPrice!=null){
                        if(calculatedPrice>priceRecordsReal[rowIndex].listPrice){

                            //assigning new price and new valid from values and changing color to red if current price is greater than list price
                            priceRecordsReal[rowIndex].nominatedPriceClass = 'priceRecordstd slds-text-color_error';
                            priceRecordsReal[rowIndex].textColor = 'slds-text-color_error';
                            priceMoreThanListPriceRecords++;

                            //getting index of price records if already they are updated in the same transaction and selected for update once again 
                            let newPriceRow = newPriceRecords.findIndex((element)=>{return element.Id==row.Id});
                            if(newPriceRow!==-1){
                                newPriceRecords.splice(newPriceRow,1);
                            }
                        }else{
                            //assigning new price and new valid from values and changing color to green for correct price entry
                            priceRecordsReal[rowIndex].nominatedPriceClass = 'priceRecordstd slds-text-color_success';
                            priceRecordsReal[rowIndex].textColor = 'slds-text-color_success';
                             //getting index of price records if already they are updated in the same transaction and selected for update once again 
                             let newPriceRow = newPriceRecords.findIndex((element)=>{return element.Id==row.Id});
                             let tempElement = JSON.parse(JSON.stringify(priceRecordsReal[rowIndex]));
                             tempElement.rowSelect = true
                             if(newPriceRow!==-1){
                                 newPriceRecords[newPriceRow] = tempElement;
                             }else{
                                 newPriceRecords = [...newPriceRecords,tempElement];  
                             }
                        }
                    }
                    else{*/
                            //this else block executes when record has no list price value
                            //assigning new price and new valid from values and changing color to green for correct records
                            priceRecordsReal[rowIndex].nominatedPriceClass = 'priceRecordstd slds-text-color_success';
                            priceRecordsReal[rowIndex].textColor = 'slds-text-color_success';
                            //getting index of price records if already they are updated in the same transaction and selected for update once again 
                            let newPriceRow = newPriceRecords.findIndex((element)=>{return element.Id==row.Id});
                            let tempElement = JSON.parse(JSON.stringify(priceRecordsReal[rowIndex]));
                             tempElement.rowSelect = true
                            if(newPriceRow!==-1){
                                newPriceRecords[newPriceRow] = tempElement;
                            }else{
                                newPriceRecords = [...newPriceRecords,tempElement];  
                            }
                    //}
                    //updating price records which are in the currentpage
                    let rowIndex1 = priceRecords.findIndex((element)=>{return element.Id==row.Id});
                    if(rowIndex1!==-1){
                    priceRecords[rowIndex1] = priceRecordsReal[rowIndex];
                    }
                }
                console.log(priceRecordsReal[rowIndex]);
                });
                this.priceRecordsRealData = priceRecordsReal;
                this.newPriceRecords = newPriceRecords;
                this.nominatedRecordsSelectAll = newPriceRecords.every((element)=>{return element.rowSelect});
                //this.newPriceSelectedRows = newSelectedRows;
                this.priceRecordsData = priceRecords;
                this.newPrice = null;
                this.newValidFrom = null;
                this.newValidTo = null;
                this.selectAll = this.priceRecordsData.every((eachRow)=>eachRow.rowSelect);
                if(priceMoreThanListPriceRecords > 0){
                    this.handleToastMessage('','One or more of the Nominated prices are higher than our List price.  Please revise before proceeding.','error');
                }
            /*}else{
                this.handleToastMessage('','The selected Price Records have a mismatched UoM, Per Unit, and/or Currency.  Please update your selection to include only Price Records with the same UoM, Per Unit and/or Currency.','error');
            }*/
                }else{
                alert("To Update Price Select Atleast One Price Record");
                }
            }else{
                alert('Amount of price change, validity form and validity to cannot be empty');
            }
        } catch (error) {
            this.handleToastMessage('',error.message,'error');
        }
        
    }

    profileCheckMehtod(priceRecord){

        if(priceRecord.hasOwnProperty('Account_Manager_SIG__r')){
            if(priceRecord.Account_Manager_SIG__r.Profile.Name!='Account Manager' && priceRecord.Account_Manager_SIG__r.Profile.Name != 'Sales Leader' && priceRecord.Account_Manager_SIG__r.Profile.Name != 'Business Admin' && priceRecord.Account_Manager_SIG__r.Profile.Name != 'System Administrator'){
                if(priceRecord.Account_Manager_SIG__r.Profile.Name == 'API Only' || priceRecord.Account_Manager_SIG__r.Profile.Name == 'BODS ReadOnly'){
                    if(priceRecord.hasOwnProperty('Sales_Leader_SIG__r')){
                        if(priceRecord.Sales_Leader_SIG__r.Profile.Name != 'Sales Leader' && priceRecord.Sales_Leader_SIG__r.Profile.Name != 'Business Admin'){
                            throw new Error('For Price record '+priceRecord.Name+' Sales Leader and Account manager fields are not mapped with Sales Leader and Account Manager valid users. Please remove record from selection to continue pricing action');
                        }else if(!priceRecord.Sales_Leader_SIG__r.IsActive){
                            throw new Error('For Price reocrd '+priceRecord.Name+' Account Manager fields is not mapped with Account Manager profile user and Sales leader is InActive. Please remove record from selection to continue pricing action');
                        }
                    }else{
                        throw new Error('For Price record '+priceRecord.Name+' Account Manager field is not mapped with valid user and Sales Leader field is empty. Please remove record from selection to continue pricing action');
                    }

                }else{
                    throw new Error('For Price record '+priceRecord.Name+' Account Manager field is not mapped with valid user. Please remove record from selection to continue pricing action');
                }
            }else if(!priceRecord.Account_Manager_SIG__r.IsActive){
                if(priceRecord.hasOwnProperty('Sales_Leader_SIG__r')){
                    if(priceRecord.Sales_Leader_SIG__r.Profile.Name != 'Sales Leader' && priceRecord.Sales_Leader_SIG__r.Profile.Name != 'Busniness Admin'){
                        throw new Error('For Price record '+priceRecord.Name+' Account manager is InActive and Sales Leader field is not maapped with valid user. Please remove record from selection to continue pricing action');
                    }else if(!priceRecord.Sales_Leader_SIG__r.IsActive){
                        throw new Error('For Price reocrd '+priceRecord.Name+' Account Manager and Sales leaders are not active users. Please remove record from selection to continue pricing action');
                    }
                }else{
                    throw new Error('For Price record '+priceRecord.Name+' Account Manager is InActive and Sales Leader field is empty. Please remove record from selection to continue pricing action');
                }
            }
        }else{
            if(priceRecord.hasOwnProperty('Sales_Leader_SIG__r')){
                if(priceRecord.Sales_Leader_SIG__r.Profile.Name != 'Sales Leader' && priceRecord.Sales_Leader_SIG__r.Profile.Name != 'Business Admin'){
                    throw new Error('For Price record '+priceRecord.Name+' Account Manager is empty and Sales Leader field is not mapped with valid user. Please remove record from selection to continue pricing action');
                }else if(!priceRecord.Sales_Leader_SIG__r.IsActive){
                    throw new Error('For Price record '+priceRecord.Name+' Account Manger field is empty and Sales Leader user is Inactive. Please remove record from selection to continue pricing action')
                }
            }else{
                throw new Error('For Price record '+priceRecord.Name+' Account Manager and Sales leader are empty. Please remove record from selection to continue pricing action');
            }
        }
    }
    
    handleSubmitToAms(){
        this.isCreateOpportunity = false;
        this.isModalOpen = true;
    }

    handleCreateOpportunity(){
        this.isCreateOpportunity = true;
        this.isModalOpen = true;
    }
    handleCloseModal(){
        this.isModalOpen = false;
    }

    fetchPriceRecords(){
        this.totalPages = 0;
        this.listLength = 0;
        this.showSpinner = true;
        this.newPriceRecords = [];
        //this.newPriceSelectedRows = [];
        getPriceRecordsMethod({
                            //isInit : this.isInit,
                            currentUserProfile:this.currentUserProfile,
                            account:this.account,
                            product:this.product,
                            productForm:this.productForm,
                            productPackage:this.productPackage,
                            region:this.region,
                            status:this.status,
                            productFunctionality:this.productFunctionality,
                            priceRecordsFrom:this.priceRecordsFrom,
                            isBelowFloorPrice:this.isBelowFloorPrice,
                            isBelowTargetPrice:this.isBelowTargetPrice,
                            manufacturingPlant:this.manufacturingPlant,
                            accountManager:this.accountManager,
                            productManager:this.productManager,
                            priceRecordType:this.priceRecordType
                        })
        .then(result => {
            let usdDecimals = this.currencyTypes['USD'].DecimalPlaces;
            console.log(result);
            let tempData = result.prList.map(function(item){
                let noOfDecimals = this.currencyTypes[item.CurrencyIsoCode].DecimalPlaces;
                let perUomObj = this.fetchPerUomValues(item,result.pbeMap);
                return ({...item,
                    ProductName:(item.hasOwnProperty('Product_Name_Code_SIG__r'))?item.Product_Name_Code_SIG__r.Name : '',
                    Account : (item.hasOwnProperty('Sold_To_SIG__r'))?item.Sold_To_SIG__r.Name:'',
                    RegionalAccount : (item.hasOwnProperty('Regional_SIG__r')) ? item.Regional_SIG__r.Name : '',
                    Incoterm : (item.hasOwnProperty('Account_Inco_terms_SIG__r')) ? item.Account_Inco_terms_SIG__r.Name : '',
                    ShipFrom : (item.hasOwnProperty('Ship_From_SIG__r')) ? item.Ship_From_SIG__r.Name : '',
                    ShipTo : (item.hasOwnProperty('Ship_To_SIG__r')) ? item.Ship_To_SIG__r.Name : '',
                    //CustomerRegion : (item.hasOwnProperty('Regional_SIG__r')) ? (item.Regional_SIG__r.hasOwnProperty('Country_SIG__r')) ? item.Regional_SIG__r.Country_SIG__r.Region_SIG__r.Name : '' : '',
                    CustomerRegion : (item.hasOwnProperty('Pricing_Region_SIG__r')) ? item.Pricing_Region_SIG__r.Name : '',
                    AccountManager : (item.hasOwnProperty('Account_Manager_SIG__r')) ? item.Account_Manager_SIG__r.Name : '',
                    NextPriceRecordName : (item.hasOwnProperty('Next_Price_Record_Most_Recent_SIG__r')) ? item.Next_Price_Record_Most_Recent_SIG__r.Name : '',
                    NextPriceRecordLink : (item.hasOwnProperty('Next_Price_Record_Most_Recent_SIG__r')) ? '/'+item.Next_Price_Record_Most_Recent_SIG__r.Id : '',
                    NextPriceRecordValidFrom : (item.hasOwnProperty('Next_Price_Record_Most_Recent_SIG__r')) ? item.Next_Price_Record_Most_Recent_SIG__r.Validity_From_SIG__c : '',
                    previousPriceRecordName : (item.hasOwnProperty('Previous_Price_Record_SIG__r')) ? item.Previous_Price_Record_SIG__r.Name : '',
                    previousPriceRecordLink : (item.hasOwnProperty('Previous_Price_Record_SIG__r')) ? '/'+item.Previous_Price_Record_SIG__r.Id : '',
                    currentPriceRecordLink : (item.hasOwnProperty('Id')) ? '/'+item.Id : '',
                    textColor : 'slds-text-color_default',
                    nominatedPriceClass : 'priceRecordstd .currentInApprovalColor',
                    decimalPlaces : noOfDecimals == 0 ? '0' : noOfDecimals == 1 ? '1' : noOfDecimals == 2 ? '2' : noOfDecimals == 3 ? '3' : '4',
                    stepValue : noOfDecimals == 0 ? '0.00' : noOfDecimals == 1 ? '0.1' : noOfDecimals == 2 ? '0.01' : noOfDecimals == 3 ? '0.001' : '0.0001',
                    decimalPlacesUSD : JSON.stringify(usdDecimals),
                    stepValueUSD : usdDecimals == 0 ? '0.00' : usdDecimals == '1' ? '0.1' : usdDecimals == '2' ? '0.01' : usdDecimals == '3' ? '0.001' : '0.0001',
                    rowSelect : false,
                    floorPrice:perUomObj.floorPrice,
                    targetPrice:perUomObj.targetPrice,
                    listPrice:perUomObj.listPrice,
                    newPriceUSD: item.New_Price_USD_KG_SIG__c,
                    enableEdit:true  
                })
            },this)
            
            this.priceRecordsRealData = tempData;
            this.listLength = tempData.length;
            this.totalPages = Math.ceil(tempData.length/this.pageSize);
            this.hideCheckbox = this.hideCheckboxMethod();
            //this.hideCheckbox = !((this.priceRecordsRealData.every((element)=>{return element.Pricing_Action_Edit_Check_SIG__c}))&& (this.priceRecordType == 'Regular'));
            this.error = undefined;
            this.showSpinner = false;
        })
        .catch(error => {
            this.error = error;
            this.handleToastMessage('',error.body.message,'error');
            this.priceRecordsRealData = [];
            this.showSpinner = false;
        });
    }

    fetchPerUomValues(priceRecord,pbeMap){
        let perUomObj = {floorPrice:null,targetPrice:null,listPrice:null};
        if(priceRecord.hasOwnProperty('PricebookEntryID__c')){
            let pbeRec = pbeMap[priceRecord.PricebookEntryID__c];
            if(pbeRec){
                perUomObj.floorPrice = (pbeRec.Floor_Price__c/priceRecord.USD_Conversion_Rate_SIG__c).toFixed(this.currencyTypes['USD'].DecimalPlaces);
                perUomObj.targetPrice = (pbeRec.Target_Price__c/priceRecord.USD_Conversion_Rate_SIG__c).toFixed(this.currencyTypes['USD'].DecimalPlaces);
                perUomObj.listPrice = (pbeRec.UnitPrice/priceRecord.USD_Conversion_Rate_SIG__c).toFixed(this.currencyTypes['USD'].DecimalPlaces);    
            }
        }
        return perUomObj;
    }
    
    //mrthod to fetch price book entries
    handleFetchPrices(){
        fetchPricesMethod({productId:this.product,userId:CURRENT_USER})
        .then((result)=>{
            this.modifyPriceRecords(result);
        }).catch(error => {
            this.error = error;
            this.priceRecordsRealData = [];
        });
    }

    //to changes the column values for price book entries
    async modifyPriceRecords(result){
        let tempData = result.map((item)=>{
            let product = item.Product2;
            let priceBook = item.Pricebook2;
            let noOfDecimals = this.currencyTypes[item.CurrencyIsoCode].DecimalPlaces;
            return ({...item,
                    skuName:(product.hasOwnProperty('Name')) ? item.Product2.Name : '',
                    ph3Name:(product.hasOwnProperty('Parent_SIG__r')) ? item.Product2.Parent_SIG__r.Name : '',
                    avgMaterialCost:(product.hasOwnProperty('SKUAverage_Material_Cost_SIG__c')) ? item.Product2.SKUAverage_Material_Cost_SIG__c * this.currencyTypes[item.CurrencyIsoCode].ConversionRate  : '',
                    package:(product.hasOwnProperty('Package_SIG__c')) ? item.Product2.Package_SIG__c : '',
                    packageSize:(product.hasOwnProperty('Package_Size_SIG__c')) ? item.Product2.Package_Size_SIG__c : '',
                    region:(priceBook.hasOwnProperty('Name')) ? item.Pricebook2.Name : '',
                    manufacturingPlant:(product.hasOwnProperty('Manufacturing_Plant_SIG__r')) ? item.Product2.Manufacturing_Plant_SIG__r.Name : '',
                    decimalPlaces : noOfDecimals == 0 ? '0' : noOfDecimals == 1 ? '1' : noOfDecimals == 2 ? '2' : noOfDecimals == 3 ? '3' : '4',
            })
        },this)
        this.priceData = tempData;
}


    handleRowSelectChange(event){
        let priceRecordsData = JSON.parse(JSON.stringify(this.priceRecordsData));
        let element = priceRecordsData.find((eachRow)=>{
            return eachRow.Id == event.target.dataset.id;
        });
        element.rowSelect = event.target.checked;
        this.priceRecordsData = [...priceRecordsData];


        let priceRecordsRealData = JSON.parse(JSON.stringify(this.priceRecordsRealData));
        let realElement = priceRecordsRealData.find((eachRow)=>{
            return eachRow.Id == event.target.dataset.id;
        });
        realElement.rowSelect = event.target.checked;
        this.priceRecordsRealData = [...priceRecordsRealData];
        this.selectAll = this.priceRecordsData.every((everyRow)=>everyRow.rowSelect);
    }

    handleSelectAllChange(event){
        this.selectAll = event.target.checked;
        let priceRecordsData = JSON.parse(JSON.stringify(this.priceRecordsData));
        let priceRecordsRealData = JSON.parse(JSON.stringify(this.priceRecordsRealData));
        priceRecordsData.forEach((element)=>{
            element.rowSelect = event.target.checked;
            let realIndex = priceRecordsRealData.findIndex((realElement)=>{return element.Id == realElement.Id});
            priceRecordsRealData[realIndex].rowSelect = event.target.checked;
        });
        this.priceRecordsRealData = priceRecordsRealData;
        this.priceRecordsData = priceRecordsData;   
    }

    handleSubmitDetails(){
        this.hideSubmit = true;
        if(this.isCreateOpportunity){
            this.createOpportunityMethod();
        }else{
            this.submitToAmsMethod();
        }
        
    }

    submitToAmsMethod(){
        if(this.newPriceRecords.some((element)=>{return element.rowSelect})){
            this.showPopupSpinner = true;
           // this.newPriceSelectedRows.forEach((eachRow)=>{
                let newPriceRecords = this.newPriceRecords.filter((element)=>{return element.rowSelect});
                if(newPriceRecords){
                    newPriceRecords.forEach((element)=>{
                        element.Status_SIG__c = 'Nominated';
                        element.Submitted_to_AM_Date_SIG__c = new Date();
                        //newPriceRecords = [...newPriceRecords,newPriceRecord];
                    })
                    
                }
           // });
            approvalSubmitMethod({newPriceRecordList:newPriceRecords,urlLink:this.urlLink,profileName:this.currentUserProfile})
            .then((result)=>{
               if(result){
                    this.showPopupSpinner = false;
                    this.hideSubmit = false;
                   this.newPriceRecords = [];
                   //this.newPriceSelectedRows = [];
                   this.priceRecordsData = [];
                   this.priceRecordsRealData = [];
                   this.isModalOpen = false;
                   this.handleToastMessage('!Success','Pricing Actions successfully submitted','success');
                   this.fetchPriceRecords();
               }
            }).catch((error)=>{
                this.showPopupSpinner = false;
                this.hideSubmit = false;
                this.isModalOpen = false;
                this.handleToastMessage('Error Occured',error.body.message,'error');
            })
            
        }else{
            alert('Must select atleast one record for submission');
            this.hideSubmit = false;
        }
    }

    createOpportunityMethod(){
        if(this.newPriceRecords.some((element)=>{return element.rowSelect})){
            let selectedNewPriceRecords = this.newPriceRecords.filter(element => element.rowSelect);
            if(selectedNewPriceRecords.every((element)=>{return (element.Proposed_Quantity_SIG__c != 0 && element.Proposed_Quantity_SIG__c != null && element.Proposed_Quanitity_SIG__c != '')})){
                this.showPopupSpinner = true;
                createOpportunityMethod({prList:selectedNewPriceRecords,profileName:this.currentUserProfile})
                .then((result)=>{
                    if(result){
                        this.showPopupSpinner = false;
                        this.hideSubmit = false;
                        this.newPriceRecords = [];
                        //this.newPriceSelectedRows = [];
                        this.priceRecordsData = [];
                        this.priceRecordsRealData = [];
                        this.isModalOpen = false;
                        this.handleToastMessage('!Success',JSON.stringify(result)+' Pricing Actions Opportunities created for selected Price records','success');
                        this.fetchPriceRecords();
                    }
                }).catch((error)=>{
                    this.showPopupSpinner = false;
                    this.hideSubmit = false;
                    this.handleToastMessage('',error.body.message,'error');
                });
            }else{
                this.handleToastMessage('','Please enter Quantity for selected records','error');
                this.hideSubmit = false;
            }
        }else{ 
            alert('Must select atleast one record for submission');
            this.hideSubmit = false;
        }
    }
    
    handleRowEditClick(event){
        try{
            let priceRecordsData = JSON.parse(JSON.stringify(this.priceRecordsData))
            let element = priceRecordsData.find((eachRow)=>{ return eachRow.Id == event.target.dataset.id});
            this.editProfileCheckMethod(element)
            element.enableEdit = false;
            this.priceRecordsData = priceRecordsData
        }catch(error){
            this.handleToastMessage('',error.message,'error');
        }
        
    }

    editProfileCheckMethod(priceRecord){
        if(priceRecord.hasOwnProperty('Account_Manager_SIG__r')){
            if(priceRecord.Account_Manager_SIG__r.Profile.Name!='Account Manager' && priceRecord.Account_Manager_SIG__r.Profile.Name != 'Sales Leader' && priceRecord.Account_Manager_SIG__r.Profile.Name != 'Business Admin' && priceRecord.Account_Manager_SIG__r.Profile.Name != 'System Administrator'){
                if(priceRecord.Account_Manager_SIG__r.Profile.Name == 'API Only' || priceRecord.Account_Manager_SIG__r.Profile.Name == 'BODS ReadOnly'){
                    if(priceRecord.hasOwnProperty('Sales_Leader_SIG__r')){
                        if(priceRecord.Sales_Leader_SIG__r.Profile.Name != 'Sales Leader' && priceRecord.Sales_Leader_SIG__r.Profile.Name != 'Business Admin'){
                            throw new Error('Pricing action cannot be performed on this record because Sales Leader and Account manager fields are not mapped with valid users');
                        }else if(!priceRecord.Sales_Leader_SIG__r.IsActive){
                            throw new Error('For Price reocrd '+priceRecord.Name+' Account Manager fields is not mapped with valid user and Sales leader is InActive');
                        }
                    }else{
                        throw new Error('Pricing action cannot be performed on this record because Account Manager field is not mapped with valid user and Sales Leader is empty');
                    }

                }else{
                    throw new Error('Pricing action cannot be performed on this record because Account Manager field is not mapped with valid user');
                }
            }else if(!priceRecord.Account_Manager_SIG__r.IsActive){
                if(priceRecord.hasOwnProperty('Sales_Leader_SIG__r')){
                    if(priceRecord.Sales_Leader_SIG__r.Profile.Name != 'Sales Leader' && priceRecord.Sales_Leader_SIG__r.Profile.Name != 'Business Admin'){
                        throw new Error('Pricing action cannot be performed on this record because Account manager is InActive and Sales Leader field is not maapped with valid user');
                    }else if(!priceRecord.Sales_Leader_SIG__r.IsActive){
                        throw new Error('Pricing action cannot be performed on this record because Account Manager and Sales leaders are not active users');
                    }
                }else{
                    throw new Error('Pricing action cannot be performed on this record because Account Manager is InActive and Sales Leader field is empty');
                }
            }
        }else{
            if(priceRecord.hasOwnProperty('Sales_Leader_SIG__r')){
                if(priceRecord.Sales_Leader_SIG__r.Profile.Name != 'Sales Leader' && priceRecord.Sales_Leader_SIG__r.Profile.Name != 'Business Admin'){
                    throw new Error('Pricing action cannot be performed on this record because Account Manager is empty and Sales Leader field is not mapped with sales leader valid user');
                }else if(!priceRecord.Sales_Leader_SIG__r.IsActive){
                    throw new Error('Pricing action cannot be performed on this record because Account Manger field is empty and Sales Leader field user is Inactive')
                }
            }else{
                throw new Error('Pricing action cannot be performed on this record because Account Manager and Sales leader are empty');
            }
        }
    }

    handleRowNewPriceChange(event){
        let newPrice = Number(event.target.value);
        let priceRecordsData = JSON.parse(JSON.stringify(this.priceRecordsData));
        let element = priceRecordsData.find((eachRow)=>{return eachRow.Id == event.target.dataset.id});
        element.newPriceUSD = newPrice;
        element.New_Price_SIG__c = (newPrice * element.Conversion_To_Record_Units_SIG__c).toFixed(element.decimalPlaces);
        this.priceRecordsData = priceRecordsData;
    }

    handleRowNewValidFromChange(event){
        if(event.target.value!=null && event.target.value != ''){
            let priceRecordsData = JSON.parse(JSON.stringify(this.priceRecordsData));
            let element = priceRecordsData.find((eachRow)=>{return eachRow.Id == event.target.dataset.id});
            let newValidFrom = new Date(event.target.value).setHours(0,0,0,0);
            let todayDate = new Date().setHours(0,0,0,0);
            //comparing todays date and new valid form date
            if(newValidFrom>=todayDate){
                //null checking of valid to date
                if(element.New_Validity_To_SIG__c!=null && element.New_Validity_To_SIG__c!=''){
                    let newValidTo = new Date(element.New_Validity_To_SIG__c).setHours(0,0,0,0);
                    //comparing new valid from and new valid to
                    if(newValidTo>=newValidFrom){
                        element.New_Validity_From_SIG__c = event.target.value;
                    }else{
                        this.handleToastMessage('',"New Valid from date must be less than or equal to New valid to date",'error');
                        element.New_Validity_From_SIG__c = (element.New_Validity_From_SIG__c == null) ? '' : null;
                    }
                }else{
                    element.New_Validity_From_SIG__c = event.target.value;
                }
            }else{
                this.handleToastMessage('',"Selected date connot be lessthan today's date",'error')
                element.New_Validity_From_SIG__c = (element.New_Validity_From_SIG__c == null) ? '' : null;
            }
            this.priceRecordsData = priceRecordsData;
        }
    }

    handleRowNewValidToChange(event){
        if(event.target.value != null && event.target.value != ''){
            let priceRecordsData = JSON.parse(JSON.stringify(this.priceRecordsData));
            let element = priceRecordsData.find((eachRow)=>{return eachRow.Id == event.target.dataset.id});
            let newValidTo = new Date(event.target.value).setHours(0,0,0,0);
            let todaysDate = new Date().setHours(0,0,0,0);
            //comparing valid to date and todays date
            if(newValidTo>=todaysDate){
                //null checking of vlaid from
                if(element.New_Validity_From_SIG__c!=null && element.New_Validity_From_SIG__c!=''){
                    let newValidFrom = new Date(element.New_Validity_From_SIG__c).setHours(0,0,0,0);
                    //comparing valid from and valid to 
                    if(newValidTo>=newValidFrom){
                        element.New_Validity_To_SIG__c = event.target.value;
                    }else{
                        this.handleToastMessage('',"New valid to date must be greater than or equals to from date", 'error');
                        element.New_Validity_To_SIG__c = (element.New_Validity_To_SIG__c==null) ? '' : null;
                    }
                }else{
                    element.New_Validity_To_SIG__c = event.target.value;
                }
            }else{
                this.handleToastMessage('',"Selected date connot be lessthan today's date",'error');
                element.New_Validity_To_SIG__c = (element.New_Validity_To_SIG__c==null) ? '' : null;
            }
            this.priceRecordsData = priceRecordsData;
        }

    }
    onEnterKey(event){
        if(event.keyCode === 13){
            this.handleRowUpdateClick(event);
        }
    }
    handleRowUpdateClick(event){
        let element = this.priceRecordsData.find((eachRow)=>{return eachRow.Id == event.target.dataset.id});
        if(element.New_Price_SIG__c!=null && element.New_Price_SIG__c!='' && element.New_Validity_From_SIG__c!=null && element.New_Validity_From_SIG__c != '' && element.New_Validity_To_SIG__c!=null && element.New_Validity_To_SIG__c!=''){
            if(element.listPrice!=null && element.listPrice!=''){
                //if(element.listPrice>=element.newPriceUSD){
                    this.successRowUpdateHelper(event.target.dataset.id);
                /*}else{
                    this.errorRowUpdateHelper(event.target.dataset.id);
                    this.handleToastMessage('','Entered new price is greater than the list price of product','error');
                }*/
            }else{
                this.successRowUpdateHelper(event.target.dataset.id);
            }
        }else{
            this.handleToastMessage('','Amount of price change, validity form and validity to cannot be empty','error');
        }
    }

    successRowUpdateHelper(recordId){
        let priceRecordsData = JSON.parse(JSON.stringify(this.priceRecordsData));
        let element = priceRecordsData.find((eachRow)=>{return eachRow.Id == recordId});
        let priceRecordsRealData = JSON.parse(JSON.stringify(this.priceRecordsRealData));
        let realElementIndex = priceRecordsRealData.findIndex((eachRow)=>{return eachRow.Id == recordId});
        let newPriceRecords = JSON.parse(JSON.stringify(this.newPriceRecords));
        //let newPriceSelectedRows = JSON.parse(JSON.stringify(this.newPriceSelectedRows));

        element.nominatedPriceClass = 'priceRecordstd slds-text-color_success';
        element.textColor = 'slds-text-color_success';
        element.enableEdit = true;

        priceRecordsRealData.splice(realElementIndex,1,element);

        let tempElement = JSON.parse(JSON.stringify(element));
        tempElement.rowSelect = true;

        let newPrIndex = newPriceRecords.findIndex((eachRow)=>{return eachRow.Id == recordId});
        if(newPrIndex!=-1){
            newPriceRecords.splice(newPrIndex,1,tempElement);
        }else{
            newPriceRecords = [...newPriceRecords,tempElement];
            /*let newSelectedRowIndex = newPriceSelectedRows.findIndex((eachRow)=>{return eachRow == recordId});
            if(newSelectedRowIndex==-1){
                newPriceSelectedRows = [...newPriceSelectedRows,recordId];
            }*/
        }
        this.priceRecordsData = priceRecordsData;
        this.priceRecordsRealData = priceRecordsRealData;
        this.newPriceRecords = newPriceRecords;
        this.nominatedRecordsSelectAll = this.newPriceRecords.every((element)=>{return element.rowSelect})
        //this.newPriceSelectedRows = newPriceSelectedRows;
    }
    errorRowUpdateHelper(recordId){
        let priceRecordsData = JSON.parse(JSON.stringify(this.priceRecordsData));
        let element = priceRecordsData.find((eachRow)=>{return eachRow.Id == recordId});
        let priceRecordsRealData = JSON.parse(JSON.stringify(this.priceRecordsRealData));
        let realElementIndex = priceRecordsRealData.findIndex((eachRow)=>{return eachRow.Id == recordId});
        let newPriceRecords = JSON.parse(JSON.stringify(this.newPriceRecords));
        //let newPriceSelectedRows = JSON.parse(JSON.stringify(this.newPriceSelectedRows));

        element.nominatedPriceClass = 'priceRecordstd slds-text-color_error';
        element.textColor = 'slds-text-color_error';
        element.enableEdit = true;

        priceRecordsRealData.splice(realElementIndex,1,element);

        let newPrIndex = newPriceRecords.findIndex((eachRow)=>{return eachRow.Id == recordId});
        if(newPrIndex!=-1){
            newPriceRecords.splice(newPrIndex,1);
        }
        /*let newPrRowIndex = newPriceSelectedRows.findIndex((eachRow)=>{return eachRow.Id == recordId});
        if(newPrRowIndex!=-1){
            newPriceSelectedRows.splice(newPrRowIndex,1);
        }*/
        this.priceRecordsData = priceRecordsData;
        this.priceRecordsRealData = priceRecordsRealData;
        this.newPriceRecords = newPriceRecords;
        this.nominatedRecordsSelectAll = this.newPriceRecords.every((element)=>{return element.rowSelect})
        //this.newPriceSelectedRows = newPriceSelectedRows;
    }
    handleRowCancelClick(event){
        let rowIndex = this.priceRecordsData.findIndex((eachRow)=>{return eachRow.Id == event.target.dataset.id});
        let element = this.priceRecordsRealData.find((eachRow)=>{return eachRow.Id == event.target.dataset.id});
        this.priceRecordsData.splice(rowIndex,1,element);
        this.priceRecordsData = [...this.priceRecordsData];
    }


    handleNominatedRecordsSelectAllChange(event){
        this.nominatedRecordsSelectAll = event.target.checked;
        let newPriceRecords = JSON.parse(JSON.stringify(this.newPriceRecords));
        newPriceRecords.forEach((element)=>{element.rowSelect = event.target.checked});
        this.newPriceRecords = newPriceRecords;
    }

    handleNominatedRecordsRowSelectChange(event){
        let newPriceRecords = JSON.parse(JSON.stringify(this.newPriceRecords));
        let element = newPriceRecords.find((eachRow)=>{return eachRow.Id == event.target.dataset.id});
        element.rowSelect = event.target.checked;
        this.newPriceRecords = newPriceRecords;
        this.nominatedRecordsSelectAll = newPriceRecords.every(element => element.rowSelect);
    }

    handleProposedQuantityChange(event){
        let newPriceRecords = JSON.parse(JSON.stringify(this.newPriceRecords));
        let element = newPriceRecords.find((eachRow)=>{return eachRow.Id == event.target.dataset.id});
        if(event.target.value != 0){
            element.Proposed_Quantity_SIG__c = event.target.value;
        }else{
            element.Proposed_Quantity_SIG__c  = element.Proposed_Quantity_SIG__c == null ? '' : null;
            this.handleToastMessage('','Quantity must be greater than zero','error');
        }
        this.newPriceRecords = newPriceRecords
    }

    
    handlePageSelection(event){
        try {
            this.startNumber = event.detail.startNumber;
            this.endNumber = event.detail.endNumber;
            this.currentPageNumber = event.detail.currentPageNo;
            this.priceRecordsData = [];
            this.priceRecordsData = this.priceRecordsRealData.slice(this.startNumber,this.endNumber);
            this.selectAll = this.priceRecordsData.every((element)=>{return element.rowSelect});
        } catch (error) {
            this.handleToastMessage('Error Occured',error.message,'error');
        }
        
    }

    handleSortData(event) {
        // field name
        this.sortBy = event.currentTarget.dataset.field;
        // sort direction
        this.sortDirection = event.currentTarget.dataset.sortdirection == 'desc' ? 'asc' : 'desc';
        // calling sortdata function to sort the data based on direction and selected field
        this.sortData(this.sortBy,this.sortDirection);

        this.template.querySelectorAll('c-reusable-lwc-pagination-cmp').forEach(element=>{element.handleAfterSort(this.listLength,this.pageSize)});
        /*this.priceRecordsData = [];
        this.priceRecordsData = this.priceRecordsRealData.slice(this.startNumber,this.endNumber);
        let selectedRows = this.selectedRows.slice(0);
        this.selectedRows = selectedRows;*/

    }

    sortData(fieldname, direction) {
        // serialize the data before calling sort function
        let parseData = this.priceRecordsRealData;

        // Return the value stored in the field
        let keyValue = (a) => {
            return a[fieldname];
        };

        // cheking reverse direction 
        let isReverse = direction === 'asc' ? 1: -1;

        // sorting data 
        parseData.sort((x, y) => {
            x = keyValue(x) ? keyValue(x) : ''; // handling null values
            y = keyValue(y) ? keyValue(y) : '';

            // sorting values based on direction
            return isReverse * ((x > y) - (y > x));
        });

        // set the sorted data to data table data
        this.priceRecordsRealData = parseData;
    }


    handleToastMessage(title,message,variant){
        const evt = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(evt);
    }


}