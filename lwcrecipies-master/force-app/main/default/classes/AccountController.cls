public with sharing class AccountController {
    @AuraEnabled
    public static string createRecord(String recordInfo){
        Account sObj = (Account)JSON.deserialize(recordInfo, Account.class);
        insert sObj;
        return JSON.serialize(sObj);
    }
}