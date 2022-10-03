public with sharing class getProducts {
  
   
    @AuraEnabled(cacheable=true)
    public static List<Product2> getProductlist(String pdtName){
      
        List<Product2> productList;
        try {
            String key = '%' + pdtName + '%';

            productList =[ SELECT Id,Name,Product_Image_Link__c, QuantityUnitOfMeasure FROM Product2 WHERE Product2.Name LIKE : key
            LIMIT 8
               
            ];

        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        return productList;
    }

   ID productId  = '';
   String accounId= '';
         
        @AuraEnabled
        public static string createOLIs(List<productWrapper> productList, String oppId){
            try {
                Map<String,String> productVsprcbkentryMap = new Map<String,String>();
                Map<String,Decimal> productVsprcbkentryListPriceMap = new Map<String,Decimal>();
                for(productWrapper prd : productList){
                    PricebookEntry prentry = [SELECT Id,UnitPrice from PricebookEntry WHERE Product2Id = :prd.productId AND Pricebook2.isStandard = true LIMIT 1];
                    productVsprcbkentryMap.put(prd.productId, prentry.Id);
                    productVsprcbkentryListPriceMap.put(prd.productId, prentry.UnitPrice);
                }
                List<OpportunityLineItem> oliInsertList = new List<OpportunityLineItem>();
                for(productWrapper prod : productList){
                OpportunityLineItem oli = new OpportunityLineItem();
                oli.Product2Id = prod.productId;
                oli.OpportunityId = oppId;
                oli.PricebookEntryId = productVsprcbkentryMap.get(prod.productId);
                oli.Quantity = prod.productQuantity;
                oli.TotalPrice = prod.productQuantity * productVsprcbkentryListPriceMap.get(prod.productId);
                oliInsertList.add(oli);
                }
                if(oliInsertList.size()>0){
                    insert oliInsertList;
                    return 'success';
                }
                return 'failed';
            } catch (Exception e) {
                throw new AuraHandledException(e.getMessage());
            }
        }
    public class productWrapper {
        @AuraEnabled public Id productId {get;set;}
        @AuraEnabled public String productName {get;set;}
        @AuraEnabled public Integer productQuantity {get;set;}
        //@AuraEnabled public Decimal productListPrice {get;set;} 
     
    }       
    }
    