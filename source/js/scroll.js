'use strict';
(function () {
  // константы
  // высота окна
  var HEIGHT_WINDOW = document.documentElement.clientHeight / 2;

  var scrollLink = document.querySelector('.main-header__link');
  var form = document.querySelector('.form');

  // функция скролла до след. блока
  var scrollButtonClickHandler = function () {
    scrollLink .addEventListener('click', function (evt) {
      var isCoord = form.getBoundingClientRect().top + (form.getBoundingClientRect().height / 2) > HEIGHT_WINDOW;
      var coord = form.getBoundingClientRect().top + (form.getBoundingClientRect().height / 2) + pageYOffset - HEIGHT_WINDOW;
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
