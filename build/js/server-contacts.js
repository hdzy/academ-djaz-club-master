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
                       <div class="page-title page-title--closer">
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

        // document.querySelector('.contacts-block__wrapper .grid').innerHTML = `
        //
        // `
      endLoad();
      }
    );
}


loadData();
