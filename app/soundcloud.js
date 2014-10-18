// handle soundcloud loading
function loadAndPlay(track_url, audio) {

  var client_id = "2d6ee513d9de84d2aa73eb2e5eb454a9";


  SC.initialize({
      client_id: client_id
  });
  console.log(SC);

  SC.get('/resolve', { url: track_url }, function(track) {
    console.log('inside resolve get');
    console.log(track);

          console.log('inside tracks get');
          var soundCloudSrc = track.stream_url + '?client_id=' + client_id;

          if (track.title !== undefined) {
            audio.setAttribute('src', soundCloudSrc);
            document.getElementById('song-title').innerHTML = track.title;
            audio.play();
          }
  });

}
