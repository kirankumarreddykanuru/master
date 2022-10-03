global with sharing class StripeUtil {

    global static List<Stripe_Config__mdt> getConfig(String Name) {
        List<Stripe_Config__mdt> configList = new List<Stripe_Config__mdt>();
        configList = [Select Id, MasterLabel, client_id__c, 
                             client_secret__c, Create_Charge__c, Create_Customer__c, 
                             Create_Token__c
                            From Stripe_Config__mdt 
                            Where MasterLabel =: Name 
                    ];
        return configList;
    }
    global static String blankValue(String s1, String s2) {
        if (s1 == null || s1 == '') return s2;
        return s1;
    }
    
    public static StripeResponse sendRequest(String authHeader, String method, String endPoint, 
                                   Map<String, String> properties, 
                                   Map<String, String> metadata ) {
        Http http = new Http();
        HttpRequest httpReq = new HttpRequest();
        httpReq.setHeader('Authorization', 'Bearer '+authHeader);
        httpReq.setMethod(method);
        httpReq.setEndPoint(endpoint);
		Map<String, String> payload = new Map<String, String>();
        if (properties != null) {
            for (String key : properties.keySet()) {
                if (properties.get(key) != null) {
                    payload.put(key, properties.get(key));
                }
            }
        }
        if (metadata != null) {
            for (String key : metadata.keySet()) {
                if (metadata.get(key) != null) {
                    payload.put('metadata['+key+']', metadata.get(key));
                }
            }
        }
        
        httpReq.setBody(StripeUtil.urlify(payload));
        String errorMessage = '';
        HttpResponse httpRes = new HttpResponse();
        StripeResponse response = new StripeResponse();
        try {
            httpRes = http.send(httpReq);
            if (httpRes.getStatusCode() == 200 ) {
                Map<String, Object> responseMap = (Map<String, Object>) JSON.deserializeUntyped(httpRes.getBody());
                response.responseMap  = responseMap;
                response.errorMessage = '';
            } else {
                 errorMessage = 'Unexpected Error while communicating with  API. '
                        +'Status '+httpRes.getStatus()+' and Status Code '+httpRes.getStatuscode()
                        +httpRes.getBody();
                response.responseMap  = null;
                response.errorMessage = errorMessage;
            }
        } catch(System.Exception ex ) {
            if(String.valueOf(ex.getMessage()).startsWith('Unauthorized endpoint')){
                errorMessage = 'Unauthorize endpoint: An Administer must go to Setup -> Administer -> Security Control ->'
                    +' Remote Site Setting and add '+' '+ endPoint +' Endpoint';
            }else{
                errorMessage = 'Unexpected Error while communicating with API. '
                    +'Status '+httpRes.getStatus()+' and Status Code '+httpRes.getStatuscode()+
                    httpRes.getBody();
            }
            response.responseMap  = null;
            response.errorMessage = errorMessage;
        }
        return response;
    }
    
    global static Date getDate(Integer dt) {
        String s = String.valueOf(dt)+'000';
        Long l = Long.valueOf(s);

        return DateTime.newInstance(l).date();
    }

    global static String urlify(Map<String, String> params) {
        String url = '&';
        for (String key : params.keySet()) {
            url += EncodingUtil.urlEncode(key, 'UTF-8') + '=' + EncodingUtil.urlEncode(blankValue(params.get(key), ''), 'UTF-8') + '&';
        }
        return url;
    }
    
    global static String cleanJson(String json) {
        json = json.replaceAll('"object":', '"stripeObject":');
        json = json.replaceAll('"date":', '"stripeDate":');
        json = json.replaceAll('"end":', '"endDate":');
        json = json.replaceAll('"data":', '"stripeData":');
        json = json.replaceAll('"currency":', '"stripeCurrency":');
        json = json.replaceAll('"type":', '"stripeType":');

        json = json.replaceAll('"customer":\\s?"cus_', '"customer_id": "cus_');
        json = json.replaceAll('"invoice":\\s?"in_', '"invoice_id": "in_');
        
        return json;
    }
}