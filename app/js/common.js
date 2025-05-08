import { Fancybox } from '@fancyapps/ui';

document.addEventListener('DOMContentLoaded', function(event) {
  if (Fancybox) {
    Fancybox.bind('[data-fancybox]', {
      Toolbar: {
        display: {
          left: [ 'infobar' ],
          middle: [],
          right: [ 'iterateZoom', 'close' ]
        }
      }
    });
  };

  if (WOW) {
    new WOW().init();
  };

  // Находим кнопку скролла
  const scrollButton = document.querySelector('.js_ads_scroller_btn');

  // Проверяем, существует ли кнопка на странице
  if (scrollButton) {
    // Добавляем обработчик события клика
    scrollButton.addEventListener('click', function(e) {
      e.preventDefault();

      // Находим целевую секцию
      const targetSection = document.querySelector('.js_ads_section');

      // Проверяем, существует ли целевая секция
      if (targetSection) {
        // Получаем позицию секции относительно верха страницы
        const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset;

        // Выполняем плавный скролл
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  }
});

