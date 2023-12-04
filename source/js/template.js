function startLoad() {
  document.querySelector('.loader-wrapper').style = 'display: flex';
}

function endLoad() {
  document.querySelector('.loader-wrapper').style = 'display: none';
}


function loadData() {
  startLoad();
  const req_body = {
    id: window.location.href.substring(window.location.href.indexOf('?id=') + 4) / 1,
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
        console.log(data);
        document.querySelector('.breadcrumbs__item:last-of-type span').innerHTML = `${data.bread_crumbs[1].title}`
        document.querySelector('.contacts-block .container').innerHTML = `
          <div class="page-title">
                  <h1 class="title">${data.category_info.h1_append}</h1>
                  ${data.category_info.description ? '<p>' + data.category_info.description + '</p>' : ''}
                </div>
                ${data.category_content.map((e) => {
                  let result = '';
                  if (e.title) {
                    result += `<h1>${e.title}</h1>`
                  }
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
