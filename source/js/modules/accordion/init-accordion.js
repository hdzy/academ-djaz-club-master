import {Accordions} from './accordions';
let accordions;

// Инициализирует Аккордеоны во всем проекте.
const initAccordions = () => {
  accordions = new Accordions();
  // Используйте в разработке экспортируемую переменную accordions, window сделан для бэкэнда
  window.accordions = accordions;
};

export {initAccordions, accordions};
