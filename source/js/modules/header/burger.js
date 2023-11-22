import scrollLock from 'scroll-lock';
import {FocusLock} from '../../utils/focus-lock';

// Реализует методы, которые оживляют бургер-меню.
export class Burger {
  constructor() {
    this._header = document.querySelector('[data-header]');
    this._burger = document.querySelector('[data-burger]');

    this._scrollLock = scrollLock;
    this._focusLock = new FocusLock();
    this._isMenuOpen = false;

    this._onBurgerClick = this._onBurgerClick.bind(this);
    this._onDocumentKeydown = this._onDocumentKeydown.bind(this);
    this._onDocumentClick = this._onDocumentClick.bind(this);
    this._onWindowResize = this._onWindowResize.bind(this);
  }

  init() {
    if (!this._burger) {
      return;
    }

    this._burger.addEventListener('click', this._onBurgerClick);
    window.addEventListener('resize', this._onWindowResize);
  }

  _openMenu() {
    this._isMenuOpen = true;
    this._header.classList.add('is-open');
    this._scrollLock.disablePageScroll();
    this._scrollLock.addFillGapSelector('[data-nav-wrapper]');
    this._focusLock.lock('[data-nav]');
    document.addEventListener('keydown', this._onDocumentKeydown);
    document.addEventListener('click', this._onDocumentClick);
    if (window.ls) {
      window.ls.stop();
    }
  }

  _closeMenu() {
    this._isMenuOpen = false;
    this._header.classList.remove('is-open');
    this._scrollLock.enablePageScroll();
    this._scrollLock.removeFillGapSelector('[data-nav-wrapper]');
    this._focusLock.unlock('[data-nav]');
    document.removeEventListener('keydown', this._onDocumentKeydown);
    document.removeEventListener('click', this._onDocumentClick);
    if (window.ls) {
      window.ls.start();
    }
  }

  _onBurgerClick() {
    if (this._isMenuOpen) {
      this._closeMenu();
    } else {
      this._openMenu();
    }
  }

  _onDocumentKeydown(evt) {
    if (evt.key === 'Escape') {
      this._closeMenu();
    }
  }

  _onDocumentClick(evt) {
    if (evt.target.hasAttribute('data-close-menu')) {
      this._closeMenu();
    }
  }

  _onWindowResize() {
    const isDesktop = window.matchMedia('(min-width: 768px)').matches;

    if (isDesktop && this._isMenuOpen) {
      this._closeMenu();
    }
  }
}
