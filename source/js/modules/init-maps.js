const initMaps = () => {
  const mapElements = document.querySelectorAll('[data-map]');

  // Для каждого элемента с data-аттрибутом map создаем экземпляр карты.
  for (let element of mapElements) {
    const id = element.id;
    const zoom = element.dataset.zoom;
    const centerData = element.dataset.center.split(', ');
    const pin = element.dataset.pin.split(', ');
    const balloonHeader = element.dataset.balloonHeader;
    const balloonBody = element.dataset.balloonBody;
    const balloonFooter = element.dataset.balloonFooter;

    // Дождёмся загрузки API и готовности DOM.
    // eslint-disable-next-line no-undef
    ymaps.ready(() => {
      // Создание экземпляра карты и его привязка к контейнеру с заданным id ("map").
      // eslint-disable-next-line no-undef
      let map = new ymaps.Map(id, {
        // Географические координаты центра отображаемой карты.
        center: centerData,
        // Масштаб.
        zoom,
      });

      // Создание геообъекта - метки.
      // eslint-disable-next-line no-undef
      let placemark = new ymaps.Placemark(pin, {
        // Задаем содержимое балуна метки.
        balloonContentHeader: balloonHeader,
        balloonContentBody: balloonBody,
        balloonContentFooter: balloonFooter,
      }, {
        // Задаем стиль метки (метка в виде круга).
        preset: 'islands#blackLeisureIcon',
        // Задаем цвет метки (в формате RGB).
        iconColor: '#000000',
        // Запретим замену обычного балуна на балун-панель.
        balloonPanelMaxMapArea: 0,
        // Не скрываем иконку при открытом балуне.
        hideIconOnBalloonOpen: false,
        // И дополнительно смещаем балун, для открытия над иконкой.
        balloonOffset: [3, -40],
      });

      // Размещение геообъекта на карте.
      map.geoObjects.add(placemark);

      // Открываем балун на карте.
      placemark.balloon.open();
    });
  }
};

export {initMaps};
