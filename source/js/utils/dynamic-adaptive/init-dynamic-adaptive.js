import {DynamicAdaptive} from './dynamic-adaptive';

// Инициализирует перенос компонентов и задает первоначальные настройки.
const initDynamicAdaptive = () => {
  const dynamicAdaptive = new DynamicAdaptive('max');
  dynamicAdaptive.init();
};

export {initDynamicAdaptive};
