# 🎮 DOOM-WEB

Un juego DOOM completamente funcional para tu navegador web, construido con **JavaScript puro** sin dependencias externas.

## 📋 Descripción

DOOM-WEB es una implementación del clásico juego DOOM en HTML5 Canvas utilizando la técnica original de **raycasting 3D**. Explora laberintos en primera persona en tu navegador.

## 🚀 Características

- ✅ **Raycasting 3D Real**: Usa la misma técnica que el DOOM original de 1993
- ✅ **Movimiento Fluido**: Control total con WASD + Ratón
- ✅ **Mini-mapa en Vivo**: Visualiza el mapa mientras juegas
- ✅ **Sin Dependencias**: 100% JavaScript puro
- ✅ **Optimizado**: 60 FPS en navegadores modernos
- ✅ **Responsive**: Funciona en desktop y tablets

## 🎮 Controles

| Tecla | Acción |
|-------|--------|
| **W** | Avanzar |
| **S** | Retroceder |
| **A** | Strafear izquierda |
| **D** | Strafear derecha |
| **← →** | Girar (alternativa) |
| **Ratón** | Girar (mueve el ratón) |

> **Nota**: Haz clic en el juego primero para activar el control del ratón.

## 📦 Archivos

```
DOOM-WEB/
├── index.html      # Página principal (interfaz y canvas)
├── game.js         # Motor del juego (raycasting 3D)
└── README.md       # Este archivo
```

## 🌐 Cómo Usar

### Opción 1: GitHub Pages (Recomendado)
1. Ve a Settings de tu repositorio
2. Busca "GitHub Pages"
3. Activa Pages en la rama `main`
4. Accede a: `https://GGPPNN.github.io/DOOM-WEB/`

### Opción 2: Localmente
1. Clona el repositorio:
   ```bash
   git clone https://github.com/GGPPNN/DOOM-WEB.git
   cd DOOM-WEB
   ```
2. Abre `index.html` en tu navegador

### Opción 3: Live Server (VS Code)
1. Instala la extensión "Live Server"
2. Click derecho en `index.html` → "Open with Live Server"

## 🛠️ Estructura del Código

### game.js - Motor Principal

```javascript
// Clase principal del motor DOOM
class DoomEngine {
    constructor(canvasId)      // Inicializa el motor
    generateMap()              // Crea un mapa procedural
    setupEventListeners()      // Configura controles
    update()                   // Actualiza posición del jugador
    render()                   // Dibuja los gráficos
    renderRaycast()           // Renderiza la vista 3D
    castRay(angle)            // Calcula intersección de rayo
    renderMinimap()           // Dibuja el minimapa
    gameLoop()                // Loop principal del juego
}
```

## 🗺️ Sistema de Mapas

El mapa es una matriz 2D donde:
- **1** = Pared
- **0** = Espacio vacío

```javascript
this.map = [
    [1,1,1,1,1,1],
    [1,0,0,0,0,1],
    [1,0,1,0,0,1],
    [1,0,0,0,0,1],
    [1,0,0,0,0,1],
    [1,1,1,1,1,1]
];
```

### Cómo Editar el Mapa

1. Abre `game.js`
2. Busca la función `generateMap()`
3. Modifica el array según desees:
   ```javascript
   generateMap() {
       return [
           [1,1,1,1,1,1,1,1,1,1],
           [1,0,0,0,0,0,0,0,0,1],
           // ... más filas
       ];
   }
   ```

## 🎨 Personalización

### Cambiar el Color de las Paredes

En `game.js`, busca `renderRaycast()`:
```javascript
// Cambiar de rojo (#ff0000) a otro color
this.ctx.fillStyle = `rgb(${brightness * 0.8}, 0, 0)`;
// A:
this.ctx.fillStyle = `rgb(0, ${brightness * 0.8}, 0)`; // Verde
```

### Ajustar la Velocidad del Jugador

En `update()`:
```javascript
const moveSpeed = 2;  // Aumenta para más velocidad
```

### Cambiar el Campo de Visión

En el constructor:
```javascript
fov: 60,  // Grados de FOV (aumenta para ver más)
```

## 🔧 Requisitos

- Navegador moderno con soporte para:
  - HTML5 Canvas
  - ES6 JavaScript
  - Pointer Lock API (para control de ratón)

### Navegadores Soportados
- ✅ Chrome/Chromium 77+
- ✅ Firefox 50+
- ✅ Safari 13+
- ✅ Edge 79+

## 🚧 Mejoras Futuras

- [ ] Agregación de enemigos (Imp, Demon, etc.)
- [ ] Sistema de armas
- [ ] Munición y salud
- [ ] Múltiples niveles
- [ ] Texturas de paredes
- [ ] Sonidos
- [ ] Efectos de partículas
- [ ] Puntuación y ranking

## 🐛 Solución de Problemas

### El juego no carga
- Verifica que ambos archivos (`index.html` y `game.js`) estén en el mismo directorio
- Abre la consola (F12) y busca errores

### El ratón no funciona
- Haz clic en el canvas primero
- Verifica que el navegador tenga permisos de Pointer Lock

### Bajo rendimiento
- Reduce el número de rayos en `renderRaycast()` (línea con `numRays`)
- Cierra otras pestañas del navegador

## 📚 Referencias Técnicas

### Raycasting 3D
El raycasting es una técnica de renderizado que:
1. Lanza rayos desde la posición del jugador
2. Detecta colisiones con paredes
3. Calcula la distancia
4. Dibuja muros según la distancia (efecto de perspectiva)

### Fórmulas Matemáticas Utilizadas

```
Conversión de ángulos: radianes = ángulos * π / 180
Posición del rayo: x = jugador.x + cos(ángulo) * distancia
                   y = jugador.y + sen(ángulo) * distancia
Altura de muro: altura = (canvas.height * 50) / distancia
```

## 📖 Tutoriales Relacionados

- [Raycasting en Lode's Computer Graphics Tutorial](https://lodev.org/cgtutor/raycasting.html)
- [Making Games with Raycast](https://en.wikipedia.org/wiki/Raycasting)
- [DOOM Engine Architecture](https://www.doomworld.com/)

## 👨‍💻 Contribuciones

¿Quieres mejorar DOOM-WEB? 
1. Fork el repositorio
2. Crea una rama (`git checkout -b feature/nueva-caracteristica`)
3. Commit los cambios (`git commit -m 'Agrega nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 🎓 Créditos

- Concepto original basado en **DOOM (1993)** por id Software
- Técnica de raycasting documentada por [Lode Vandevelde](https://lodev.org/)
- Desarrollado en 2026 para aprender gráficos 3D en web

## 📞 Contacto

- **Autor**: GGPPNN
- **GitHub**: [@GGPPNN](https://github.com/GGPPNN)
- **Repositorio**: [DOOM-WEB](https://github.com/GGPPNN/DOOM-WEB)

---

**¿Disfrutas del juego? Deja una ⭐ en el repositorio!**