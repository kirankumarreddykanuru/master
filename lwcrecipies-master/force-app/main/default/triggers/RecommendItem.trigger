/*
    @Author 	 : Amit Singh
    @BuiltDate 	 : 25th OCT 2019
    @Company 	 : sfdcpanther
	@Name    	 : RecommendItem
	@Description : Updates the shipping invoice, calculating if there is a shipping discount on 
				   insert of some recommended item into cart.
*/
trigger RecommendItem on Recommended_Item__c (before insert, after insert, before update, after update, before delete, after delete, after undelete) {
	TriggerDispatcher.run( new RecommendedItemTriggerHandler(), Trigger.operationType );
}