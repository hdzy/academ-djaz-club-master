let offset = 0;
let count = 0;
const postsPerPage = 5;
let currentPage = 1;
let isInitF = false;
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
function loadDataM() {
  startLoad();
  const req_body = {
    id: 169,
  };
  fetch('https://api.academjazzclub.ru/api/v1/get-category', {
    'method': 'POST',
    'headers': {
      'Content-Type': 'application/json;charset=utf-8',
    },
    'body': JSON.stringify(req_body),
  })
    .then((res) => res.json())
    .then((output) => {

        let data = output;
        text = data.category_info;
        content = data.category_content;
        document.querySelector('.breadcrumbs__item:last-of-type span').innerHTML = text.title;
      document.querySelector('.photos-content .container').innerHTML = `
                <div class="page-title">
                <h1 class="title">${text.title}</h1>
              <p>${text.description}</p></div>
      `;

        let ids = content.map((e) => {
          if (e.title) {
            return e.content.split('[photogallary=')[1].split(' ')[0];
          }
        }).filter((e) => e);

        let titles = content.map((e) => {
          if (e.title) {
            return e.content.split('[photogallary=')[0].replace(/\n/g, '').replace(/\r/g, '')
          }
        }).filter((e) => e);

        count = ids.length;
        result_arr = [];
          getPhotos(ids[offset]).then((result) => {
            if (!result) return;
            const photos = result?.photo_album_content;
            if (photos) {
              document.querySelector('.photos-content .container').innerHTML += `<div class="photos-content__wrapper">
                <div class="page-title page-title--closer">
                  <h2 class="title title--h3 title--pink">
                    ${titles[offset]}
                  </h2>
                </div>
          <div class="slider swiper">
                  <ul class="slider__wrapper swiper-wrapper">
                    ${photos.map((el) => {
                return `
                       <li class="slider__slide-wrapper swiper-slide">
                      <div class="slider__slide-container">
                          <img src="https://academjazzclub.ru/images/gal/pic/${el.url}" width="400" height="264" alt="${titles[offset]}">
                      </div>
                    </li>
                      `
              }).join('')}
                  </ul>
                   <div class="slider__button-wrapper">
                    <button class="btn btn--slider-before" type="button" aria-label="Переключиться на предыдущий слайд.">
                      <svg width="14" height="7" aria-hidden="true" viewBox="0 0 14 7">
                        <use xlink:href="img/sprite.svg#icon-arrow-left"></use>
                      </svg>
                    </button>
                    <button class="btn btn--slider-next" type="button" aria-label="Переключиться на следующий слайд.">
                      <svg width="14" height="7" aria-hidden="true" viewBox="0 0 14 7">
                        <use xlink:href="img/sprite.svg#icon-arrow-right"></use>
                      </svg>
                    </button>
                  </div>`;
              initSliderPhotos();
            }
          }).catch((err) => {console.log('Ошибка: ' + err)});

        getPhotos(ids[offset + 1]).then((result) => {
          if (!result) return;
          const photos = result?.photo_album_content;
          if (photos) {

            document.querySelector('.photos-content .container').innerHTML += `<div class="photos-content__wrapper">
                <div class="page-title page-title--closer">
                  <h2 class="title title--h3 title--pink">
                    ${titles[offset + 1]}
                  </h2>
                </div>
          <div class="slider swiper">
                  <ul class="slider__wrapper swiper-wrapper">
                    ${photos.map((el) => {
              return `
                       <li class="slider__slide-wrapper swiper-slide">
                      <div class="slider__slide-container">
                          <img src="https://academjazzclub.ru/images/gal/pic/${el.url}" width="400" height="264" alt="${titles[offset + 1]}">
                      </div>
                    </li>
                      `
            }).join('')}
                  </ul>
                   <div class="slider__button-wrapper">
                    <button class="btn btn--slider-before" type="button" aria-label="Переключиться на предыдущий слайд.">
                      <svg width="14" height="7" aria-hidden="true" viewBox="0 0 14 7">
                        <use xlink:href="img/sprite.svg#icon-arrow-left"></use>
                      </svg>
                    </button>
                    <button class="btn btn--slider-next" type="button" aria-label="Переключиться на следующий слайд.">
                      <svg width="14" height="7" aria-hidden="true" viewBox="0 0 14 7">
                        <use xlink:href="img/sprite.svg#icon-arrow-right"></use>
                      </svg>
                    </button>
                  </div>`;
            initSliderPhotos();
          }
        }).catch((err) => {console.log('Ошибка: ' + err)});

        getPhotos(ids[offset + 2]).then((result) => {
          if (!result) return;
          const photos = result?.photo_album_content;
          if (photos) {
            document.querySelector('.photos-content .container').innerHTML += `<div class="photos-content__wrapper">
                <div class="page-title page-title--closer">
                  <h2 class="title title--h3 title--pink">
                    ${titles[offset + 2]}
                  </h2>
                </div>
          <div class="slider swiper">
                  <ul class="slider__wrapper swiper-wrapper">
                    ${photos.map((el) => {
              return `
                       <li class="slider__slide-wrapper swiper-slide">
                      <div class="slider__slide-container">
                          <img src="https://academjazzclub.ru/images/gal/pic/${el.url}" width="400" height="264" alt="${titles[offset + 2]}">
                      </div>
                    </li>
                      `
            }).join('')}
                  </ul>
                   <div class="slider__button-wrapper">
                    <button class="btn btn--slider-before" type="button" aria-label="Переключиться на предыдущий слайд.">
                      <svg width="14" height="7" aria-hidden="true" viewBox="0 0 14 7">
                        <use xlink:href="img/sprite.svg#icon-arrow-left"></use>
                      </svg>
                    </button>
                    <button class="btn btn--slider-next" type="button" aria-label="Переключиться на следующий слайд.">
                      <svg width="14" height="7" aria-hidden="true" viewBox="0 0 14 7">
                        <use xlink:href="img/sprite.svg#icon-arrow-right"></use>
                      </svg>
                    </button>
                  </div>`;
            initSliderPhotos();
          }
        }).catch((err) => {console.log('Ошибка: ' + err)});

        getPhotos(ids[offset + 3]).then((result) => {
          if (!result) return;
          const photos = result?.photo_album_content;
          if (photos) {
            document.querySelector('.photos-content .container').innerHTML += `<div class="photos-content__wrapper">
                <div class="page-title page-title--closer">
                  <h2 class="title title--h3 title--pink">
                    ${titles[offset + 3]}
                  </h2>
                </div>
          <div class="slider swiper">
                  <ul class="slider__wrapper swiper-wrapper">
                    ${photos.map((el) => {
              return `
                       <li class="slider__slide-wrapper swiper-slide">
                      <div class="slider__slide-container">
                         <img src="https://academjazzclub.ru/images/gal/pic/${el.url}" width="400" height="264" alt="${titles[offset + 3]}">
                      </div>
                    </li>
                      `
            }).join('')}
                  </ul>
                   <div class="slider__button-wrapper">
                    <button class="btn btn--slider-before" type="button" aria-label="Переключиться на предыдущий слайд.">
                      <svg width="14" height="7" aria-hidden="true" viewBox="0 0 14 7">
                        <use xlink:href="img/sprite.svg#icon-arrow-left"></use>
                      </svg>
                    </button>
                    <button class="btn btn--slider-next" type="button" aria-label="Переключиться на следующий слайд.">
                      <svg width="14" height="7" aria-hidden="true" viewBox="0 0 14 7">
                        <use xlink:href="img/sprite.svg#icon-arrow-right"></use>
                      </svg>
                    </button>
                  </div>`;
            initSliderPhotos();
          }
        }).catch((err) => {console.log('Ошибка: ' + err)});

        getPhotos(ids[offset + 4]).then((result) => {
          if (!result) return;
          const photos = result?.photo_album_content;
          if (photos) {
            document.querySelector('.photos-content .container').innerHTML += `<div class="photos-content__wrapper">
                <div class="page-title page-title--closer">
                  <h2 class="title title--h3 title--pink">
                    ${titles[offset + 4]}
                  </h2>
                </div>
          <div class="slider swiper">
                  <ul class="slider__wrapper swiper-wrapper">
                    ${photos.map((el) => {
              return `
                       <li class="slider__slide-wrapper swiper-slide">
                      <div class="slider__slide-container">
                          <img src="https://academjazzclub.ru/images/gal/pic/${el.url}" width="400" height="264" alt="${titles[offset + 4]}">
                      </div>
                    </li>
                      `
            }).join('')}
                  </ul>
                   <div class="slider__button-wrapper">
                    <button class="btn btn--slider-before" type="button" aria-label="Переключиться на предыдущий слайд.">
                      <svg width="14" height="7" aria-hidden="true" viewBox="0 0 14 7">
                        <use xlink:href="img/sprite.svg#icon-arrow-left"></use>
                      </svg>
                    </button>
                    <button class="btn btn--slider-next" type="button" aria-label="Переключиться на следующий слайд.">
                      <svg width="14" height="7" aria-hidden="true" viewBox="0 0 14 7">
                        <use xlink:href="img/sprite.svg#icon-arrow-right"></use>
                      </svg>
                    </button>
                  </div>`;
            initSliderPhotos();
          }
        }).catch((err) => {console.log('Ошибка: ' + err)});
        if (!isInitF) {
          pagesInitF(count);
          isInitF = true;
        }
        endLoad();
      }
    );
}

