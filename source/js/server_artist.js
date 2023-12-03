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

loadData();
function loadData() {
  startLoad();
  fetch('https://api.academjazzclub.ru/api/v1/get-artists-list', {
    method: 'POST',
    body: JSON.stringify({
      'limit': 18,
      'offset': offset,
      'sort_order': 1,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((output) => {
      let data = output;
      const artists = data.artists;
      const path = document.querySelector('.artist-cards .container .grid');
      path.innerHTML = '';
      console.log(artists)
      if (artists.length < 18) {
        document.querySelector('.pagination').style.display = 'none';
      }
      for (let i = 0; i < artists.length; i++) {
        const element = `<div class="show-actor">
                    <div class="show-actor__img">
                      <picture>
                        <img src="https://academjazzclub.ru/images/artists/th/${artists[i].photo_url}" width="400" height="264" alt="Фотография исполнителя">
                      </picture>
                    </div>
                    <div class="show-actor__content">
                      <p class="title title--h3 title--no-text-transform show-actor__title">${artists[i].title}</p>
                      <p class="show-actor__description">${artists[i].description.substring(0, 50)}...</p>
                      <p class="show-actor__links">
                        <a class="btn show-actor__btn" href="artist.html?id=${artists[i].id}" aria-label="Ссылка на страницу исполнителя.">Подробнее
                        </a>
                      </p>
                    </div>
                  </div>`;
        path.innerHTML += element;
      }
      endLoad();
    });
}


window.addEventListener('load', () => {
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
      loadData();
      updatePage(1);
    }
  });

  document.querySelector('.pagination__link--prev').addEventListener('click', (e) => {
    if (offset - postsPerPage >= 0) {
      offset -= postsPerPage;
      loadData();
      updatePage(-1);
    }
  });
});

function updatePage(param) {
  document.querySelector(`*[data-page="${currentPage}"]`).classList.remove('is-active');
  currentPage = param + currentPage;
  console.log(currentPage);
  document.querySelector(`*[data-page="${currentPage}"]`).classList.add('is-active');
}

