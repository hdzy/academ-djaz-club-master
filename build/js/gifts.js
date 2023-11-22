function loadData() {
  startLoad();
  document.body.innerHTML += `<style>.pn-button {display: : none;}</style>`;

  const req_body = {
    id: 207,
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
        let content = data.category_content[1].content;
        var p = document.createElement('p');
        const href_f = p.querySelector('a.pn-button').href;
        const href_s = p.querySelectorAll('a.pn-button')[1].href;
        document.querySelector('.page-title .title').innerHTML = `${data.category_info.h1}`;
          document.querySelectorAll('.gift-intro-banner__button a')[0].href = href_f;
          document.querySelectorAll('.gift-intro-banner__button a')[1].href = href_s;
         document.querySelector('.gift-intro-banner__text .text-content').innerHTML = `<p>${content.replaceAll('\n', '<br>').replaceAll(p.querySelector('a.pn-button').outerHTML + '', '')}</p>`;
      }
      );
  endLoad();
}


loadData();
