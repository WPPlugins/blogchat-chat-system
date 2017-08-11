<?php
 //include the configuration file
 include('config/php_config.php');
//reads the referrer
$ref="";
if (isset($_GET['ref']))
{
	//If not isset -> set with dumy value
	$ref=$_GET['ref'];
}
$ref2="0";
if($ref=="1"){
	$ref="window.opener";
	$ref2="1";
}else{
	$ref="window.parent";
	$ref2="0";
}
 $flext='php';
$rspln='http://www.php.net'; 
$rspln2='PHP';
//This function reads the extension of the file. It is used to determine if the file  is an image by checking the extension.
 function getExtension($str) {
         $i = strrpos($str,".");
         if (!$i) { return ""; }
         $l = strlen($str) - $i;
         $ext = substr($str,$i+1,$l);
         return $ext;
 }

$filetable='';

function list_files($directory)
 {
     Global $filetable,$flext,$rspln,$rspln2,$ref,$ref2;
     $size = 0;
     $filecount=0;
     $columns=1;
     // if the path has a slash at the end we remove it here
     if(substr($directory,-1) == '/')
     {
         $directory = substr($directory,0,-1);
     }
     
     // if the path is not valid or is not a directory ...
     if(!file_exists($directory) || !is_dir($directory) || !is_readable($directory))
     {
         // ... we return 0 and exit the function
	 echo(!file_exists($directory) . !is_dir($directory) . !is_readable($directory));
         return 0;
     }
     // we open the directory
     if($handle = opendir($directory))
     {
	$filetable="<table cellpadding=10 style='width:100%;border: 0px solid #cccccc'><tr>";
	$defaultfile="";
         // and scan through the items inside
         while(($file = readdir($handle)) != false)
         {
	     	if($file != "default.gif"){
             		// we build the new table
			if(strlen($file)>3 && strpos($file,"1fc_")!=1){
				$path = $directory.'/'.$file;
				$filetable=$filetable."<td style=''><center><img src='".$path."' border=0  onclick=\"this.style.border='3px solid green';".$ref.".fc_chat.newAvatar('".$file."',2,'".$ref2."','".$flext."','".$rspln."','".$rspln2."');\" onmouseover='this.style.border=\"1px solid blue\"' onmouseout='this.style.border=\"1px solid red\"' style='border:1px solid red'></center></td>";
				if($columns==4){
					$filetable=$filetable."</tr><tr>";
					$columns=0;
				}
				$columns++;
				$filecount++;
			}
		}else{
			$defaultfile=$file;
		}
         }
	if($defaultfile!=""){
		$file=$defaultfile;
		if(strlen($file)>3 && strpos($file,"1fc_")!=1){
			$path = $directory.'/'.$file;
			$filetable=$filetable."<td  style=''><center><img src='".$path."' border=0  onclick=\"this.style.border='3px solid green';".$ref.".fc_chat.newAvatar('".$file."',2,'".$ref2."','".$flext."','".$rspln."','".$rspln2."');\" onmouseover='this.style.border=\"1px solid blue\"' onmouseout='this.style.border=\"1px solid red\"' style='border:1px solid red'></center></td>";
			if($columns==4){
				$filetable=$filetable."</tr><tr>";
				$columns=0;
			}
			$columns++;
			$filecount++;
		}
	}
	if($columns!=1){
	 	for($columns;$columns<5;$columns++){
			$filetable=$filetable."<td >&nbsp;</td>";
	 	}
	}
	 $filetable=$filetable."</tr></table>";
         // close the directory
         closedir($handle);
     }
	
	return $filecount;
 }

