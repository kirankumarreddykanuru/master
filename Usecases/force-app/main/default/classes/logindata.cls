public with sharing class logindata {
    @AuraEnabled(Cacheable = true)
    public static List<LoginDetail__c> getdata() {
       
        return [SELECT Id, Date__c,Progress_Value__c,Gross_Hours__c,Log__c,CreatedDate FROM LoginDetail__c where CreatedDate =  LAST_N_DAYS:30];

    }

    @AuraEnabled(Cacheable = true)
    public static List<LoginDetail__c> getOCT() {
       
        return [SELECT Id, Date__c,Progress_Value__c,Gross_Hours__c,Log__c FROM LoginDetail__c where CALENDAR_MONTH (Date__c) = 10];

    }

    @AuraEnabled(Cacheable = true)
    public static List<LoginDetail__c> getSEP() {
       
        return [SELECT Id, Date__c,Progress_Value__c,Gross_Hours__c,Log__c FROM LoginDetail__c where CALENDAR_MONTH (Date__c) = 9];

    }

    @AuraEnabled(Cacheable = true)
    public static List<LoginDetail__c> getAUG() {
       
        return [SELECT Id, Date__c,Progress_Value__c,Gross_Hours__c,Log__c FROM LoginDetail__c where CALENDAR_MONTH (Date__c) = 8];

    }

    @AuraEnabled(Cacheable = true)
    public static List<LoginDetail__c> getJUL() {
       
        return [SELECT Id, Date__c,Progress_Value__c,Gross_Hours__c,Log__c FROM LoginDetail__c where CALENDAR_MONTH (Date__c) = 7];

    }

    @AuraEnabled(Cacheable = true)
    public static List<LoginDetail__c> getJUN() {
       
        return [SELECT Id, Date__c,Progress_Value__c,Gross_Hours__c,Log__c FROM LoginDetail__c where CALENDAR_MONTH (Date__c) = 6];

    }

    @AuraEnabled(Cacheable = true)
    public static List<LoginDetail__c> getMAY() {
       
        return [SELECT Id, Date__c,Progress_Value__c,Gross_Hours__c,Log__c FROM LoginDetail__c where CALENDAR_MONTH (Date__c) = 5];

    }
}