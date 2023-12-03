function startLoad() {
  document.querySelector('.loader-wrapper').style = 'display: flex';
}

function endLoad() {
  document.querySelector('.loader-wrapper').style = 'display: none';
}

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
        document.querySelector('.reviews-block a').href = `https://www.tripadvisor.ru/Attraction_Review-g298484-d16669086-Reviews-Academ_Jazz_Club-Moscow_Central_Russia.html`
        document.querySelector('.video-block .grid').innerHTML = `${data.category_content.map((e) => {
          return `<div class="video-card">${e.content}</div>`
        }).join('')}`;
      endLoad();
      }
    );
}


loadData();