function recursive_directory_size($directory, $format=FALSE)
 {
     $size = 0;
  
     // if the path has a slash at the end we remove it here
     if(substr($directory,-1) == '/')
     {
         $directory = substr($directory,0,-1);
     }
  
     // if the path is not valid or is not a directory ...
     if(!file_exists($directory) || !is_dir($directory) || !is_readable($directory))
     {
         // ... we return -1 and exit the function
         return -1;
     }
     // we open the directory
     if($handle = opendir($directory))
    {
         // and scan through the items inside
         while(($file = readdir($handle)) !== false)
         {
             // we build the new path
             $path = $directory.'/'.$file;
             // if the filepointer is not the current directory
             // or the parent directory
             if($file != '.' && $file != '..')
             {
                 // if the new path is a file
                 if(is_file($path))
                 {
                     // we add the filesize to the total size
                     $size += filesize($path);
  
                 // if the new path is a directory
                }elseif(is_dir($path))
                {
                    // we call this function with the new path
                     $handlesize = recursive_directory_size($path);
  
                     // if the function returns more than zero
                     if($handlesize >= 0)
                     {
                         // we add the result to the total size
                         $size += $handlesize;
  
                     // else we return -1 and exit the function
                     }else{
                         return -1;
                     }
                 }
             }
         }
         // close the directory
         closedir($handle);
     }
     // if the format is set to human readable
     if($format == TRUE)
     {
         // if the total size is bigger than 1 MB
         if($size / 1048576 > 1)
         {
             return round($size / 1048576, 1).' MB';
  
         // if the total size is bigger than 1 KB
         }elseif($size / 1024 > 1)
         {
             return round($size / 1024, 1).' KB';
         // else return the filesize in bytes
        }else{
             return round($size, 1).' bytes';
         }
     }else{
         // return the total filesize in bytes
         return $size;
     }
 }

function user_avatar_delete($avatar_file)
{
	if ( $avatar_file != '' )
	{
		if ( file_exists($avatar_file))
		{
			unlink($avatar_file);
		}
	}
	return true;
}

//This variable is used as a flag. The value is initialized with 0 (meaning no error  found)  
//and it will be changed to 1 if an errro occures.  
//If the error occures the file will not be uploaded.

$errors=0;
$errorstring='';
$filename='';
$newname='';

