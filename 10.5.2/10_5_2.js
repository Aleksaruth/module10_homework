const btn = document.querySelector('.btn_screen');

btn.addEventListener('click', () => {
  alert('Разрешение вашего экрана ' + window.screen.width + 'x' + window.screen.height + 'px')
  });