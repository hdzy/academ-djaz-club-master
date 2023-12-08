function startLoad() {
  document.querySelector('.loader-wrapper').style = 'display: flex';
}

function endLoad() {
  document.querySelector('.loader-wrapper').style = 'display: none';
}

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
        let content = data.category_content[1].content;
        var p = document.createElement('p');
        p.innerHTML = content;
          p.removeChild(p.querySelector('a.pn-button'));
          p.removeChild(p.querySelector('a.pn-button'));
        document.querySelector('.page-title .title').innerHTML = `${data.category_info.h1}`;
          document.querySelectorAll('.gift-intro-banner__button a')[0].removeAttribute('href');

          document.querySelectorAll('.gift-intro-banner__button a')[0].setAttribute('data-unifd-performance-id', `116`)
          document.querySelectorAll('.gift-intro-banner__button a')[0].classList.add('js-unifd-trigger-link')

          document.querySelectorAll('.gift-intro-banner__button a')[1].setAttribute('data-unifd-performance-id', `116`)
          document.querySelectorAll('.gift-intro-banner__button a')[1].classList.add('js-unifd-trigger-link')


          document.querySelectorAll('.gift-intro-banner__button a')[1].removeAttribute('href');
         document.querySelector('.gift-intro-banner__text .text-content').innerHTML = `<p>${p.outerHTML.replaceAll('\n', '<br>')}</p>`;
      }
      );
  endLoad();
}

// document.addEventListener('DOMContentLoaded', () => {
//   setInterval(() => {
//     function gift() {
//       document.querySelectorAll('.gift-intro-banner__button .btn').forEach((e) => e.addEventListener('click', (e) => {
//         document.body.innerHTML += `
//         <div class="unifd">
//             <div class="unifd__in">
//                 <iframe src="https://pankova.edinoepole.ru/api/v1/pages/default_landing_page?unifd-performance-id=116/" frameborder="no" scrolling="no" class="unifd__frame" ,=""  data-gtm-yt-inspected-8399948_38="true" data-gtm-yt-inspected-14="true" style="height: 700px;">
//                 </iframe>
//                 <a style="cursor: pointer" onclick="document.body.removeChild(document.querySelector('.unifd'))" class="js-unifd-close unifd__close">X</a>
//             </div>
//         </div>`
//       }));
//     }
//     gift();
//
//
//   }, 2000)
// })



loadData();
