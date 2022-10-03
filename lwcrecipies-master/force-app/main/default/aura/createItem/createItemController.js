/* eslint-disable no-unused-expressions */
({
    handlePopup : function(component, event, helper) {
        let dismissActionPanel = $A.get("e.force:closeQuickAction");
        dismissActionPanel.fire();
        $A.get('e.force:refreshView').fire();
    }
})
