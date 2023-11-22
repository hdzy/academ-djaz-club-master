// инициализирует слайдер с фото на странице фотоотчета
const initSliderPhotos = () => {
  setTimeout(function () {
    document.querySelectorAll('.slider').forEach((slide) => {
      slide.style.opacity = 1;
    });
  }, 0);
  // eslint-disable-next-line no-undef, no-unused-vars
  const swiper = new Swiper('.slider', {
    navigation: {
      nextEl: '.btn--slider-next',
      prevEl: '.btn--slider-before',
    },

    slidesPerGroup: 1,

    breakpoints: {
      375: {
        slidesPerView: 1,
        initialSlide: 0,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
    },
  });
};

export {initSliderPhotos};
