document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.navbar-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (!toggle || !navLinks) return;   // segurança

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');

    // Remove menus/backdrops antigos
    document.querySelectorAll('.navbar-menu-mobile, .menu-backdrop')
      .forEach(e => e.remove());

    // Se for abrir
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
