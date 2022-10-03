/* eslint-disable no-alert */
/* eslint-disable no-unused-expressions */
({
    doHandle : function(component, event, helper) {
        alert(' Event handled ');
    },

    handleClick : function(component, event, helper) {
        var childComp = component.find('childCmp');
        childComp.childMethod('Message From AURA', 873);
    }
})
