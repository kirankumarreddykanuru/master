/*
    @Author 	 : Amit Singh
    @BuiltDate   : 25th OCT 2019
    @Company 	 : sfdcpanther
	@Name    	 : ItemTriggerHelper
	@Description : Helper Class for ItemTriggerHandler Class Which Updates the shipping invoice, 
					calculates the totals and shipping.
*/
public with sharing class ItemTriggerHelper {
    
    public static void calculateShippingAndTax( List<Item__c> itemList ) {
        
        Set<Id> shippingInvoiceIdsSet = new Set<Id>();
        
        /*  Iterate through with the List and add the Invoice into a Set
        	Use Traditional For Loop to improve the performance while handling Bulk Records
		*/
        for (Integer i=0; i <itemList.size(); i++ ){
            shippingInvoiceIdsSet.add( itemList.get(i).Invoice__c );
        }
        // Query on Item__c object and get the Invoice Total
        List<AggregateResult> aggrResult = [ Select Invoice__c , sum(Quantity__c), sum(Weight__c), 
                        sum(Price__c) FROM Item__c Where Invoice__c IN : shippingInvoiceIdsSet
                        Group By Invoice__c ];
        
        /* Create a List of Shipping_Invoice__c Object to update */
        List<Shipping_Invoice__c> invoiceList = new List<Shipping_Invoice__c>();
        /* Use Traditional For Loop to improve the performance in case of Bulk Records */
        for (Integer i=0; i < aggrResult.size(); i ++ ){
            AggregateResult ar  = aggrResult.get(i);
            Id invoiceId 	    = (Id)ar.get('Invoice__c');
            Decimal Quantity    = (Decimal)ar.get('expr0');
            Decimal Weight 	    = (Decimal)ar.get('expr1');
            Decimal Price 	    = (Decimal)ar.get('expr2');

            Shipping_Invoice__c invoice  = new Shipping_Invoice__c ();
            invoice.Id					 = invoiceId;
            invoice.Subtotal__c          = Price;
            invoice.TotalWeight__c       = Weight;
            Decimal shippingPrice        = ( Weight * 2.20 * ItemTriggerHandler.SHIPPING_RATE ) / 100;
            invoice.Shipping__c          = shippingPrice;
            invoice.ShippingDiscount__c  = 0.00;
            if ( Price > 100 ) {
                invoice.ShippingDiscount__c  = shippingPrice;
                invoice.Shipping__c          = 0.00;
            }
            invoice.Tax__c               = ( Price * ItemTriggerHandler.TAX_RATE ) / 100;
            invoice.GrandTotal__c        = invoice.Subtotal__c + invoice.Tax__c  + invoice.Shipping__c;
            invoiceList.add(invoice);
            /* 
             * Remove Invoice id From shippingInvoiceIdsSet Set in case user is deleting all Items 
             * to update the Parent Shipping Invoice with zero values
             */
            if ( shippingInvoiceIdsSet.contains(invoiceId) ) {
                 shippingInvoiceIdsSet.remove(invoiceId);
            }
        }
        
        if ( shippingInvoiceIdsSet!= null && shippingInvoiceIdsSet.size() > 0 ){
            for ( Id invoiceId : shippingInvoiceIdsSet ) {
                /* Prepare Shipping_Invoice__c Object */
                Shipping_Invoice__c invoice  = new Shipping_Invoice__c ();
            	invoice.Id					 = invoiceId;
                invoice.Subtotal__c          = 0.00;
                invoice.TotalWeight__c       = 0.00;
                invoice.Shipping__c          = 0.00;
                invoice.Tax__c               = 0.00;
                invoice.GrandTotal__c        = 0.00;
                invoice.ShippingDiscount__c  = 0.00;
                invoiceList.add(invoice);
            }
        }
        
        if ( invoiceList.size() > 0 ){
            List<Database.SaveResult> updatedInvoiceList = Database.update( invoiceList, false );
            for ( Integer i = 0; i < updatedInvoiceList.size(); i++ ) {
                Database.SaveResult sr = updatedInvoiceList.get(i);
                if ( sr.isSuccess() ) {
                    System.debug(' Invoice Updated '+sr.getId());
                } else {
                    System.debug(' Error Updating Invoice '+ sr.getId() + ' '+String.join(sr.getErrors(),','));
                }
            }
        }
    }
}