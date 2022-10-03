public with sharing class ControllerClass {
        @AuraEnabled(cacheable=true)
        public static List<Contact> retrieveContactData(string Name, String Email){

        List<Contact> contactList = [Select Id, Name, Email From Contact Where Name=:Name AND Email=:Email];

        return contactList;

        }
}
