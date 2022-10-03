public with sharing class ContactController {
    public ContactController() {

    }

    @AuraEnabled
    public static Contact createContact(String contactObj, String accountId){
        Contact con = (Contact)JSON.deserialize(contactObj, Contact.class);
        con.AccountId = accountId;
        insert con;
        Contact contactRecord = new Contact();
        List<Contact> contactList = [Select Id, FirstName, LastName, Name, Email, 
                                            Phone, Title 
                                            FROM Contact 
                                            Where Id =:con.Id];
        if( contactList != null && contactList.size() > 0 )
            contactRecord = contactList.get(0);
        
        return contactRecord;
    }

    @AuraEnabled
    public static List<Contact> getRelatedContacts(String accountId){
        List<Contact> contactList = [Select Id, FirstName, LastName, Name, Email, Phone, Title From Contact Where AccountId =:accountId];
        return contactList;
    }

    @AuraEnabled//(cacheable=true)
    public static List<Contact> createContacts(String recordList){
        //System.debug(' recordList '+recordList);
        List<Contact> contactList = (List<Contact>)JSON.deserialize(recordList, List<Contact>.class);
        //System.debug(' Contact List '+contactList);
        insert contactList;
        return contactList;
    }

    @AuraEnabled(cacheable=true)
    public static List<String> getpickVal(String ObjectName, String apiName){
        List<String> options = new List<String>();
        Schema.sObjectType objType = Schema.getGlobalDescribe().get(ObjectName);
        Schema.DescribeFieldResult fieldResult = objType.getDescribe().fields.getMap().get(apiName).getDescribe();
        List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
        for( Schema.PicklistEntry f : ple){
            options.add(f.getLabel()+'####'+f.getValue());
        }       
        return options;
    }
}