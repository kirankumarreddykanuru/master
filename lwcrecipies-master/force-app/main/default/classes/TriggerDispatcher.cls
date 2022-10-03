/*
    @Author 	 : Amit Singh
    @BuiltDate 	 : 25th OCT 2019
    @Company 	 : sfdcpanther
	@Name    	 : TriggerDispatcher
	@Description : This class is the Heart of the Trigger Framework which routes to the correct method of correct class.
*/
public with sharing class TriggerDispatcher {

    public static void run(TriggerInterface handler, System.TriggerOperation triggerOprations){
        execute(handler, triggerOprations);
    }

    private static void execute(TriggerInterface handler, System.TriggerOperation triggerOprations){
        switch on triggerOprations {
            when BEFORE_INSERT {
                handler.beforeInsert( Trigger.New );
            }
            When AFTER_INSERT {
                handler.afterInsert( Trigger.New, Trigger.newMap );
            }
            When BEFORE_DELETE {
                handler.beforeDelete( Trigger.old, Trigger.oldMap );
            }
            When AFTER_DELETE {
                handler.afterDelete(Trigger.oldMap);
            }
            WHEN BEFORE_UPDATE {
                handler.beforeUpdate( Trigger.newMap , Trigger.oldMap );
            }
            When AFTER_UPDATE {
                handler.afterUpdate( Trigger.newMap, Trigger.oldMap );
            }
            when AFTER_UNDELETE {
                handler.afterUnDelete( Trigger.New, Trigger.newMap );
            }
        }
    }
    
}