//checks if the form has been submitted
$startdoc="<html><script>
function useCurrentAvatar(){".$ref.".fc_chat.newAvatar('',3,'".$ref2."','".$flext."','".$rspln."','".$rspln2."')};var imagelink;
function useimagelink(){ 
	imagelink= document.getElementById('fc_imagelink').value;document.getElementById('fc_imagelink').value='';
		if(
(imagelink.indexOf('gravatar.com/')==-1||imagelink.indexOf('gravatar.com/')>11)
&&
(imagelink.indexOf('twimg.com/profile_images')==-1||imagelink.indexOf('twimg.com/profile_images')>11)
&&
(imagelink.indexOf('profile.ak.fbcdn.net')==-1||imagelink.indexOf('profile.ak.fbcdn.net')>11)
){
			return false
		}
	if(imagelink.indexOf('http://')!=0){
		imagelink='http://'+imagelink
	}
	var tester=new 	Image();
	tester.onload=isGood;
	tester.onerror=isBad;
	tester.src=imagelink
}function isGood(){".$ref.".fc_chat.newAvatar('/'+imagelink,4,'".$ref2."','".$flext."','".$rspln."','".$rspln2."')}
function isBad(){alert('Cannot load image');return false}
</script><script>document.write('<style>body{'+".$ref.".FCChatConfig.styles.avatars.body+'}a{'+".$ref.".FCChatConfig.styles.avatars.link+'}.container{'+".$ref.".FCChatConfig.styles.avatars.container+'}.option{'+".$ref.".FCChatConfig.styles.avatars.option+'}</style>')</script><body><br><div class='container' style='font-size:1.25em;'><b><i><script>document.write(".$ref.".fc_chat.textSetter(184))</script></i></b></div><div id='wait1' style='margin-top:100px;display:none'><center><script>document.write(".$ref.".fc_chat.textSetter(185))</script></center></div><div id='content1'>";

 if(isset($_POST['Submit'])) 
 {
	//reads the user
	$id=$_GET['id'];
	if(!is_numeric($id)){
		$errorstring='<br><b><script>document.write('.$ref.'.fc_chat.textSetter(163))</script></b><br><br>';
		$errors=1;
	}else{
 		//reads the name of the file the user submitted for uploading
 		$image=$_FILES['image']['name'];
 		//if it is not empty
 		if ($image) 
 		{
 			//get the original name of the file from the clients machine
 			$filename = stripslashes($_FILES['image']['name']);
 			//get the extension of the file in a lower case format
  			$extension = getExtension($filename);
 			$extension = strtolower($extension);
 			//if it is not a known extension, we will suppose it is an error and will not  upload the file,  
			//otherwise we will do more tests
 			if (($extension != "jpg") && ($extension != "jpeg") && ($extension != "png") && ($extension != "gif")) 
 			{
				//print error message
 				$errorstring='<br><b><script>document.write('.$ref.'.fc_chat.textSetter(165))</script></b><br><br>';
 				$errors=1;
 			}
 			else
 			{
				//Remove all dots from the filename and replace with underscores, except the last one.
				$lastDot = strrpos($filename, ".");
				$filename = str_replace(".", "_", substr($filename, 0, $lastDot)) . substr($filename, $lastDot);

				//get the size of the image in bytes
 				//$_FILES['image']['tmp_name'] is the temporary filename of the file
 				//in which the uploaded file was stored on the server
 				$size=filesize($_FILES['image']['tmp_name']);

				//compare the size with the maxim size we defined and print error if bigger
				if ($size > MAX_FILE_SIZE*1024)
				{
					$errorstring='<br><b><script>document.write('.$ref.'.fc_chat.textSetter(166))</script></b><br><br>';
					$errors=1;
				}else if (recursive_directory_size(AVATAR_DIRECTORY,FALSE)>MAX_DIR_SIZE){
					$errorstring='<br><b><script>document.write('.$ref.'.fc_chat.textSetter(167))</script></b><br><br>';
					$errors=1;
				}else{
						
					//we will give an unique name, for example the time in unix time format
					$image_name='a1fc_'.$id.'_'.$filename;
					//the new name will be containing the full path where will be stored (images folder)
					$newname=AVATAR_DIRECTORY.$image_name;
					//we verify if the image has been uploaded, and print error instead
					$copied = copy($_FILES['image']['tmp_name'], $newname);
					$my_image = array_values(getimagesize($newname));
  					//use list on new array
  					list($width, $height, $type, $attr) = $my_image;

  					//view new array
  					//print_r($my_image);

  					//spit out content
  					//echo 'Attribute: '.$attr.'<br />';
	
					if (!$copied) 
					{
						$errorstring='<br><b><script>document.write('.$ref.'.fc_chat.textSetter(169))</script></b><br><br>';
						$errors=1;
					}else{
						//Check height and width
						if($width<=MAX_WIDTH&&$height<=MAX_HEIGHT){	
							$base = basename($newname);
							$startdoc="<html><script>function relayAvatar(){".$ref.".fc_chat.newAvatar('".$base."',1,'".$ref2."','".$flext."','".$rspln."','".$rspln2."');}function useCurrentAvatar(){".$ref.".fc_chat.newAvatar('',3,'".$ref2."','".$flext."','".$rspln."','".$rspln2."')};var imagelink;
function useimagelink(){ 
	imagelink= document.getElementById('fc_imagelink').value;document.getElementById('fc_imagelink').value='';
		if(
(imagelink.indexOf('gravatar.com/')==-1||imagelink.indexOf('gravatar.com/')>11)
&&
(imagelink.indexOf('twimg.com/profile_images')==-1||imagelink.indexOf('twimg.com/profile_images')>11)
&&
(imagelink.indexOf('profile.ak.fbcdn.net')==-1||imagelink.indexOf('profile.ak.fbcdn.net')>11)
){
			return false
		}
	if(imagelink.indexOf('http://')!=0){
		imagelink='http://'+imagelink
	}
	var tester=new 	Image();
	tester.onload=isGood;
	tester.onerror=isBad;
	tester.src=imagelink
}function isGood(){".$ref.".fc_chat.newAvatar('/'+imagelink,4,'".$ref2."','".$flext."','".$rspln."','".$rspln2."')}
function isBad(){alert('Cannot load image');return false}

</script><script>document.write('<style>body{'+".$ref.".FCChatConfig.styles.avatars.body+'}a{'+".$ref.".FCChatConfig.styles.avatars.link+'}.container{'+".$ref.".FCChatConfig.styles.avatars.container+'}.option{'+".$ref.".FCChatConfig.styles.avatars.option+'}</style>')</script><body onload=\"setTimeout('relayAvatar()',1000);\"><br><div class='container' style='font-size:1.25em;'><script>document.write(".$ref.".fc_chat.textSetter(183))</script></div><div id='wait1' style='margin-top:100px'><center><script>document.write(".$ref.".fc_chat.textSetter(185))</script></center></div><div id='content1' style='display:none'>";
						}else{
							$deleted=user_avatar_delete($newname);
							$errorstring='<br><b><script>document.write('.$ref.'.fc_chat.textSetter(187))</script>'.MAX_WIDTH.'<script>document.write(window.parent.fc_chat.textSetter(188))</script> '.MAX_HEIGHT.'<script>document.write('.$ref.'.fc_chat.textSetter(189))</script><br><br>';
							$errors=1;
						}
					}
				}
			}
		}else{
			$errorstring='<br><b><script>document.write('.$ref.'.fc_chat.textSetter(170))</script></b><br><br>';
 			$errors=1;
		}
	}
}

