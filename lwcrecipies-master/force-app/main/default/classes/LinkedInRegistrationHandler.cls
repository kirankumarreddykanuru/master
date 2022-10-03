global class LinkedInRegistrationHandler implements Auth.RegistrationHandler{


    global User createUser(Id portalId, Auth.UserData data){
        
        
        String userName = data.email.subStringBefore('@') + '@panther.com.partner';
        String partnerUserName = data.email.subStringBefore('@') + '@panther.com.partner';
        
        List<User> userList = [Select Id, Name, Email, UserName From User 
                                      Where ( UserName =: userName OR UserName =: partnerUserName)
                                      AND isActive = true
                                      ];
        User user = new User();
        if(userList != null && userList.size() > 0){
            user = userList.get(0);
            return user;
        } else {
            
            if(data.attributeMap.containsKey('sfdc_networkid')) {
                // Portal User
                User u = RegistrationHandler.createPortalUser(data);
                return u;
            } else {
                // Regular User
                User u = RegistrationHandler.createUser(data);
                
                return u;
            }
        }
    }


    global void updateUser(Id userId, Id portalId, Auth.UserData data){
        
        String userName = data.email.subStringBefore('@') + '@panther.com.partner';
        if(data.attributeMap.containsKey('sfdc_networkid')) {
            userName = data.email.subStringBefore('@') + '@panther.com.partner';
        }
        
        List<User> userList = [Select Id, Name, Email, UserName From User Where UserName =: userName AND isActive = true];
        User u = new User();
        if(userList != null && userList.size() > 0){
            u = userList.get(0);
        }
    }
}