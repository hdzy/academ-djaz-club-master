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
loadData();
function loadData() {
  startLoad();
  fetch('https://api.academjazzclub.ru/api/v1/get-event', {
    method: 'POST',
    body: JSON.stringify({
      event: window.location.href.substring(window.location.href.indexOf('?id=') + 4) / 1,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
      .then((res) => res.json())
      .then((output) => {
        let data = output.event;
        const artist = data.artist_id;
        const date = new Date(data.date);
        let now = new Date;
        let time = date.getHours() + ':' + date.getMinutes();
        if (time.length < 5) {
          time += '0';
        }
        document.title = data.title;
        document.querySelector('.page-title .title').innerHTML = data.title;
        document.querySelector('.page-title p').innerHTML = data.photo_description;
        document.querySelector('.text-content').innerHTML = data.description.replaceAll('<iframe', '<br><iframe');
        document.querySelector('.video-block').innerHTML = '';
        document.querySelector('.breadcrumbs__item:last-of-type').innerHTML = data.title;
        document.querySelector('.main-information__image picture').outerHTML = `<img src="https://academjazzclub.ru/images/afisha/pic/${data.photo_url}">`;
        document.querySelector('.main-information__image img').srcset = '';
        document.querySelector('.show-info:nth-of-type(2) .show-info__description').innerHTML = time;
        document.querySelector('.show-info:nth-of-type(1) .show-info__description').innerHTML = date.getDate() + ' ' + monthConfig[date.getMonth()] + ', ' + weekConfig[date.getDay()];
        if (date < now) {
          document.querySelector('.main-information__button').style.display = 'none';
        } else {
          document.querySelector('.main-information__button a').setAttribute('data-unifd-performance-id', `${data['ep_id']}`)
          document.querySelector('.main-information__button a').classList.add('js-unifd-trigger-link')
          document.querySelector('.main-information__button a').target = '_blank';
        }
        const x = `<a class="btn btn--white-middle" href="#"><span class="icon-wrapper">
                      <svg width="26" height="26" aria-hidden="true">
                        <use xlink:href="img/sprite.svg#icon-calendar"></use>
                      </svg></span>
                    <time class="text" datetime="2023-04-08 20:30">8 апр, сб 20:30</time>
                  </a>`;

        fetch('https://api.academjazzclub.ru/api/v1/get-events-by-artist', {
          method: 'POST',
          body: JSON.stringify({
            "limit": 4,
            "offset": 0,
            "history": false,
            "sort_order": 1,
            "artist": artist,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((res) => res.json())
          .then((output) => {
            startLoad();
            let data = output;
            if (data.result) {
              document.querySelector('.dates-block').innerHTML = `
            <div class="container">
                <div class="page-title page-title--closer">
                  <h2 class="title title--h3">Ближайшие концерты</h2>
                  <div class="grid-show grid-show--dates">
                        ${data.events.map((e) => {
                const date = new Date(e.date);
                return `
                            <a class="btn btn--white-middle" href="show.html?id=${e.id}"><span class="icon-wrapper">
                                <svg width="26" height="26" aria-hidden="true">
                                    <use xlink:href="img/sprite.svg#icon-calendar"></use>
                                </svg></span>
                            <time class="text" datetime="${e.date}">${date.getDate() + ' ' + monthConfig[date.getMonth()] + ', ' + weekConfig[date.getDay()]}</time>
                            </a>
                            `
              }).join('')}
                  </div>
                </div>
            </div>`;
            } else {
              document.querySelector('.dates-block').parentNode.outerHTML = '';
            }
            endLoad();
          });







        endLoad();
      });
}

