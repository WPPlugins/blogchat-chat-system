<%@ Language=VBScript %>
<% 
option explicit 
Response.Expires = -1
Server.ScriptTimeout = 600

Dim ref, ref2
'reads the referrer
ref = Request.queryString("ref")

ref2="0"
if(ref="1") then
	ref="window.opener"
	ref2="1"
else
	ref="window.parent"
	ref2="0"
end if
%>
<!-- #include file="config/asp_config.asp" -->
<!-- #include file="freeaspupload.asp" -->
<%


' ****************************************************
' Change the value of the variable below to the pathname
' of a directory with write permissions, for example "C:\Inetpub\wwwroot" 
' ****************************************************

' Note: this file uploadTester.asp is just an example to demonstrate
' the capabilities of the freeASPUpload.asp class. There are no plans
' to add any new features to uploadTester.asp itself. Feel free to add
' your own code. If you are building a content management system, you
' may also want to consider this script: http://www.webfilebrowser.com/

Dim avatars
avatars=false



function OutputForm()
%>
    <form name="frmSend" method="POST" enctype="multipart/form-data" action="" onSubmit="return onSubmitForm();">
	<br><font><B><script>document.write(<%= ref %>.fc_chat.textSetter(172))</script></B> </font> <script>document.write(<%= ref %>.fc_chat.textSetter(176))</script><br><br>
    <input name="attach1" type="file" size=35><br>
    <br> 
    <input style="margin-top:4" type=submit id="submitbutton" value=""><br><br>
<script>document.getElementById("submitbutton").value=<%= ref %>.fc_chat.textSetter(177)</script>
    <script>document.write(<%= ref %>.fc_chat.textSetter(178))</script> <%=MAX_IMAGE_SIZE%>KB)
    </form>
<%
end function

function TestEnvironment()
    Dim fso, fileName, testFile, streamTest
    TestEnvironment = ""
    Set fso = Server.CreateObject("Scripting.FileSystemObject")
    if not fso.FolderExists(Server.MapPath(IMAGES_DIRECTORY)) then
        TestEnvironment = "<B>Folder " & Server.MapPath(IMAGES_DIRECTORY) & " does not exist.</B><br>The value of your IMAGES_DIRECTORY is incorrect. Open asp_config.asp in an editor and change the value of IMAGES_DIRECTORY to the pathname of a directory with write permissions."
        exit function
    end if
    fileName = Server.MapPath(IMAGES_DIRECTORY) & "\test.txt"
    on error resume next
    Set testFile = fso.CreateTextFile(fileName, true)
    If Err.Number<>0 then
        TestEnvironment = "<B>Folder " & Server.MapPath(IMAGES_DIRECTORY) & " does not have write permissions.</B><br>The value of your IMAGES_DIRECTORY is incorrect. Open asp_config.asp in an editor and change the value of IMAGES_DIRECTORY to the pathname of a directory with write permissions."
        exit function
    end if
    Err.Clear
    testFile.Close
    fso.DeleteFile(fileName)
    If Err.Number<>0 then
        TestEnvironment = "<B>Folder " & Server.MapPath(IMAGES_DIRECTORY) & " does not have delete permissions</B>, although it does have write permissions.<br>Change the permissions for IUSR_<I>computername</I> on this folder."
        exit function
    end if
    Err.Clear
    Set streamTest = Server.CreateObject("ADODB.Stream")
    If Err.Number<>0 then
        TestEnvironment = "<B>The ADODB object <I>Stream</I> is not available in your server.</B><br>Check the Requirements page for information about upgrading your ADODB libraries."
        exit function
    end if
    Set streamTest = Nothing
end function

function SaveFiles
    Dim Upload, fileName, fileSize, ks, i, fileKey

    Set Upload = New FreeASPUpload
    Upload.Save(Server.MapPath(IMAGES_DIRECTORY))

	' If something fails inside the script, but the exception is handled
	If Err.Number<>0 then Exit function

    SaveFiles = ""
    ks = Upload.UploadedFiles.keys
    if (UBound(ks) <> -1) then
        if errorstring = "" then
       		for each fileKey in Upload.UploadedFiles.keys
            		SaveFiles = "<br><font><b>" & Upload.UploadedFiles(fileKey).FileName & " (" & Upload.UploadedFiles(fileKey).Length & " bytes)</font><font> <script>document.write(" & ref & ".fc_chat.textSetter(171))</script></b><br><br><b><script>document.write(" & ref & ".fc_chat.textSetter(173))</script></b></font><font> <script>document.write(" & ref & ".fc_chat.textSetter(174))</script><br><br><font><span style='font-size:1.25em'><b> [[" & Upload.UploadedFiles(fileKey).FileName & "]]</b></span> </font><br><br><script>document.write(" & ref & ".fc_chat.textSetter(175))</script><br><br><font><b><script>document.write(" & ref & ".fc_chat.textSetter(179))</script></b></font><font> <script>document.write(" & ref & ".fc_chat.textSetter(180))</script><br></small><br><br><a href='javascript:this.location.replace(" & ref & ".fc_chat.html_dir+""Upload.asp?id=" & userID & """)'><script>document.write(" & ref & ".fc_chat.textSetter(181))</script></a>&nbsp;<a href='javascript:" & ref & ".fc_chat.rem()'><script>document.write(" & ref & ".fc_chat.textSetter(182))</script></a><br><br>"
        	next
	else
		SaveFiles = "<br><b><script>document.write(" & ref & ".fc_chat.textSetter(" & errorstring & "))</script></b>"
	end if
    else
        SaveFiles = "<br><b><script>document.write(" & ref & ".fc_chat.textSetter(168))</script></b>"
        errorstring="-1"
    end if
end function
%>

<HTML>
<HEAD>
<TITLE>Free ASP Upload</TITLE>
<script>
function onSubmitForm() {
    var formDOMObj = document.frmSend;
    if (formDOMObj.attach1.value == "" && formDOMObj.attach2.value == "" && formDOMObj.attach3.value == "" && formDOMObj.attach4.value == "" )
        alert("Please press the browse button and pick a file.")
    else
        return true;
    return false;
}
</script>
<script>document.write('<style>body{'+<%= ref %>.FCChatConfig.styles.uploads.body+'}.container{'+<%= ref %>.FCChatConfig.styles.uploads.container+'}</style>')</script>
</HEAD>

<BODY>
<br>
<div class='container' style="font-size:16"><b><i>Share Images</i></b></div>
<%
Dim diagnostics
if Request.ServerVariables("REQUEST_METHOD") <> "POST" then
    diagnostics = TestEnvironment()
    if diagnostics<>"" then
        response.write "<div style=""margin-left:20; margin-top:30; margin-right:30; margin-bottom:30;"">"
        response.write diagnostics
        response.write "<p>After you correct this problem, reload the page."
        response.write "</div>"
    else
        response.write "<div style=""margin-left:20"">"
        OutputForm()
        response.write "</div>"
    end if
else
    response.write "<div style=""margin-left:20"">"
    response.write SaveFiles()
    if errorstring<>"" Then
	OutputForm()
    end if
    response.write "<br><br></div>"
end if

%>
<br>
<br><br>


</BODY>
</HTML>
