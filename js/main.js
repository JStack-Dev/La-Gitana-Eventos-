document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validación simple
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      formMessage.textContent = 'Por favor, rellena todos los campos.';
      formMessage.style.color = '#b74160';
      return;
    }

    if (!validateEmail(email)) {
      formMessage.textContent = 'Por favor, ingresa un correo electrónico válido.';
      formMessage.style.color = '#b74160';
      return;
    }

    // Aquí enviarías el formulario al servidor con fetch o similar
    formMessage.style.color = '#4CAF50';
    formMessage.textContent = '¡Mensaje enviado con éxito!';

    // Reset formulario
    form.reset();
  });

  function validateEmail(email) {
    const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return re.test(email.toLowerCase());
  }
});

