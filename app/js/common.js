import * as constants from 'constants';


$(document).ready(function() {
    
    // Настройки галерей fancybox
    $.fancybox.defaults.lang = "ru";
    $.fancybox.defaults.i18n = {
        ru: {
            CLOSE: "Закрыть",
            NEXT: "Далее",
            PREV: "Назад",
            ERROR: "Контент не может быть загружен. <br/> Попробуйте позже.",
            PLAY_START: "Слайдшоу",
            PLAY_STOP: "Остановить слайдшоу",
            FULL_SCREEN: "На весь экран",
            THUMBS: "Превью",
            DOWNLOAD: "Скачать",
            SHARE: "Поделиться",
            ZOOM: "Увеличить"
        }
    };
    $.fancybox.defaults.buttons = [
        "slideShow",
        "thumbs",
        "close",
        // "zoom",
        //"fullScreen",
        //"share",
    ];
    
    
    // Маска для инпутов телефона (js_phone-input)
    $('.js_phone-field').mask('+7 (000) 000-00-00');
});

