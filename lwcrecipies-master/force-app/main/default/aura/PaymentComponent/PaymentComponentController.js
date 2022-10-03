({
    doInit : function(component, event, helper) { 
        let customer_id = component.get('v.customer_id');
        let contactId   = component.get('v.contactId');
        
    },
    makePayment : function(component, event, helper) {
        var allValid = helper.validateForm(component, event, helper);
        if ( allValid === true ) {
            var action = component.get('c.make_Payment');
            action.setParams({
                contactId   : component.get('v.contactId'),
                customer_id : component.get('v.customer_id'),
                amount	    : component.get('v.amount'),
                card_no	    : component.get('v.card_no'),
                cvv	   	    : component.get('v.cvv'),
                exp_month   : component.get('v.exp_month'),
                exp_year    : component.get('v.exp_year')
            });
            action.setCallback(this, function(response) {
                var state = response.getState();
                if ( state === 'SUCCESS' || state ==='DRAFT' ) {
                    let responseValue = response.getReturnValue();
                    if ( responseValue && responseValue.Id) {
                        var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            "title"  : "Success!",
                            "type"   : "success",
                            "message": "The chare has been created successfully."
                        });
                        toastEvent.fire();
                        component.find("overlayLib").notifyClose();
                    }
                } else if(State === 'INCOMPLETE'){
                    console.log('System does not support drafts, user is logged out');
                } else if(State === 'ERROR'){
                    var Error = response.getError();
                    var errorMessage = '';
                    var StatusCode = '';
                    if(Error[0].duplicateResults !== undefined 
                       && Error[0].duplicateResults.length > 0){
                        errorMessage = Error[0].duplicateResults[0].message;
                        StatusCode = Error[0].duplicateResults[0].statusCode;
                    }else if (Error[0].fieldErrors !== undefined 
                              && Error[0].fieldErrors.length > 0){
                        errorMessage = Error[0].fieldErrors[0].message;
                        StatusCode = Error[0].fieldErrors[0].statusCode;
                    }else if(Error[0].pageErrors !== undefined &&
                             Error[0].pageErrors.length > 0){
                        errorMessage = Error[0].pageErrors[0].message;
                        StatusCode = Error[0].pageErrors[0].statusCode;
                    }else if(Error[0].message !== undefined){
                        errorMessage = Error[0].message;
                    }
                    console.log('Error Occured', errorMessage);
                }
            });
            $A.enqueueAction(action);
        } 
    },
    
})