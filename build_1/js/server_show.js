let offset = 0;
let count = 0;
const postsPerPage = 18;
let currentPage = 1;
const monthConfig = {
  0: 'Январь',
  1: 'Февраль',
  2: 'Март',
  3: 'Апрель',
  4: 'Май',
  5: 'Июнь',
  6: 'Июль',
  7: 'Август',
  8: 'Сентябрь',
  9: 'Октябрь',
  10: 'Ноябрь',
  11: 'Декабрь',
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
        console.log(output);
        const date = new Date(data.date);
        let now = new Date;
        let time = date.getHours() + ':' + date.getMinutes();
        if (time.length < 5) {
          time += '0';
        }
        document.title = data.title;
        document.querySelector('.page-title .title').innerHTML = data.title;
        document.querySelector('.page-title p').innerHTML = data.photo_description;
        document.querySelector('.text-content').innerHTML = data.description;
        document.querySelector('.video-block').innerHTML = '';
        document.querySelector('.breadcrumbs__item:last-of-type').innerHTML = data.title;
        document.querySelector('.main-information__image picture').outerHTML = `<img src="https://academjazzclub.ru/images/afisha/pic/${data.photo_url}">`;
        document.querySelector('.main-information__image img').srcset = '';
        document.querySelector('.show-info:nth-of-type(2) .show-info__description').innerHTML = time;
        document.querySelector('.show-info:nth-of-type(1) .show-info__description').innerHTML = monthConfig[date.getMonth()] + ' ' + date.getDay() + ', ' + weekConfig[date.getDay()];
        document.querySelector('.show-info:nth-of-type(3) .show-info__description').innerHTML = data.place;
        if (date < now) {
          document.querySelector('.main-information__button').style.display = 'none';
        } else {
          document.querySelector('.main-information__button a').href = `https://pankova.edinoepole.ru/api/v1/pages/default_landing_page?unifd-performance-id=${data['ep_id']}`;
          document.querySelector('.main-information__button a').target = '_blank';
        }
        const x = `<a class="btn btn--white-middle" href="#"><span class="icon-wrapper">
                      <svg width="26" height="26" aria-hidden="true">
                        <use xlink:href="img/sprite.svg#icon-calendar"></use>
                      </svg></span>
                    <time class="text" datetime="2023-04-08 20:30">8 апр, сб 20:30</time>
                  </a>`;
        endLoad();
      });
}

