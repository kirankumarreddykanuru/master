public with sharing class InsertQuickAction {
   @AuraEnabled
   public static void accounts(Id accid){
       try {
          Account acc=[select Id,name from Account Where Id=:accid Limit 1] ;
              Contact con = new Contact();
             con.LastName = acc.Name;
             con.AccountId=acc.id;
             insert con;

       } catch (Exception e) {
           throw new AuraHandledException(e.getMessage());
       }
   }
}