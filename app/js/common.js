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
  }
});

