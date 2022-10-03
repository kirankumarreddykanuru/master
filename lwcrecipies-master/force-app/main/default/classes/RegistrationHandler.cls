global class RegistrationHandler {
    
    public static User createPortalUser(Auth.UserData data){
    
        //We have a community id, so create a user with community access
        //TODO: Get an actual account
        Account a = [SELECT Id FROM account WHERE name='Acme'];
        Contact c = new Contact();
        c.accountId = a.Id;
        c.email = data.email;
        c.firstName = data.firstName;
        c.lastName = data.lastName;
        insert(c);

        
        User u = new User();
        Profile p = [SELECT Id FROM profile WHERE name='Customer Portal User'];
        u.username = data.username + '@panther.com.partner';
        u.email = data.email;
        u.lastName = data.lastName;
        u.firstName = data.firstName;
        String alias = data.username;
        //Alias must be 8 characters or less
        if(alias.length() > 8) {
            alias = alias.substring(0, 8);
        }
        u.alias = alias;
        u.languagelocalekey = UserInfo.getLocale();
        u.localesidkey = UserInfo.getLocale();
        u.emailEncodingKey = 'UTF-8';
        u.timeZoneSidKey = 'America/Los_Angeles';
        u.profileId = p.Id;
        u.contactId = c.Id;
        return u;
    }
    
    public static User createUser(Auth.UserData data){
        //This is not a community, so create a regular standard user
        User u = new User();
        Profile p = [SELECT Id FROM profile WHERE name='System Administrator'];
        
        u.username = data.email.subStringBefore('@') + '@panther.com.partner';
        u.email = data.email;
        u.lastName = data.lastName;
        u.firstName = data.firstName;
        String alias = u.username;
        //Alias must be 8 characters or less
        if(alias.length() > 8) {
            alias = alias.substring(0, 8);
        }
        u.alias = alias;
        u.languagelocalekey = UserInfo.getLocale();
        u.localesidkey = UserInfo.getLocale();
        u.emailEncodingKey = 'UTF-8';
        u.timeZoneSidKey = 'America/Los_Angeles';
        u.profileId = p.Id;
        
        return u;
    }
    
}