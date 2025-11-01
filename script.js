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

// ==== CHATBOT DE INFORMACIÓN LABORAL ====
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("chat-form");
  const input = document.getElementById("user-input");
  const chatBody = document.getElementById("chat-body");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;

    addMessage("user", text);
    input.value = "";

    setTimeout(() => {
      const reply = getResponse(text.toLowerCase());
      addMessage("bot", reply);
    }, 500);
  });

  function addMessage(sender, text) {
    const msg = document.createElement("div");
    msg.classList.add(sender === "user" ? "user-message" : "bot-message");
    msg.innerHTML = text;
    chatBody.appendChild(msg);
    chatBody.scrollTop = chatBody.scrollHeight;

    // (Opcional) leer en voz alta
    if (sender === "bot") {
      const speech = new SpeechSynthesisUtterance(text.replace(/<[^>]*>?/gm, ''));
      speech.lang = "es-ES";
      speech.rate = 1;
      window.speechSynthesis.speak(speech);
    }
  }

function getResponse(input) {
  input = input.toLowerCase().trim();

  // --- SALUDOS ---
  if (input.includes("hola") || input.includes("buenas") || input.includes("hey") || input.includes("saludos") || input.includes("qué tal") || input.includes("como estas"))
    return "👋 ¡Hola! Soy el asistente virtual de <strong>Alejandro García Benítez</strong>. ¿Quieres saber sobre su formación, proyectos, CV o cómo contactarlo?";

  // --- CURRÍCULUM / CV ---
  if (input.includes("cv") || input.includes("currículum") || input.includes("curriculum") || input.includes("curriculo") || input.includes("ver cv") || input.includes("descargar cv") || input.includes("curriculum vitae"))
    return "📄 Puedes ver o descargar su currículum pulsando el botón <strong>'Descargar CV'</strong> en la barra superior o accediendo directamente a <a href='cv.html' target='_blank'>su CV online</a>.";

  // --- FORMACIÓN / ESTUDIOS ---
  if (input.includes("formacion") || input.includes("estudios") || input.includes("educacion") || input.includes("qué ha estudiado") || input.includes("que estudia") || input.includes("donde estudio") || input.includes("donde estudia") || input.includes("titulacion"))
    return "🎓 Alejandro es <strong>Técnico Superior en Desarrollo de Aplicaciones Web (DAW)</strong>. Estudió en el <strong>I.E.S. Martín Rivero</strong> y actualmente en el <strong>I.E.S. Medac</strong>. También tiene formación en <strong>electricidad</strong> y cursos en <strong>Java, Cloud Computing, Ciberseguridad, Python y IA Generativa</strong> Actualmente formandose en lenguajes como Cobol, NodeJs, TypeScript, REAC y Java.";

  // --- PROYECTOS / PORTAFOLIO ---
  if (input.includes("proyecto") || input.includes("proyectos") || input.includes("portfolio") || input.includes("portafolio") || input.includes("trabajos") || input.includes("qué ha hecho") || input.includes("que ha creado") || input.includes("que desarrolla"))
    return "🧩 En la sección <strong>'Proyectos'</strong> puedes ver los trabajos de Alejandro: <strong>Ajedrez con IA</strong>, <strong>Tetris JS</strong>, <strong>Snake</strong>, <strong>Pinball</strong> y una <strong>Pokédex en React + Vite + TailwindCSS</strong>.";

  // --- GITHUB / REPOSITORIOS ---
  if (input.includes("github") || input.includes("repositorio") || input.includes("repositorios") || input.includes("codigo") || input.includes("código fuente") || input.includes("proyectos github") || input.includes("ver github") || input.includes("repos"))
    return "💻 En su perfil de <a href='https://github.com/AlejandroGB95' target='_blank'>GitHub</a> encontrarás proyectos personales como <strong>Ajedrez con IA</strong>, <strong>Tetris</strong>, <strong>Snake</strong> y una <strong>Pokédex hecha con React y Vite</strong>. También sube ejemplos en <strong>Java, Python, Django y PHP</strong>.";

  // --- HABILIDADES / TECNOLOGÍAS ---
  if (input.includes("habilidad") || input.includes("skills") || input.includes("tecnologia") || input.includes("tecnologías") || input.includes("lenguajes") || input.includes("lenguaje de programacion") || input.includes("que domina") || input.includes("conocimientos"))
    return "💡 Domina <strong>HTML, CSS, JavaScript, React, Java, Python, Django, PHP, SQL y Cobol</strong>. Además maneja herramientas como <strong>VS Code, NetBeans, Eclipse, GitHub y Oracle</strong>.";

  // --- EXPERIENCIA ---
  if (input.includes("experiencia") || input.includes("trabajo anterior") || input.includes("laboral") || input.includes("ha trabajado"))
    return "💼 Alejandro cuenta con experiencia práctica en proyectos laborales, personales y académicos. Ha trabajado 4 meses para Fundación Medac Zaitec en un proyecto para la Junta de Andalucia con los lenguajes <strong>HTML, CSS, JavaScript, Java, Python, Django</strong> y <strong>PHP</strong>, aplicando buenas prácticas y metodologías ágiles. Además cuenta con proyectos personales como el portafolio, pagina web de Anime, pagina web de pokedex pokemon con reac y tailwindCss entre otros para ver más puedes ir a su Github.";

  // --- LINKEDIN ---
  if (input.includes("linkedin") || input.includes("perfil profesional"))
    return "🔗 Puedes visitar su perfil profesional aquí: <a href='https://www.linkedin.com/in/alejandro-garc%C3%ADa-ben%C3%ADtez-desarrolladorweb/' target='_blank'>linkedin.com/in/alejandro-garcía-benítez-desarrolladorweb</a>";

  // --- CONTACTO ---
  if (input.includes("contact") || input.includes("email") || input.includes("correo") || input.includes("formulario") || input.includes("mensaje"))
    return "📬 Puedes contactar con Alejandro desde el <strong>Formulario de contacto laboral</strong> al final de esta página o mediante su <a href='https://www.linkedin.com/in/alejandro-garc%C3%ADa-ben%C3%ADtez-desarrolladorweb/' target='_blank'>LinkedIn</a>.";

   // --- Que esta haciendo ahora ---
  if (input.includes("ahora") || input.includes("estudiando ahora") || input.includes("que esta haciendo ahora") || input.includes("que lenguajes esta estudiando ahora") || input.includes("ahora mismo que esta estudiando"))
    return " Ahora mismo esta aprendiendo varios lenguajes de programación para una mayor empleabilidad ya que lo que busca es su primer trabajo en los lenguajes que esta estudiando se encuentran <strong>Reac, NodeJS, TypeScript, Cobol, Java y librerias y Framework. Además de seguir realizando cursos sobre IA, Java, SQL etc.</strong>.";
  
  // --- QUIÉN ES / PRESENTACIÓN ---
  if (input.includes("quien es") || input.includes("quién es") || input.includes("eres") || input.includes("alejandro") || input.includes("presentate") || input.includes("creador") || input.includes("autor") || input.includes("de quien es") || input.includes("quien lo hizo"))
    return "👨‍💻 <strong>Alejandro García Benítez</strong> es un <strong>Desarrollador FullStack Junior</strong> apasionado por la tecnología, el aprendizaje constante y la creación de soluciones web modernas y funcionales.";

  // --- OBJETIVO / METAS ---
  if (input.includes("objetivo") || input.includes("meta") || input.includes("busca") || input.includes(" que busca") || input.includes("aspiracion") || input.includes("que quiere"))
    return "🚀 Su objetivo es encontrar su primer trabajo como <strong>Desarrollador Web FullStack / Desarrollador Web Back-end / Desarrollador Web Front-end</strong> y aportar valor en proyectos innovadores con impacto real. Además de seguir formandose para poder aportar desde un inicio a cualquier tipo de empresa y lenguaje. ";

  // --- IDIOMAS ---
  if (input.includes("idioma") || input.includes("inglés") || input.includes("english") || input.includes("idiomas"))
    return "🌍 Tiene conocimientos de <strong>inglés técnico</strong> orientado al desarrollo web y a la comprensión de documentación.";

  // --- UBICACIÓN ---
  if (input.includes("donde vive") || input.includes("ubicacion") || input.includes("localizacion") || input.includes("residencia") || input.includes("pais"))
    return "📍 Vive en <strong>España</strong> 🇪🇸 y está disponible tanto para trabajo remoto como presencial.";

  // --- Edad ---
  if (input.includes("edad") || input.includes("cuantos años tiene") || input.includes("que edad tiene") || input.includes("que años tiene") || input.includes("años"))
    return "Tiene 29 años, cumple los 30 años el 21 de noviembre de 2025, es Escorpio hasta la medula.";

  // --- Como Persona ---
  if (input.includes("Como es") || input.includes("que personalidad tiene") || input.includes("como es en persona") || input.includes("Es un tio apañado") || input.includes("como es trabajando"))
    return "Alejandro es una persona amable, que intenta de tratar a todo el mundo con amabilidad y respeto. Es un hombre con ganas de trabajar, inquieto y que le gusta probar e intentar proyectos innovadores. Es una persona curiosa, observadora, nerviosa y con mucha energia. Es muy positivo y muy risueño/ bromista.";


  // --- PERSONALIDAD / VALORES ---
  if (input.includes("personalidad") || input.includes("valores") || input.includes("como es") || input.includes("caracter"))
    return "💫 Es una persona paciente, ética, responsable, observador, curioso, positivo, gracioso, alegre, buen compañero, amistoso, trabajador, cabezota, con caracter, amable, energico y con gran capacidad de aprendizaje. Le motiva el trabajo en equipo y la mejora continua.";

  // --- HERRAMIENTAS ---
  if (input.includes("herramienta") || input.includes("software") || input.includes("editor") || input.includes("entorno"))
    return "🛠️ Utiliza <strong>Visual Studio Code</strong>, <strong>NetBeans</strong>, <strong>Eclipse</strong>, <strong>GitHub</strong> y <strong>Oracle</strong> como herramientas principales.";

  // --- DEFAULT (cuando no entiende la pregunta) ---
  return "🤖 No estoy seguro de eso, pero puedo ayudarte con información sobre su:<br><br>📄 <strong>CV</strong><br>🎓 <strong>Formación</strong><br> <strong>Personalidad</strong><br> <strong>Edad</strong><br> <strong>Objetivo</strong><br> 🧩 <strong>Proyectos</strong><br>💻 <strong>GitHub</strong><br>💡 <strong>Habilidades</strong><br>💼 <strong>Experiencia</strong><br>🔗 <strong>LinkedIn</strong><br>📬 <strong>Contacto</strong><br>🌍 <strong>Idiomas</strong><br>⚙️ <strong>Herramientas</strong><br><br>¿Sobre qué te gustaría saber más?";
}

});

