/* =========================================
   INTERACTIVIDAD DE LA PÁGINA
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    crearCorazonesFlotantes();
    activarRevelado();
    activarLightbox();
    activarBarraProgreso();
    activarBotonRegalo();
    activarMusica();
});


/* =========================================
   1 · CORAZONES FLOTANTES DE FONDO
========================================= */

function crearCorazonesFlotantes() {

    const contenedor = document.createElement('div');
    contenedor.className = 'corazones-fondo';
    document.body.appendChild(contenedor);

    const simbolos = ['🤍', '♡', '✧'];

    setInterval(() => {

        const corazon = document.createElement('span');
        corazon.className = 'corazon-flotante';
        corazon.textContent = simbolos[Math.floor(Math.random() * simbolos.length)];

        corazon.style.left = Math.random() * 100 + 'vw';
        corazon.style.fontSize = (14 + Math.random() * 18) + 'px';
        corazon.style.animationDuration = (9 + Math.random() * 6) + 's';

        contenedor.appendChild(corazon);

        setTimeout(() => corazon.remove(), 16000);

    }, 1600);
}


/* =========================================
   2 · REVELAR ELEMENTOS AL HACER SCROLL
========================================= */

function activarRevelado() {

    const elementos = document.querySelectorAll(
        '.foto, .titulo-recuerdos, .titulo-manillas, .manilla, .carta-final, .despedida-final'
    );

    elementos.forEach(el => el.classList.add('reveal'));

    const observador = new IntersectionObserver((entradas) => {

        entradas.forEach(entrada => {

            if (entrada.isIntersecting) {
                entrada.target.classList.add('reveal-activo');
                observador.unobserve(entrada.target);
            }

        });

    }, { threshold: 0.15 });

    elementos.forEach(el => observador.observe(el));
}


/* =========================================
   3 · LIGHTBOX PARA LAS FOTOS
========================================= */

function activarLightbox() {

    const fotos = document.querySelectorAll('.galeria img, .manilla img');

    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.innerHTML = `
        <span class="lightbox-cerrar">&times;</span>
        <img class="lightbox-imagen" alt="Foto ampliada">
    `;
    document.body.appendChild(overlay);

    const imagenGrande = overlay.querySelector('.lightbox-imagen');

    fotos.forEach(img => {

        img.style.cursor = 'zoom-in';

        img.addEventListener('click', () => {
            imagenGrande.src = img.src;
            overlay.classList.add('activo');
        });

    });

    overlay.addEventListener('click', () => {
        overlay.classList.remove('activo');
    });
}


/* =========================================
   4 · BARRA DE PROGRESO DE LECTURA
========================================= */

function activarBarraProgreso() {

    const barra = document.createElement('div');
    barra.className = 'barra-progreso';
    document.body.appendChild(barra);

    window.addEventListener('scroll', () => {

        const alturaTotal = document.documentElement.scrollHeight - window.innerHeight;
        const progreso = (window.scrollY / alturaTotal) * 100;

        barra.style.width = progreso + '%';

    });
}


/* =========================================
   5 · EXPLOSIÓN DE CORAZONES AL ABRIR EL REGALO
========================================= */

function activarBotonRegalo() {

    const boton = document.querySelector('.boton-principal');

    if (!boton) return;

    boton.addEventListener('click', () => {
        explotarCorazones();
    });
}


function explotarCorazones() {

    const simbolos = ['🤍', '♡', '💗'];

    for (let i = 0; i < 26; i++) {

        const particula = document.createElement('span');
        particula.className = 'corazon-explosion';
        particula.textContent = simbolos[Math.floor(Math.random() * simbolos.length)];

        const angulo = Math.random() * Math.PI * 2;
        const distancia = 120 + Math.random() * 180;

        particula.style.setProperty('--x', Math.cos(angulo) * distancia + 'px');
        particula.style.setProperty('--y', Math.sin(angulo) * distancia + 'px');

        document.body.appendChild(particula);

        setTimeout(() => particula.remove(), 1300);
    }
}


/* =========================================
   6 · MÚSICA DE FONDO (OPCIONAL)
========================================= */

function activarMusica() {

    const boton = document.querySelector('.boton-musica');
    const audio = document.querySelector('#musica-fondo');

    if (!boton || !audio) return;

    boton.addEventListener('click', () => {

        if (audio.paused) {
            audio.play();
            boton.textContent = '🔊';
        } else {
            audio.pause();
            boton.textContent = '🔈';
        }

    });
}
