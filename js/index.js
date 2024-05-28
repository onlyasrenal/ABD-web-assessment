document.addEventListener('DOMContentLoaded', function () {
  const carouselInner = document.querySelector('.carousel-inner');
  const prevButton = document.querySelector('.carousel-prev');
  const nextButton = document.querySelector('.carousel-next');
  let currentIndex = 0;
  const items = carouselInner.children;

  function updateCarousel() {
    carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  prevButton.addEventListener('click', function () {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    updateCarousel();
  });

  nextButton.addEventListener('click', function () {
    currentIndex = (currentIndex + 1) % items.length;
    updateCarousel();
  });

  updateCarousel();

  var playbutton = document.getElementById("music_button");
  var audio = document.getElementById("ture_music");
  playbutton.addEventListener('click',function(){
    audio.play()
  })
});
