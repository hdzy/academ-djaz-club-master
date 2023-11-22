import {modals} from '../modals/init-modals';

// Закрывает модальное окно с поиском при ресайзе с адаптива на десктоп.
// На десктопе блокирует кнопку открытия модального окна.
export class ModalSearch {
  constructor() {
    this.modalSearch = document.querySelector('[data-modal="search"]');
    this.modalToggle = document.querySelector('[data-open-modal="search"]');

    this.vp1280 = window.matchMedia('(min-width: 1280px)');

    this.onWindowResize = this.onWindowResize.bind(this);
  }

  // Инициализирует экземпляр.
  init() {
    if (!this.modalSearch) {
      return;
    }

    this.disableModalToggle();

    window.addEventListener('resize', this.onWindowResize);
  }

  // Закрывает модальное окно.
  closeModalSearch() {
    const isDesktop = this.vp1280.matches;
    const isOpen = this.modalSearch.classList.contains('is-active');

    if (isDesktop && isOpen) {
      // !Закрывает модальное окно с помощью интерфеиса Modals.
      modals.close('search');
    }
  }

  // Блокирует кнопку открытия модального окна.
  disableModalToggle() {
    this.modalToggle.disabled = this.vp1280.matches;
  }

  // Обрабатывает событие ресайз.
  onWindowResize() {
    this.closeModalSearch();
    this.disableModalToggle();
  }
}
