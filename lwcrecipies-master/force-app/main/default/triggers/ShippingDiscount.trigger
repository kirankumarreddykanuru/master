/*
    @Author 	 : Amit Singh
    @BuiltDate 	 : 25th OCT 2019
    @Company 	 : sfdcpanther
	@Name    	 : ShippingDiscount
	@Description : Updates the shipping invoice, calculating if there is a shipping
				   Discount
*/
trigger ShippingDiscount on Shipping_Invoice__c (before insert, after insert, before update, after update, before delete, after delete, after undelete) {
	TriggerDispatcher.run( new ShippingInvoiceTriggerHandler(), Trigger.operationType );
}