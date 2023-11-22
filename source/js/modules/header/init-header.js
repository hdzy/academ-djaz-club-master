import {Burger} from './burger';
import {StickyHeader} from './sticky-header';
import {NavAccordion} from './nav-accordion';
import {SearchForm} from './search-form';
import {ModalSearch} from './modal-search';

// Инициализирует скрипты header.
const initHeader = () => {
  // Реализует методы, которые оживляют бургер-меню.
  const burger = new Burger();
  burger.init();

  // Реализует методы, которые отвечает за прилипающий header,
  // а также за возможность менять темы оформления шапки.
  const stickyHeader = new StickyHeader();
  stickyHeader.init();

  // Закрывает аккордеон при клике вне его, скролле и ресайзе.
  // Исправляет навигацию по аккордеону с помощью таба.
  const navAccordion = new NavAccordion();
  navAccordion.init();

  // Сбрасывает валидацию у формы поиска при клике вне её и скролле.
  const searchForm = new SearchForm();
  searchForm.init();

  // Закрывает модальное окно с поиском при ресайзе с адаптива на десктоп.
  // На десктопе блокирует кнопку открытия модального окна.
  const modalSearch = new ModalSearch();
  modalSearch.init();
};

export {initHeader};
