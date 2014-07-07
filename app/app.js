console.log('start app.js');






// create new audio context
var createContextClass = function() {
  return (
    window.AudioContext || 
    window.webkitAudioContext || 
    window.mozAudioContext || 
    window.oAudioContext || 
    window.msAudioContext
    )
  ;
}

var contextClass = createContextClass();

if (contextClass) {
  var context = new contextClass(); // Web Audio API is available.
} else {
  // *** * ** *** ** ** * **** ** * ** *
  // this needs implementation...

  // Web Audio API is not available. Ask the user to use a supported browser.

  
}


console.log(context);


// create new HTML5 audio element
var audio = new Audio();

// create source node containing the audio element
var source = context.createMediaElementSource(audio);

// create gain, filter and analyser nodes
var gain = context.createGainNode();
var filter = context.createBiquadFilter();
var analyser = context.createAnalyser();


// gain.gain.value = 0.5;
// console.log(gain.gain.value);










console.log('end app.js');




