/* eslint-disable no-unused-expressions */
({
    doHandle : function(component, event, helper) {
        const message = event.getParam('message');
        console.log(' message from LWC ', message);
    },
    callChild :  function(component, event, helper){
        var childComp = component.find('childCmp');
        childComp.childMethod('Aura Message ', 121);
    }
})
