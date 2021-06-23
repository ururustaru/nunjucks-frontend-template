const fs = require('fs-extra');
const NODE_ENV = process.env.NODE_ENV;

function copy(source, dest) {
  fs.copy(source, dest, err => {
    if (err) return console.error(err)
  })
}

/* // Пример копирования ресурсов в другую папку (например, битрикс)
if (process.env.SITE == 'true') {
  copy('./build/fonts/', '../../htdocs/local/templates/main_new/fonts');
  copy('./build/images/', '../../htdocs/local/templates/main_new/images');
  copy('./build/main.css', '../../htdocs/local/templates/main_new/template_styles.css');
  copy('./build/main.js', '../../htdocs/local/templates/main_new/js/script.js'); 
  copy('./build/vue.js', '../../htdocs/local/templates/main_new/js/vue.js');
    
  if (NODE_ENV  == 'development') {
    copy('./build/main.js.map', '../../htdocs/local/templates/main_new/js/script.js.map');
    copy('./build/vue.js.map', '../../htdocs/local/templates/main_new/js/vue.js.map')
  }

  fs.emptyDirSync('../../htdocs/local/templates/main_new/js/chunks');
  copy('./build/js/chunks/', '../../htdocs/local/templates/main_new/js/chunks');
  
  console.log('Копирование ресурсов в /htdocs/local/templates/main_new/ завершено')
}*/
