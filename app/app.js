console.log('start app.js');



var contextClass = (window.AudioContext || 
  window.webkitAudioContext || 
  window.mozAudioContext || 
  window.oAudioContext || 
  window.msAudioContext)
;

if (contextClass) {
  var context = new contextClass(); // Web Audio API is available.
} else {
  // *** * ** *** ** ** * **** ** * ** *
  // Web Audio API is not available. Ask the user to use a supported browser.

  // this needs testing...
}


console.log(context);






console.log('end app.js');
