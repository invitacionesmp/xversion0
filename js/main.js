const $ = s => document.querySelector(s);
const audio = $('#musica');
const sobre = $('#sobre');
let abierta = false;

/* 1. Romper el sello → mariposas → destellos → pantalla blanca con sonido mágico → invitación */
const sello = $('#sello'), magia = $('#magia'), flash = $('#destello');
function romper() {
  if (abierta) return;
  abierta = true;
  sello.classList.add('roto');
  sobre.classList.add('encendido');
  chispas();
  audio.volume = 0.8;
  audio.play().catch(() => {}); // si falta el mp3 o el navegador lo bloquea, la página sigue funcionando
  magia.muted = true; // se "desbloquea" con este toque para poder sonar más adelante
  magia.play().then(() => { magia.pause(); magia.currentTime = 0; magia.muted = false; }).catch(() => { magia.muted = false; });
  setTimeout(soltarMariposas, 650);
  setTimeout(destellos, 1200);
  setTimeout(() => { flash.classList.add('activo'); magia.play().catch(() => {}); }, 2200); // empieza el blanco y el sonido
  setTimeout(() => { $('#intro').remove(); document.body.classList.remove('bloqueado'); window.scrollTo(0, 0); }, 3300); // ya todo blanco: se cambia de pantalla
  setTimeout(() => document.body.classList.add('abierta'), 5400); // el blanco se disipa y aparece el nombre
  setTimeout(() => { flash.remove(); $('#brillos').remove(); $('#mariposas').remove(); }, 7200);
}
sello.addEventListener('click', romper);

function chispas() {
  for (let i = 0; i < 12; i++) {
    const c = document.createElement('span'), a = (i / 12) * 6.283 + Math.random() * 0.4, d = 40 + Math.random() * 50;
    c.className = 'chispa';
    c.style.setProperty('--dx', Math.cos(a) * d + 'px');
    c.style.setProperty('--dy', Math.sin(a) * d + 'px');
    sello.appendChild(c);
    setTimeout(() => c.remove(), 900);
  }
}

/* Destellos: estrellas doradas que aparecen por toda la pantalla antes del blanco */
function destellos() {
  const caja = $('#brillos');
  for (let i = 0; i < 34; i++) {
    const b = document.createElement('i');
    b.className = 'brillo';
    b.style.cssText = `left:${Math.random() * 100}%;top:${Math.random() * 100}%;--s:${14 + Math.random() * 34}px;animation-delay:${Math.random() * 0.9}s`;
    caja.appendChild(b);
  }
}

/* Mariposas: salen del sello, vuelan hacia arriba una sola vez y se eliminan */
const cielo = $('#mariposas');
const fotos = ['assets/images/ornaments/mariposa-bn.png', 'assets/images/ornaments/mariposa-morada.png'];
function soltarMariposas() {
  const r = sello.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2;
  for (let i = 0; i < 12; i++) {
    const t = 30 + Math.random() * 28, m = document.createElement('div'), img = document.createElement('img');
    m.className = 'mariposa';
    m.style.cssText = `left:${x - t / 2}px;top:${y - t / 2}px`;
    m.style.setProperty('--t', t + 'px');
    m.style.setProperty('--dx', (Math.random() - 0.5) * innerWidth * 1.2 + 'px');
    m.style.setProperty('--dy', -innerHeight * (0.35 + Math.random() * 0.6) + 'px');
    m.style.setProperty('--rot', (Math.random() - 0.5) * 70 + 'deg');
    m.style.setProperty('--d', 3 + Math.random() * 2 + 's');
    m.style.setProperty('--r', Math.random() * 0.7 + 's');
    m.style.setProperty('--a', -Math.random() + 's');
    img.src = fotos[i % 2];
    img.alt = '';
    m.appendChild(img);
    cielo.appendChild(m);
    m.addEventListener('animationend', e => { if (e.target === m) m.remove(); });
  }
}

/* 2. Reproductor */
const play = $('#play'), barra = $('#progreso');
const sincronizar = () => play.setAttribute('aria-pressed', String(!audio.paused));
play.addEventListener('click', () => { audio.paused ? audio.play().catch(() => {}) : audio.pause(); });
['play', 'pause'].forEach(ev => audio.addEventListener(ev, sincronizar));
audio.addEventListener('timeupdate', () => { if (audio.duration) barra.value = (audio.currentTime / audio.duration) * 100; });
barra.addEventListener('input', () => { if (audio.duration) audio.currentTime = (barra.value / 100) * audio.duration; });

/* 3. Cuenta regresiva (la fecha se cambia en data-fecha del index.html) */
const objetivo = new Date($('#cuenta').dataset.fecha).getTime();
const dos = n => String(n).padStart(2, '0');
function contar() {
  const t = Math.max(0, objetivo - Date.now());
  $('#c-d').textContent = Math.floor(t / 864e5);
  $('#c-h').textContent = dos(Math.floor(t / 36e5) % 24);
  $('#c-m').textContent = dos(Math.floor(t / 6e4) % 60);
  $('#c-s').textContent = dos(Math.floor(t / 1e3) % 60);
}
contar();
setInterval(contar, 1000);

/* 5. Aparición suave de cada sección al hacer scroll */
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
}), { threshold: 0.18 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* 6. Onda al tocar un botón */
document.querySelectorAll('.boton').forEach(b => b.addEventListener('click', e => {
  const r = b.getBoundingClientRect(), t = Math.max(r.width, r.height) / 4;
  const o = document.createElement('span');
  o.className = 'onda';
  o.style.cssText = `width:${t * 2}px;height:${t * 2}px;left:${e.clientX - r.left - t}px;top:${e.clientY - r.top - t}px`;
  b.appendChild(o);
  setTimeout(() => o.remove(), 650);
}));
