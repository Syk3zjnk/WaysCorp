const toggle = document.querySelector('.navbar-toggle');
const navLinks = document.querySelector('.nav-links');

if (toggle && navLinks) {
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');

    document.querySelectorAll('.navbar-menu-mobile, .menu-backdrop')
      .forEach(e => e.remove());

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
}
