//TIMELINE
var time = 0;

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
            playheadPressed = true;
            zero = mouseX;
        });
    } else {
        console.error('Element with ID "playhead" not found.');
    }
    addEventListener('mouseup', function() {
        console.log('Mouse released on the playhead!');
        // Add your code here to handle the mouse release event
        playheadPressed = false;
        console.log("REALEASEDD");
    });
});


//MOUSE MOVEMENT
var mouseX
document.addEventListener('DOMContentLoaded', function() {
  document.addEventListener('mousemove', updateCoordinates);
});

function updateCoordinates(event) {
    mouseX = event.clientX;
    if (playheadPressed == true) {
        playheadPosition = mouseX - zero;
        playhead.style.marginLeft = playheadPosition;
        console.log(playheadPosition);
    }
  }