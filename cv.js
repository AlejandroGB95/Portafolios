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

