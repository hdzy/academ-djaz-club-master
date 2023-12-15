function startLoad() {
  document.querySelector('.loader-wrapper').style = 'display: flex';
}

function endLoad() {
  document.querySelector('.loader-wrapper').style = 'display: none';
}


function loadData() {
  startLoad();
  const req_body = {
    id: 185,
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
        // document.title = data.category_info.h1_append;
        let data = output;
        console.log(data);
        document.querySelector('.breadcrumbs__item:last-of-type span').innerHTML = `${data.bread_crumbs[1].title}`
        document.querySelector('.contacts-block .container').innerHTML = `
          <div class="page-title">
                  <h1 class="title">СХЕМА ЗАЛА</h1>
                </div>
                ${data.category_content.map((e) => {
          let result = '';
          if (e.content) {
            result += e.content.replaceAll('<a', '<a style="color:#0000FF;"');
          }
          if (e.photo_url) {
            result += `<img src="https://academjazzclub.ru/images/pages/pic/${e.photo_url}">`
          }
          return result;
        }).join('')}
        `

        endLoad();
      }
    );
}


loadData();
