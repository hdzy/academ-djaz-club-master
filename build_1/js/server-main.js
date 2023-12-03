loadData();

function startLoad() {
  document.querySelector('.loader-wrapper').style = 'display: flex';
}

function endLoad() {
  document.querySelector('.loader-wrapper').style = 'display: none';
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
];
function loadData() {
  let headers = new Headers();

  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');

  headers.append('Access-Control-Allow-Origin', '*');
  headers.append('Access-Control-Allow-Credentials', 'true');


  // headers.append('Authorization', 'Basic ' + btoa('admin:FDSart484562'));
  fetch('https://api.academjazzclub.ru/api/v1/get-setting', {
    method: 'GET',
    headers,
  })
      .then((res) => res.json())
      .then((output) => {
        let data = output;
        document.addEventListener('DOMContentLoaded', () => {
          document.title = data.site_title;
          document.body.innerHTML = document.body.innerHTML.replaceAll('academjazz@gmail.com', data.site_email).replaceAll('+7 (495) 532-47-23', data.site_phone).replaceAll('+74955324723', data.site_phone).replaceAll('74955324723', data.site_phone) + data.metrics_conters;
          document.head.innerHTML = document.head.innerHTML.replaceAll('academjazz@gmail.com', data.site_email).replaceAll('+7 (495) 532-47-23', data.site_phone).replaceAll('+74955324723', data.site_phone).replaceAll('74955324723', data.site_phone) + data.site_metatags;
        });
      }
      );

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
                          <a class="link nav__link nav__link--sublink" href="${pagesInfo.find(el => el.id === e.id)?.link || e.alternative_url}" tabindex="-1">${e.title}
                          </a>
                        </li>
                        ${e['children'].map((e) => {
    return `<li class="nav__subitem">
                          <a class="link nav__link nav__link--sublink" href="${pagesInfo.find(el => el.id === e.id)?.link || e.alternative_url}" tabindex="-1">${e.title}
                          </a>
                        </li>`;
  }).join('')}
                      </ul>
                    </div>
                  </div>
                </li>`;
          } else {
            document.querySelector('.nav__list').innerHTML += `<li class="nav__item"><a class="link nav__link" href="${pagesInfo.find(el => el.id === e.id)?.link || e.alternative_url}">${e.title}</a></li>`;
          }
        });
        endLoad();
      }
      );
}
