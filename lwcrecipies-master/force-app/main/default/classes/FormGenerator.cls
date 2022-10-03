public with sharing class FormGenerator {

    @AuraEnabled(cacheable = true)
    public static List<String> getObjects(String searhInput) {
        List<String> options = new List<String>();
        Map<string, SObjectType> objs = schema.getGlobalDescribe();
        for(Schema.SObjectType sobj : objs.values()){
            if ( sobj.getDescribe().isCreateable() && sobj.getDescribe().isAccessible() ) {
                String objectLabel =  sobj.getDescribe().getLabel();
                if ( !String.isBlank(searhInput)  ) {
                    if(objectLabel.toLowerCase().contains(searhInput.toLowerCase()))
                        options.add(objectLabel + '####' + sobj.getDescribe().getName());
                } else {
                    options.add(objectLabel + '####' + sobj.getDescribe().getName());
                }
            }
        }
        return options;
    }
    @AuraEnabled
    public static List<FieldInfoWrapper> getFieldList(String selectedSObject){
        List<FieldInfoWrapper> wrapperList = new List<FieldInfoWrapper>();
        if(selectedSObject != null){
            Map<string,SObjectField> fList = schema.getGlobalDescribe().get(selectedSObject).getDescribe().fields.getMap();
            for(string str: fList.keySet()){
                FieldInfoWrapper wrapper = new FieldInfoWrapper();
                Schema.DescribeFieldResult fieldResult = fList.get(str).getDescribe();
                if ( fieldResult.isCreateable() && fieldResult.isAccessible() ) {
                    wrapper.fieldAPIName = str.capitalize();
                    wrapper.fieldLabel   = fieldResult.getLabel();
                    wrapper.fieldType    = String.valueOf(fieldResult.getType());
                    if ( wrapper.fieldType == 'PICKLIST' || wrapper.fieldType == 'MULTIPICKLIST') {
                        wrapper.picklistValues = describePicklistField(
                            JSON.serialize(fieldResult.getPicklistValues())
                        );
                    } else {
                        wrapper.picklistValues = new List<String>();
                    }
                    if ( wrapper.fieldType == 'REFERENCE' ) {
                        Schema.SObjectType parentObj = fieldResult.getReferenceTo().get(0);
                        wrapper.parentObjectName = parentObj.getDescribe().getName();
                    }
                    if ( !fieldResult.isNillable() && !fieldResult.isDefaultedOnCreate() ) {
                        wrapper.required   = true;
                    }
                    wrapperList.add(wrapper);  
                }
            }
        }else{
            return null;
        }
        return wrapperList;
    }

    public static List<String> describePicklistField( String value ){
        List<String> options = new List<String>();
        List<Schema.PicklistEntry> values = (List<Schema.PicklistEntry>)JSON.deserialize(value, List<Schema.PicklistEntry>.class);
        for (Schema.PicklistEntry a : values) {
            options.add( a.getLabel() + '####' + a.getValue() );
        }
        return options;
    }

    public class FieldInfoWrapper {
        @AuraEnabled 
        public String fieldType                       { get; set; }
        @AuraEnabled 
        public String fieldAPIName                    { get; set; }
        @AuraEnabled 
        public String fieldLabel                      { get; set; }
        @AuraEnabled 
        public String parentObjectName                { get; set; }
        @AuraEnabled 
        public List<String> picklistValues            { get; set; }
        @AuraEnabled 
        public Boolean required                       { get; set; }

    }

    public class FieldWrapper {
        
    }
}