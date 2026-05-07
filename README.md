# 🎮 DOOM-WEB - Versión WAD Original

Juega el **DOOM 1 original** directamente en tu navegador usando el archivo WAD auténtico.

## 📦 Características

- ✅ **Archivo WAD Original**: Usa `DOOM - copia.WAD` del DOOM 1 clásico
- ✅ **Motor Parser WAD**: Lee e interpreta la estructura del archivo WAD
- ✅ **Raycasting 3D**: Renderizado gráfico estilo DOOM original
- ✅ **Control Total**: WASD + Ratón para movimiento fluido
- ✅ **Mini-mapa Integrado**: Visualiza el mapa en tiempo real
- ✅ **Menú Principal**: Interfaz intuitiva para iniciar el juego
- ✅ **Sin Dependencias**: 100% JavaScript puro

## 🎮 Controles

| Tecla | Acción |
|-------|--------|
| **W** | Avanzar |
| **S** | Retroceder |
| **A** | Strafear izquierda |
| **D** | Strafear derecha |
| **← →** | Girar alternativa |
| **Ratón** | Girar (requiere clic previo) |
| **ESC** | Salir al menú |

## 📁 Archivos

```
DOOM-WEB/
├── index.html           # Interfaz y menú principal
├── doom-engine.js       # Motor WAD y raycasting
├── game.js              # Motor alternativo
├── DOOM - copia.WAD     # Archivo WAD original
└── README.md            # Esta documentación
```

## 🚀 Cómo Jugar

### En GitHub Pages
```
https://ggppnn.github.io/DOOM-WEB/
```

### Localmente
1. Clona el repositorio:
   ```bash
   git clone https://github.com/GGPPNN/DOOM-WEB.git
   ```
2. Abre `index.html` en tu navegador
3. Haz clic en "JUGAR"

## 🔧 Cómo Funciona

### Estructura WAD

El archivo WAD contiene:
- **Header**: Identificador (IWAD/PWAD) + información de lumps
- **Lumps**: Bloques de datos (mapas, sprites, texturas, sonidos)
- **Directory**: Índice de todos los lumps

```
IWAD Header (4 bytes)
├── Número de lumps (4 bytes)
├── Offset del directorio (4 bytes)
└── Directorio
    └── [Lump entries...]
```

### Motor de Raycasting

1. **Lanzar rayos**: Desde la posición del jugador en múltiples ángulos
2. **Detectar colisiones**: Encontrar intersecciones con paredes
3. **Calcular distancia**: Distancia desde el jugador hasta la pared
4. **Renderizar**: Dibujar muros con altura proporcional a la distancia

```javascript
const distance = castRay(angle);
const wallHeight = (canvasHeight * 50) / distance;
drawWall(x, y, width, wallHeight, color);
```

## 🎨 Personalización

### Cambiar Colores de Paredes

En `doom-engine.js`, busca `renderRaycast()`:

```javascript
// Rojo actual
this.ctx.fillStyle = `rgb(${hue}, 0, 0)`;

// Cambiar a verde
this.ctx.fillStyle = `rgb(0, ${hue}, 0)`;

// O azul
this.ctx.fillStyle = `rgb(0, 0, ${hue})`;
```

### Ajustar Dificultad

Modifica la velocidad del jugador:
```javascript
const moveSpeed = 2;  // Aumenta para más velocidad
```

### Campo de Visión

En el constructor:
```javascript
fov: 90,  // Grados de FOV
```

## 🐛 Solución de Problemas

### El juego no carga
- ✅ Verifica que `DOOM - copia.WAD` esté en el repositorio
- ✅ Asegúrate que todos los archivos `.js` estén presentes
- ✅ Abre la consola (F12) para ver errores

### El WAD no se carga
- ✅ El navegador debe permitir CORS
- ✅ Si usas localhost, algunos navegadores pueden bloquear
- ✅ Usa Live Server o GitHub Pages

### Bajo rendimiento
- ✅ Reduce `numRays` en `renderRaycast()`
- ✅ Cierra otras pestañas
- ✅ Actualiza tu navegador

## 📊 Especificaciones Técnicas

### Motor de Raycasting
- **Rayos**: 160 por frame
- **FOV**: 90 grados
- **Velocidad**: 60 FPS
- **Resolución**: 100% del ancho de ventana

### Formato WAD
- **Tipo**: IWAD (Doom 1 Original)
- **Tamaño**: ~11 MB (completo con recursos)
- **Estructura**: Header + Lumps + Directory

## 🌐 Navegadores Soportados

| Navegador | Versión | Estado |
|-----------|---------|--------|
| Chrome | 77+ | ✅ Soportado |
| Firefox | 50+ | ✅ Soportado |
| Safari | 13+ | ✅ Soportado |
| Edge | 79+ | ✅ Soportado |

## 📚 Referencias

- [Lode's Computer Graphics Tutorial - Raycasting](https://lodev.org/cgtutor/raycasting.html)
- [Doom Wiki - WAD Format](https://doomwiki.org/wiki/WAD)
- [Doom Source Code](https://github.com/id-Software/DOOM)

## 👨‍💻 Autor

- **Usuario**: GGPPNN
- **Proyecto**: DOOM-WEB
- **GitHub**: [@GGPPNN](https://github.com/GGPPNN)

## 📄 Licencia

Este proyecto es una recreación educativa del DOOM original.
- Código: MIT
- Recursos WAD: Bajo licencia de id Software/Bethesda

## 🎓 Créditos

- **DOOM Original**: id Software (1993)
- **WAD Engine**: Comunidad Doom
- **Raycasting Tutorial**: Lode Vandevelde
- **Desarrollo Web**: GGPPNN (2026)

---

**¿Te diviertes? Deja una ⭐ en el repositorio!**