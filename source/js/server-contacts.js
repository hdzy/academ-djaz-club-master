function startLoad() {
  document.querySelector('.loader-wrapper').style = 'display: flex';
}

function endLoad() {
  document.querySelector('.loader-wrapper').style = 'display: none';
}

function loadData() {
  startLoad();
  const req_body = {
    id: 180,
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
        console.log(data.category_content)

        cards = [content[0], content[1], content[2], content[4], content[5]];
        other = [content[3], content[6]];
        document.querySelector('.contacts-block__wrapper .grid .info-card:first-of-type').innerHTML = `
                      <p class="title title--h3 title--no-text-transform title--pink info-card__title">Адрес</p>
                      <address>${cards[0].title}</address>
        `

      document.querySelector('.contacts-block__wrapper .grid .info-card:nth-of-type(2)').innerHTML = `
                      <p class="title title--h3 title--no-text-transform title--pink info-card__title">${cards[1].title.split(': ')[0]}</p>
                      <p><a href="tel:${cards[1].title.split(': ')[1]
        .replaceAll(' ', '')
        .replaceAll('(', '')
        .replaceAll('-', '')
        .replaceAll(')', '')}">${cards[1].title.split(': ')[1]}</a></p>
        `

      document.querySelector('.contacts-block__wrapper .grid .info-card:nth-of-type(3)').innerHTML = `
                      <p class="title title--h3 title--no-text-transform title--pink info-card__title">${cards[2].title.split(': ')[0]}</p>
                      <p><a href="tel:${cards[2].title.split(': ')[1]
        .replaceAll(' ', '')
        .replaceAll('(', '')
        .replaceAll('-', '')
        .replaceAll(')', '')}"">${cards[2].title.split(': ')[1]}</a></p>
        `
      document.querySelectorAll('.contacts-block__wrapper .grid')[1].querySelector('.info-card:nth-of-type(1)').innerHTML = `
                      <h2 class="title title--h3 info-card__heading-title">${cards[3].title.split(': ')[0]}</h2>
                      <p class="title title--h3 title--no-text-transform title--pink info-card__title">${cards[3].content.split(': ')[0]}</p>
                      <p>${cards[3].content.split(': ')[1] + cards[3].content.split(': ')[2]}</p>
        `

      document.querySelectorAll('.contacts-block__wrapper .grid')[1].querySelector('.info-card:nth-of-type(2)').innerHTML = `
                      <h2 class="title title--h3 info-card__heading-title">${cards[4].title.split(': ')[0]}</h2>
                      <p class="title title--h3 title--no-text-transform title--pink info-card__title">${cards[4].content.split('\r\n')[0]}</p>
                      <p>${cards[4].content.split('\r\n')[1]}</p>
        `

        document.querySelector('.breadcrumbs__item:last-of-type span').innerHTML = text.title;
        document.querySelector('.page-title .title').innerHTML = text.title;
        document.querySelector('.page-title').innerHTML += `<p>${text.description}</p>`;

        document.querySelector('.contacts-map__wrapper').innerHTML = `
                       <div class="page-title page-title--closer" id="ymap-title">
                    <h3 class="title title--h3">${other[0].title}</h3>
                  </div>
                  ${other[0].content}
        `

      document.querySelector('.contacts-socials .container').innerHTML = `
      <div class="page-title page-title--closer">
                    <h3 class="title title--h3">${other[1].title}</h3>
                  </div>
                  ${other[1].content}
                  <img src="https://academjazzclub.ru/images/pages/th/${other[1].photo_url}" alt="">
      `

      let section = document.createElement("section");
      section.classList.add('page-section');
      section.classList.add('page-section--padding-top-null');
        section.innerHTML = `<div class="contacts-socials">
          <div class="container">
            <div class="page-title page-title--closer">
              <h2 class="title">Мы в&nbsp;соцсетях</h2>
              <p>
                Дорогие друзья! Приглашаем вас подписаться на&nbsp;наши страницы в&nbsp;Яндекс Дзен, Телеграм
                и&nbsp;ВКонтакте.
                Анонсы концертов, интересные факты, атмосфера с&nbsp;концертов&nbsp;– всё это вы&nbsp;сможете найти
                в&nbsp;нашем Telegram-канале
                и&nbsp;сообществе VK. Присоединяйтесь!
              </p>
            </div>
            <div class="grid">
              <a class="btn btn--social" href="https://vk.com/academjazzclub
" target="_blank" rel="nofollow noopener noreferrer"><span
                class="icon-wrapper">
                      <svg width="26" height="26" aria-hidden="true">
                        <use xlink:href="img/sprite.svg#icon-vk"></use>
                      </svg></span><span class="text">Подписаться ВКонтакте</span>
              </a>
              <a class="btn btn--social" href="https://t.me/academ_jazz_club" target="_blank" rel="nofollow noopener noreferrer"><span
                class="icon-wrapper">
                      <svg width="26" height="26" aria-hidden="true">
                        <use xlink:href="img/sprite.svg#icon-telegram"></use>
                      </svg></span><span class="text">Подписаться в&nbsp;Telegram</span>
              </a>
              <a class="btn btn--social" href="https://dzen.ru/id/5cf1451d8da00a00b0287480
" target="_blank" rel="nofollow noopener noreferrer"><span
                class="icon-wrapper">
                      <svg width="26" height="26" aria-hidden="true">
                        <use xlink:href="img/sprite.svg#icon-dzen"></use>
                      </svg></span><span class="text">Подписаться в&nbsp;Яндекс Дзен</span>
              </a>
            </div>
          </div>
        </div>`;
      document.querySelector('.page-section:last-of-type').before(section);

        // document.querySelector('.contacts-block__wrapper .grid').innerHTML = `
        //
        // `
      if (window.location.href.indexOf('#map-scroll')) {
        var element = document.getElementById("ymap-title");
        element.scrollIntoView({behavior: "smooth"});
      }
      endLoad();
      }
    );
}


loadData();
