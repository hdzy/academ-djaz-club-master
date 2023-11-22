// Реализует методы, которые отвечает за прилипающий header и смену тем оформления.

export class StickyHeader {
  constructor() {
    this._main = document.querySelector('main');
    this._stickyHeader = document.querySelector('[data-header="sticky"]');
    this._hidePoint = this._stickyHeader ? +this._stickyHeader.dataset.hidePoint : 0;

    this._themeItems = document.querySelectorAll('[data-header-theme-class]');
    this._activeTheme = null;

    this._scrollY = null;
    this._prevScrollY = null;

    this._isHidden = false;

    this._onWindowResize = this._onWindowResize.bind(this);
    this._onWindowScroll = this._onWindowScroll.bind(this);
    this._onLocomotiveScroll = this._onLocomotiveScroll.bind(this);
  }

  init() {
    if (!this._stickyHeader) {
      return;
    }

    this._setMainOffset();
    this._checkTheme();

    if (window.ls) {
      window.ls.on('scroll', this._onLocomotiveScroll);
      return;
    }

    window.addEventListener('scroll', this._onWindowScroll);
    window.addEventListener('resize', this._onWindowResize);
  }

  _setMainOffset() {
    const headerHeight = this._stickyHeader.offsetHeight;
    const mainStyle = window.getComputedStyle(this._main, null);
    const mainOffset = parseInt(mainStyle.paddingTop, 10);

    if (headerHeight !== mainOffset) {
      this._main.style.paddingTop = `${headerHeight}px`;
    }
  }

  _hideHeader() {
    if (!this._isHidden) {
      this._isHidden = true;
      this._stickyHeader.classList.add('is-hidden');
    }
  }

  _showHeader() {
    if (this._isHidden) {
      this._isHidden = false;
      this._stickyHeader.classList.remove('is-hidden');
    }
  }

  _checkScrollDirection() {
    if (this._scrollY > this._prevScrollY) {
      return 'down';
    }
    return 'up';
  }

  _onLocomotiveScroll(evt) {
    this._checkTheme();

    if (evt.direction === 'down' && evt.delta.y > this._hidePoint) {
      this._hideHeader();
    }

    if (evt.direction === 'up' || evt.delta.y <= this._hidePoint) {
      this._showHeader();
    }
  }

  _onWindowScroll() {
    this._scrollY = document.documentElement.scrollTop;
    this._checkTheme();

    if (this._checkScrollDirection() === 'down' && this._scrollY > this._hidePoint) {
      this._hideHeader();
    }

    if (this._checkScrollDirection() === 'up' || this._scrollY <= this._hidePoint) {
      this._showHeader();
    }

    this._prevScrollY = this._scrollY;
  }

  _onWindowResize() {
    this._setMainOffset();
  }

  _checkTheme() {
    this._themeItems.forEach((item) => {
      if (item.getBoundingClientRect().top <= 0 && item.getBoundingClientRect().height + item.getBoundingClientRect().top > 0) {
        if (this._activeTheme === item.dataset.headerThemeClass) {
          return;
        }
        this._stickyHeader.classList.remove(this._activeTheme);
        this._activeTheme = item.dataset.headerThemeClass;
        this._stickyHeader.classList.add(this._activeTheme);
      }
    });
  }
}
