'use strict';

// Генератор файлов компонента
// Использование: node createComponent.js [имя блока] [доп. расширения через пробел]

const fs = require('fs');
const mkdirp = require('mkdirp');
const blockName = process.argv[2]; // получим имя блока
const defaultExtensions = ['scss', 'html',/* 'js'*/]; // расширения по умолчанию
const extensions = uniqueArray(defaultExtensions.concat(process.argv.slice(3))); // добавим введенные при вызове расширения (если есть)

// Если есть имя блока
if (blockName) {
    const dirPath = `./app/components/${blockName}/`; //полный путь к создаваемой папке блока
    mkdirp(dirPath, (err) => {                // создаем
        // Если какая-то ошибка — покажем
        if (err) {
            console.error(`[------] Отмена операции: ${err}`);
        }

        // Нет ошибки, поехали!
        else {
            console.log(`[------] Создание папки ${dirPath} (если отсутствует)`);

            // Обходим массив расширений и создаем файлы, если они еще не созданы
            extensions.forEach((extention) => {
                let filePath = `${dirPath + blockName}.${extention}`;   // полный путь к создаваемому файлу
                let fileContent = '';                                   // будущий контент файла
                let fileCreateMsg = '';                                 // будущее сообщение в консоли при создании файла

                // Если это SCSS
                if (extention === 'scss') {
                    filePath = `${dirPath}_${blockName}.scss`;
                    fileContent = `.${blockName} {}\n`;
                }

                // Если это HTML
                else if (extention === 'html') {
                    fileContent = `<!-- Вёрстка для компонента ${blockName} -->\n`;
                }

                // Если это JS
                else if (extention === 'js') {
                    fileContent = "$(document).ready(function() {});";
                }

                // Если нужна подпапка для картинок
                else if (extention === 'img') {
                    const imgFolder = `${dirPath}img/`;
                    if (fileExist(imgFolder) === false) {
                        mkdirp(imgFolder, (err) => {
                            if (err) console.error(err);
                            else
                                console.log(`[------] Создание папки: ${imgFolder} (если отсутствует)`);
                        })
                    } else {
                        console.log(`[------] Папка ${imgFolder} НЕ создана (уже существует) `);
                    }
                }

                // Создаем файл, если он еще не существует
                if (fileExist(filePath) === false && extention !== 'img') {
                    fs.writeFile(filePath, fileContent, (err) => {
                        if (err) {
                            return console.log(`[------] Файл НЕ создан: ${err}`);
                        }
                        console.log(`[------] Файл создан: ${filePath}`);
                        if (fileCreateMsg) {
                            console.warn(fileCreateMsg);
                        }
                    })
                    ;
                } else if (extention !== 'img') {
                    console.log(`[------] Файл НЕ создан: ${filePath} (уже существует)`);
                }
            })
            ;
        }
        console.log(`[------] Папка для блока: ${blockName} создана.\n[------] При использовании блока в сборке, импортируйте ${blockName}.scss в /app/scss/style.scss и ${blockName}.js в /app/script.js`);
    })
    ;
} else {
    console.log('[------] Отмена операции: не указан блок');
}

// Оставить в массиве только уникальные значения (убрать повторы)
function uniqueArray(arr) {
    const objectTemp = {};
    for (let i = 0; i < arr.length; i++) {
        const str = arr[i];
        objectTemp[str] = true; // запомнить строку в виде свойства объекта
    }
    return Object.keys(objectTemp);
}

// Проверка существования файла
function fileExist(path) {
    const fs = require('fs');
    try {
        fs.statSync(path);
    } catch (err) {
        return !(err && err.code === 'ENOENT');
    }
}
