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

var analyser;

var createContextNodes = function(audio, context) {


  // create source node containing the audio element
  var source = context.createMediaElementSource(audio);

  // create gain, filter and analyser nodes
  var gain = context.createGainNode();
  // gain.gain.value = 0.01;
  gain.gain.value = 0.5;
  console.log(gain);

  // CREATE FILTER???
  // var filter = context.createBiquadFilter();
  // filter.type = filter.LOWPASS;
  // filter.frequency.value = 10;

  // var analyser = context.createAnalyser();
  analyser = context.createAnalyser();

  source.connect(analyser);
  analyser.connect(gain);
  gain.connect(context.destination);

  // this probably won't work
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

var audioSrc = [
    'https://s3-us-west-1.amazonaws.com/hr-mytunes/data/05+Hot+Like+Fire.mp3',
    'https://s3-us-west-1.amazonaws.com/hr-mytunes/data/04+One+In+A+Million.mp3',
    'https://s3-us-west-1.amazonaws.com/hr-mytunes/data/03+Age+Ain%27t+Nothing+But+A+Number.mp3',
    'https://s3-us-west-1.amazonaws.com/hr-mytunes/data/06+If+Your+Girl+Only+Knew.mp3',
    'http://freedownloads.last.fm/download/569330114/Lost%2BBoys.mp3',
    'http://freedownloads.last.fm/download/384950466/Thirteen%2BThirtyfive.mp3'
];



audio.src = audioSrc[2];


var totalBars = 70;
var frequencyData = new Uint8Array(totalBars);

var h = 400;
var w = 1000;
var myData = _.range(0, totalBars);


var xScale = d3.scale.ordinal()
  .domain(myData)     // is the number of data elements
  .rangeBands([0, w], 0.1, 0)    // 2nd parameter is padding between bars
;


var yScale = d3
  .scale.linear()
  .domain([0, 255])   // domain is 0-255 according to the web audio api
  .range([h, 0])      // 0 is second parameter to invert y-axis
;


window.addEventListener('load', onLoad, false);

function onLoad() {


  // initialize d3 stuff when page loads
  var svg = d3
    .select(".svg-container")
    .attr("class", "svg-container")
    .append("svg")
    .attr("width", w)
    .attr("height", h)
  ;

  var rect = svg
    .selectAll("rect")
    .data(myData)
    .enter()
    .append("rect")
  ;

 
  function renderFrame() {
   requestAnimationFrame(renderFrame);
   analyser.getByteFrequencyData(frequencyData);

    rect
      .data(frequencyData)
      .attr('x',function(d, i) { return xScale(i); } )
      .attr('y',function(d, i) { return yScale(d); } )
      .attr('width', function(d, i) { return xScale.rangeBand(); } )
      .attr("height", function(d) { return h - yScale(d); } )
    ;
  }


  audio.play();
  renderFrame();

}






