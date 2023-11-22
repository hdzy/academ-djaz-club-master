/* eslint-disable */
function loadData() {

  const req_body = {
    id: 215,
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

        document.querySelector('.video-block .grid').innerHTML = `${data.category_content.map((e) => {
          return `<div class="video-card">${e.content}</div>`
        }).join('')}`;
      }
    );
}


loadData();
