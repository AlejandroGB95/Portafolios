document.addEventListener("DOMContentLoaded", () => {
  // Animaciones intro
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

  // Animar barras de habilidades al hacer scroll
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

  // Animar proyectos al hacer scroll
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

  // Modo claro/oscuro
  const toggle = document.getElementById("mode-toggle");
  toggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
  });
});

//estilo matrix
const canvas = document.getElementById("matrixCanvas");
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

function draw() {
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

setInterval(draw, 33); // ~30 FPS

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const subtitle = document.querySelector('.futuristic-text');
document.addEventListener('mousemove', (e) => {
  const x = (window.innerWidth / 2 - e.clientX) / 50;
  const y = (window.innerHeight / 2 - e.clientY) / 50;
  subtitle.style.transform = `translateX(${x}px) translateY(${y}px)`;
});

// maquina de escribir

  const textArray = [
    'console.log("Bienvenido");',
    'Soy Alejandro García',
    'Desarrollador FullStack',
    'Y estas en mi Portafolio',
    'Tienes un formulario',
    'abajo para contactarme <3',
    'Gracias por visitarme :D',
    'system.out.println("👨‍💻")',
  
  ];

  const typedText = document.getElementById('typed-text');
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 80;
  const deletingSpeed = 40;
  const pauseBetween = 1500;

  function type() {
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

document.addEventListener('DOMContentLoaded', type);

// maquina de escribir final................................
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainMenu = document.getElementById('main-menu');
    const body = document.body;

    if (menuToggle && mainMenu) {
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
                menuToggle.setAttribute('aria-expanded', false);
                mainMenu.classList.remove('active');
                body.classList.remove('no-scroll');
            });
        });
    }

    const modeToggle = document.getElementById('mode-toggle');
    if (modeToggle) {
        modeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
        });
    }
});

// nombre animación
  const nombre = document.querySelector('#nombre-portafolio');
const texto = nombre.textContent;
nombre.textContent = ''; // vaciar

// Envolvemos cada letra en un span
texto.split('').forEach(letra => {
  const span = document.createElement('span');
  span.textContent = letra;
  span.style.display = 'inline-block';
  span.style.opacity = 0;
  nombre.appendChild(span);
});

// Animación Netflix con rebote
anime.timeline({loop: false})
  .add({
    targets: '#nombre-portafolio span',
    translateY: [50, 0], // entra desde abajo
    opacity: [0, 1],
    scale: [0.8, 1.2, 1], // rebote
    easing: 'easeOutElastic(1, .8)',
    duration: 1000,
    delay: anime.stagger(100) // retrasa letra por letra
  });


  // Subtítulo aparece después
  anime({
    targets: '.subtitle',
    opacity: [0, 1],
    translateY: [20, 0],
    delay: texto.length * 50 + 500,
    duration: 1000,
    easing: 'easeOutExpo'
  });

  // mensaje de gracias por enviar el formulario

 const form = document.getElementById('form-contacto');
  const successMessage = document.getElementById('form-success');

  form.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevenir envío inmediato

    // Animar fade-in y desplazamiento desde abajo
    successMessage.style.opacity = '1';
    successMessage.style.transform = 'translateY(0)';

    // Esperar 1 segundo antes de enviar realmente
    setTimeout(() => {
      form.submit(); // Envía el formulario a Formspree y redirige
    }, 1000);
  });


const inputs = document.querySelectorAll('.contact-input, .contact-textarea');

  inputs.forEach(input => {
    input.addEventListener('input', () => {
      if (input.checkValidity()) {
        input.classList.add('valid');
        input.classList.remove('invalid');
      } else {
        input.classList.add('invalid');
        input.classList.remove('valid');
      }
    });
  });

// nuevo calendario....................................
  document.addEventListener("DOMContentLoaded", function () {
  const calendarEl = document.getElementById("calendar");
  if (calendarEl) {
    const calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: "dayGridMonth",
      locale: "es",
      themeSystem: "standard",
      events: [
        { title: "Entrega Proyecto X", start: "2025-09-10" },
        { title: "Entrevista Técnica", start: "2025-09-15" },
        { title: "Reunión", start: "2025-09-20" }
      ]
    });
    calendar.render();
  }
});

// Obtener los eventos guardados en localStorage
document.addEventListener('DOMContentLoaded', function() {
  const calendarEl = document.getElementById('calendar');
  if (!calendarEl) return; // Si no existe, salimos

  const savedEvents = JSON.parse(localStorage.getItem('calendarEvents')) || [];

  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    locale: 'es',
    firstDay: 1, // Semana empieza lunes
    selectable: true,
    showNonCurrentDates: false,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },

    events: savedEvents,
    dateClick: function(info) {
      const title = prompt('Introduce el nombre del evento:');
      if (title) {
        const newEvent = { title: title, start: info.dateStr, color: '#0ff' };
        calendar.addEvent(newEvent);

        savedEvents.push(newEvent);
        localStorage.setItem('calendarEvents', JSON.stringify(savedEvents));
      }
    },
    eventClick: function(info) {
      const deleteEvent = confirm(`¿Quieres eliminar el evento "${info.event.title}"?`);
      if (deleteEvent) {
        info.event.remove();
        const index = savedEvents.findIndex(e => e.title === info.event.title && e.start === info.event.startStr);
        if (index > -1) {
          savedEvents.splice(index, 1);
          localStorage.setItem('calendarEvents', JSON.stringify(savedEvents));
        }
      }
    }
  });

  calendar.render();
});

//estilo carta nuevas habilidades prueba....................................
document.querySelectorAll(".skill-card").forEach(card => {
  card.addEventListener("click", () => {
    card.classList.toggle("active");
  });
});



// prueba de la hora y geolacaliza donde esta el usuario
// Actualiza la hora del PC
function updateClock() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2,'0');
  const minutes = now.getMinutes().toString().padStart(2,'0');
  document.getElementById('time').textContent = `${hours}:${minutes}`;
}

// Llamar al cargar y cada minuto
updateClock();
setInterval(updateClock, 60000);

// Detecta la ubicación
function getLocation() {
  const locationEl = document.getElementById('location');
  
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        // API de OpenStreetMap para convertir coordenadas a ciudad
        fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`)
          .then(res => res.json())
          .then(data => {
            const city = data.address.city || data.address.town || data.address.village || "Ubicación desconocida";
            locationEl.textContent = city;
          })
          .catch(() => {
            locationEl.textContent = "Ubicación desconocida";
          });
      },
      () => {
        locationEl.textContent = "Ubicación no disponible";
      }
    );
  } else {
    locationEl.textContent = "Geolocalización no soportada";
  }
}
// Detecta la ubicación
// Llamar la función
getLocation();

//nuevo apartado sobre mi 
gsap.utils.toArray('.about-text p').forEach((block, i) => {
  gsap.from(block, {
    scrollTrigger: {
      trigger: block,
      start: "top 80%",
    },
    opacity: 0,
    y: 50,
    duration: 0.8,
    delay: i * 0.2,
    ease: "power2.out"
  });
});
//nuevo apartado sobre mi 