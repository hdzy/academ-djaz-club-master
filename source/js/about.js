function startLoad() {
  document.querySelector('.loader-wrapper').style = 'display: flex';
}

function endLoad() {
  document.querySelector('.loader-wrapper').style = 'display: none';
}


function loadData() {
  startLoad();
  const req_body = {
    id: 11,
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
        const div = document.createElement('div');
        div.innerHTML = data.category_content[1].content;

        document.querySelector('.video-card__img').innerHTML = ``;
        document.querySelector('.video-card__img').appendChild(div.querySelector('iframe'));
        document.querySelector('.address p').innerHTML = data.category_content[1].content.replaceAll('\n', '<br>');
        document.querySelector('.address p').removeChild(document.querySelector('.address p').querySelector('iframe'))
        document.querySelector('.text-content').style = 'display: inline';
        document.querySelector('.text-content').innerHTML = data.category_content[0].content.replaceAll('\n', '<br>');

  //       document.querySelector('.about-block .container').innerHTML = `
  //       <div class="page-title">
  //                 <h1 class="title">${data.category_info.h1}</h1>
  //               </div>
  //               ${data.category_content.map((e) => {
  //   if (e.title) {
  //     return `
  //                   <h1>${e.title}</h1>
  //                   <p>${e.content.replaceAll("<iframe", "<br><iframe")}</p>
  //                   `;
  //   } else {
  //     return `<p>${e.content}</p>`;
  //   }
  // }).join('')}
  //       `;
      }
      );
  endLoad();
}


loadData();
