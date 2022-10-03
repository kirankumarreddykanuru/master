/*
    @Author 	 : Amit Singh
    @BuiltDate 	 : 25th OCT 2019
    @Company 	 : sfdcpanther
	@Name    	 : ShippingInvoiceTriggerHandler
	@Description : Trigger Handler Class for ShippingDiscount Trigger on Shipping_Invoice__c Updates the shipping invoice, 
				   calculating if there is a shipping Discount
*/
public class ShippingInvoiceTriggerHandler implements TriggerInterface { 
    
	public void beforeInsert(List<sObject> newRecordsList){
        List<Shipping_Invoice__c> invoiceList = (List<Shipping_Invoice__c>)newRecordsList;
    }

    public void afterInsert(List<sObject> newRecordsList , Map<Id, sObject> newRecordsMap){
        
    }

    public void beforeUpdate(Map<Id, sObject> newRecordsMap, Map<Id, sObject> oldRecordsMap){
        
    }

    public void afterUpdate(Map<Id, sObject> newRecordsMap,  Map<Id, sObject> oldRecordsMap){
        /* We are calculating the Shipping Amount in the Calculate Trigger so we will not do any 
           Calculating in this method.
		*/
        List<Shipping_Invoice__c> invoiceList = (List<Shipping_Invoice__c>)newRecordsMap.values();
    }
          
    public void beforeDelete(List<sObject> oldRecordsList , Map<Id, sObject> oldRecordsMap){
        
    }

    public void afterDelete(Map<Id, sObject> oldRecordsMap){
        
    }
    
    public void afterUnDelete(List<sObject> newRecordsList , Map<Id, sObject> newRecordsMap) {
        
    }
}