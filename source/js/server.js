function startLoad() {
  document.querySelector('.loader-wrapper').style = 'display: flex';
}

function endLoad() {
  document.querySelector('.loader-wrapper').style = 'display: none';
}


let offset = 0;
let count = 0;
const postsPerPage = 18;
let currentPage = 1;
let isInit = false;

loadDataM();
function loadDataM() {
  startLoad();
  fetch('https://api.academjazzclub.ru/api/v1/get-events-list', {
    method: 'POST',
    body: JSON.stringify({
      'limit': 18,
      'offset': offset,
      'history': false,
      'sort_order': 1,
    }),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Headers': 'Authorization, Origin, X-Requested-With, Accept, X-PINGOTHER, Content-Type',
    },
  })
      .then((res) => res.json())
      .then((output) => {
        let data = output;
        count = data.paging.total_count;
        const events = data.events;
        const path = document.querySelector('.show-cards-section .container .grid');
        path.innerHTML = '';
        for (let i = 0; i < events.length; i++) {
          const element = `<div class="show-card">
                    <div class="show-card__img">
                      <img src="https://academjazzclub.ru/images/afisha/th/${events[i]['photo_url']}" width="400" height="264" alt="Фотография исполнителя">
                    </div>
                    <div class="show-card__content">
                      <div class="date show-card__date">
                        <div class="date__icon-wrapper">
                          <svg width="35" height="35" aria-hidden="true" viewBox="0 0 35 35">
                            <use xlink:href="img/sprite.svg#icon-calendar"></use>
                          </svg>
                        </div>
                        <time class="date__time" datetime="2023-03-23 20:30">${events[i].date.substring(8, 10) + '.' + events[i].date.substring(5, 7) + '.' + events[i].date.substring(0, 4) + ' ' + events[i].date.substring(events[i].date.length - 8, events[i].date.length - 3)}</time>
                      </div>
                      <a class="title title--h3 title--no-text-transform show-card__title">${events[i].title}</a>
                      <p class="show-card__description">${events[i].description.substring(0, 50)}...</p>
                      <p class="show-card__links">
                        <a class="btn show-card__btn" href="show.html?id=${events[i].id}" aria-label="Перейти на страницу события.">Подробнее
                        </a>
                        <a class="btn btn--magenta show-card__btn js-unifd-trigger-link" data-unifd-performance-id="${events[i].ep_id}" aria-label="Перейти к покупке билетов.">Купить билет
                        </a>
                      </p>
                    </div>
                  </div>`.replaceAll('<b>', '').replaceAll('</b>', '');
          path.innerHTML += element;
        //   document.querySelector(`.card-id-${events[i]['ep_id']}`).addEventListener('click', () => {
        //     document.body.innerHTML += `
        // <div class="unifd">
        //     <div class="unifd__in">
        //         <iframe src="https://pankova.edinoepole.ru/api/v1/pages/default_landing_page?unifd-performance-id=${events[i]['ep_id']}" frameborder="no" scrolling="no" class="unifd__frame" ,="" id="unifd__frame" data-gtm-yt-inspected-8399948_38="true" data-gtm-yt-inspected-14="true" style="height: 700px;">
        //         </iframe>
        //         <a style="cursor: pointer" onclick="document.body.removeChild(document.querySelector('.unifd'))" class="js-unifd-close unifd__close">X</a>
        //     </div>
        // </div>`
        //   });
        }
        if (!isInit) {
          pagesInit(count);
          isInit = true;
        }
        endLoad();
      });
}


function pagesInit(count) {
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
