const slider = function () {
  let currentSlide = 0;
  const slider = document.querySelector(".slider");
  const slides = document.querySelectorAll(".slider__el");
  const sliderBtnNext = document.querySelector(".slider__btn--next");
  const sliderBtnPrev = document.querySelector(".slider__btn--prev");

  const moveToSlide = function (cur) {
    slides.forEach((slide, index) => {
      slide.style.transform = `translateX(${100 * (index - cur)}%)`;
    });
  };

  const nextSlide = function () {
    currentSlide == slides.length - 1 ? (currentSlide = 0) : currentSlide++;
    moveToSlide(currentSlide);
  };

  const prevSlide = function () {
    currentSlide == 0 ? (currentSlide = slides.length - 1) : currentSlide--;
    moveToSlide(currentSlide);
  };

  sliderBtnNext.addEventListener("click", nextSlide);
  sliderBtnPrev.addEventListener("click", prevSlide);
};
export { slider };
