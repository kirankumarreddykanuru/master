public with sharing class Compoffapex {
    @AuraEnabled(cacheable=true)

    public static List<Contact> noleave( String idd){

        List<Leave__c> l= [SELECT Id, contact__r.No_of_leaves__c,contact__c From Leave__c where Id=:idd];

        String conid;

            for(Leave__c ll : l){

                conid=ll.contact__c;

            }

            return [select No_of_leaves__c,Id from contact where Id =:conid];

    }
}
