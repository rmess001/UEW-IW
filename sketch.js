//AUDIO VARIABLES
var songPlaying = 'OMS.mp3'; //current song loaded
var audio = new Audio('music/' + songPlaying); //current song loaded
var playheadTime = 0; //playhead value relative to length of song
var songDuration; //duration of current song

document.addEventListener('DOMContentLoaded', function() {
    audio.addEventListener('loadeddata', function() { //get song duration
        songDuration = audio.duration;
      });

    
    audio.addEventListener('timeupdate', function() { // update the current playback position continuously    
        if (playheadPressed == false) {
            playheadTime = audio.currentTime;
            playheadPosition = (audio.currentTime*580/songDuration).toFixed(6);
            playhead.style.marginLeft = (audio.currentTime*580/songDuration).toFixed(6);}

            document.getElementById("timestamp").textContent = audio.currentTime.toFixed(2) + " | " + audio.duration.toFixed(2); //update timestamp
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
            zero = mouseX - playheadPosition;
            playheadPressed = true;
        });
        addEventListener('mouseup', function() {
            console.log('Mouse released!');
            // Add your code here to handle the mouse release event
            if (playheadPressed == true) {audio.currentTime = playheadTime; playheadPressed = false;}
            
        });
    }
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
        else if (playheadPosition < 0) {playhead.style.marginLeft = 0; playheadPosition = 0;} else if (playheadPosition > 580) {playhead.style.marginLeft = 580; playheadPosition = 580;}
        playheadTime = (playheadPosition/(580/songDuration)).toFixed(6);
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




















//METADATA MP3
const filePath = 'music/oms.mp3';  // Replace with the actual URL of your MP3 file


fetch(filePath)
  .then(response => response.arrayBuffer())
  .then(buffer => {
    const metadata = readID3Tags(buffer);

    if (metadata) {
      console.log('Title:', metadata.title || 'N/A');
      console.log('Authors:', metadata.authors || 'N/A');
    } else {
      console.log('Error reading metadata.');
    }
  })
  .catch(error => {
    console.error('Error fetching the file:', error.message);
  });

function readID3Tags(buffer) {
  const id3Header = new TextDecoder().decode(new Uint8Array(buffer.slice(0, 3)));

  if (id3Header === 'ID3') {
    const version = new Uint8Array(buffer.slice(3, 4))[0];
    const majorVersion = new Uint8Array(buffer.slice(4, 5))[0];
    const minorVersion = new Uint8Array(buffer.slice(5, 6))[0];
    const flags = new Uint8Array(buffer.slice(6, 7))[0];

    let offset = 10;
    const result = {};

    while (offset < buffer.byteLength) {
      const frameID = new TextDecoder().decode(new Uint8Array(buffer.slice(offset, offset + 4)));
      const frameSize = new DataView(buffer).getUint32(offset + 4);
      const frameFlags = new DataView(buffer).getUint16(offset + 8);

      if (frameID === 'TIT2') {
        const encoding = new Uint8Array(buffer.slice(offset + 10, offset + 11))[0];
        const title = new TextDecoder().decode(new Uint8Array(buffer.slice(offset + 11, offset + frameSize)));
        result.title = title;
      } else if (frameID === 'TPE1') {
        const encoding = new Uint8Array(buffer.slice(offset + 10, offset + 11))[0];
        const authors = new TextDecoder().decode(new Uint8Array(buffer.slice(offset + 11, offset + frameSize)));
        result.authors = authors;
      }

      offset += 10 + frameSize;
    }

    return result;
  } else {
    console.log('File does not have an ID3 tag.');
    return null;
  }
}
