export const screenXsMin = 480;
export const screenSmMin = 576;
export const screenMdMin = 768;
export const screenLgMin = 992;
export const screenXlMin = 1200;
export const screenMsMax = screenXsMin - 1;
export const screenXsMax = screenSmMin - 1;
export const screenSmMax = screenMdMin - 1;
export const screenMdMax = screenLgMin - 1;
export const screenLgMax = screenXlMin - 1;

export const mobileBrowser = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

export const formValidateSettings = {
    // Classes & IDs
    fieldClass: 'form__field-error', // Applied to fields with errors
    errorClass: 'form__error-message', // Applied to the error message for invalid fields
    fieldPrefix: 'validated_', // If a field doesn't have a name or ID, one is generated with this prefix
    errorPrefix: 'validated-error_', // Prefix used for error message IDs
    messageAfterField: true, // If true, displays error message below field. If false, displays it above.

    patterns: {
        tel: /^((8|\+374|\+994|\+995|\+375|\+7|\+380|\+38|\+996|\+998|\+993)[\- ]?)?\(?\d{3,5}\)?[\- ]?\d{1}[\- ]?\d{1}[\- ]?\d{1}[\- ]?\d{1}[\- ]?\d{1}(([\- ]?\d{1})?[\- ]?\d{1})?$/
    },

    // Error messages by error type
    messages: {
        missingValue: {
            checkbox: 'Это поле обязательно',
            radio: 'Выберите значение',
            select: 'Выберите значение',
            'select-multiple': 'Выберите хотя бы одно значение',
            tel: 'Пожалуйста, введите телефон',
            email: 'Пожалуйста, введите email',
            default: 'Пожалуйста, заполните это поле.'
        },
        patternMismatch: {
            email: 'Пожалуйста, введите правильный email-адрес',
            url: 'Пожалуйста, введите правильную ссылку',
            number: 'Пожалуйста, введите правильный номер',
            tel: 'Пожалуйста, введите правильный телефон',
            color: 'Пожалуйста, введите цвет в формате #00ffff',
            date: 'Введите дату в формате ГГГГ-ММ-ДД',
            time: 'Введите время в 24-часовом формате. Например, 23:00',
            month: 'Введите дату в формате ГГГГ-ММ',
            default: 'Пожалуйста, введите правильное значение'
        },
        outOfRange: {
            over: 'Выберите значение не больше, чем {max}.',
            under: 'Выберите значение не меньше, чем {min}.'
        },
        wrongLength: {
            over: 'Пожалуйста, сократите текст до {maxLength} символов. Использовано {length} символов.',
            under: 'Пожалуйста, введите текст, длиной не менее {minLength} символов или более. Использовано {length} символов'
        }
    },
};
