
loadData();


const monthConfig = {
  0: 'янв',
  1: 'фев',
  2: 'мар',
  3: 'апр',
  4: 'май',
  5: 'июн',
  6: 'июл',
  7: 'авг',
  8: 'сен',
  9: 'окт',
  10: 'ноя',
  11: 'дек',
};

const weekConfig = {
  0: 'пн',
  1: 'вт',
  2: 'ср',
  3: 'чт',
  4: 'пт',
  5: 'сб',
  6: 'вс',
}
const pagesInfo = [
  {
    id: 11,
    link: 'about.html',
  },
  {
    id: 215,
    link: 'reviews.html',
  },
  {
    id: 207,
    link: 'gifts.html',
  },
  {
    id: 204,
    link: 'menu--food.html',
  },
  {
    id: 212,
    link: 'menu--beverages.html',
  },
  {
    id: 187,
    link: 'artists.html',
  },
  {
    id: 191,
    link: 'partners.html',
  },
  {
    id: 179,
    link: 'playbill.html',
  },
  {
    id: 169,
    link: 'photos.html',
  },
  {
    id: 190,
    link: 'archive.html',
  },
  {
    id: 216,
    link: 'tickets.html',
  },
  {
    id: 180,
    link: 'contacts.html',
  },
  {
    id: 185,
    link: 'schema.html',
  }
];
function loadData() {
  let headers = new Headers();

  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');

  headers.append('Access-Control-Allow-Origin', '*');
  headers.append('Access-Control-Allow-Credentials', 'true');

  // headers.append('Authorization', 'Basic ' + btoa('admin:FDSart484562'));

  fetch('https://api.academjazzclub.ru/api/v1/get-categories', {
    method: 'POST',
    headers,
  })
    .then((res) => res.json())
    .then((output) => {
        let data = output;
        document.querySelector('.nav__list').innerHTML = '';
        data['category_tree'].forEach((e) => {
          if (e['children'].length > 0) {
            document.querySelector('.nav__list').innerHTML += `<li class="nav__item" data-accordion="element">
                  <button class="link nav__link nav__link--with-icon" type="button" data-accordion="button">${e.title}
                    <svg width="8" height="5" aria-hidden="true">
                      <use xlink:href="img/sprite.svg#icon-menu-arrow"></use>
                    </svg>
                  </button>
                  <div class="nav__content" data-accordion="content">
                    <div class="nav__content-wrapper" data-accordion="wrapper">
                      <ul class="nav__sublist">
                      <li class="nav__subitem">
                          <a class="link nav__link nav__link--sublink" href="${pagesInfo.find(el => el.id === e.id)?.link || `template.html?id=${e.id}`}" tabindex="-1">${e.title}
                          </a>
                        </li>
                        ${e['children'].map((e) => {
              if (e.id == 186) return;
              return `<li class="nav__subitem">
                          <a class="link nav__link nav__link--sublink" href="${pagesInfo.find(el => el.id === e.id)?.link || `template.html?id=${e.id}`}" tabindex="-1">${e.title}
                          </a>
                        </li>`;
            }).join('')}
                      </ul>
                    </div>
                  </div>
                </li>`;
          } else {
            if (e.id == 219) return;
            document.querySelector('.nav__list').innerHTML += `<li class="nav__item"><a class="link nav__link" href="${pagesInfo.find(el => el.id === e.id)?.link || `template.html?id=${e.id}`}">${e.title}</a></li>`;
          }
        });
      }
    );

  fetch('https://api.academjazzclub.ru/api/v1/get-setting', {
    method: 'GET',
    headers,
  })
    .then((res) => res.json())
    .then((output) => {
      window.addEventListener('DOMContentLoaded', () => {
        let data = output;
        document.title = data.site_title;
        document.body.innerHTML = document.body.innerHTML.replaceAll('academjazz@gmail.com', data.site_email).replaceAll('+7 (495) 532-47-23', data.site_phone).replaceAll('+74955324723', data.site_phone).replaceAll('74955324723', data.site_phone) + data.metrics_conters;
        document.head.innerHTML = document.head.innerHTML.replaceAll('academjazz@gmail.com', data.site_email).replaceAll('+7 (495) 532-47-23', data.site_phone).replaceAll('+74955324723', data.site_phone).replaceAll('74955324723', data.site_phone) + data.site_metatags;
       })
       }
    );
}
fetch('https://api.academjazzclub.ru/api/v1/get-events-list', {
  method: 'POST',
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    "limit":3,
    "offset":0,
    "history":false,
    "sort_order": "1"
  })
})
  .then((res) => res.json())
  .then((output) => {
      let data = output.events;
      if (data) {
        if (document.querySelector('.soon-on-stage')) {
          document.querySelector('.soon-on-stage .show-cards-section .container .grid').innerHTML =
            `
              ${data.map((e) => {
              const date = new Date(e.date);
              let now = new Date;
              let time = date.getHours() + ':' + date.getMinutes();
              if (time.length < 5) {
                time += '0';
              }
              return `
                <div class="show-card">
                    <div class="show-card__img">
                        <img src="https://academjazzclub.ru/images/afisha/pic/${e.photo_url}" width="400" height="264" alt="Фотография исполнителя">
                    </div>
                    <div class="show-card__content">
                      <div class="date show-card__date">
                        <div class="date__icon-wrapper">
                          <svg width="35" height="35" aria-hidden="true" viewBox="0 0 35 35">
                            <use xlink:href="img/sprite.svg#icon-calendar"></use>
                          </svg>
                        </div>
                        <time class="date__time" datetime="${e.date}">${date.getDate() + ' ' + monthConfig[date.getMonth()] + ', ' + weekConfig[date.getDay()] + ' ' + time}</time>
                      </div>
                      <a href="${e.artist_id != 0 ? "/artist.html?id=" + e.artist_id : '#'}" class="title title--h3 title--no-text-transform show-card__title">${e.title}</a>
                      <p class="show-card__description">${e.description.replaceAll('<b>', '').replaceAll('</b>', '').substring(0, 50)}...</p>
                      <p class="show-card__links">
                        <a class="btn show-card__btn" href="show.html?id=${e.id}" aria-label="Перейти на страницу события.">Подробнее
                        </a>
                        <a class="btn btn--magenta show-card__btn js-unifd-trigger-link" data-unifd-performance-id="${e['ep_id']}" aria-label="Перейти к покупке билетов.">Купить билет
                        </a>
                      </p>
                    </div>
                  </div>`.replaceAll('<b>', '').replaceAll('</b>')
            }).join('')}
            `
        }
      }
    }
  );



window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.pagination__list').forEach((e) => {
      e.addEventListener('click', () => window.scrollTo({
        top: 100,
        behavior: "smooth",
      }))
    })
})
