<aura:application extends="force:slds" controller="CsvFileUpload">
    <aura:handler name="init" value="{!this}" action="{!c.doInit}"/>  
    <aura:attribute name="multiple" type="Boolean" default="true" />
    <aura:attribute name="accept" type="String" default=".xls, .xlsx, .csv"/>
    <aura:attribute name="columns" type="List"/>

   
    <lightning:card iconName="custom:custom19" title="Upload Csv File" >
   
    <div style="margin-left: 3%">
       
        <lightning:fileUpload  accept="{!v.accept}"
                name="fileUploader"
                multiple="true"
                recordId="{!v.recordId}"
                onuploadfinished="{!c.uploadFinished}" />
    </div>



   </lightning:card>

</aura:application>	