// ==== CHATBOT DE INFORMACIÓN LABORAL ==== 

// ==== CLIMA LOCAL SEGÚN GEOLOCALIZACIÓN Tiempo ====
  document.addEventListener("DOMContentLoaded", () => {
    const weatherIcon = document.getElementById("weather-icon");
    const temperature = document.getElementById("temperature");
    const condition = document.getElementById("condition");

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      condition.textContent = "Sin geolocalización 😞";
    }

    function success(position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      // Usa la API gratuita de OpenWeatherMap
      const apiKey = "d5619806c3c1900ce298037fb67edcce"; // 🔑 Reemplaza con tu clave (gratis en openweathermap.org)
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=${apiKey}`;

      fetch(url)
        .then(response => response.json())
        .then(data => {
          const temp = Math.round(data.main.temp);
          const main = data.weather[0].main;
          temperature.textContent = `${temp}°C`;

          // Cambia el ícono según el clima
          switch (main) {
            case "Clear": weatherIcon.textContent = "☀️"; condition.textContent = "Despejado"; break;
            case "Clouds": weatherIcon.textContent = "☁️"; condition.textContent = "Nublado"; break;
            case "Rain": weatherIcon.textContent = "🌧️"; condition.textContent = "Lluvioso"; break;
            case "Thunderstorm": weatherIcon.textContent = "⛈️"; condition.textContent = "Tormenta"; break;
            case "Snow": weatherIcon.textContent = "❄️"; condition.textContent = "Nieve"; break;
            default: weatherIcon.textContent = "🌤️"; condition.textContent = main;
          }
        })
        .catch(() => {
          condition.textContent = "Error al cargar clima 😕";
        });
    }

    function error() {
      condition.textContent = "Ubicación no disponible";
    }
  });

// ==== CLIMA LOCAL SEGÚN GEOLOCALIZACIÓN Tiempo ====