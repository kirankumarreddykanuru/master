/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
({
    dohanleEvent : function(component, event, helper) {
        var message = event.getParam('message');
        console.log(' Message is ', message);
    },
    callChildMethod : function(component, event, helper ){
        var Child = component.find('childCmp');
        Child.childMethod(' Message From Parent AURA Component');
    }
})