function pagesInitF(count) {
  console.log(0)
  const pagesCount = Math.ceil(count / postsPerPage);
  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(`
    <li class="pagination__item">
                        <a class="btn pagination__link" data-page="${i}" aria-label="Страница ${i}" tabindex="-1" ><span class="text">${i}</span>
                        </a>
                      </li>
    `);
  }

  document.querySelector('.pagination__list').innerHTML = `
                    <li class="pagination__item pagination__item--arrow">
                        <a class="btn pagination__link pagination__link--prev" aria-label="Предыдущая страница" tabindex="-1"><span class="icon-wrapper">
                            <svg width="16" height="8" aria-hidden="true">
                              <use xlink:href="img/sprite.svg#icon-arrow-left"></use>
                            </svg></span><span class="text"></span>
                        </a>
                      </li>
                      ${pages.join('')}
                      <li class="pagination__item pagination__item--arrow">
                        <a class="btn pagination__link pagination__link--next" aria-label="Следующая страница" tabindex="0"><span class="icon-wrapper">
                            <svg width="16" height="8" aria-hidden="true">
                              <use xlink:href="img/sprite.svg#icon-arrow-right"></use>
                            </svg></span><span class="text"></span>
                        </a>
                      </li>
  `;
  document.querySelector(`*[data-page="${currentPage}"]`).classList.add('is-active');

  document.querySelector('.pagination__link--next').addEventListener('click', (e) => {
    if (offset + postsPerPage < count) {
      offset += postsPerPage;
      updatePage(1);
      loadDataM();
    }
  });

  document.querySelector('.pagination__link--prev').addEventListener('click', (e) => {
    if (offset - postsPerPage >= 0) {
      offset -= postsPerPage;
      updatePage(-1);
      loadDataM();
    }
  });

  document.querySelectorAll('.pagination__link[data-page]').forEach((e) => {
    e.addEventListener('click', (e) => {
      setPage(e.target.dataset['page'] || e.target.parentNode.dataset['page']);
    })
  })
};

function updatePage(param) {
  document.querySelector(`*[data-page="${currentPage}"]`).classList.remove('is-active');
  currentPage = param + currentPage / 1;
  document.querySelector(`*[data-page="${currentPage}"]`).classList.add('is-active');
}

function setPage(param) {
  document.querySelector(`*[data-page="${currentPage}"]`).classList.remove('is-active');
  currentPage = param;
  document.querySelector(`*[data-page="${currentPage}"]`).classList.add('is-active');
  offset = (param - 1) * postsPerPage;
  loadDataM();
}


function getPhotos(id) {
  const req_body = {
    id: id,
  };
  return fetch('https://api.academjazzclub.ru/api/v1/get-photoalbum', {
    'method': 'POST',
    'headers': {
      'Content-Type': 'application/json;charset=utf-8',
    },
    'body': JSON.stringify(req_body),
  })
    .then((res) => {
      return res.json()})
    .then((output) => {
      data = output;
      if (!data.result) throw 'Ошибка';
      return data;
      })
    .catch((err) => {
      console.log('Ошибка 2:' + err);
    })
}

loadDataM();
