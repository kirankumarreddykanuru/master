public with sharing class ContactController {
   
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts(){
        List<Contact> contactList;
        try {

            contactList =[ SELECT Name, Email ,phone, PhotoUrl
                FROM Contact
                WHERE  Email != null AND
                      PhotoUrl != null
                LIMIT 5
               
            ];

        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        return contactList;
    }

    @AuraEnabled
       public static List<Contact> searchImperativeContactList(String contactName){
           if (String.isBlank(contactName)) {
                return new List<Contact>();
            }
            String key = '%' + contactName + '%';
            return [SELECT Id, Name, Email FROM Contact WHERE Contact.Name LIKE : key];
       }


 @AuraEnabled(cacheable=true)
public static List<Contact> retrieveContactData(string keySearch){

List<Contact> contactList = [Select Id, FirstName, LastName, Email, Phone, Account.Name From Contact Where Account.Name=:keySearch];

return contactList;

}

@AuraEnabled(cacheable=true)
public static List <Account>findContacts(string keySearch) 
{String key = '%'+ keySearch + '%';
return [SELECT Id, Name, Industry, Phone  FROM Account WHERE Name 
LIKE :key 
LIMIT 10];


}





       

}