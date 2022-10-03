/* eslint-disable no-unused-expressions */
({
    doHandle : function(component, event, helper) {
        const val = event.getParam('message');
        alert(val);
    },

    handleChild : function(component, event, helper){
        const childComp = component.find('childCmp');
        childComp.childMethod('Message From Aura', 121);
    }
})
