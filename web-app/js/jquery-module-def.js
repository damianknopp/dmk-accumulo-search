// defined a require.js Modules for jQuery
define([
// Load the original jQuery source file
  'order!jquery-min'
//	'order!https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min'
], function($){
  // Tell Require.js that this module returns a reference to jQuery
  return $;
});

