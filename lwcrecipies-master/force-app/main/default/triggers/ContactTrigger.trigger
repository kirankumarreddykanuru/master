trigger ContactTrigger on Contact (before insert) {
    for (Contact c : Trigger.new) {
        if (c.getQuickActionName() == QuickAction.CreateContact) {
            c.WhereFrom__c = 'GlobaAction';
        } else if (c.getQuickActionName() == Schema.Account.QuickAction.CreateContact) {
            c.WhereFrom__c = 'AccountAction';
        } else if (c.getQuickActionName() == null) {
            c.WhereFrom__c = 'NoAction';
        } else {
            System.assert(false);
        }
        QuickAction.QuickActionRequest req = new QuickAction.QuickActionRequest();
        req.quickActionName = QuickAction.CreateContact;
        req.record = c;
        System.debug(System.LoggingLevel.DEBUG, req.getContextId());
        System.debug(System.LoggingLevel.DEBUG, req.getQuickActionName());
        System.debug(System.LoggingLevel.DEBUG, req.getRecord());
        //QuickAction.QuickActionResult res = QuickAction.performQuickAction(req);
    }
}