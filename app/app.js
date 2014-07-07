console.log('start app.js');

var configureNode = {

  'gain': function(node) {
    console.log('inside gain func');
  }


};


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

var createContextNodes = function(audio, context) {


  // create source node containing the audio element
  var source = context.createMediaElementSource(audio);

  // create gain, filter and analyser nodes
  var gain = context.createGainNode();
  gain.gain.value = 0.05;
  console.log(gain);

  // var filter = context.createBiquadFilter();
  // filter.type = filter.LOWPASS;
  // filter.frequency.value = 10;

  var analyser = context.createAnalyser();

  source.connect(analyser);
  // analyser.connect(filter);
  analyser.connect(gain);
  gain.connect(context.destination);

  // source.connect(analyser.connect(gain.connect(context.destination)));

};

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

createContextNodes(audio, context);

audio.src = 'https://s3-us-west-1.amazonaws.com/hr-mytunes/data/05+Hot+Like+Fire.mp3';





// var frequencyData = new Uint8Array(totalBars);  



var h = 1000;
var w = 1000;
var myData = _.range(0, 200, 10);


window.addEventListener('load', onLoad, false);

function onLoad() {


      var svg = d3
        .select(".container")
        .append("svg")
        .attr("width", w)
        .attr("height", h)
        .attr("class", "svg-container")
      ;

      var rect = svg
        .selectAll("rect")
        .data(myData)
        .enter()
        .append("rect")
        .attr('x',function(d, i) { return i * 30; } )
        .attr("y", 200 )
        .attr('width', 20 )
        .attr("height", function(d) { return d; } );
      ;


  // audio.play();


}






