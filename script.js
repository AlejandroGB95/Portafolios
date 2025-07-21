document.addEventListener("DOMContentLoaded", () => {
    // --- Animaciones intro (GSAP) ---
    gsap.to(".intro-text", {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: "expo.out"
    });

    gsap.to(".subtitle", {
        opacity: 1,
        delay: 1,
        duration: 1,
        ease: "power2.out"
    });

    // --- Animar barras de habilidades al hacer scroll (GSAP) ---
    gsap.utils.toArray(".fill").forEach((bar) => {
        gsap.to(bar, {
            scrollTrigger: {
                trigger: bar,
                start: "top 90%",
            },
            width: bar.style.width,
            duration: 1,
            ease: "power2.out"
        });
    });

    // --- Animar proyectos al hacer scroll (GSAP) ---
    gsap.utils.toArray(".project-card").forEach((card, i) => {
        gsap.to(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 95%",
            },
            opacity: 1,
            scale: 1,
            delay: i * 0.2,
            duration: 0.8,
            ease: "back.out(1.7)"
        });
    });

    // --- Modo claro/oscuro ---
    const modeToggle = document.getElementById("mode-toggle");
    if (modeToggle) { // Asegurarse de que el botón exista antes de añadir el listener
        modeToggle.addEventListener("click", () => {
            document.body.classList.toggle("light-mode");
            // Puedes añadir aquí lógica adicional para el canvas de Matrix si quieres un cambio inmediato
        });
    }

    // --- Efecto de seguimiento del ratón para el subtítulo ---
    const subtitleElement = document.querySelector('.futuristic-text'); // Renombrado para evitar conflicto con '.subtitle' de GSAP
    if (subtitleElement) {
        document.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth / 2 - e.clientX) / 50;
            const y = (window.innerHeight / 2 - e.clientY) / 50;
            subtitleElement.style.transform = `translateX(${x}px) translateY(${y}px)`;
        });
    }

    // --- Máquina de escribir ---
    const textArray = [
        'console.log("Bienvenido");',
        'print("Soy Alejandro")',
        'console.log("Hola mundo");',
        'print("Python dev!")',
        'let dev = "FullStack";',
        '<html>Frontend</html>',
        'System.out.println("Java");'
    ];

    const typedText = document.getElementById('typed-text');
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 80;
    const deletingSpeed = 40;
    const pauseBetween = 1500;

    function type() {
        if (!typedText) return; // Asegurarse de que el elemento existe
        const currentText = textArray[textIndex];
        if (isDeleting) {
            typedText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % textArray.length;
            }
        } else {
            typedText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === currentText.length) {
                isDeleting = true;
                setTimeout(type, pauseBetween);
                return;
            }
        }
        const delay = isDeleting ? deletingSpeed : typingSpeed;
        setTimeout(type, delay);
    }
    
    // Iniciar la máquina de escribir
    type();

    // --- Menú de navegación móvil ---
    const menuToggle = document.querySelector('.menu-toggle');
    const mainMenu = document.getElementById('main-menu');
    const body = document.body;

    if (menuToggle && mainMenu) { // Asegurarse de que los elementos existan
        menuToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            mainMenu.classList.toggle('active');
            body.classList.toggle('no-scroll'); // Opcional: Evitar el scroll del body
        });

        // Opcional: Cerrar el menú al hacer clic fuera
        document.addEventListener('click', function(event) {
            if (!mainMenu.contains(event.target) && !menuToggle.contains(event.target) && mainMenu.classList.contains('active')) {
                menuToggle.setAttribute('aria-expanded', false);
                mainMenu.classList.remove('active');
                body.classList.remove('no-scroll');
            }
        });

        // Opcional: Cerrar el menú al hacer clic en un enlace interno
        mainMenu.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', () => {
                // Solo cierra si el menú está abierto
                if (mainMenu.classList.contains('active')) {
                    menuToggle.setAttribute('aria-expanded', false);
                    mainMenu.classList.remove('active');
                    body.classList.remove('no-scroll');
                }
            });
        });
    }

    // --- Estilo Matrix ---
    const canvas = document.getElementById("matrixCanvas");
    // Asegurarse de que el canvas exista
    if (canvas) {
        const ctx = canvas.getContext("2d");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const katakana = "アァイィウエエオカキクケコサシスセソ";
        const latin = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const numbers = "0123456789";

        const alphabet = katakana + latin + numbers;

        const fontSize = 16;
        const columns = canvas.width / fontSize;

        const drops = Array(Math.floor(columns)).fill(1);

        let hue = 0;

        function drawMatrix() { // Renombrado para evitar conflicto con la función 'draw' de GSAP si la tuvieras
            const isLightMode = document.body.classList.contains("light-mode");

            // Cambiar color del fondo según modo
            ctx.fillStyle = isLightMode ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Cambiar color del texto Matrix
            ctx.fillStyle = isLightMode ? `hsl(${hue}, 100%, 30%)` : `hsl(${hue}, 100%, 50%)`;
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }

                drops[i]++;
            }

            hue = (hue + 1) % 360;
        }

        setInterval(drawMatrix, 33); // ~30 FPS

        window.addEventListener("resize", () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            // Cuando la ventana cambia de tamaño, podrías querer recalcular las gotas para el nuevo ancho
            // const newColumns = canvas.width / fontSize;
            // drops.length = Math.floor(newColumns);
            // for (let i = 0; i < drops.length; i++) { if (drops[i] === undefined) drops[i] = 1; }
        });
    }
});