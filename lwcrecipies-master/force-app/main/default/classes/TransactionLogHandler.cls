/*
    @Author 	 : Amit Singh
    @BuiltDate 	 : 25th October 2019
    @Description : To create the Transaction Log record if there is any Error while processing !!
    @Company 	 : sfdcpanther
	@Name        : TransactionLogHandler
*/

public with sharing class TransactionLogHandler{

    public static void doHandleException(System.Exception ex , String processName){
        Transaction_Log__c transactionLog = new Transaction_Log__c(
            Error_Log__c = ex.getStackTraceString() +'<br/>' + ex.getMessage() 
            			   + '<br/>' + ex.getCause() +' <br/>'+ ex.getTypeName()+' <br/>'+ex.getLineNumber(),
            Exception_Time__c = System.Now(),
            Process_Name__c = processName,
            Class_Name__c = processName
        );
        if(Schema.sObjectType.Transaction_Log__c.isCreateable()){
            insert transactionLog;
        }
    }
}