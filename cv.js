 function toggleCursos(button) {
      const content = document.getElementById('cursos-content');
      const arrow = button.querySelector('.arrow');
      content.classList.toggle('expanded');
      arrow.textContent = content.classList.contains('expanded') ? '⮝' : '⮟';
    }

      // Animación al hacer scroll
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if(entry.isIntersecting){
            entry.target.classList.add('visible');
          }
        });
      }, { threshold: 0.1 });

      document.querySelectorAll('.animate').forEach(el => observer.observe(el));


  function toggleSkill(button) {
    const desc = button.nextElementSibling;
    const allDescs = document.querySelectorAll(".skill-desc");

    // Ocultar todas menos la seleccionada
    allDescs.forEach(d => {
      if (d !== desc) d.style.display = "none";
    });

    // Alternar la actual
    desc.style.display = desc.style.display === "block" ? "none" : "block";
  }

  //------------------------------constelaciones-------------------------------------------------
  const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
let stars = [];
let mouse = { x: null, y: null };

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Generar estrellas
const numStars = 200;
for (let i = 0; i < numStars; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.5 + 0.5,
    vx: (Math.random() - 0.5) * 0.2,
    vy: (Math.random() - 0.5) * 0.2,
    alpha: Math.random(), // para parpadeo
    dAlpha: Math.random() * 0.02
  });
}

// Posición del ratón
window.addEventListener('mousemove', e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

// Generar nebulosas suaves
function drawNebulas() {
  const gradient = ctx.createRadialGradient(
    canvas.width/2, canvas.height/2, 0,
    canvas.width/2, canvas.height/2, canvas.width/1.5
  );
  gradient.addColorStop(0, 'rgba(0,50,100,0.15)');
  gradient.addColorStop(1, 'rgba(0,0,20,0.5)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0,0,canvas.width,canvas.height);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Dibujar nebulosas
  drawNebulas();

  // Dibujar estrellas
  stars.forEach(star => {
    // Parpadeo
    star.alpha += star.dAlpha;
    if(star.alpha <= 0 || star.alpha >= 1) star.dAlpha *= -1;

    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0,255,255,${star.alpha})`; // azul eléctrico
    ctx.fill();
  });

  // Dibujar líneas entre estrellas cercanas y con el ratón
  for (let i = 0; i < stars.length; i++) {
    for (let j = i + 1; j < stars.length; j++) {
      const dx = stars[i].x - stars[j].x;
      const dy = stars[i].y - stars[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 120) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(0,255,255,${1 - distance / 120})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(stars[i].x, stars[i].y);
        ctx.lineTo(stars[j].x, stars[j].y);
        ctx.stroke();
      }

      // Conectar con el ratón
      if (mouse.x && mouse.y) {
        const dxm = stars[i].x - mouse.x;
        const dym = stars[i].y - mouse.y;
        const distMouse = Math.sqrt(dxm * dxm + dym * dym);
        if (distMouse < 150) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0,255,255,${1 - distMouse / 150})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(stars[i].x, stars[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
    }

    // Mover estrella
    stars[i].x += stars[i].vx;
    stars[i].y += stars[i].vy;

    // Rebotar en bordes
    if (stars[i].x < 0 || stars[i].x > canvas.width) stars[i].vx *= -1;
    if (stars[i].y < 0 || stars[i].y > canvas.height) stars[i].vy *= -1;
  }

  requestAnimationFrame(draw);
}

draw();

// Ajustar canvas al redimensionar ventana
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});


//------------------------------constelaciones-------------------------------------------------