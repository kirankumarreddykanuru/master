public with sharing class TableClass {
   
   
        @AuraEnabled(cacheable=true)
        public static List <AccWrapper> fetchAccounts() {

            Integer rowIndex = 0;
           List< AccWrapper> wrapList = new   List< AccWrapper>();
          List<Contact> conList= new List<Contact>();
            List<Account> accList = [ SELECT Id, Name, 
                    ( SELECT Id, Name , Email, Phone FROM Contacts )
                    FROM Account   ];
                  
                    if(!accList.isEmpty()){
                        for(Account acc : accList){

                            List<ConWrapper> conWraplist = new List<ConWrapper>();

                            AccWrapper accWrapper = new AccWrapper();
                            conList= acc.Contacts;
                            
                            for(Contact con :conList){
                             //   integer i;
                             //   for(i=0; i<=acc.Contacts.Size(); i++){
                                          String conURL= URL.getSalesforceBaseUrl().toExternalForm() + '/'+  con.Id;
                           //     }
                           
                                           conWraplist.add(new ConWrapper(con.Email ,con.Name, con.Phone, conURL));
                         
                            }


                      
                            accWrapper.accId = acc.Id;
                       
                            accWrapper.accName = acc.Name;
                            accWrapper.conwrapList = conWraplist;
                         
                            accWrapper.accURL = URL.getSalesforceBaseUrl().toExternalForm() + '/'+ acc.Id;

                            accWrapper.contCount=acc.Contacts.size();
                            accWrapper.contactCount = acc.Contacts.Size()+1;
                       rowIndex++;
                        //    if(acc.Contacts.size()>0){
                            wrapList.add(accWrapper);
                          // }
                        
                        }
                         
                     

                     
                    }
                    return wrapList;
        }

        public class AccWrapper{
            @AuraEnabled
            public  Integer contCount{get;set;}

            @AuraEnabled
            public  String accId{get;set;}
            @AuraEnabled
            public  contact conId{get;set;}
           
            @AuraEnabled
            public  String accURL{get;set;}
            @AuraEnabled
            public  String accName{get;set;}
            @AuraEnabled
            public List<ConWrapper> conwrapList{get;set;}
            @AuraEnabled
            public Integer contactCount{get;set;}

              @AuraEnabled
            public  Integer index{get;set;}
              @AuraEnabled
            public  Boolean isSelected{get;set;}
        }

        Public class ConWrapper{
            @AuraEnabled
            public  String conURL{get;set;}
            
            @AuraEnabled
            public  String Email{get;set;}
            
            @AuraEnabled
            public  String Name{get;set;}
            
            @AuraEnabled
            public  String Phone{get;set;}

            Public ConWrapper(String Email ,String Name, String Phone , String conURL ){
                this.Email = Email;
                this.Name = Name;
                this.Phone = Phone;
                this.conURL = conURL;

            }
        }




             
    @AuraEnabled( cacheable = true )
    public static void saveAccounts(List<Account> accList){
        Insert accList;
        /*if(accList.size()>0 && accList != null){
            insert accList;
        }*/
    } 
      
    }