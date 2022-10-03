public with sharing class CustomLookupController {
    public CustomLookupController() {

    }
    @AuraEnabled(cacheable = true)
    public static List<SObject> findRecords(String searchKey, String objectName, String searchField){
        String key = '%' + searchKey + '%';
        String QUERY = 'Select Id, '+searchField+' From '+objectName +' Where '+searchField +' LIKE :key';
        System.debug(System.LoggingLevel.DEBUG, QUERY);
        List<SObject> sObjectList = Database.query(QUERY);
        return sObjectList;
    }
     @AuraEnabled(cacheable = true)
    public static void UpdateOwnerId(String AccId, Id OwnerIDs){
      

      
    /*    List<Account> sObjectList =[Select Id,OwnerId From Account Where Id =:AccId Limit 1];
         List<SObject> updatedList = new  List<SObject>();
        for(Account ss : sObjectList){
           ss.OwnerId=OwnerIDs;
           ss.Id= AccId;
            updatedList.add(ss);
        } 

       update updatedList;*/
       system.debug('userId : '+OwnerIDs);
      system.debug('AccId : '+AccId);
       Account acc = new Account();
       acc.OwnerId = OwnerIDs;
       acc.Id= AccId;
       update acc;
    }
}