public with sharing class ItemController {

    @AuraEnabled
    public static String createItems( String itemRecords, String invoiceId ) {
        List<Item__c> items = (List<Item__c>)JSON.deserialize(itemRecords, List<Item__c>.class);
        for ( Integer i=0; i < items.size(); i ++) {
            items.get(i).Invoice__c = invoiceId;
        }
        List<Database.saveResult> saveResults = Database.insert(items, true);
        for ( Integer j=0; j< saveResults.size(); j++) {
            Database.saveResult sr = saveResults.get(j);
            if (sr.isSuccess()) {
                System.debug(System.LoggingLevel.DEBUG, 'Record Created!');
            }
        }
        return JSON.serialize(saveResults);
    }

    @AuraEnabled
    public static Decimal productPrice(String productId){
        List<PricebookEntry> pbEntryList = [SELECT Name, Product2.Name,PriceBook2.Name, UnitPrice 
                                                   FROM PricebookEntry 
                                                   Where IsActive = true
                                                   AND Product2Id =: productId
                                            ];
        Decimal price = 0.00;
        if (pbEntryList != null && pbEntryList.size() > 0) {
            price = pbEntryList.get(0).UnitPrice;
        }
        return price;
    }
}