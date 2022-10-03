/*
    @Author 	 : Amit Singh
    @BuiltDate   : 25th OCT 2019
    @Company 	 : sfdcpanther
	@Name    	 : ItemTriggerHandler
	@Description : Handler Class for Calculate Trigger on Item__c Which Updates the shipping invoice, 
					calculates the totals and shipping.
*/
public with sharing class ItemTriggerHandler implements TriggerInterface {
    
    public static FINAL Decimal TAX_RATE 	   = Decimal.valueOf(System.Label.TAX_RATE);
    public static FINAL Decimal SHIPPING_RATE  = Decimal.valueOf(System.Label.Shipping_Rate);
    
    public static void beforeInsert(List<sObject> newRecordsList){
        List<Item__c> itemList = (List<Item__c>)newRecordsList;
        string currentUserId = UserInfo.getUserId();
        Set<String> itemsNameSet = new Set<String>();
        List<Item__c> existinsItems = new List<Item__c>();
        System.debug('itemList '+itemList);
        for ( Item__c item : itemList) {
            itemsNameSet.add(item.Name);
        }
        existinsItems = [Select Id, Name 
                                From Item__c 
                                Where NAME IN: itemsNameSet 
                                AND Invoice__r.OwnerId !=:currentUserId 
                        ];
        for ( Item__c item : itemList) {
            if ( existinsItems!= null && existinsItems.size() > 0 ) {
                item.addError(' Same Item is already added by other User! Please Try to add Other Item');
            }
        }
        
    }

    public static void afterInsert(List<sObject> newRecordsList , Map<Id, sObject> newRecordsMap){
        List<Item__c> itemList = (List<Item__c>)newRecordsList;
        ItemTriggerHelper.calculateShippingAndTax(itemList);
    }

    public static void beforeUpdate(Map<Id, sObject> newRecordsMap, Map<Id, sObject> oldRecordsMap){
        
    }

    public static void afterUpdate(Map<Id, sObject> newRecordsMap,  Map<Id, sObject> oldRecordsMap){
        List<Item__c> itemsList = (List<Item__c>)newRecordsMap.values();
        List<Item__c> itemsPriceChanged = new List<Item__c>();
        for ( Integer i=0; i < itemsList.size(); i++) {
            Item__c oldCopy = (Item__c)oldRecordsMap.get(itemsList.get(i).Id);
            Item__c newCopy = itemsList.get(i);
            // Check if Price, Price, Quantity Has been changed of any Item Record
            if ( oldCopy.Price__c != newCopy.Price__c ||  oldCopy.Quantity__c != newCopy.Quantity__c 
                        || oldCopy.Weight__c != newCopy.Weight__c 
                ) {
                itemsPriceChanged.add(newCopy);
            }
        }
        ItemTriggerHelper.calculateShippingAndTax(itemsPriceChanged);
    }
          
    public static void beforeDelete(List<sObject> oldRecordsList , Map<Id, sObject> oldRecordsMap){
        
    }

    public static void afterDelete(Map<Id, sObject> oldRecordsMap){
        Map<Id, Item__c> oldItemsMap = (Map<Id, Item__c>)oldRecordsMap;
        ItemTriggerHelper.calculateShippingAndTax(oldItemsMap.values());
    }
    
    public static void afterUnDelete(List<sObject> newRecordsList , Map<Id, sObject> newRecordsMap) {
        List<Item__c> itemList = (List<Item__c>)newRecordsList;
        ItemTriggerHelper.calculateShippingAndTax(itemList);
    }
}