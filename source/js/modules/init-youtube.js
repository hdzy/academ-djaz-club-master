const buttons = document.querySelectorAll('[data-btn]');

// создает и помещает скрипты API в head
let tag = document.createElement('script');
tag.src = 'https://www.youtube.com/iframe_api';
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 4. The API will call this function when the video player is ready.
const onPlayerReady = (event) => {
  event.target.playVideo();
};


// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
// eslint-disable-next-line no-unused-vars
let player;
// ф-я создания фрейма Ютуб
const onYouTubeIframeAPIReady = (idVideo) => {
  player = new window.YT.Player(idVideo, {
    videoId: idVideo,
    playerVars: {
      'autoplay': 1,
      'playsinline': 1,
      'rel': 0,
    },
    events: {
      'onReady': onPlayerReady,
    },
  });
};

// слушает массив кнопок на клик, а при клике вызывает ф-ю onYouTubeIframeAPIReady для создания фрейма
const initYoutube = () => {
  buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      const idVideo = button.getAttribute('data-btn');
      onYouTubeIframeAPIReady(idVideo);
    });
  });
};

export {initYoutube};
