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

        document.querySelector('.about-block .container').innerHTML = `
        <div class="page-title">
                  <h1 class="title">${data.category_info.h1}</h1>
                </div>
                ${data.category_content.map((e) => {
    if (e.title) {
      return `
                    <h1>${e.title}</h1>
                    <p>${e.content}</p>
                    `;
    } else {
      return `<p>${e.content}</p>`;
    }
  }).join('')}
        `;
      }
      );
  endLoad();
}


loadData();
