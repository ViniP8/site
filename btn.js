document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('menu-btn');
    const menu = document.getElementById('mobile-menu');
    const nav = document.querySelector('nav'); // Seleciona sua navbar para medir a altura

    const topLine = btn.querySelector('.top');
    const middleLine = btn.querySelector('.middle');
    const bottomLine = btn.querySelector('.bottom');

    let aberto = false;
    let acabouDeAbrir = false;

    function abrirMenu() {
        menu.style.maxHeight = menu.scrollHeight + "px";
        topLine.style.transform = "translateY(0) rotate(45deg)";
        middleLine.style.opacity = "0";
        bottomLine.style.transform = "translateY(0) rotate(-45deg)";
        aberto = true;
        acabouDeAbrir = true;
        setTimeout(() => { acabouDeAbrir = false; }, 500);
    }

    function fecharMenu() {
        menu.style.maxHeight = "0px";
        topLine.style.transform = "translateY(-8px) rotate(0)";
        middleLine.style.opacity = "1";
        bottomLine.style.transform = "translateY(8px) rotate(0)";
        aberto = false;
    }

    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        aberto ? fecharMenu() : abrirMenu();
    });

    window.addEventListener('scroll', () => {
        if (aberto && !acabouDeAbrir) fecharMenu();
    });

    // --- SCRIPT DE OFFSET DINÂMICO ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            // Ignora se o link for apenas "#"
            if (targetId === "#") return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault(); 

                // 1. Se estiver no mobile, fecha o menu primeiro
                if (aberto) fecharMenu();

                // 2. MEDIÇÃO DINÂMICA: Pega a altura real da nav naquele momento
                // Isso resolve a diferença entre mobile e desktop automaticamente
                const navHeight = nav.offsetHeight; 
                
                // 3. Calcula a posição
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navHeight;

                // 4. Scroll suave manual
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });

                // 5. Atualiza a URL (opcional, para manter o histórico do navegador)
                history.pushState(null, null, targetId);
            }
        });
    });
});
