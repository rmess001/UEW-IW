//AUDIO VARIABLES
var songPlaying = '3.mp3'; //current song loaded
var audio = new Audio('music/' + songPlaying); //current song loaded
var playheadTime = 0; //playhead value relative to length of song
var songDuration; //duration of current song
var volumeValue = 0.5;

document.addEventListener('DOMContentLoaded', function() {
    audio.addEventListener('loadeddata', function() { //get song duration
        songDuration = audio.duration;
      });

    
    audio.addEventListener('timeupdate', function() { //update the current playback position continuously
        if (playheadPressed == false) {
            playheadTime = audio.currentTime;
            playheadPosition = (audio.currentTime*580/songDuration).toFixed(6);
            playhead.style.marginLeft = (audio.currentTime*580/songDuration).toFixed(6);}

            if (audio.currentTime.toFixed(0)%60 < 10) {document.getElementById("timestamp").textContent = Math.floor(audio.currentTime/60) + ":0" + audio.currentTime.toFixed(0)%60 + " | " + Math.floor(audio.duration/60) + ":" + audio.duration.toFixed(0)%60;} //update timestamp
            else {document.getElementById("timestamp").textContent = Math.floor(audio.currentTime/60) + ":" + audio.currentTime.toFixed(0)%60 + " | " + Math.floor(audio.duration/60) + ":" + audio.duration.toFixed(0)%60;} //update timestamp
            if (audio.currentTime >= audio.duration) {play = false; console.log("OVER");} //turn play variable off when song has ended
      });
      
  });
audio.load();

//PLAYHEAD
var playheadPosition = 0; //0 through 580 (value for the css)
var playheadPressed = false;
document.addEventListener('DOMContentLoaded', function() {
    var playhead = document.getElementById('playhead');
    // Check if the element with the specified ID exists

    if (playhead) {
        playhead.addEventListener('mousedown', function() {
            console.log('Mouse pressed on the playhead!');
            // Add your code here to handle the mouse press event
            Xzero = mouseX - playheadPosition;
            playheadPressed = true;
        });
        addEventListener('mouseup', function() {
            console.log('Mouse released!');
            // Add your code here to handle the mouse release event
            if (playheadPressed == true) {audio.currentTime = playheadTime; playheadPressed = false;}
            if (volumeheadPressed == true) {volumeheadPressed = false;}
        });
    }
});


//MOUSE MOVEMENT MAPPED
var mouseX
var mouseY

document.addEventListener('DOMContentLoaded', function() {
  document.addEventListener('mousemove', updateCoordinates);
});

function updateCoordinates(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;

    if (playheadPressed == true) {
        playheadPosition = mouseX - Xzero;
        if (playheadPosition < 581 && playheadPosition > -1) {playhead.style.marginLeft = playheadPosition;} //change css value
        else if (playheadPosition < 0) {playhead.style.marginLeft = 0; playheadPosition = 0;} else if (playheadPosition > 580) {playhead.style.marginLeft = 580; playheadPosition = 580;}
        playheadTime = (playheadPosition/(580/songDuration)).toFixed(6);
    } 

    if (volumeheadPressed == true) {
        volumeheadPosition = mouseY - Yzero;
        if (volumeheadPosition > -111 && volumeheadPosition < -9) {volumehead.style.marginTop = volumeheadPosition;}
        else if (volumeheadPosition > -10) {volumehead.style.marginTop = -10; volumeheadPosition = -10;} else if (volumeheadPosition < -110) {volumehead.style.marginTop = -110; volumeheadPosition = -110;}
        volumeValue = ((volumeheadPosition - -10) / (-110 - -10) * (1 - 0) + 0).toFixed(6);
        audio.volume = volumeValue;
    }
  }

//PLAY/PAUSE
var play = false;

document.addEventListener('DOMContentLoaded', function() {
    var playpause = document.getElementById('playpause');
    // Check if the element with the specified ID exists

    if (playpause) {
        playpause.addEventListener('click', function() {
            // Add your code here to handle the mouse press event
            if (play == true) {play = false; audio.pause();}
            else {play = true; audio.play();}
        });
    }    
});

//VOLUME CONTROL
var volumeheadPosition = -60; //-10 through -110 for css value
var volumeheadPressed = false;
document.addEventListener('DOMContentLoaded', function() {
    var volumehead = document.getElementById('volumehead');
    // Check if the element with the specified ID exists

    if (volumehead) {
        volumehead.addEventListener('mousedown', function() {
            console.log('Mouse pressed on the volumehead!');
            // Add your code here to handle the mouse press event
            Yzero = mouseY - volumeheadPosition;
            volumeheadPressed = true;
        });
    }    
});




















//METADATA MP3
document.addEventListener('DOMContentLoaded', function() {
    /*
    var jsmediatags = window.jsmediatags;
    console.log(jsmediatags)
    // From remote host
jsmediatags.read("music.1.mp3", {
  onSuccess: function(tag) {
    console.log(tag);
  },
  onError: function(error) {
    console.log(error);
  }
});
*/
});

