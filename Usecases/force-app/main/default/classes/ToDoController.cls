public with sharing class ToDoController {

    /*
    *	Author:- Rahul Malhotra
    *	Description:- This method is used to return a list of tasks
    */
    @AuraEnabled(cacheable=true)
    public static List<Task> getTasks() {
        return [SELECT Subject FROM Task WHERE OwnerId =:UserInfo.getUserId()];
    }

    /*
    *	Author:- Rahul Malhotra
    *	Description:- This method is used to insert a new task in Salesforce
    */
    @AuraEnabled
    public static Task insertTask(String subject) {
        try {
            Task task = new Task(
                Subject = subject,
                OwnerId = UserInfo.getUserId(),
                Status = 'Not Started',
                Priority = 'Normal'
            );
            insert task;
            return task;
        } catch(Exception e) {
            System.debug(e.getMessage());
        }
        return null;
    }

    /*
    *	Author:- Rahul Malhotra
    *	Description:- This method is used to delete a task from Salesforce based on the record id
    */
    @AuraEnabled
    public static Boolean deleteTask(Id recordId) {
        try {
            Database.delete(recordId);
            return true;
        } catch(Exception e) {
            System.debug(e.getMessage());
        }
        return false;
    }

}