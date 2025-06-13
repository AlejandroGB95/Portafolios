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
