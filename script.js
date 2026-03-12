// GLOW DINÁMICO CORREGIDO
const glow = document.getElementById('glow');

window.addEventListener('mousemove', (e) => {
    // Usamos clientX y clientY para posición exacta del mouse
    const x = e.clientX;
    const y = e.clientY;
    
    // Aplicamos el gradiente centrado en el puntero
    glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(124, 58, 237, 0.15) 0%, transparent 75%)`;
});

// Revelado suave al hacer scroll
const reveal = () => {
    const items = document.querySelectorAll('.section-padding, .skill-card');
    items.forEach(item => {
        const top = item.getBoundingClientRect().top;
        if (top < window.innerHeight - 100) {
            item.style.opacity = "1";
            item.style.transform = "translateY(0)";
        }
    });
};

// Estado inicial para animaciones
document.querySelectorAll('.section-padding, .skill-card').forEach(i => {
    i.style.opacity = "0";
    i.style.transform = "translateY(30px)";
    i.style.transition = "0.8s ease-out";
});

window.addEventListener('scroll', reveal);
window.addEventListener('load', reveal);


// formulario de contacto
const form = document.getElementById('form-contacto');
const successMsg = document.getElementById('form-success');

form.addEventListener('submit', function(e) {
    // Esto hace que el mensaje aparezca suavemente
    successMsg.style.opacity = "1";
    successMsg.style.transform = "translateY(0)";
});

// formulario de contacto