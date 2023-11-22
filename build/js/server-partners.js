function loadData() {
  startLoad();
  const req_body = {
    id: 191,
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
        let text = data.category_info;
        let content = data.category_content;
        console.log(text)
      document.querySelector('.page-title .title').innerHTML = text.title;
      document.querySelector('.page-title p').innerHTML = text.description;
      document.querySelector('.breadcrumbs__item:last-of-type span').innerHTML = text.title;
        document.querySelector('.brand-grid').innerHTML = `
            ${content.map((e) => {
                return `<a class="brand-text-card behavior" href="${e.photo_link_url}" target="_blank" rel="nofollow noopener">
                    <p class="title title--h3 title--no-text-transform">${e.title}</p>
                    <div class="brand-text-card__picture">
                      <picture>
                        <img src="https://academjazzclub.ru/images/pages/th/${e.photo_url}" width="207" height="59" alt="Партнер клуба джаз эфэм.">
                      </picture>
                    </div></a>`
        }).join('')}
        `

        x = `<a class="brand-text-card behavior" href="https://radiojazzfm.ru/" target="_blank" rel="nofollow noopener">
                    <p class="title title--h3 title--no-text-transform">Генеральный информационный партнёр</p>
                    <div class="brand-text-card__picture">
                      <picture>
                        <source type="image/webp" srcset="img/content/partners/jazz_fm.webp, img/content/partners/jazz_fm@2x.webp 2x"><img src="img/content/partners/jazz_fm.png" srcset="img/content/partners/jazz_fm@2x.png 2x" width="207" height="59" alt="Партнер клуба джаз эфэм.">
                      </picture>
                    </div></a>`
      endLoad();
      }
    );
}


loadData();
