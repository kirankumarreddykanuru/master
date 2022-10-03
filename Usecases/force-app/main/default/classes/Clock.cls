
public with sharing class Clock {
  @auraEnabled
  public static String insertLoginDetails(){
      
    Time_Tracking__c logIns = new Time_Tracking__c();
        logIns.ClockInTime__c = system.now();
        insert logIns;
    return logIns.Id;
}
        @auraEnabled
        public static string updateRecord(String recordId){
            system.debug('recordId===='+recordId);
            Time_Tracking__c ac = [SELECT Id, ClockOutTime__c, ClockInTime__c FROM Time_Tracking__c where id =:recordId];
            ac.ClockOutTime__c = system.now();
            update ac;
            system.debug(ac);
            return null;
        }
      
}
 