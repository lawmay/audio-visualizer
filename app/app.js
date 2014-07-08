console.log('start app.js');

// var configureNode = {

//   'gain': function(node) {
//     console.log('inside gain func');
//   }


// };


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

  console.log(audio);
  // create source node containing the audio element
  var source = context.createMediaElementSource(audio);
                       // createMediaElementSource
  // create gain, filter and analyser nodes
  var gain = context.createGainNode();
  // gain.gain.value = 0.01;
  gain.gain.value = 0.5;
  // console.log(gain);

  // CREATE FILTER???
  // var filter = context.createBiquadFilter();
  // filter.type = filter.LOWPASS;
  // filter.frequency.value = 10;

  // var analyser = context.createAnalyser();
  analyser = context.createAnalyser();
  // console.log('fftSize: ' + analyser.fftSize);
  // analyser.fftSize = 256;

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
// var audio = document.getElementById('player');

createContextNodes(audio, context);

var audioSrc = [
    'https://s3-us-west-1.amazonaws.com/hr-mytunes/data/05+Hot+Like+Fire.mp3',
    'https://s3-us-west-1.amazonaws.com/hr-mytunes/data/04+One+In+A+Million.mp3',
    'https://s3-us-west-1.amazonaws.com/hr-mytunes/data/03+Age+Ain%27t+Nothing+But+A+Number.mp3',
    'https://s3-us-west-1.amazonaws.com/hr-mytunes/data/06+If+Your+Girl+Only+Knew.mp3',
    'http://freedownloads.last.fm/download/569330114/Lost%2BBoys.mp3',
    'http://freedownloads.last.fm/download/384950466/Thirteen%2BThirtyfive.mp3'
];



audio.src = audioSrc[1];


var totalBars = 70;
var frequencyData = new Uint8Array(totalBars);

var h = 400;
var w = 1000;
var myData = _.range(0, totalBars);


var xScale = d3.scale.ordinal()
  .domain(myData)     // is the number of data elements
  .rangeBands([0, w], 0.2, 0)    // 2nd parameter is padding between bars
;


var yScale = d3
  .scale.linear()
  .domain([0, 255])   // domain is 0-255 according to the web audio api
  .range([h, 0])      // 0 is second parameter to invert y-axis
;

// var z = d3.scale.ordinal()
//   .domain(totalBars)
//   .range(colorbrewer.RdBu[9])
// ;




window.addEventListener('load', onLoad, false);

// var currentColor = '#ffccaa';
var currentColor = '#eee';



function loadD3() {
  // initialize d3 stuff when page loads
  svg = d3
    .select(".svg-container")
    .attr("class", "svg-container")
    .append("svg")
    .attr("width", w)
    .attr("height", h)
  ;

  // var rect = svg
  //   .selectAll("rect")
  //   .data(myData)
  //   .enter()
  //   .append("rect")
  //   .attr("class", "rect")
  // ;

  var circ = svg
    .selectAll("circle")
    .data(myData)
    .enter()
    .append("circle")
    .attr("class", "circ")
  ;

  // return rect;
  return circ;
}

var svg;
var currentShape = 'circ';
// var rect;
// var circ;



function onLoad() {

  // init submit button
  var submitButton = document.getElementById('submit');
  submitButton.onclick = function() {
      var track_url = document.getElementById('input').value;
      loadAndPlay(track_url);
  };

  

  var currentElement = loadD3();
var switchToCircs = function() {
  d3.selectAll('rect').remove();
  d3.selectAll('circle').remove();

  var circ = svg
    .selectAll("circle")
    .data(myData)
    .enter()
    .append("circle")
    .attr("class", "circ")
  ;

  currentShape = 'circ';
  currentElement = circ;
  // renderFrame();
  // requestAnimationFrame(renderFrame);
  // return circ;
}

var switchToRects = function() {
  d3.selectAll('circle').remove();
  d3.selectAll('rect').remove();

  var rect = svg
    .selectAll("rect")
    .data(myData)
    .enter()
    .append("rect")
    .attr("class", "rect")
    // .transition()
  ;

  currentShape = 'rect';
  currentElement = rect;
  // requestAnimationFrame(renderFrame);
  // renderFrame();
  // return rect;
}

  function renderFrame() {
   // requestAnimationFrame(renderFrame);
   analyser.getByteFrequencyData(frequencyData);

   if (currentShape === 'rect') {
      currentElement
        .data(frequencyData)
        // .transition()
        // .duration(1)
        .attr('x',function(d, i) { return xScale(i); } )
        .attr('y',function(d, i) { return yScale(d); } )
        .attr('width', function(d, i) { return xScale.rangeBand(); } )
        .attr('height', function(d) { return h - yScale(d); } )
        // .style('fill', function(d, i) { return z(i); } )
        .style('fill', function(d, i) { return currentColor; } )
      ;    
   } else if (currentShape === 'circ') {
      currentElement
        .data(frequencyData)
        // .transition()
        // .duration(40)
        .attr('cx',function(d, i) { var tempXScale = xScale(i); return tempXScale; } )
        .attr('cy',function(d, i) { return yScale(i * (w / (totalBars*4))); } )
        .attr('r',function(d, i) { return d / 1.8; } )
        .style('fill', function(d, i) { return currentColor; } )
      ;        
   }
  }





  // var self = this;
  audio.play();
  setInterval(renderFrame, 20);
  // setInterval(renderFrame.bind(self,1), 1);
  // renderFrame();



var circleButton = document.getElementById('circleButton');
circleButton.addEventListener('click', switchToCircs, false);
// function switchCircs(e) {
//   switchToCircs();
// };

var rectButton = document.getElementById('rectButton');
rectButton.addEventListener('click', switchToRects, false);
// function switchCircs(e) {
//   switchToRects();
// };

    window.addEventListener("keydown", keyControls, false);

    function keyControls(e) {

        switch(e.keyCode) {
            case 32:
            e.preventDefault();
                // spacebar pressed
                // loader.directStream('toggle');
                if (audio.paused) {
                    audio.play();
                } else {
                    audio.pause();
                }
                break;
            case 37:
                // left key pressed
                console.log('left key');
                switchToRects();
                break;
            case 39:
                // right key pressed
                // loader.directStream('forward');
                console.log('right key');
                switchToCircs();
                break;
        }   
    }



}



function loadAndPlay(track_url) {

  var client_id = "2d6ee513d9de84d2aa73eb2e5eb454a9";
  
  // permalink to a track
  // var track_url = 'https://soundcloud.com/cocolo-studio/dj-funakoshi-q-ichirow';

  SC.initialize({
      client_id: client_id
  });
  console.log(SC);

  SC.get('/resolve', { url: track_url }, function(track) {
    console.log('inside resolve get');
    console.log(track);

      // SC.get('/tracks/' + track.id, {}, function(sound, error) {
          console.log('inside tracks get');
          // var soundCloudSrc = sound.stream_url + '?client_id=' + client_id;
          var soundCloudSrc = track.stream_url + '?client_id=' + client_id;
          // console.log(soundCloudSrc);
          audio.setAttribute('src', soundCloudSrc);
          // audio.src = soundCloudSrc;
          // console.log(audio);
          document.getElementById('song-title').innerHTML = track.title;
          // console.log();
          // document.getElementById('song-title').value = 'bblas';
          audio.play();
          // renderFrame();
          // source.mediaElement.play();
          // player.setAttribute('src', sound.stream_url + '?client_id=' + client_id);
          // player.play();
      // });
  });

    // console.log('im here---');
};





