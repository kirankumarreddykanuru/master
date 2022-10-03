public with sharing class StripeUtility {
    
    public static Stripe_Config__mdt stripeConfig { get; set; }
    
    public static void StripeSetup() {
        Organization org = [Select Id, Name, isSandbox from Organization Limit 1];
        List<Stripe_Config__mdt> configList;
        if (org.isSandbox) {
            configList = StripeUtil.getConfig(System.Label.Stripe_Sandbox);
        } else {
            configList = StripeUtil.getConfig(System.Label.Stripe_Prod);
        }
        if ( configList != null && configList.size() > 0) {
            stripeConfig = configList.get(0);
        }
    }

    @AuraEnabled
    public static Contact make_Payment( String contactId, String customer_id, String amount, String card_no, 
                                    String cvv, String exp_month, string exp_year){
        StripeSetup();
        User customerInfo = [Select Id, Name, Email From User Where Id=: System.UserInfo.getUserId() ];
        Map<String, String> card_properties = new Map<String, String>{
                'card[number]'    => card_no,
                'card[exp_month]' => exp_month,
                'card[exp_year]'  => exp_year,
                'card[cvc]'       => cvv
        };
        Map<String, String> customer_properties = new Map<String, String>{
                'name'  => customerInfo.Name,
                'email' => customerInfo.Email
        };
        if ( String.isBlank(customer_id) ){
            Contact customer = createCustomer(customer_properties, null, card_properties, amount, contactId);
            return customer;
        } else {
            Integer amt = Integer.valueOf(amount)*100;
            Map<String, String> charge_prop = new Map<String, String>{
                	'amount' => String.valueOf(amt),
                    'currency' => 'usd',
                    'customer'   => customer_id
            };
            StripeResponse chargeResp = StripeUtil.sendRequest(stripeConfig.client_secret__c, 'POST', 
                                stripeConfig.Create_Charge__c , charge_prop, null);
            if ( chargeResp != null && chargeResp.responseMap != null ) {
                return new Contact(Id = contactId );
            }
        }
       return new Contact();
    }
    /*
    public static void createCharge(Map<String, String> properties) {
        Http http = new Http();
        HttpRequest httpReq = new HttpRequest();
        httpReq.setHeader('Authorization', 'Bearer '+stripeConfig.client_secret__c);
        httpReq.setMethod('POST');
        httpReq.setEndPoint(stripeConfig.Create_Charge__c);
		Map<String, String> payload = new Map<String, String>();
        if (properties != null) {
            for (String key : properties.keySet()) {
                if (properties.get(key) != null) {
                    payload.put(key, properties.get(key));
                }
            }
        }
        
        httpReq.setBody(StripeUtil.urlify(payload));
        String errorMessage = '';
        HttpResponse httpRes = new HttpResponse();
        try {
            httpRes = http.send(httpReq);
            if (httpRes.getStatusCode() == 200 ) {
                Map<String, Object> responseMap = (Map<String, Object>) JSON.deserializeUntyped(httpRes.getBody());
                System.debug(' responseMap '+ responseMap);
               		
            } else {
                 errorMessage = 'Unexpected Error while communicating with  API. '
                        +'Status '+httpRes.getStatus()+' and Status Code '+httpRes.getStatuscode()
                        +httpRes.getBody();
                System.debug(' errorMessage '+ errorMessage);
            }
        } catch(System.Exception ex ) {
            if(String.valueOf(ex.getMessage()).startsWith('Unauthorized endpoint')){
                errorMessage = 'Unauthorize endpoint: An Administer must go to Setup -> Administer -> Security Control ->'
                    +' Remote Site Setting and add '+' '+ stripeConfig.Create_Charge__c +' Endpoint';
            }else{
                errorMessage = 'Unexpected Error while communicating with API. '
                    +'Status '+httpRes.getStatus()+' and Status Code '+httpRes.getStatuscode()+
                    httpRes.getBody();
            }
            System.debug(' errorMessage '+ errorMessage);
        }
    }
    */
    public static Contact updateCustomer(String contactId, String customer_id, Map<String, Object> properties ) {
        Contact customer = new Contact( Id = contactId , Customer_Id__c = customer_id );
        System.debug(' Updating Customer Record '+customer );
        update customer;
        return customer;
    }
    public static Contact createCustomer(Map<String, String> properties, Map<String, String> metadata, 
                                      Map<String, String> card_properties, String amount, String contactId) {
        Contact customer = new Contact();
        if ( stripeConfig == null) {
            return customer;
        }
        StripeResponse response = StripeUtil.sendRequest(stripeConfig.client_secret__c, 'POST', 
                                                        stripeConfig.Create_Customer__c, properties, 
                                                        metadata);
        if ( response != null && response.responseMap != null ) {
            String cus_Id = (String)response.responseMap.get('id');
            if ( !String.isBlank(cus_Id) ) {
                /*card_properties = new Map<String, String>{
                            'card[number]' => '4242424242424242',
                            'card[exp_month]' => '12',
                            'card[exp_year]' => '2022',
                            'card[cvc]' => '314'
                };*/
                String endPoint = stripeConfig.Create_Customer__c+'/'+cus_Id+'/cards';
                StripeResponse cardToken = StripeUtil.sendRequest(stripeConfig.client_secret__c, 'POST', 
                                                        stripeConfig.Create_Token__c , card_properties, 
                                                    metadata);
                if ( cardToken != null && cardToken.responseMap != null ) {
                    String tok_id = (String)cardToken.responseMap.get('id');
                    if ( !String.isBlank(tok_id) ) {
                        Map<String, String> payload = new Map<String, String>{
                            'card' => tok_id
                        };
                        StripeResponse customerCard = StripeUtil.sendRequest(stripeConfig.client_secret__c, 
                                            'POST', endPoint , payload, metadata);
                        Integer amt = Integer.valueOf(amount)*100;
                        if ( customerCard != null && customerCard.responseMap != null ) {
                            Map<String, String> charge_prop = new Map<String, String>{
                                'amount' => String.valueOf(amt),
                                'currency' => 'usd',
                                'customer'   => cus_Id
                             };
                            StripeResponse chargeResp = StripeUtil.sendRequest(stripeConfig.client_secret__c, 'POST', 
                                                    stripeConfig.Create_Charge__c , charge_prop, metadata);
                            if ( chargeResp != null && chargeResp.responseMap != null ) {
                                customer = updateCustomer(contactId, cus_Id, chargeResp.responseMap);
                            }
                        }
                    }
                }
            }
        }
        return customer;
        /*
        Http http = new Http();
        HttpRequest httpReq = new HttpRequest();
        httpReq.setHeader('Authorization', 'Bearer '+stripeConfig.client_secret__c );
        httpReq.setMethod('POST');
        httpReq.setEndPoint(stripeConfig.Create_Customer__c);
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
        try {
            httpRes = http.send(httpReq);
            if (httpRes.getStatusCode() == 200 ) {
                Map<String, Object> responseMap = (Map<String, Object>) JSON.deserializeUntyped(httpRes.getBody());
                String cus_Id = (String)responseMap.get('id');
                Map<String, String> card_properties = new Map<String, String>{
                            'card[number]' => '4242424242424242',
                            'card[exp_month]' => '11',
                            'card[exp_year]' => '2020',
                            'card[cvc]' => '314'
                        }; 
               if ( !String.isBlank(cus_Id) ) {
                   addCardToCustomer(cus_Id, card_properties, null);
               } 
               		
            } else {
                 errorMessage = 'Unexpected Error while communicating with  API. '
                        +'Status '+httpRes.getStatus()+' and Status Code '+httpRes.getStatuscode()
                        +httpRes.getBody();
                System.debug(' errorMessage '+ errorMessage);
            }
        } catch(System.Exception ex ) {
            if(String.valueOf(ex.getMessage()).startsWith('Unauthorized endpoint')){
                errorMessage = 'Unauthorize endpoint: An Administer must go to Setup -> Administer -> Security Control ->'
                    +' Remote Site Setting and add '+' '+ stripeConfig.Create_Customer__c +' Endpoint';
            }else{
                errorMessage = 'Unexpected Error while communicating with API. '
                    +'Status '+httpRes.getStatus()+' and Status Code '+httpRes.getStatuscode()+
                    httpRes.getBody();
            }
            System.debug(' errorMessage '+ errorMessage);
        }*/
    }
    /*public static void addCardToCustomer(String customerId, Map<String, String> properties, 
                                    Map<String, String> metadata) {
                                       
        String card_token = createToken(properties, null);
        if ( card_token == null) {
            return;
        }
        Http http = new Http();
        HttpRequest httpReq = new HttpRequest();
        httpReq.setHeader('Authorization', 'Bearer '+stripeConfig.client_secret__c);
        httpReq.setMethod('POST');
        httpReq.setEndPoint(stripeConfig.Create_Customer__c+'/'+ customerId + '/cards');
        Map<String, String> payload = new Map<String, String>{
            'card' => card_token
        };
        httpReq.setBody(StripeUtil.urlify(payload));
        HttpResponse httpRes = new HttpResponse();
        String errorMessage = '';
        try {
            httpRes = http.send(httpReq);
            if (httpRes.getStatusCode() == 200 ) {
                Map<String, Object> responseMap = (Map<String, Object>) JSON.deserializeUntyped(httpRes.getBody());
                Integer amount_int = Math.round(1000 * 100);
                Map<String, String> properties_charge = new Map<String, String>{
                    'customer' => customerId,
                    'amount' => String.valueOf(amount_int),
                    'currency' => 'usd'
                };
                createCharge(properties_charge);
            } else {
                 errorMessage = 'Unexpected Error while communicating with  API. '
                        +'Status '+httpRes.getStatus()+' and Status Code '+httpRes.getStatuscode()
                        +httpRes.getBody();
                System.debug(' Card Error Body '+ errorMessage); 
            }
        } catch(System.Exception ex ) {
            if(String.valueOf(ex.getMessage()).startsWith('Unauthorized endpoint')){
                errorMessage = 'Unauthorize endpoint: An Administer must go to Setup -> Administer -> Security Control ->'
                    +' Remote Site Setting and add '+' '+ stripeConfig.Create_Customer__c +' Endpoint';
            }else{
                errorMessage = 'Unexpected Error while communicating with API. '
                    +'Status '+httpRes.getStatus()+' and Status Code '+httpRes.getStatuscode()+
                    httpRes.getBody();
            }
            System.debug(' errorMessage Customer '+ errorMessage);
        }
    }

    public static String createToken(Map<String, String> properties, Map<String, String> metadata) {
        
        Http http = new Http();
        HttpRequest httpReq = new HttpRequest();
        httpReq.setHeader('Authorization', 'Bearer '+stripeConfig.client_secret__c);
        httpReq.setMethod('POST');
        httpReq.setEndPoint(stripeConfig.Create_Token__c);
        Map<String, String> payload = new Map<String, String>();
        if (properties != null) {
            for (String key : properties.keySet()) {
                if (properties.get(key) != null) {
                    payload.put(key, properties.get(key));
                }
            }
        }
        httpReq.setBody(StripeUtil.urlify(payload));
        HttpResponse httpRes = new HttpResponse();
        String errorMessage = '';
        try {
            httpRes = http.send(httpReq);
            if (httpRes.getStatusCode() == 200 ) {
                Map<String, Object> responseMap = (Map<String, Object>) JSON.deserializeUntyped(httpRes.getBody());
                String tok_id = (String)responseMap.get('id');
                return tok_id;
            } else {
                 errorMessage = 'Unexpected Error while communicating with  API. '
                        +'Status '+httpRes.getStatus()+' and Status Code '+httpRes.getStatuscode()
                        +httpRes.getBody();
                System.debug(' errorMessage '+ errorMessage);
                return errorMessage;
            }
        } catch(System.Exception ex ) {
            if(String.valueOf(ex.getMessage()).startsWith('Unauthorized endpoint')){
                errorMessage = 'Unauthorize endpoint: An Administer must go to Setup -> Administer -> Security Control ->'
                    +' Remote Site Setting and add '+' '+ stripeConfig.Create_Token__c +' Endpoint';
            }else{
                errorMessage = 'Unexpected Error while communicating with API. '
                    +'Status '+httpRes.getStatus()+' and Status Code '+httpRes.getStatuscode()+
                    httpRes.getBody();
            }
            return errorMessage;
        }
        
    }*/
}