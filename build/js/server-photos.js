endLoad();
function loadData() {
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

        console.log(content)

      document.querySelector('.breadcrumbs__item:last-of-type span').innerHTML = text.title;
      document.querySelector('.photos-content .container').innerHTML = `
                <div class="page-title">
                <h1 class="title">${text.title}</h1>
              <p>${text.description}</p></div>
      `;

        content = content.forEach((e) => {
          if (e.title) {
            id = e.content.split('[photogallary=')[1].split(' ')[0];
              getPhotos(id).then((result) => {
                if (!result) return;
                const photos = result?.photo_album_content;
                if (photos) {
                  document.querySelector('.photos-content .container').innerHTML+= `
<div class="photos-content__wrapper">
                <div class="page-title page-title--closer">
                  <h2 class="title title--h3 title--pink">
                    ${e.title}
                  </h2>
                </div>
<div class="slider swiper slider swiper-initialized swiper-horizontal swiper-pointer-events" style="opacity: 1;">
                  <ul class="slider__wrapper swiper-wrapper" id="swiper-wrapper-af7b9335f9c59c02" aria-live="polite" style="transform: translate3d(-880px, 0px, 0px); transition-duration: 0ms;">

                    ${photos.map((e) => {
                    return `
                      <li class="slider__slide-wrapper swiper-slide" role="group" style="width: 400px; margin-right: 40px;">
                      <div class="slider__slide-container">
                        <picture>
                          <img src="https://academjazzclub.ru/images/gal/th/${e.url}" width="400" height="264" alt="Группа Стаса Намина Цветы.">
                        </picture>
                      </div>
                    </li>
                      `
                  }).join('')}
                  </ul>
                  <div class="slider__button-wrapper">
                    <button class="btn btn--slider-before" type="button" aria-label="Предыдущий слайд" tabindex="0" aria-controls="swiper-wrapper-af7b9335f9c59c02" aria-disabled="false">
                      <svg width="14" height="7" aria-hidden="true" viewBox="0 0 14 7">
                        <use xlink:href="img/sprite.svg#icon-arrow-left"></use>
                      </svg>
                    </button>
                    <button class="btn btn--slider-next" type="button" aria-label="Следующий слайд" tabindex="0" aria-controls="swiper-wrapper-af7b9335f9c59c02" aria-disabled="false">
                      <svg width="14" height="7" aria-hidden="true" viewBox="0 0 14 7">
                        <use xlink:href="img/sprite.svg#icon-arrow-right"></use>
                      </svg>
                    </button>
                  </div>
                <span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span></div>`;
                } else return;
              }).catch((err) => {console.log('Ошибка: ' + err)});
          }
          return;
        })
      }
    );
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

loadData();
