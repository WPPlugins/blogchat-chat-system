/*
* GLOBAL CONFIGURATION FILE
* 
* Refer to tutorial: http://www.fastcatsoftware.com/chat/userguide/globalconfig.asp 
* 
*/
(function(){
	
FCChatConfig.global = {
/************** Global config vars go here  **************************************************/

/* Example: hides the embedded chat widget. Uncomment to try*/		
//control_visible:false,
		
		
		
		
		
		
		
		
		
		
		
/************** End Global config vars  ******************************************************/
template_overrides:function(){
/************** Overrides go here ************************************************************/
				
/* Example: Overrides the ChatCenter Window background color. Uncomment the line below to try*/
//setOption("FCChatConfig.styles.chat_window.frame.color","purple");






				
				
				
				
				
/************** End Overrides ****************************************************************/
}}

/* OVERRIDES API **** DO NOT EDIT BELOW THIS LINE ****/

getObj=jGo.util.getObj;
setOption=jGo.util.setOption;
mergeOption=jGo.util.mergeOption;
mergeBlock=jGo.util.mergeBlock;
getCSSProp=jGo.util.getCSSProp;
jGo.$.extend(true,FCChatConfig,FCChatConfig.global);

}());