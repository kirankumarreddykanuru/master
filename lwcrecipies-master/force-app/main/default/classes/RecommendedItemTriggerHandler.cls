/*
    @Author 	 : Amit Singh
    @BuiltDate   : 25th OCT 2019
    @Company 	 : sfdcpanther
	@Name    	 : ItemTriggerHandler
	@Description : Handler Class for RecommendItem Trigger on Recommended_Item__c object Which Updates the shipping invoice, 
				   calculating if there is a shipping discount on insert of some recommended item into cart.
*/
public class RecommendedItemTriggerHandler implements TriggerInterface {
	public static void beforeInsert(List<sObject> newRecordsList){
        
    }

    public static void afterInsert(List<sObject> newRecordsList , Map<Id, sObject> newRecordsMap){
        
    }

    public static void beforeUpdate(Map<Id, sObject> newRecordsMap, Map<Id, sObject> oldRecordsMap){
        
    }

    public static void afterUpdate(Map<Id, sObject> newRecordsMap,  Map<Id, sObject> oldRecordsMap){
        
    }
          
    public static void beforeDelete(List<sObject> oldRecordsList , Map<Id, sObject> oldRecordsMap){
        
    }

    public static void afterDelete(Map<Id, sObject> oldRecordsMap){
        
    }
    
    public static void afterUnDelete(List<sObject> newRecordsList , Map<Id, sObject> newRecordsMap) {
        
    }
}