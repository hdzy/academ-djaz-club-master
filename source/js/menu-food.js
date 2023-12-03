function startLoad() {
  document.querySelector('.loader-wrapper').style = 'display: flex';
}

function endLoad() {
  document.querySelector('.loader-wrapper').style = 'display: none';
}

function loadData() {
  startLoad();
  const req_body = {
    id: 204,
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
        content = data.category_content.filter(e => e.title);
        content = content.map((e) => {
          let div = document.createElement('div');
          div.innerHTML = e.content;
          return {
            title: e.title,
            content: [[...div.querySelectorAll('td')].map((e) => e.innerHTML).filter((e, index) => index == 0 || index % 3 == 0), [...div.querySelectorAll('td')].map((e) => e.innerHTML).filter((e, index) => index == 2 || index % 3 == 2)]
          }
        })
        let col_item_amount = content.length / 2;
        result = content.map((e, index) => {
            return `
                        <div class="menu__item" data-accordion="element">
                            <div class="menu-title" data-accordion="button">
                                <h2 class="title title--h3 title--pink menu-title__title">${e.title}</h2>
                            </div>
                            <div class="menu__wrapper" data-accordion="content" style="max-height: 100%;">
                                <div class="menu__group">
                                ${e.content[0].map((el, index) => {
                                  if (el) {
                                    return `
                                      <div class="menu-item">
                                        <div class="menu-item__wrapper">
                                            <h3 class="title title--h3 title--no-text-transform">${el}</h3>
                                            <div class="menu-item__price">
                                                 <p class="price price--bold">${e.content[1][index]}</p>
                                            </div>
                                        </div>
                                    </div>
                                        `
                                  } else return '';
            }                    ).join('')}
                                  </div>
                                 </div>
                                 </div>
                                    `;
        });

       document.querySelector('.menu').innerHTML = `
         <div class="menu-col">
           ${result.slice(0, result.length / 2).join('')}
         </div>
         <div class="menu-col">
           ${result.slice(result.length / 2).join('')}
         </div>
        `;
          endLoad();

      }
      );
}


loadData();
