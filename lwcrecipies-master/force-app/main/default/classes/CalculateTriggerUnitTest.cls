/*
    @Author : Amit Singh
    @BuiltDate : 30th OCT 2019
    @Company : sfdcpanther
	@Name    : Calculate
	@Description: Test Class for Calculate Trigger
*/
@isTest
public class CalculateTriggerUnitTest {
	@testSetup
    public static void setUpData() {
        /* Create Shipping Invoice Record */
        Shipping_Invoice__c invoice = new Shipping_Invoice__c();
        invoice.Name = 'Amit Singh Test Invoice';
        insert invoice;

        List<Item__c> itemList = new List<Item__c> ();
        for ( Integer i=0; i< 100 ; i++ ) {
            Item__c item = new Item__c();
            item.Name = 'Item '+i;
            item.Invoice__c    = invoice.Id;
            item.Price__c      = 23+i;
            item.Quantity__c   = i;
            item.Weight__c     = 1.34;
            itemList.add(item);
        }
        insert itemList;
        /* Create Invoice Item Records */
    }
    
    public static testMethod void afterDeleteTest() {
        List<Item__c> itemsList = [Select Id, Name From Item__c Limit 10];
        Test.startTest();
        	delete itemsList;
        System.assertEquals(0, 0, 'Problem while Deleting Items Record ');
        Test.stopTest();
    }
    
    public static testMethod void afterUndeleteTest() {
        List<Item__c> itemsList = [Select Id, Name From Item__c Limit 10];
        Test.startTest();
        	delete itemsList;
        System.assertEquals(0, 0, 'Problem while Deleting Items Record ');
        	undelete itemsList;
        System.assertEquals(3, itemsList.size(), 'Items Record Deleted');
        Test.stopTest();
    }
    
    public static testMethod void afterUpdatetest() {
        List<Item__c> itemsList = [Select Id, Name From Item__c Limit 10];
        for (Item__c item : itemsList) {
            item.Price__c = 40;
        }
        Test.startTest();
        	update itemsList;
        Test.stopTest();
    }
}