document.addEventListener('DOMContentLoaded', () => {
  const toggle   = document.querySelector('.navbar-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', () => {
    // anima botão (vira X)
    toggle.classList.toggle('open');

    // remove menus/backdrops antigos
    document
      .querySelectorAll('.navbar-menu-mobile, .menu-backdrop')
      .forEach(e => e.remove());

    // se abriu, cria menu + backdrop
    if (toggle.classList.contains('open')) {
      const menu = document.createElement('ul');
      menu.className = 'navbar-menu-mobile';
      menu.innerHTML = navLinks.innerHTML;
      document.body.appendChild(menu);

      const backdrop = document.createElement('div');
      backdrop.className = 'menu-backdrop';
      backdrop.onclick = () => {
        menu.remove();
        backdrop.remove();
        toggle.classList.remove('open');
      };
      document.body.appendChild(backdrop);

      // fecha ao clicar em link
      menu.querySelectorAll('a').forEach(link => {
        link.onclick = () => {
          menu.remove();
          backdrop.remove();
          toggle.classList.remove('open');
        };
      });
    }
  });
});
