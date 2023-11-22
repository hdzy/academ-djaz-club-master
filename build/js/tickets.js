function loadData() {
  startLoad();
  const req_body = {
    id: 216,
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

        imagesContent = content.filter((e) => e.photo_link_url);
        content = content.filter((e) => !e.photo_link_url);
        const title = imagesContent.filter((e) => e.title)[0].title;
        imagesContent = imagesContent.map((e) => {
          return `
                <a class="brand-card behavior" href="${e.photo_link_url}" target="_blank" rel="nofollow noopener">
                    <picture>
                        <img src="https://academjazzclub.ru/images/pages/th/${e.photo_url}" width="235" height="38" />
                    </picture>
                </a>
`
        })

      imagesContent = `
<div class="page-section page-section--padding-bottom-null">
    <div class="container">
        <div class="page-title page-title--no-margin-bottom">
            <h2 class="title">${title}</h2>
            <div class="brand-grid brand-grid--4-columns">
            `
        + imagesContent +
        `</div>
        </div>
    </div>
</div>`

        content = content.map((e, index) => {
              return `
<div class="page-section page-section--padding-bottom-null">
            <div class="container">
              <div class="page-title page-title--no-margin-bottom">
                <h2 class="title">${e.title}</h2>
                <div class="tickets-order__phones">
                  <p>${e.content}</p>
                </div>
              </div>
            </div>
          </div>
`
        })

        document.querySelector('.tickets-order').innerHTML = imagesContent + content.join('');
        document.querySelector('.breadcrumbs__item:last-of-type span').innerHTML = text.title;
        endLoad();
      }
    );
}


loadData();
