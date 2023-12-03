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
  fetch('https://api.academjazzclub.ru/api/v1/get-artist', {
    method: 'POST',
    body: JSON.stringify({
      artist: window.location.href.substring(window.location.href.indexOf('?id=') + 4) / 1,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((output) => {
      let data = output.artist;
      console.log(data)
      // const date = new Date(data.date);
      // let time = date.getHours() + ':' + date.getMinutes();
      // if (time.length < 5) {
      //   time += '0';
      // }

      let div = document.createElement('div');
      div.innerHTML = data.description;
      video = [...div.querySelectorAll('iframe')].map((e) => '<div class="video-card">' + e.outerHTML + '</div>').join('');
      div.querySelectorAll('iframe').forEach((e) => div.removeChild(e))
      document.querySelector('.video-block .grid').innerHTML = video;
      document.querySelector('.text-content').innerHTML =  div.innerHTML;
      document.querySelector('.page-title p').innerHTML = data.photo_description;
      document.querySelector('.page-title h1').innerHTML = data.title;
      document.querySelector('.breadcrumbs__item:last-of-type span').innerHTML = data.title;
      document.querySelector('.main-information__image').innerHTML = `<img src="https://academjazzclub.ru/images/artists/pic/${data.photo_url}" width="400" height="264" alt="Фотография исполнителя">`
      // const x = `<a class="btn btn--white-middle" href="#"><span class="icon-wrapper">
      //                 <svg width="26" height="26" aria-hidden="true">
      //                   <use xlink:href="img/sprite.svg#icon-calendar"></use>
      //                 </svg></span>
      //               <time class="text" datetime="2023-04-08 20:30">8 апр, сб 20:30</time>
      //             </a>`;
      endLoad();
    });

  fetch('https://api.academjazzclub.ru/api/v1/get-events-by-artist', {
    method: 'POST',
    body: JSON.stringify({
      "limit": 4,
      "offset": 0,
      "history": false,
      "sort_order": 1,
      "artist": window.location.href.substring(window.location.href.indexOf('?id=') + 4) / 1,
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
                            <time class="text" datetime="${e.date}">${monthConfig[date.getMonth()] + ' ' + date.getDate() + ', ' + weekConfig[date.getDay()]}</time>
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
}

