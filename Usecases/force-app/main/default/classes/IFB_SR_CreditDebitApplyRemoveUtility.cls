/* ==============================================

* @class name: IFB_SR_CreditDebitApplyRemoveUtility

* @author: Ghousepeer SHAIK

* @group: IFB

* @purpose: Utility Class for CreditDebitApplyRemove 

* @created date (mm/dd/yyyy) : 03/14/2022

* @last modified by : Ghousepeer SHAIK

* @last modified date (mm/dd/yyyy): 03/14/2022 

================================================*/

public class IFB_SR_CreditDebitApplyRemoveUtility {

  /* ========================================================

* @method name : getCurrentStatus()

* @author : Ghousepeer SHAIK

* @group : IFB

* @purpose: : To get the Current Status to send to CBS

* @param : String - String

* @return : string

* @created date (mm/dd/yyyy) : 03/14/2022

* @last modified date (mm/dd/yyyy): 03/14/2022

* @last modified by : Ghousepeer SHAIK

============================================================*/ 

  public static String getCurrentStatus(Case objCase,IFB_SR_Account_Detail__c accDtl)

  {  //User Need to apply objCase.IFB_Freeze_Unfreeze_Type__c 

    // Current Status=accDtl.IFB_SR_Freeze_Status__c

    System.debug('getCurrentStatus values'+objCase+' '+accDtl);

    String NeedToUpdated;

    if(objCase.IFB_SubCategory__c == 'Debit Credit Freeze')

    {

      //accDtl.IFB_SR_Freeze_Status__c = 'No Freeze'   = API = 0

      //accDtl.IFB_SR_Freeze_Status__c = 'Debit Freeze' = API = 1

      //accDtl.IFB_SR_Freeze_Status__c = 'Credit Freeze' = API = 2

      //accDtl.IFB_SR_Freeze_Status__c = 'Total Freeze' = API = 3

       

      //objCase.IFB_Freeze_Unfreeze_Type__c = 'Debit Freeze' = API = D

      //objCase.IFB_Freeze_Unfreeze_Type__c = 'Credit Freeze' = API = C

      //objCase.IFB_Freeze_Unfreeze_Type__c = 'Total Freeze' = API = T

       

      if((objCase.IFB_Freeze_Unfreeze_Type__c == 'D' && accDtl.IFB_SR_Freeze_Status__c == '2') ||

        (objCase.IFB_Freeze_Unfreeze_Type__c == 'C' && accDtl.IFB_SR_Freeze_Status__c == '1')

       )

      {

        NeedToUpdated ='3'; //New Status - Total Freeze

      }else if(accDtl.IFB_SR_Freeze_Status__c =='0') //Existing Status

      {

        if(objCase.IFB_Freeze_Unfreeze_Type__c == 'D')

          NeedToUpdated ='1';//Debit Freeze

        if(objCase.IFB_Freeze_Unfreeze_Type__c == 'C')

          NeedToUpdated ='2';//Credit Freeze

        if(objCase.IFB_Freeze_Unfreeze_Type__c == 'T')

          NeedToUpdated ='3';//Total Freeze      

      }

      else if(objCase.IFB_Freeze_Unfreeze_Type__c =='T'){

        if(accDtl.IFB_SR_Freeze_Status__c != '3')

          NeedToUpdated='3';//Total Freeze

      }

       

    }

    else if(objCase.IFB_SubCategory__c == 'Removal Of Debit Credit Freeze')

    {

       

      //if( (accDtl.IFB_SR_Freeze_Status__c == '1' && objCase.IFB_Freeze_Unfreeze_Type__c == 'D') ||

      //  (accDtl.IFB_SR_Freeze_Status__c == '2' && objCase.IFB_Freeze_Unfreeze_Type__c == 'C') ||

      //  (accDtl.IFB_SR_Freeze_Status__c == '3' && objCase.IFB_Freeze_Unfreeze_Type__c == 'T') )

      // {

      if( (accDtl.IFB_SR_Freeze_Status__c == '1' ? 'D':

         (accDtl.IFB_SR_Freeze_Status__c == '2' ? 'C':'T')) == objCase.IFB_Freeze_Unfreeze_Type__c)

      {

        NeedToUpdated='0';//No Freeze

      }

      else

        if(accDtl.IFB_SR_Freeze_Status__c == '3')

      {

        if(objCase.IFB_Freeze_Unfreeze_Type__c == 'D' )

          NeedToUpdated ='2';//Credit Freeze

        if(objCase.IFB_Freeze_Unfreeze_Type__c == 'C' )

          NeedToUpdated ='1';//Debit Freeze

        if(objCase.IFB_Freeze_Unfreeze_Type__c == 'T' )

          NeedToUpdated ='0';//No Freeze

         

      }

    }

    return NeedToUpdated;

  }

}