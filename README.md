# Invitación digital de XV años

Abre `index.html` en el navegador (mejor desde un servidor local o hosting, para que la música funcione en todos los navegadores).

## Dónde va cada cosa

| Qué | Ruta | Medida sugerida |
|---|---|---|
| Foto de portada | `assets/images/hero/portada.jpg` | 900 x 1400 px, vertical |
| Foto de cierre | `assets/images/gallery/foto-2.jpg` | 900 x 1400 px, vertical |
| Música | `assets/audio/cancion.mp3` | MP3, menos de 5 MB |
| Rosas del marco (se repite a los lados) | `assets/images/ornaments/rosas-lirios.png` | PNG transparente, vertical |
| Mariposas voladoras | `assets/images/ornaments/mariposa-bn.png` y `mariposa-morada.png` | PNG transparente |
| Sobre (sin sello) | `assets/images/ornaments/sobre.png` | PNG transparente |
| Sello de cera (separado) | `assets/images/ornaments/sello.png` | PNG transparente |
| Marco dorado de la primera pantalla | `assets/images/ornaments/marco-intro.png` | PNG transparente, vertical |
| Marco dorado del nombre | `assets/images/ornaments/marco-nombre.png` | PNG transparente, horizontal |
| Tiara y divisor | `assets/images/ornaments/` | PNG (el divisor es SVG) |
| Íconos (iglesia, ubicación, dress code, música) | `assets/images/icons/` | PNG |
| Fuentes propias (opcional) | `assets/fonts/` | WOFF2 |

Los archivos actuales son de ejemplo: reemplázalos conservando el mismo nombre.

## Qué editar en `index.html`

- Texto del papel que sale del sobre: `<p class="carta-texto">` dentro de `.carta`.
- Nombre, apellidos, padres, padrinos, lugares y horarios (textos).
- Fecha de la cuenta regresiva: atributo `data-fecha` de `#cuenta`.
- Botones "Ver ubicación": enlaces de Google Maps.
- Botones "Recomendar" y "Confirmar": cambia el número en `wa.me/549XXXXXXXXXX`.

Las rosas se cargan desde `css/styles.css` (clase `.marco`) y las mariposas desde `js/main.js`, por eso no aparecen en el HTML. Las mariposas solo salen al romper el sello; el marco dorado solo se ve en la pantalla del sobre.

## Archivos

- `css/styles.css`: diseño, marco de rosas, sobre y animaciones.
- `js/main.js`: apertura del sobre, música, cuenta regresiva, mariposas y efectos al hacer scroll.

Las tipografías (Mrs Saint Delafield, Pinyon Script y Montserrat) se cargan desde Google Fonts.
