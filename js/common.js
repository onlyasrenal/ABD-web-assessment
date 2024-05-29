document.addEventListener("DOMContentLoaded", function () {
  var playbutton = document.getElementById("music_button");
  var audio = document.getElementById("ture_music");
  playbutton.addEventListener('click', function () {
    audio.play()
  })
});