//If no errors registred, print the success message
 if(isset($_POST['Submit']) && !$errors) 
 {
 	echo $startdoc."<br><b><script>document.write(".$ref.".fc_chat.textSetter(186))</script></b><br><br><a href='javascript:this.location.replace(".$ref.".fc_chat.html_dir+\"Avatars.php?id=".$id."\")'><script>document.write(".$ref.".fc_chat.textSetter(181))</script></a>&nbsp;<a href='javascript:".$ref.".fc_chat.rem()'><script>document.write(".$ref.".fc_chat.textSetter(182))</script></a><br><br>";
 }else{
	$arr = array(1 => "190", 2 => "191" ,3 => "192", 4 => "193");
	$i=1;
	$option1='';
	$option2='';
  	$option3='';
	$option4='';
	if(USE_GRAVATAR){
		$option1='<br><br><div class="option"><b><script>document.write('.$ref.'.fc_chat.textSetter('.$arr[$i].'))</script></b>&nbsp; <script>document.write('.$ref.'.fc_chat.textSetter(196))</script>.<br><br><div style="margin-left:20px"><INPUT id="fc_imagelink" TYPE=text NAME="imagelink" VALUE="" style="width:200px"> <input type="button" name="Submit" value="" id="submitbutton2" onclick="useimagelink();"><script>document.getElementById("submitbutton2").value='.$ref.'.fc_chat.textSetter(198)</script><br><script>document.write('.$ref.'.fc_chat.textSetter(199))</script><br><br></div></div><br>';
		$i++;
	}
	if(ALLOW_UPLOADS){
		$option2 = '<br><div class="option"><form name="newad" method="post" enctype="multipart/form-data" action=""><b><script>document.write('.$ref.'.fc_chat.textSetter('.$arr[$i].'))</script></b>&nbsp; <script>document.write('.$ref.'.fc_chat.textSetter(194))</script>  '.MAX_HEIGHT.'<script>document.write('.$ref.'.fc_chat.textSetter(195))</script>.<br><br><table style="margin-left:20px"><tr><td><input type="file" name="image" ></td></tr><tr><td><input name="Submit" type="submit" value="" id="submitbutton"></td></tr><tr><td><script>document.getElementById("submitbutton").value='.$ref.'.fc_chat.textSetter(177)</script><small><script>document.write('.$ref.'.fc_chat.textSetter(178))</script>'.MAX_FILE_SIZE.'KB)</small></td></tr></table> </form></div>';
		$i++;
	}
	if(USE_BOARD_AVATARS){
		$option3='<br><div class="option">&nbsp;<b><script>document.write('.$ref.'.fc_chat.textSetter('.$arr[$i].'))</script></b> <script>document.write('.$ref.'.fc_chat.textSetter(200))</script>.<br><br><div style="margin-left:20px"><INPUT TYPE=checkbox NAME="current" VALUE="1" onclick="useCurrentAvatar();"><script>document.write('.$ref.'.fc_chat.textSetter(201))</script>.<br><br></div></div><br>';
		$i++;
	}
	if(USE_GALLERY){
		$option4='<br><div class="option"><b><script>document.write('.$ref.'.fc_chat.textSetter('.$arr[$i].'))</script></b> <script>document.write('.$ref.'.fc_chat.textSetter(202))</script>.<br></div>';
		$i++;
		if(list_files(AVATAR_DIRECTORY)!=0){
			$option4 = $option4.'<br>'.$filetable;
		}
	}
	echo $startdoc.$errorstring.$option1.$option2.$option3.$option4;
 }
 ?>
<div ></div></div></body><html>