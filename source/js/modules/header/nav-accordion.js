import {accordions} from '../accordion/init-accordion';

// Закрывает аккордеон при клике вне его, скролле и ресайзе.
// Исправляет навигацию по аккордеону с помощью таба.
export class NavAccordion {
  constructor() {
    this.container = document.querySelector('[data-nav-accordion]');

    this.onDocumentClick = this.onDocumentClick.bind(this);
    this.onWindowScroll = this.onWindowScroll.bind(this);
    this.onWindowResize = this.onWindowResize.bind(this);
  }

  // Инициализирует экземпляр.
  init() {
    if (!this.container) {
      return;
    }

    document.addEventListener('click', this.onDocumentClick);
    window.addEventListener('resize', this.onWindowResize);
  }

  // Закрывает аккордеон.
  closeAccordion() {
    const accordionParent = this.container.querySelector('[data-accordion="parent"]');
    const elements = [...accordionParent.querySelectorAll('[data-accordion="element"]')];

    const isOpened = elements.some((item) => item.classList.contains('is-active'));

    if (!isOpened) {
      return;
    }

    const activeAccordion = elements.find((item) => item.classList.contains('is-active'));

    this.toggleTabIndex(activeAccordion);
    this.resetScroll();
    // !Закрывает аккордеон с помощью интерфеиса Accordions.
    accordions.closeAllAccordion(accordionParent);
    window.removeEventListener('scroll', this.onWindowScroll);
  }

  // Убирает tabindex у элементов, если аккордеон закрыт.
  toggleTabIndex(target) {
    const element = target.closest('[data-accordion="element"]');
    const links = element.querySelectorAll('.nav__link--sublink:not(.nav__link--current)');

    if (!element.classList.contains('is-active')) {
      links.forEach((item) => item.setAttribute('tabindex', '0'));
    } else {
      links.forEach((item) => item.setAttribute('tabindex', '-1'));
    }
  }

  resetScroll() {
    const accordionWrapper = this.container.querySelector('[data-accordion="wrapper"]');
    accordionWrapper.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  // Обрабатывает событие клик.
  onDocumentClick(event) {
    const target = event.target;
    const isAccordion = target.closest('[data-nav-accordion]');
    const isButton = target.closest('[data-accordion="button"]');

    if (!isAccordion) {
      this.closeAccordion();
    }

    if (isButton) {
      this.toggleTabIndex(target);
      window.addEventListener('scroll', this.onWindowScroll);
    }
  }

  // Обрабатывает событие скролл.
  onWindowScroll() {
    this.closeAccordion();
  }

  // Обрабатывает событие ресайз.
  onWindowResize() {
    this.closeAccordion();
  }
}
