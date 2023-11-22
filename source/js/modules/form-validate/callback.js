// Коллбэки, которые будут выполнены, после нажатия на кнопку submit.

const baseSuccessCallback = (event) => {
  event.preventDefault();
  // В данном колбеке бэкендер, либо разработчик при необходимости будет писать запрос на отправку формы на сервер и обрабатывать возможные ошибки или успешную отправку формы на сервер
};

const baseErrorCallback = (event) => {
  event.preventDefault();
  // Данный коллбек используется при необходимости выполнить какое-либо действие помимо показа ошибок при попытке отправить неккорректные данные, он не связан с запросами на сервер
};


const searchSuccessCallback = () => {};

const searchErrorCallback = (event) => {
  event.preventDefault();
};

export const callbacks = {
  base: {
    // Сбросс формы
    reset: true,
    // Таймаут сброса формы
    resetTimeout: 500,
    successCallback: baseSuccessCallback,
    errorCallback: baseErrorCallback,
  },
  search: {
    reset: true,
    resetTimeout: 500,
    successCallback: searchSuccessCallback,
    errorCallback: searchErrorCallback,
  },
};
