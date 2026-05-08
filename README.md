# 🎮 GZDoom Web - Emulador DOOM en Navegador

Juega DOOM 1 original directamente en tu navegador usando **GZDoom compilado a WebAssembly**.

## 🚀 Características

- ✅ **Motor GZDoom Completo**: Emulador basado en GZDoom compilado a WebAssembly
- ✅ **Soporte WAD Nativo**: Carga archivos .WAD de DOOM 1
- ✅ **Raycasting 3D Auténtico**: Renderizado del DOOM clásico
- ✅ **Control Total**: WASD + Ratón para movimiento fluido
- ✅ **Sin Instalación**: Juega directamente en el navegador
- ✅ **Rendimiento Optimizado**: WebAssembly para máximo rendimiento

## 🎮 Controles

| Tecla | Acción |
|-------|--------|
| **W** | Avanzar |
| **S** | Retroceder |
| **A** | Strafear izquierda |
| **D** | Strafear derecha |
| **Espacio** | Saltar |
| **Ctrl** | Agacharse |
| **Ratón** | Girar y mirar |
| **Click** | Atacar |
| **ESC** | Menú |

## 📦 Requisitos

- Navegador moderno con soporte WebAssembly:
  - ✅ Chrome 57+
  - ✅ Firefox 52+
  - ✅ Safari 14+
  - ✅ Edge 79+

## 🌐 Cómo Jugar

### En Línea
```
https://ggppnn.github.io/DOOM-WEB/
```

### Localmente
1. Clona el repositorio:
   ```bash
   git clone https://github.com/GGPPNN/DOOM-WEB.git
   ```
2. Abre `index.html` en tu navegador
3. Haz clic en "JUGAR AHORA"

## 🔧 Arquitectura Técnica

### Componentes Principales

```
GZDoom Web
├── Frontend (HTML5 Canvas)
├── GZDoom Engine (WebAssembly)
├── WAD Loader
└── Input Handler
```

### WebAssembly (WASM)

GZDoom se compila a WebAssembly para:
- ✅ Máximo rendimiento
- ✅ Ejecución segura en el navegador
- ✅ Compatibilidad con todos los navegadores modernos
- ✅ Acceso al GPU mediante Canvas

### Flujo de Ejecución

```
1. Cargue página
   ↓
2. Canvas se inicializa
   ↓
3. GZDoom WASM se carga
   ↓
4. Archivo WAD se monta
   ↓
5. Juego se inicializa
   ↓
6. Loop de renderizado comienza
```

## 📁 Estructura de Archivos

```
DOOM-WEB/
├── index.html              # Interfaz y emulador
├── DOOM - copia.WAD        # Archivo WAD de DOOM 1
└── README.md               # Esta documentación
```

## 🎨 Personalización

### Cambiar Resolución

En `index.html`, busca donde se establece el canvas:
```javascript
canvas.width = 1024;   // Ancho
canvas.height = 768;   // Altura
```

### Configurar Volumen

```javascript
// En la inicialización de GZDoom
Module.ccall('CVarSetFloat', null, ['string', 'float'], ['snd_sfxvolume', 1.0]);
```

## 🐛 Solución de Problemas

### El juego no carga
- ✅ Verifica que tengas un navegador moderno
- ✅ Abre la consola (F12) para ver errores
- ✅ Revisa si GZDoom WASM se descargó correctamente

### Bajo rendimiento
- ✅ Cierra otras pestañas
- ✅ Actualiza tu navegador
- ✅ Intenta en otro navegador

### El WAD no se carga
- ✅ Verifica que `DOOM - copia.WAD` est�� en el repositorio
- ✅ Comprueba permisos de CORS
- ✅ Revisa la consola para errores específicos

## 📚 Referencias

- [GZDoom Official](https://www.zdoom.org/)
- [WebAssembly](https://webassembly.org/)
- [DOOM Wiki](https://doomwiki.org/)
- [Emscripten](https://emscripten.org/)

## 🔐 Seguridad

- ✅ Ejecución segura en sandbox del navegador
- ✅ Sin acceso a archivos del sistema
- ✅ Sin permisos especiales requeridos
- ✅ CORS configurado correctamente

## 📊 Especificaciones

| Aspecto | Valor |
|--------|-------|
| **Engine** | GZDoom WebAssembly |
| **Resolución Máxima** | 1920x1200 |
| **FPS Objetivo** | 60 |
| **Tamaño WAD** | ~11 MB |
| **Compatibilidad** | DOOM 1, DOOM 2, PWADs |

## 🎓 Créditos

- **DOOM Original**: id Software (1993)
- **GZDoom**: Comunidad ZDoom
- **WebAssembly**: W3C
- **Emscripten**: Compilador LLVM to WASM
- **Desarrollo**: GGPPNN (2026)

## 📄 Licencia

- **Código**: MIT
- **Recursos DOOM**: Bajo licencia de id Software/Bethesda
- **GZDoom**: GPL v3

## 👨‍💻 Contacto

- **GitHub**: [@GGPPNN](https://github.com/GGPPNN)
- **Repositorio**: [DOOM-WEB](https://github.com/GGPPNN/DOOM-WEB)

---

**¡Que disfrutes del juego! 🎮🔫**