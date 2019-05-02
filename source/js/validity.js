'use strict';
(function () {
  var Length = {
    NAME_MIN_LENGTH: 2,
    EMAIL_MIN_LENGTH: 5
  };

  var Keycode = {
    CODE_BUTTON_ESC: 27
  };

  // отправка данных на сервер
  var body = document.querySelector('body');
  var template = document.querySelector('#popup-message').content;
  var templateWrapper = template.querySelector('.popup');
  var templateDescription = templateWrapper.querySelector('.popup-description');

  // валидация текстовых инпутов в окне фильтра
  var form = document.querySelector('.form__wrapper');
  var nameInput = form.querySelector('input[name="name"]');
  var emailInput = form.querySelector('input[name="email"]');
  var phoneInput = form.querySelector('input[name="phone"]');
  var commentInput = form.querySelector('textarea[name="work"]');

  // проверка всех полей в форме
  // поле имени
  var checkNameInput = function () {
    nameInput.addEventListener('input', function (evt) {
      var target = evt.target;

      target.setCustomValidity('');

      if (!target.value) {
        target.setCustomValidity('Введите имя и фамилию');
        nameInput.style.outline = '2px solid red';
      } else if (target.value.length < Length.NAME_MIN_LENGTH) {
        target.setCustomValidity('Имя слишком короткое');
        nameInput.style.outline = '2px solid red';
      } else {
        target.setCustomValidity('');
        nameInput.style.outline = 'none';
      }
    });
  };

  checkNameInput();

  // поле email
  var checkEmailInput = function () {
    emailInput.addEventListener('input', function (evt) {
      var target = evt.target;

      var regexp = /^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/;
      var matches = target.value.search(regexp);

      target.setCustomValidity('');

      if (!target.value) {
        target.setCustomValidity('Введите почту');
        emailInput.style.outline = '2px solid red';
      } else if (target.value.length < Length.EMAIL_MIN_LENGTH) {
        target.setCustomValidity('Почта слишком короткая');
        emailInput.style.outline = '2px solid red';
      } else if (matches) {
        target.setCustomValidity('Введите корректный email');
        emailInput.style.outline = '2px solid red';
      } else {
        target.setCustomValidity('');
        emailInput.style.outline = 'none';
      }
    });
  };

  checkEmailInput();

  // поле телефона
  var checkPhoneInput = function () {
    phoneInput.addEventListener('input', function (evt) {
      var target = evt.target;

      var regexp = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/ ;
      var matches = target.value.search(regexp);

      target.setCustomValidity('');

      if (!target.value) {
        target.setCustomValidity('Введите номер телефона');
        phoneInput.style.outline = '2px solid red';
      } else if (matches) {
        target.setCustomValidity('Введите корректный номер телефона');
        phoneInput.style.outline = '2px solid red';
      } else {
        target.setCustomValidity('');
        phoneInput.style.outline = 'none';
      }
    });
  };

  checkPhoneInput();

  // поле комментария
  var checkCommentInput = function () {
    commentInput.addEventListener('input', function (evt) {
      var target = evt.target;
      target.maxLength = 600;

      target.setCustomValidity('');

      if (!target.value) {
        target.setCustomValidity('Введите текст');
        commentInput.style.outline = '2px solid red';
      } else {
        target.setCustomValidity('');
        commentInput.style.outline = 'none';
      }
    });
  };

  checkCommentInput();

  // валидация при отправке формы без каких либо значений
  var checkEmptyInput = function () {
    if (!nameInput.value) {
      nameInput.setCustomValidity('Введите имя и фамилию');
      nameInput.style.outline = '2px solid red';
    } else if (!emailInput.value) {
      emailInput.setCustomValidity('Введите корректный email');
      emailInput.style.outline = '2px solid red';
    } else if (!phoneInput.value) {
      phoneInput.setCustomValidity('Введите корректный номер телефона');
      phoneInput.style.outline = '2px solid red';
    } else if (!commentInput.value) {
      commentInput.setCustomValidity('Введите текст');
      commentInput.style.outline = '2px solid red';
    } else {
      nameInput.setCustomValidity('');
      nameInput.style.outline = 'none';
      emailInput.setCustomValidity('');
      emailInput.style.outline = 'none';
      phoneInput.setCustomValidity('');
      phoneInput.style.outline = 'none';
      commentInput.setCustomValidity('');
      commentInput.style.outline = 'none';
    }
  }

  var onLoad = function (data) {
    body.appendChild(template);
    templateDescription.textContent = 'Ваши данные успешно отправлены!';
  };

  var onError = function (error) {
    body.appendChild(template);
    templateDescription.textContent = 'Что-то пошло не так! Повторите отправку данных позже';
  };

  // обработчики на скрытие попапа
  // click
  var isClickEvent = function () {
    templateWrapper.style.display = 'none';
    window.removeEventListener('click', isClickEvent);
  }

  // ESC
  var isEscEvent = function (evt) {
    if (evt.keyCode === Keycode.CODE_BUTTON_ESC) {
      templateWrapper.style.display = 'none';
      window.removeEventListener('keydown', isEscEvent);
    }
  }

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    checkEmptyInput();

    if (nameInput.value && emailInput.value && phoneInput.value && commentInput.value) {
      templateWrapper.style.display = 'block';
      window.backend.save(new FormData(form), onLoad, onError);

      nameInput.value = '';
      emailInput.value = '';
      phoneInput.value = '';
      commentInput.value = '';

      window.addEventListener('click', isClickEvent);
      window.addEventListener('keydown', isEscEvent);
    }
  });
})();
