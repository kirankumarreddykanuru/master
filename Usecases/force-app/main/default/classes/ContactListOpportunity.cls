public with sharing class ContactListOpportunity {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactList(String RecordId) {
         List<Opportunity> opp = [Select id,Name,AccountId FROM Opportunity where Id=:RecordId]; 
         return [Select id,Name,Phone,AccountId,Account.Name from Contact where AccountId=:opp[0].AccountId];   
          

    }
}
