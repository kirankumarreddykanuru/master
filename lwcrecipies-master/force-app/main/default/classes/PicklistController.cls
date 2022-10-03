public with sharing class PicklistController {
    
    @AuraEnabled
    public static String getRecordTypeId(String objectApiName, String fieldApiName, String Name) {
        Id recordTypeId = null;
        List<RecordType> recordTypeList = new List<RecordType>();
        recordTypeList = [Select Id From RecordType Where sObjectType =: objectApiName AND Name =: Name];
        if ( recordTypeList.size() > 0) {
            recordTypeId = recordTypeList.get(0).Id;
        }
        String picklistvalues = picklistByRecordType( objectApiName, fieldApiName, recordTypeId );

        return picklistvalues;
    }
    public static String fetchUserSessionId(){
        String sessionId = '';
        PageReference reportPage = Page.SessionId;
        String vfContent = reportPage.getContent().toString();
        Integer startP = vfContent.indexOf('Start_Of_Session_Id') + 'Start_Of_Session_Id'.length(),
            endP = vfContent.indexOf('End_Of_Session_Id');
        sessionId =  vfContent.substring(startP, endP);
        return sessionId;
    }

    /* /ui-api/object-info/Account/picklist-values/0123k000001lPsM */
    @AuraEnabled
    public static String picklistByRecordType( String objectApiName, String fieldApiName , 
                                                    String recordTypeId){
        Http http            = new Http();
        HttpRequest httpReq  = new HttpRequest();
        HttpResponse httpRes = new HttpResponse();
        String baseURL       = System.URL.getSalesforceBaseUrl().toExternalForm()+'/';
        String end_Point     = 'services/data/v46.0/ui-api/object-info/'+objectApiName+'/picklist-values/'+recordTypeId+'';
        String finalUrl      = baseURL+end_Point;
        String sessionId     = fetchUserSessionId();
        httpReq.setMethod('GET');
        httpReq.setEndpoint(finalUrl);
        httpReq.setHeader('Authorization', 'Bearer '+sessionId);
        httpReq.setHeader('Accept', 'application/json');
        httpReq.setHeader('Content-Type', 'application/json; charset=UTF-8');
        String errorMessage = '';
        try {
            httpRes = http.send(httpReq);
            if (httpRes.getStatusCode() == 200 ) {
                Map<String, Object> responseMap = (Map<String, Object>) JSON.deserializeUntyped(httpRes.getBody());
                return JSON.serialize(responseMap);
            } else {
                 errorMessage = 'Unexpected Error while communicating with  API. '
                        +'Status '+httpRes.getStatus()+' and Status Code '+httpRes.getStatuscode()
                        +httpRes.getBody();
                return errorMessage;
            }
        } catch(System.Exception ex ) {
            if(String.valueOf(ex.getMessage()).startsWith('Unauthorized endpoint')){
                errorMessage = 'Unauthorize endpoint: An Administer must go to Setup -> Administer -> Security Control ->'
                    +' Remote Site Setting and add '+' '+ baseURL +' Endpoint';
            }else{
                errorMessage = 'Unexpected Error while communicating with API. '
                    +'Status '+httpRes.getStatus()+' and Status Code '+httpRes.getStatuscode()+
                    httpRes.getBody();
            }
            return errorMessage;
        }
    }

    @AuraEnabled
    public static List<String> describePicklistField( String objectApiName, String fieldApiName ){
        List<String> options = new List<String>();
        /* Get the sObject type of the Object API Name */
        Schema.sObjectType objType = Schema.getGlobalDescribe().get(objectApiName); 
        
        Schema.DescribeSObjectResult objDescribe = objType.getDescribe();       
        
        Map<String, Schema.SObjectField> fieldMap = objDescribe.fields.getMap(); 
        
        List<Schema.PicklistEntry> values = fieldMap.get(fieldApiName).getDescribe().getPickListValues();
        
        for (Schema.PicklistEntry a : values) {
            options.add( a.getLabel() + '####' + a.getValue() );
        }
        return options;
    }
}