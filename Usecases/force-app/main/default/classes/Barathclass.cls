public with sharing class Barathclass {

        @AuraEnabled(cacheable=true)
        public static List<Floater__c> getFloaterList(Integer Year){
          
            List<Floater__c> floaterList;
            try {
               
    
                floaterList =[ SELECT Id,color__c, Name ,Month__c, date__c, Day__c FROM Floater__c WHERE  Floater__c.Year__c =:Year
           ];
    
            } catch (Exception e) {
                throw new AuraHandledException(e.getMessage());
            }
            return floaterList;
        }
}
