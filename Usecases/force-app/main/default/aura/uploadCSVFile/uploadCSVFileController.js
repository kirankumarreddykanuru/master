({
    doInit : function(component, event, helper){  
        helper.getUploadedFiles(component, event);
        cmp.set('v.columns', [
            { label: 'Name', fieldName: 'Name' }, 
            { label: 'Source', fieldName: 'AccountSource' },
            { label: 'Account Site', fieldName: 'Site'}, 
            { label: 'Type', fieldName: 'Type'}, 
            { label: 'Website', fieldName: 'Website', type:'url'}
        ]);

     },

     uploadFinished : function(component, event, helper) {  
      
        helper.getUploadedFiles(component, event);    
        var toastEvent = $A.get("e.force:showToast");
        // show toast on file uploaded successfully 
        toastEvent.setParams({
            "message": "Files have been uploaded successfully!",
            "type": "success",
            "duration" : 2000
        });
        toastEvent.fire();
    }
})
