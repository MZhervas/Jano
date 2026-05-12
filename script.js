document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');

    // Header con shrink al scroll (solo desktop)
    window.addEventListener('scroll', function() {
        if (window.innerWidth <= 720) return;
        if (window.scrollY > 50) {
            header.style.padding = '10px 40px';
        } else {
            header.style.padding = '15px 40px';
        }
    });

    // Menú hamburguesa
    const menuToggle = document.querySelector('.menu-toggle');
    const menuList = document.querySelector('header nav ul');
    if (menuToggle && menuList) {
        menuToggle.addEventListener('click', () => {
            menuList.classList.toggle('open');
            menuToggle.classList.toggle('open');
        });

        // Cerrar al hacer click en un link
        menuList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuList.classList.remove('open');
                menuToggle.classList.remove('open');
            });
        });
    }

    // Animaciones fade-in al scroll
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeInObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const elementsToAnimate = document.querySelectorAll(
        '.imagenes_obras_jano, .content-container, .beneficios li, .despedida-jano, .about_me_header, .proceso_card, .proceso_header, .contacto_wrapper'
    );

    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(25px)';
        el.style.transition = 'opacity 0.7s ease-out, transform 0.7s ease-out';
        fadeInObserver.observe(el);
    });

    // Smooth scroll para nav
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============ Carrusel mobile - dots ============
    const carousel = document.querySelector('.proyectos-jano');
    if (carousel) {
        const items = carousel.querySelectorAll('.imagenes_obras_jano');

        // Crear contenedor de dots (siempre, lo muestra CSS según media query)
        let dotsContainer = document.createElement('div');
        dotsContainer.className = 'carousel-dots';
        items.forEach((_, i) => {
            const dot = document.createElement('span');
            dot.className = 'carousel-dot';
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                const itemWidth = items[0].getBoundingClientRect().width;
                const gap = 14;
                carousel.scrollTo({
                    left: (itemWidth + gap) * i,
                    behavior: 'smooth'
                });
            });
            dotsContainer.appendChild(dot);
        });
        carousel.parentNode.insertBefore(dotsContainer, carousel.nextSibling);

        const dots = dotsContainer.querySelectorAll('.carousel-dot');

        // Actualizar dot activo al hacer scroll
        let scrollTimer;
        carousel.addEventListener('scroll', () => {
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(() => {
                const itemWidth = items[0].getBoundingClientRect().width;
                const gap = 14;
                const index = Math.round(carousel.scrollLeft / (itemWidth + gap));
                const clamped = Math.min(Math.max(index, 0), items.length - 1);
                dots.forEach((dot, i) => dot.classList.toggle('active', i === clamped));
            }, 50);
        });
    }
});
