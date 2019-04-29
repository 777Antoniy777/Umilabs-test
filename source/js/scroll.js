'use strict';
(function () {
  // константы
  // высота окна
  var HEIGHT_WINDOW = document.documentElement.clientHeight / 2;

  var scrollButton = document.querySelector('.offers__add-button');
  var news = document.querySelector('.news');

  // функция скролла до след. блока
  var scrollButtonClickHandler = function () {
    scrollButton.addEventListener('click', function (evt) {
      var isCoord = news.getBoundingClientRect().top + (news.getBoundingClientRect().height / 2) > HEIGHT_WINDOW;
      var coord = news.getBoundingClientRect().top + (news.getBoundingClientRect().height / 2) + pageYOffset - HEIGHT_WINDOW;
      evt.preventDefault();

      if (isCoord) {
        // реализация с помощью полифилла для IE 9+ и Safari 6+
        window.scroll({
          top: coord,
          left: 0,
          behavior: 'smooth'
        });
      }
    });
  };

  scrollButtonClickHandler();
})();
