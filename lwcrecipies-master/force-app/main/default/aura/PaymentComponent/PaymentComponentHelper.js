({
	validateForm : function(cmp, event, helper) {
        console.log(' Validating Inputs ..... ');
        var allValid = cmp.find('payment').reduce(function (validSoFar, inputCmp) {
            inputCmp.reportValidity();
            return validSoFar && inputCmp.checkValidity();
        }, true);
        return allValid;
    }
})