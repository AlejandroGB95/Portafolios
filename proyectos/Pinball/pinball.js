 const canvas = document.getElementById('pinball');
  const ctx = canvas.getContext('2d');

  let paddleWidth, paddleHeight, paddleX, paddleY;
  let ballRadius;
  let ball = { x: 0, y: 0, speedX: 0, speedY: 0, radius: 0 };
  let score = 0;
  const keys = { left: false, right: false };

  function resize() {
    canvas.width = window.innerWidth * 0.9;
    canvas.height = window.innerHeight * 0.9;

    paddleWidth = canvas.width * 0.2;
    paddleHeight = canvas.height * 0.025;
    paddleY = canvas.height - paddleHeight - 30;
    paddleX = (canvas.width - paddleWidth) / 2;

    ballRadius = Math.min(canvas.width, canvas.height) * 0.015;
    ball.radius = ballRadius;
    if(ball.x === 0 && ball.y === 0) {
      ball.x = canvas.width / 2;
      ball.y = canvas.height / 2;
    }
  }

  function initBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.speedX = 3 * (Math.random() < 0.5 ? 1 : -1);
    ball.speedY = -4;
    ball.radius = ballRadius;
  }

  document.addEventListener('keydown', e => {
    if(e.key === 'ArrowLeft') keys.left = true;
    if(e.key === 'ArrowRight') keys.right = true;
  });
  document.addEventListener('keyup', e => {
    if(e.key === 'ArrowLeft') keys.left = false;
    if(e.key === 'ArrowRight') keys.right = false;
  });

  // Controles táctiles
  const leftBtn = document.getElementById('left-btn');
  const rightBtn = document.getElementById('right-btn');

  leftBtn.addEventListener('touchstart', e => { e.preventDefault(); keys.left = true; });
  leftBtn.addEventListener('touchend', e => { e.preventDefault(); keys.left = false; });
  rightBtn.addEventListener('touchstart', e => { e.preventDefault(); keys.right = true; });
  rightBtn.addEventListener('touchend', e => { e.preventDefault(); keys.right = false; });

  function drawPaddle() {
    ctx.fillStyle = '#0ff';
    ctx.shadowColor = '#0ff';
    ctx.shadowBlur = 15;
    ctx.fillRect(paddleX, paddleY, paddleWidth, paddleHeight);
    ctx.shadowBlur = 0;
  }

  function drawBall() {
    ctx.beginPath();
    ctx.fillStyle = '#0ff';
    ctx.shadowColor = '#0ff';
    ctx.shadowBlur = 20;
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  function updatePaddle() {
    if(keys.left && paddleX > 0) paddleX -= 8;
    if(keys.right && paddleX < canvas.width - paddleWidth) paddleX += 8;
  }

  function checkCollision() {
    // Rebote en paleta
    if(
      ball.y + ball.radius > paddleY &&
      ball.x > paddleX &&
      ball.x < paddleX + paddleWidth &&
      ball.speedY > 0
    ) {
      ball.speedY *= -1;
      // Ajustar velocidad X según donde rebota la bola en la paleta
      let hitPos = ball.x - (paddleX + paddleWidth / 2);
      ball.speedX += hitPos * 0.1;
      score++;
    }
  }

  function updateBall() {
    ball.x += ball.speedX;
    ball.y += ball.speedY;

    // Rebote laterales
    if(ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
      ball.speedX *= -1;
    }
    // Rebote techo
    if(ball.y - ball.radius < 0) {
      ball.speedY *= -1;
    }
    // Bola cae abajo -> reset
    if(ball.y - ball.radius > canvas.height) {
      initBall();
      score = Math.max(0, score - 5);
    }
  }

  function drawScore() {
    document.getElementById('score').textContent = `Puntos: ${score}`;
  }

  function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddle();
    drawBall();
    updatePaddle();
    updateBall();
    checkCollision();
    drawScore();

    requestAnimationFrame(gameLoop);
  }

  window.addEventListener('resize', resize);

  resize();
  initBall();
  gameLoop();