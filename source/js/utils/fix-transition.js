// Добавляет класс 'no-transition' при ресайзе.
const removeTransition = (element) => {
  const classes = element.classList;
  let timer;

  if (timer) {
    clearTimeout(timer);
  } else {
    classes.add('no-transition');
  }

  timer = setTimeout(() => {
    classes.remove('no-transition');
    clearTimeout(timer);
  }, 1000);
};

// Исправляет блики по transition при ресайзе.
const fixTransition = () => {
  const elements = document.querySelectorAll('[data-fix-transition]');

  if (!elements) {
    return;
  }

  window.addEventListener('resize', () => {
    elements.forEach(removeTransition);
  });
};

export {fixTransition};
