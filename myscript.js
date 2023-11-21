var playhead = document.getElementById("playhead"); 
var duration = 50
var currentTime = 200

playhead.style.marginLeft = ((currentTime / duration) * 580) + 'px'; 