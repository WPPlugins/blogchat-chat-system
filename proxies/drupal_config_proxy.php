<?php

/**
*
* @FCChat proxy for drupal 
* @copyright (c) 2013- Robert Beach (fastcatsoftware.com)
*
* Use this file to establish a proxy between fcchat and drupal's default user authentification protocol.
*
* Module must be placed in /sites/all/modules or sites/your-site-folder/modules in order for this to work.
*
*/

define('DRUPAL_ROOT', dirname(__FILE__) . '/../../../../../');
require_once DRUPAL_ROOT . 'includes/bootstrap.inc';
  
if (!isset($base_url)) {
    $fc_base_root = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == 'on') ? 'https' : 'http';
    $base_url = $fc_base_root .= '://' . $_SERVER['HTTP_HOST'];
    if ($dir = trim(dirname(mb_substr($_SERVER['SCRIPT_NAME'],0,(strripos($_SERVER['SCRIPT_NAME'],'sites')+4))), '\,/')) {
      $base_url .= "/$dir";
    }
  }
drupal_bootstrap(DRUPAL_BOOTSTRAP_FULL);

echo fcchat_add_header_js();

?>