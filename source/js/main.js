import {iosVhFix} from './utils/ios-vh-fix';
import {initModals} from './modules/modals/init-modals';
import {Form} from './modules/form-validate/form';
import {initAccordions} from './modules/accordion/init-accordion';
import {initHeader} from './modules/header/init-header';
import {initSliderPhotos} from './modules/init-slider-photos';
import {initMaps} from './modules/init-maps';
import {initDynamicAdaptive} from './utils/dynamic-adaptive/init-dynamic-adaptive';
import {initYoutube} from './modules/init-youtube.js';
import {fixTransition} from './utils/fix-transition';

// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {

  // Utils
  // ---------------------------------

  // Исправляет проблемы с vh на iOS
  iosVhFix();
  // Переносит элементы из одних компонентов в другие
  initDynamicAdaptive();
  // Исправляет блики из-за transition при ресайзе
  fixTransition();

  // Modules
  // ---------------------------------

  // Инициализирует скрипты header
  initHeader();
  // инициализирует аккордеон в header и на страницах меню (планшет, моб)
  initAccordions();
  // инициализирует слайдер с фото на странице фотоотчета
  initSliderPhotos();

  // все скрипты должны быть в обработчике 'DOMContentLoaded', но не все в 'load'
  // в load следует добавить скрипты, не участвующие в работе первого экрана
  window.addEventListener('load', () => {
    // Инициализирует модальные окна.
    // В проекте форма поиска на адаптиве реализована с помощью модального окна
    initModals();
    // Инициализирует формы и их валидацию
    const form = new Form();
    window.form = form;
    form.init();
    // инициализирует все карты (yandex map)
    initMaps();
    // слушает клик на массиве кнопок включения видео
    initYoutube();
  });
});
