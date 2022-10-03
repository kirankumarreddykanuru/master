/*
    @Author : Amit Singh
    @BuiltDate : 25th OCT 2019
    @Company : sfdcpanther
	@Name    : Calculate
	@Description: Updates the shipping invoice, calculates the totals and shipping
*/
trigger Calculate on Item__c (before insert, after insert, before delete, after delete, before update, after update, after undelete) {
	TriggerDispatcher.run( new ItemTriggerHandler(), Trigger.operationType );
}