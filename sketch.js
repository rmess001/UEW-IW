//AUDIO VARIABLES
var songPlaying = 'HW.mp3';
var audio = new Audio('music/' + songPlaying);
var playheadTime = 0;
var songDuration;


document.addEventListener('DOMContentLoaded', function() {
    audio.addEventListener('loadeddata', function() { //get song duration
        songDuration = audio.duration;
      });

    
    audio.addEventListener('timeupdate', function() { // Update the current playback position continuously
        console.log(playheadTime);
      });
      
  });
  
audio.load();

//PLAYHEAD
var playheadPosition = 0; //0 through 580
var playheadPressed = false;
document.addEventListener('DOMContentLoaded', function() {
    var playhead = document.getElementById('playhead');
    // Check if the element with the specified ID exists

    if (playhead) {
        playhead.addEventListener('mousedown', function() {
            console.log('Mouse pressed on the playhead!');
            // Add your code here to handle the mouse press event
            zero = mouseX - playheadPosition;
            playheadPressed = true;
        });
    }

    addEventListener('mouseup', function() {
        console.log('Mouse released on the playhead!');
        // Add your code here to handle the mouse release event
        playheadPressed = false;
        audio.currentTime = playheadTime; 
    });
});


//MOUSE MOVEMENT MAPPED TO PLAYHEAD
var mouseX

document.addEventListener('DOMContentLoaded', function() {
  document.addEventListener('mousemove', updateCoordinates);
});

function updateCoordinates(event) {
    mouseX = event.clientX;

    if (playheadPressed == true) {
        playheadPosition = mouseX - zero;
        if (playheadPosition < 581 && playheadPosition > -1) {playhead.style.marginLeft = playheadPosition;} //change css value
        else if (playheadPosition < 0) {playhead.style.marginLeft = 0;} else if (playheadPosition > 580) {playhead.style.marginLeft = 580;}
        playheadTime = playheadPosition/(580/songDuration);
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
