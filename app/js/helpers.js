export function isInViewport(elem) {
  var bounding = elem.getBoundingClientRect();
  return (
    bounding.top >= 0 &&
    bounding.left >= 0 &&
    bounding.bottom <= window.innerHeight &&
    bounding.right <= window.innerWidth
  );
}

export function closeToViewport(elem) {
  var top_of_element = elem.offset().top;
  var bottom_of_element = elem.offset().top + elem.outerHeight();
  var bottom_of_screen = $(window).scrollTop() + $(window).innerHeight();
  var top_of_screen = $(window).scrollTop();
  return ((bottom_of_screen + 300 > top_of_element) && (top_of_screen - 300 < bottom_of_element));
}

export function declOfNum(number, titles) {
  var cases = [2, 0, 1, 1, 1, 2];
  return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
}

export function getBodyScrollTop() {
  return Math.max(
    window.pageYOffset,
    document.documentElement.scrollTop,
    document.body.scrollTop
  );
}

export function move($more, $less, size) {
  $(window).outerWidth() < size
    ? $more.children().appendTo($less)
    : $less.children().appendTo($more);
}
export function getBodyScrollLeft() {
  return Math.max(
    window.pageXOffset,
    document.documentElement.scrollLeft,
    document.body.scrollLeft
  );
}

export function addGalleryImgs(container) {
  container.children().each(function() {
    var el = $(this);
    if (!el.children("img").length > 0) {
      var img = $("<img />", {
        title: el.attr("title"),
        src: el.attr("href")
      });
      el.on("click", function(e) {
        e.preventDefault();
      });
      el.append(img);
    }
  });
}

let scrollTop;
export function lockBody() {
  var $docEl = $(document).find("html, body"),
    $wrap = $(document).find(".js-page");
  if (window.pageYOffset) {
    scrollTop = window.pageYOffset;

    $wrap.css({
      top: -scrollTop,
      position: "relative"
    });
  }

  $docEl.css({
    height: "100%",
    overflow: "hidden"
  });
}

export function unlockBody() {
  var $docEl = $(document).find("html, body"),
    $wrap = $(document).find(".js-page");
  $docEl.css({
    height: "",
    overflow: ""
  });

  $wrap.css({
    top: "",
    position: ""
  });

  window.scrollTo(0, scrollTop);
  window.setTimeout(function() {
    scrollTop = null;
  }, 0);
}

export function scrollToElement(trigger, element, speed, preventFlag) {
  $(trigger).click(function(event) {
    if (preventFlag == true) {
      event.preventDefault();
    }

    $('html, body').stop(true, true).animate({
      scrollTop: $(element).offset().top
    }, speed);

    return false;
  });
}

//отслеживаем добавление/удаление товара в корзине электронной коммерцией яндекса
export function ecommerce(id, actionType) {
    if (!id || !actionType)
        return false;
    $.getJSON('/include/ecommerce.php', { id: id }, function (response) {
        if (response.ID) {
            if (actionType == 'add') {
                dataLayer.push({
                    "ecommerce": {
                        "add": {
                            "products": [
                                {
                                    "id": response.ID,
                                    "name": response.NAME,
                                    "price": response.PRICE,
                                    "brand": response.MAKER,
                                    "category": response.SECTIONS,
                                    "quantity": response.QUANTITY
                                }
                            ]
                        }
                    }
                });
            }
            else if (actionType == 'remove') {
                dataLayer.push({
                    "ecommerce": {
                        "remove": {
                            "products": [
                                {
                                    "id": response.ID,
                                    "name": response.NAME,
                                    "price": response.PRICE,
                                    "brand": response.MAKER,
                                    "category": response.SECTIONS,
                                    "quantity": response.QUANTITY
                                }
                            ]
                        }
                    }
                });
            }
        }
    });
}

/**
 * Форматирование числа.
 * @param val - Значение для форматирования
 * @param thSep - Разделитель разрядов
 * @param dcSep - Десятичный разделитель
 * @returns string
 */
export function numeric_format(val, thSep, dcSep) {
    // Проверка указания разделителя разрядов
    if (!thSep) thSep = ' ';
    // Проверка указания десятичного разделителя
    if (!dcSep) dcSep = '.';
    var res = val.toString();
    var lZero = (val < 0); // Признак отрицательного числа
    // Определение длины форматируемой части
    var fLen = res.lastIndexOf('.'); // До десятичной точки
    fLen = (fLen > -1) ? fLen : res.length;
    // Выделение временного буфера
    var tmpRes = res.substring(fLen);
    var cnt = -1;
    for (var ind = fLen; ind > 0; ind--) {
        // Формируем временный буфер
        cnt++;
        if (((cnt % 3) === 0) && (ind !== fLen) && (!lZero || (ind > 1))) {
            tmpRes = thSep + tmpRes;
        }
        tmpRes = res.charAt(ind - 1) + tmpRes;
    }
    return tmpRes.replace('.', dcSep);
}

/**
 * Выбирает подходящую форму слова для количества (1 товар, 2 товара, 5 товаров)
 *
 * @param {int} value
 * @param {array} forms - Список с формами для 1, 2 и 5 объектов
 * @return {string}
 */
export function pluralForm(value, forms) {
    value = parseInt(value, 10);

    return value % 10 == 1 && value % 100 != 11
        ? forms[0]
        : (value % 10 >= 2 && value % 10 <= 4 && (value % 100 < 10 || value % 100 >= 20) ? forms[1] : forms[2]);
}

export function setCookie(name, value, path, options) {
    options = options || {};

    var expires = options.expires;

    if (typeof expires === 'number' && expires) {
        var d = new Date();
        d.setTime(d.getTime() + expires * 1000);
        expires = options.expires = d;
    }
    if (expires && expires.toUTCString) {
        options.expires = expires.toUTCString();
    }

    value = encodeURIComponent(value);

    var updatedCookie = name + '=' + value;

    if(path) {
        updatedCookie += '; ' + 'path=' + path;
    }

    for (var propName in options) {
        updatedCookie += '; ' + propName;
        var propValue = options[propName];
        if (propValue !== true) {
            updatedCookie += '=' + propValue;
        }
    }

    document.cookie = updatedCookie;
}

export function deleteCookie(name) {
    setCookie(name, '', '', {
        expires: -1
    });
}

export function getCookie(name) {
    var matches = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
