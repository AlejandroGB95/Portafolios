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
const numStars = 250;
for (let i = 0; i < numStars; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.5 + 0.5,
    vx: (Math.random() - 0.5) * 0.1,
    vy: (Math.random() - 0.5) * 0.1,
    alpha: Math.random(),
    dAlpha: Math.random() * 0.002
  });
}

// Movimiento del ratón
window.addEventListener('mousemove', e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

// Crear capas de nebulosas dinámicas
let nebulaLayers = [];
for(let i=0;i<4;i++){
  nebulaLayers.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * canvas.width/2 + canvas.width/3,
    hue: Math.random()*360,         // color inicial
    hueSpeed: (Math.random()*0.1)+0.02,  // velocidad de cambio de color
    dx: (Math.random()-0.5)*0.05,   // velocidad de movimiento
    dy: (Math.random()-0.5)*0.05
  });
}

// Dibujar nebulosas con colores dinámicos
function drawNebulas() {
  nebulaLayers.forEach(layer => {
    // Actualizar posición
    layer.x += layer.dx;
    layer.y += layer.dy;
    if(layer.x < -layer.radius) layer.x = canvas.width+layer.radius;
    if(layer.x > canvas.width+layer.radius) layer.x = -layer.radius;
    if(layer.y < -layer.radius) layer.y = canvas.height+layer.radius;
    if(layer.y > canvas.height+layer.radius) layer.y = -layer.radius;

    // Cambiar color
    layer.hue += layer.hueSpeed;
    if(layer.hue > 360) layer.hue -= 360;

    const gradient = ctx.createRadialGradient(layer.x, layer.y, 0, layer.x, layer.y, layer.radius);
    gradient.addColorStop(0, `hsla(${layer.hue}, 80%, 60%, 0.2)`);
    gradient.addColorStop(0.5, `hsla(${(layer.hue+50)%360}, 60%, 30%, 0.1)`);
    gradient.addColorStop(1, 'rgba(0,0,0,0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0,0,canvas.width,canvas.height);
  });
}

function draw() {
  // Fondo semi-transparente para persistencia
  ctx.fillStyle = 'rgba(0,0,0,0.1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Dibujar nebulosas dinámicas
  drawNebulas();

  // Dibujar estrellas
  stars.forEach(star => {
    star.alpha += star.dAlpha;
    if(star.alpha <= 0 || star.alpha >= 1) star.dAlpha *= -1;

    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI*2);
    ctx.fillStyle = `rgba(255,255,255,${star.alpha})`;
    ctx.fill();
  });

  // Líneas entre estrellas y con el ratón
  for(let i=0;i<stars.length;i++){
    for(let j=i+1;j<stars.length;j++){
      const dx = stars[i].x - stars[j].x;
      const dy = stars[i].y - stars[j].y;
      const distance = Math.sqrt(dx*dx+dy*dy);

      if(distance<120){
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255,255,255,${1-distance/120})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(stars[i].x, stars[i].y);
        ctx.lineTo(stars[j].x, stars[j].y);
        ctx.stroke();
      }

      if(mouse.x && mouse.y){
        const dxm = stars[i].x - mouse.x;
        const dym = stars[i].y - mouse.y;
        const distMouse = Math.sqrt(dxm*dxm + dym*dym);

        if(distMouse < 150){
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255,255,255,${1-distMouse/150})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(stars[i].x, stars[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
    }

    // Mover estrellas lentamente
    stars[i].x += stars[i].vx;
    stars[i].y += stars[i].vy;
    if(stars[i].x<0||stars[i].x>canvas.width) stars[i].vx*=-1;
    if(stars[i].y<0||stars[i].y>canvas.height) stars[i].vy*=-1;
  }

  requestAnimationFrame(draw);
}

draw();

// Ajustar canvas al redimensionar ventana
window.addEventListener('resize', ()=>{
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

//------------------------------constelaciones-------------------------------------------------