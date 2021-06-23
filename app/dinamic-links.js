fetch('ajax.pages_list.php')
.then(
  function (response) {
    if (response.status !== 200) {
      console.log('Looks like there was a problem. Status Code: ' +
        response.status);
      return;
    }

    response.json().then(function (data) {
      if (data.toString().indexOf('<?php') === 0) return;
      const container = document.createElement('div');
      const close = document.createElement('div');
      container.classList.add('upages');
      close.addEventListener('click', () => {
        container.style.display = 'none'
      });
      close.textContent = 'Close';
      container.appendChild(close);
      data.pages.forEach((page) => {
        const link = document.createElement('a');
        link.textContent = page;
        link.setAttribute('href', page);
        container.appendChild(link)
      });

      document.body.append(container)

    });
  }
)
.catch(function (err) {
  console.log('Fetch Error :-S', err);
});
