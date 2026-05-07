/**
 * DOOM-WEB: Juego DOOM para navegador web
 * Sistema de renderizado 3D básico
 */

class DoomEngine {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        
        // Configuración del juego
        this.player = {
            x: 100,
            y: 100,
            angle: 0,
            fov: 60,
            vx: 0,
            vy: 0,
            speed: 5
        };

        this.keys = {};
        this.mouse = { x: 0, y: 0 };
        
        // Mapa simple
        this.map = this.generateMap();
        
        this.setupEventListeners();
        this.gameLoop();
    }

    generateMap() {
        // Mapa simple: 1 = pared, 0 = espacio vacío
        return [
            [1,1,1,1,1,1,1,1,1,1],
            [1,0,0,0,0,0,0,0,0,1],
            [1,0,1,0,1,0,0,0,0,1],
            [1,0,0,0,0,0,1,0,0,1],
            [1,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,1,1,1,0,0,1],
            [1,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,1],
            [1,1,1,1,1,1,1,1,1,1]
        ];
    }

    setupEventListeners() {
        document.addEventListener('keydown', (e) => {
            this.keys[e.key.toLowerCase()] = true;
            if (e.key === 'Escape') this.keys['escape'] = true;
        });

        document.addEventListener('keyup', (e) => {
            this.keys[e.key.toLowerCase()] = false;
        });

        document.addEventListener('mousemove', (e) => {
            if (document.pointerLockElement === this.canvas) {
                this.player.angle -= e.movementX * 0.5;
            }
        });

        this.canvas.addEventListener('click', () => {
            this.canvas.requestPointerLock();
        });
    }

    update() {
        // Movimiento del jugador
        const moveSpeed = 2;
        const angleRad = (this.player.angle * Math.PI) / 180;

        if (this.keys['w']) {
            this.player.x += Math.cos(angleRad) * moveSpeed;
            this.player.y += Math.sin(angleRad) * moveSpeed;
        }
        if (this.keys['s']) {
            this.player.x -= Math.cos(angleRad) * moveSpeed;
            this.player.y -= Math.sin(angleRad) * moveSpeed;
        }
        if (this.keys['a']) {
            this.player.x -= Math.cos(angleRad + Math.PI / 2) * moveSpeed;
            this.player.y -= Math.sin(angleRad + Math.PI / 2) * moveSpeed;
        }
        if (this.keys['d']) {
            this.player.x += Math.cos(angleRad + Math.PI / 2) * moveSpeed;
            this.player.y += Math.sin(angleRad + Math.PI / 2) * moveSpeed;
        }

        // Rotación con flechas
        if (this.keys['arrowleft']) {
            this.player.angle -= 3;
        }
        if (this.keys['arrowright']) {
            this.player.angle += 3;
        }
    }

    render() {
        // Limpiar pantalla
        this.ctx.fillStyle = '#0a0a0a';
        this.ctx.fillRect(0, 0, this.width, this.height);

        // Renderizar vista 3D simple usando raycasting
        this.renderRaycast();

        // Renderizar mini-mapa (esquina superior izquierda)
        this.renderMinimap();
    }

    renderRaycast() {
        const numRays = 120;
        const fov = this.player.fov;
        const angleStep = fov / numRays;
        
        for (let i = 0; i < numRays; i++) {
            const rayAngle = this.player.angle - fov / 2 + angleStep * i;
            const distance = this.castRay(rayAngle);
            
            if (distance) {
                const wallHeight = Math.max(10, (this.height * 50) / distance);
                const x = (i / numRays) * this.width;
                const y = (this.height - wallHeight) / 2;
                
                // Color basado en la distancia
                const brightness = Math.max(50, 255 - (distance * 10));
                this.ctx.fillStyle = `rgb(${brightness * 0.8}, 0, 0)`;
                this.ctx.fillRect(x, y, this.width / numRays + 1, wallHeight);
                
                // Añadir efecto de sombra
                this.ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
                this.ctx.fillRect(x, y + wallHeight * 0.7, this.width / numRays + 1, wallHeight * 0.3);
            }
        }
    }

    castRay(angle) {
        const maxDistance = 500;
        const angleRad = (angle * Math.PI) / 180;
        
        for (let d = 0; d < maxDistance; d += 2) {
            const x = this.player.x + Math.cos(angleRad) * d;
            const y = this.player.y + Math.sin(angleRad) * d;
            
            const mapX = Math.floor(x / 32);
            const mapY = Math.floor(y / 32);
            
            if (mapX < 0 || mapX >= this.map[0].length ||
                mapY < 0 || mapY >= this.map.length) {
                return d;
            }
            
            if (this.map[mapY][mapX] === 1) {
                return d;
            }
        }
        return null;
    }

    renderMinimap() {
        const minimapSize = 80;
        const scale = minimapSize / (this.map[0].length * 32);
        
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(10, 10, minimapSize, minimapSize);
        this.ctx.strokeStyle = '#ff0000';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(10, 10, minimapSize, minimapSize);
        
        // Dibujar mapa
        for (let y = 0; y < this.map.length; y++) {
            for (let x = 0; x < this.map[0].length; x++) {
                if (this.map[y][x] === 1) {
                    this.ctx.fillStyle = '#ffff00';
                } else {
                    this.ctx.fillStyle = '#333333';
                }
                this.ctx.fillRect(10 + x * scale, 10 + y * scale, scale, scale);
            }
        }
        
        // Dibujar jugador
        this.ctx.fillStyle = '#ff0000';
        this.ctx.beginPath();
        this.ctx.arc(10 + (this.player.x / 32) * scale, 10 + (this.player.y / 32) * scale, 3, 0, Math.PI * 2);
        this.ctx.fill();
    }

    gameLoop() {
        this.update();
        this.render();
        requestAnimationFrame(() => this.gameLoop());
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const engine = new DoomEngine('canvas');
    document.getElementById('loading').style.display = 'none';
});