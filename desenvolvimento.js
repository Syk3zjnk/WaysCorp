const toggle = document.querySelector('.navbar-toggle');
        const navLinks = document.querySelector('.nav-links');

        if (toggle && navLinks) {
            toggle.addEventListener('click', () => {
                toggle.classList.toggle('open');

                // Remove menus/backdrops existentes
                document.querySelectorAll('.navbar-menu-mobile, .menu-backdrop')
                    .forEach(e => e.remove());

                if (toggle.classList.contains('open')) {
                    // Cria menu lateral mobile
                    const menu = document.createElement('ul');
                    menu.className = 'navbar-menu-mobile';
                    menu.innerHTML = navLinks.innerHTML;
                    document.body.appendChild(menu);

                    // Cria backdrop escuro
                    const backdrop = document.createElement('div');
                    backdrop.className = 'menu-backdrop';
                    backdrop.onclick = () => {
                        menu.remove();
                        backdrop.remove();
                        toggle.classList.remove('open');
                    };
                    document.body.appendChild(backdrop);

                    // Fecha ao clicar em qualquer link
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
