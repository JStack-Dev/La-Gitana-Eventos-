(() => {
  'use strict';

  /**
   * Muestra el aviso de cookies
   */
  function mostrarAviso() {
    avisoCookies.classList.add('activo');
    fondoCookies.classList.add('activo');
    // Enfocar el botón para accesibilidad
    btnAceptar.focus();
  }

  /**
   * Oculta el aviso de cookies
   */
  function ocultarAviso() {
    avisoCookies.classList.remove('activo');
    fondoCookies.classList.remove('activo');
  }

  /**
   * Guarda la aceptación en localStorage
   */
  function aceptarCookies() {
    localStorage.setItem('cookies-aceptadas', 'true');
    ocultarAviso();
  }

  // Referencias a elementos
  const avisoCookies = document.getElementById('aviso-cookies');
  const fondoCookies = document.getElementById('fondo-aviso-cookies');
  const btnAceptar = document.getElementById('btn-aceptar-cookies');

  // Evento para aceptar cookies
  btnAceptar.addEventListener('click', aceptarCookies);

  // Comprobar si ya aceptó cookies
  document.addEventListener('DOMContentLoaded', () => {
    const aceptado = localStorage.getItem('cookies-aceptadas');
    if (!aceptado) {
      mostrarAviso();
    }
  });

  // Opcional: cerrar el aviso si el usuario hace clic en el fondo
  fondoCookies.addEventListener('click', () => {
    ocultarAviso();
  });

})();

// cookie-consent.js

document.addEventListener('DOMContentLoaded', () => {
  const banner = document.getElementById('cookie-banner');
  const configPanel = document.getElementById('cookie-config-panel');
  const btnConfig = document.getElementById('configurar');
  const btnCancel = document.getElementById('cancel-config');
  const formConfig = document.getElementById('cookie-config-form');

  const CONSENT_KEY = 'cookieConsent';

  // Leer consentimiento guardado
  const consent = JSON.parse(localStorage.getItem(CONSENT_KEY));

  function applyConsent(consent) {
    // Aquí carga o bloquea scripts según las opciones
    if (consent && consent.analitica) {
      console.log('Cookies analíticas activadas');
      // Carga scripts analíticos
    } else {
      console.log('Cookies analíticas desactivadas');
      // Bloquea scripts analíticos
    }

    if (consent && consent.publicidad) {
      console.log('Cookies de publicidad activadas');
      // Carga scripts publicidad
    } else {
      console.log('Cookies de publicidad desactivadas');
      // Bloquea scripts publicidad
    }
  }

  function hideBanner() {
    banner.style.display = 'none';
  }

  function showBanner() {
    banner.style.display = 'block';
  }

  if (consent) {
    hideBanner();
    applyConsent(consent);
  } else {
    showBanner();
  }

  document.getElementById('accept-all').addEventListener('click', () => {
    const allConsent = { analitica: true, publicidad: true };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(allConsent));
    applyConsent(allConsent);
    hideBanner();
  });

  document.getElementById('reject-non-essential').addEventListener('click', () => {
    const rejectConsent = { analitica: false, publicidad: false };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(rejectConsent));
    applyConsent(rejectConsent);
    hideBanner();
  });

  btnConfig.addEventListener('click', () => {
    configPanel.hidden = false;
  });

  btnCancel.addEventListener('click', () => {
    configPanel.hidden = true;
  });

  formConfig.addEventListener('submit', e => {
    e.preventDefault();
    const analitica = formConfig.elements['analitica'].checked;
    const publicidad = formConfig.elements['publicidad'].checked;
    const customConsent = { analitica, publicidad };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(customConsent));
    applyConsent(customConsent);
    configPanel.hidden = true;
    hideBanner();
  });
});
