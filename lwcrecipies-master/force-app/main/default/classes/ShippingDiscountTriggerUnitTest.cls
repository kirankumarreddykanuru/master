@isTest
public class ShippingDiscountTriggerUnitTest {
    @testSetup
    public static void setupData(){
        /* Create Shipping Invoice Record */
        Shipping_Invoice__c invoice = new Shipping_Invoice__c();
        invoice.Name = 'Amit Singh Test Invoice';
        insert invoice;
    }
    public static testMethod void afterUpdatetest() {
        List<Shipping_Invoice__c> invoiceList = [Select Id, Name From Shipping_Invoice__c Limit 100];
        for (Shipping_Invoice__c invoice : invoiceList) {
            invoice.Name = 'Invoice Test';
        }
        update invoiceList;
    }
}