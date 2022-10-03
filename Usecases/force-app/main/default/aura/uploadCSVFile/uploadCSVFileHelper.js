({
    getUploadedFiles : function(component, event){
        var action = component.get("c.csvFileRead");  
        action.setParams({  
            "recordId": component.get("v.recordId") 
        });      
        action.setCallback(this,function(response){  
            var state = response.getState();  
            if(state=='SUCCESS'){  
                var result = response.getReturnValue();           
                component.set("v.files",result);  
            }  
        });  
        $A.enqueueAction(action);  
    }
    
})
