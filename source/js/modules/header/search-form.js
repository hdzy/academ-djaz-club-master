// Сбрасывает валидацию у формы поиска при клике вне её и скролле.
export class SearchForm {
  constructor() {
    this.searchForm = document.querySelector('[data-search-form]');

    this.onDocumentClick = this.onDocumentClick.bind(this);
    this.onWindowScroll = this.onWindowScroll.bind(this);
  }

  // Инициализирует экземпляр.
  init() {
    if (!this.searchForm) {
      return;
    }

    document.addEventListener('click', this.onDocumentClick);
  }

  // Сбрасывает валидацию.
  resetValidation() {
    const customInput = this.searchForm.querySelector('[data-search-form="input"]');
    const input = customInput.querySelector('input');

    const isInvalid = customInput.classList.contains('is-invalid');

    if (isInvalid) {
      customInput.classList.remove('is-invalid');
      input.removeAttribute('aria-invalid');
    }

    window.removeEventListener('scroll', this.onWindowScroll);
  }

  // Обрабатывает событие клик.
  onDocumentClick(event) {
    const isForm = event.target.closest('[data-search-form]');
    const isButton = event.target.closest('[data-search-form="button"]');

    if (!isForm) {
      this.resetValidation();
    }

    if (isButton) {
      window.addEventListener('scroll', this.onWindowScroll);
    }
  }

  // Обрабатывает событие скролл.
  onWindowScroll() {
    this.resetValidation();
  }
}
