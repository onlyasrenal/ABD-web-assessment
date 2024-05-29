document.addEventListener('DOMContentLoaded', function () {
  const time = document.getElementById('time')
  let timeleft = 10
  let countdown = setInterval(function () {
    time.innerHTML = timeleft
    timeleft -= 1
    if (timeleft < 0) {
      clearInterval(countdown)
      time.innerHTML = '0'
      timeout()
    }
  }, 1000)
  function timeout(){
    console.log("timeout")
  }
  window.onload = countdown;
})