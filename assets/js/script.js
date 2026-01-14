// Menú móvil - Versión corregida
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    const body = document.body;
    
    // Función para abrir/cerrar menú
    function toggleMobileMenu() {
        navLinks.classList.toggle('active');
        
        // Cambiar icono del botón
        if (navLinks.classList.contains('active')) {
            mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
            // Prevenir scroll del body cuando el menú está abierto
            body.style.overflow = 'hidden';
        } else {
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            // Restaurar scroll del body
            body.style.overflow = 'auto';
        }
    }
    
    // Evento para el botón del menú móvil
    mobileMenuBtn.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevenir que el clic se propague
        toggleMobileMenu();
    });
    
    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });
    
    // Cerrar menú al hacer clic fuera de él
    document.addEventListener('click', function(e) {
        if (navLinks.classList.contains('active') && 
            !navLinks.contains(e.target) && 
            !mobileMenuBtn.contains(e.target)) {
            toggleMobileMenu();
        }
    });
    
    // Cambiar estilo del header al hacer scroll
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        }
    });
    
    // Efecto suave para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#') && 
                this.getAttribute('href').length > 1) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Cerrar menú móvil si está abierto
                    if (navLinks.classList.contains('active')) {
                        toggleMobileMenu();
                    }
                    
                    // Desplazamiento suave
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Añadir clase activa al enlace de navegación según la sección visible
    function setActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && 
                window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = '#' + section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentSectionId) {
                link.classList.add('active');
            }
        });
    }
    
    // Ejecutar al cargar y al hacer scroll
    window.addEventListener('scroll', setActiveNavLink);
    setActiveNavLink();
    
    // ============================================
    // SLIDER DE CERTIFICADOS
    // ============================================
    
    const certificatesSlider = document.getElementById('certificatesSlider');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const currentSlideElement = document.getElementById('currentSlide');
    const totalSlidesElement = document.getElementById('totalSlides');
    const sliderDots = document.getElementById('sliderDots');
    
    // Datos de ejemplo para los certificados
    // En un caso real, estos datos podrían venir de una API o base de datos
    const certificatesData = [
        {
            title: "Fundamentos de Bases de Datos",
            platform: "Platzi",
            date: "Julio 2020",
            description: "Curso de fundamentos de bases de datos que cubre teoría y práctica, con un total de 26 horas de formación.",
            imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Desarrollo Web Completo",
            platform: "Udemy",
            date: "Abril 2021",
            description: "Curso completo de desarrollo web que incluye HTML5, CSS3, JavaScript, PHP, MySQL y más.",
            imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w-800&q=80"
        },
        {
            title: "WordPress Avanzado",
            platform: "LinkedIn Learning",
            date: "Marzo 2022",
            description: "Curso avanzado de WordPress que cubre desarrollo de temas, plugins y optimización de rendimiento.",
            imageUrl: "https://images.unsplash.com/photo-1593642532842-98d0fd5ebc1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "JavaScript Moderno",
            platform: "Platzi",
            date: "Enero 2021",
            description: "Curso de JavaScript moderno que cubre ES6+, async/await, promesas y desarrollo de aplicaciones web.",
            imageUrl: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Diseño UX/UI",
            platform: "Coursera",
            date: "Noviembre 2021",
            description: "Certificación en diseño de experiencia de usuario e interfaz de usuario para aplicaciones web y móviles.",
            imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        }
    ];
    
    // Para el ejemplo, vamos a duplicar los certificados para llegar a 61
    // En tu caso real, tendrías 61 certificados reales
    const allCertificates = [];
    const totalCertificates = 61;
    
    // Duplicamos los certificados de ejemplo para simular 61
    for (let i = 0; i < totalCertificates; i++) {
        const certIndex = i % certificatesData.length;
        const cert = {...certificatesData[certIndex]};
        cert.title = `${cert.title} ${Math.floor(i/certificatesData.length) + 1 > 1 ? `(${Math.floor(i/certificatesData.length) + 1})` : ''}`;
        cert.id = i + 1;
        allCertificates.push(cert);
    }
    
    let currentSlide = 0;
    
    // Función para renderizar los certificados en el slider
    function renderCertificates() {
        certificatesSlider.innerHTML = '';
        
        allCertificates.forEach((certificate, index) => {
            const slide = document.createElement('div');
            slide.className = `certificate-slide ${index === currentSlide ? 'active' : ''}`;
            slide.dataset.index = index;
            
            slide.innerHTML = `
                <img src="${certificate.imageUrl}" alt="${certificate.title}" class="certificate-image">
                <div class="certificate-content">
                    <h3>${certificate.title}</h3>
                    <span class="certificate-date">${certificate.date}</span>
                    <span class="certificate-platform">${certificate.platform}</span>
                    <p class="certificate-description">${certificate.description}</p>
                    <p class="certificate-id"><strong>Certificado #${certificate.id}</strong></p>
                </div>
            `;
            
            certificatesSlider.appendChild(slide);
        });
        
        updateSliderPosition();
    }
    
    // Función para crear los puntos de navegación
    function createDots() {
        sliderDots.innerHTML = '';
        
        // Mostramos un máximo de 10 puntos para no saturar la interfaz
        const dotsToShow = Math.min(allCertificates.length, 10);
        
        for (let i = 0; i < dotsToShow; i++) {
            const dot = document.createElement('button');
            dot.className = `slider-dot ${i === currentSlide ? 'active' : ''}`;
            dot.dataset.index = Math.floor(i * (allCertificates.length / dotsToShow));
            dot.addEventListener('click', () => {
                goToSlide(parseInt(dot.dataset.index));
            });
            
            sliderDots.appendChild(dot);
        }
    }
    
    // Función para actualizar la posición del slider
    function updateSliderPosition() {
        const slides = document.querySelectorAll('.certificate-slide');
        slides.forEach((slide, index) => {
            slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`;
        });
        
        // Actualizar contador
        currentSlideElement.textContent = currentSlide + 1;
        totalSlidesElement.textContent = allCertificates.length;
        
        // Actualizar puntos activos
        document.querySelectorAll('.slider-dot').forEach((dot, index) => {
            const dotIndex = parseInt(dot.dataset.index);
            if (currentSlide >= dotIndex && 
                (index === document.querySelectorAll('.slider-dot').length - 1 || 
                 currentSlide < parseInt(document.querySelectorAll('.slider-dot')[index + 1].dataset.index))) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Función para ir a un slide específico
    function goToSlide(slideIndex) {
        if (slideIndex < 0) {
            currentSlide = allCertificates.length - 1;
        } else if (slideIndex >= allCertificates.length) {
            currentSlide = 0;
        } else {
            currentSlide = slideIndex;
        }
        
        updateSliderPosition();
    }
    
    // Función para ir al siguiente slide
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }
    
    // Función para ir al slide anterior
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }
    
    // Event listeners para los botones de navegación
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    // Navegación con teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });
    
    // Inicializar el slider
    renderCertificates();
    createDots();
    
    // Auto slide cada 5 segundos
    let slideInterval = setInterval(nextSlide, 5000);
    
    // Pausar auto slide al interactuar con el slider
    certificatesSlider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    certificatesSlider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });
    
    // Animación para elementos al hacer scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observar elementos para animación
    document.querySelectorAll('.skill-card, .wp-feature, .education-card').forEach(el => {
        observer.observe(el);
    });
});