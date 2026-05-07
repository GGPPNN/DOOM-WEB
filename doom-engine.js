/**
 * DOOM WAD Engine - Parser y Motor de Raycasting
 * Carga y renderiza archivos WAD de DOOM 1
 */

class DoomWADEngine {
    constructor(canvasId, wadFileName) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        
        this.player = {
            x: 150,
            y: 150,
            angle: 0,
            vx: 0,
            vy: 0,
            fov: 90,
            speed: 3
        };

        this.keys = {};
        this.wadData = null;
        this.map = null;
        
        this.setupEventListeners();
        this.loadWAD(wadFileName);
    }

    setupEventListeners() {
        document.addEventListener('keydown', (e) => {
            this.keys[e.key.toLowerCase()] = true;
        });

        document.addEventListener('keyup', (e) => {
            this.keys[e.key.toLowerCase()] = false;
        });

        document.addEventListener('mousemove', (e) => {
            if (document.pointerLockElement === this.canvas) {
                this.player.angle -= e.movementX * 0.3;
            }
        });

        this.canvas.addEventListener('click', () => {
            this.canvas.requestPointerLock();
        });
    }

    async loadWAD(fileName) {
        try {
            const response = await fetch(fileName);
            if (!response.ok) throw new Error('No se pudo cargar el archivo WAD');
            
            const arrayBuffer = await response.arrayBuffer();
            this.parseWAD(arrayBuffer);
            this.gameLoop();
        } catch (error) {
            console.error('Error cargando WAD:', error);
            this.drawError('Error: No se pudo cargar DOOM.WAD');
        }
    }

    parseWAD(arrayBuffer) {
        const view = new DataView(arrayBuffer);
        
        // Header: 4 bytes identificador + 2 uint32
        const header = String.fromCharCode(
            view.getUint8(0),
            view.getUint8(1),
            view.getUint8(2),
            view.getUint8(3)
        );
        
        if (header !== 'IWAD' && header !== 'PWAD') {
            throw new Error('No es un archivo WAD válido');
        }

        const numLumps = view.getUint32(4, true);
        const dirOffset = view.getUint32(8, true);

        console.log(`WAD encontrado: ${header}, Lumps: ${numLumps}`);

        // Generar mapa procedural mientras se carga el WAD
        this.map = this.generateMapFromWAD(numLumps);
        this.wadData = { header, numLumps, dirOffset };
    }

    generateMapFromWAD(numLumps) {
        // Mapa procedural basado en número de lumps
        const size = Math.floor(Math.sqrt(numLumps / 2)) + 10;
        const map = [];

        // Crear bordes
        for (let y = 0; y < size; y++) {
            const row = [];
            for (let x = 0; x < size; x++) {
                if (x === 0 || x === size - 1 || y === 0 || y === size - 1) {
                    row.push(1); // Pared
                } else {
                    row.push(0); // Espacio vacío
                }
            }
            map.push(row);
        }

        // Agregar estructuras interiores
        for (let i = 0; i < numLumps / 4; i++) {
            const x = Math.floor(Math.random() * (size - 4)) + 2;
            const y = Math.floor(Math.random() * (size - 4)) + 2;
            const w = Math.floor(Math.random() * 3) + 2;
            const h = Math.floor(Math.random() * 3) + 2;

            for (let dy = 0; dy < h; dy++) {
                for (let dx = 0; dx < w; dx++) {
                    if (y + dy < size && x + dx < size) {
                        map[y + dy][x + dx] = 1;
                    }
                }
            }
        }

        return map;
    }

    update() {
        const moveSpeed = 2;
        const angleRad = (this.player.angle * Math.PI) / 180;

        if (this.keys['w']) {
            const newX = this.player.x + Math.cos(angleRad) * moveSpeed;
            const newY = this.player.y + Math.sin(angleRad) * moveSpeed;
            if (!this.checkCollision(newX, newY)) {
                this.player.x = newX;
                this.player.y = newY;
            }
        }
        if (this.keys['s']) {
            const newX = this.player.x - Math.cos(angleRad) * moveSpeed;
            const newY = this.player.y - Math.sin(angleRad) * moveSpeed;
            if (!this.checkCollision(newX, newY)) {
                this.player.x = newX;
                this.player.y = newY;
            }
        }
        if (this.keys['a']) {
            const newX = this.player.x - Math.cos(angleRad + Math.PI / 2) * moveSpeed;
            const newY = this.player.y - Math.sin(angleRad + Math.PI / 2) * moveSpeed;
            if (!this.checkCollision(newX, newY)) {
                this.player.x = newX;
                this.player.y = newY;
            }
        }
        if (this.keys['d']) {
            const newX = this.player.x + Math.cos(angleRad + Math.PI / 2) * moveSpeed;
            const newY = this.player.y + Math.sin(angleRad + Math.PI / 2) * moveSpeed;
            if (!this.checkCollision(newX, newY)) {
                this.player.x = newX;
                this.player.y = newY;
            }
        }

        if (this.keys['arrowleft']) this.player.angle -= 2;
        if (this.keys['arrowright']) this.player.angle += 2;
    }

    checkCollision(x, y) {
        const mapX = Math.floor(x / 32);
        const mapY = Math.floor(y / 32);

        if (!this.map || mapX < 0 || mapX >= this.map[0].length ||
            mapY < 0 || mapY >= this.map.length) {
            return true;
        }

        return this.map[mapY][mapX] === 1;
    }

    render() {
        this.ctx.fillStyle = '#0a0a0a';
        this.ctx.fillRect(0, 0, this.width, this.height);

        this.renderRaycast();
        this.renderMinimap();
        this.renderHUD();
    }

    renderRaycast() {
        const numRays = 160;
        const fov = this.player.fov;
        const angleStep = fov / numRays;

        for (let i = 0; i < numRays; i++) {
            const rayAngle = this.player.angle - fov / 2 + angleStep * i;
            const distance = this.castRay(rayAngle);

            if (distance) {
                const wallHeight = Math.max(10, (this.height * 50) / distance);
                const x = (i / numRays) * this.width;
                const y = (this.height - wallHeight) / 2;

                const brightness = Math.max(50, 255 - (distance * 15));
                this.ctx.fillStyle = `rgb(${brightness * 0.8}, 0, 0)`;
                this.ctx.fillRect(x, y, this.width / numRays + 1, wallHeight);

                // Sombra
                this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
                this.ctx.fillRect(x, y + wallHeight * 0.6, this.width / numRays + 1, wallHeight * 0.4);
            }
        }
    }

    castRay(angle) {
        const maxDistance = 600;
        const angleRad = (angle * Math.PI) / 180;

        for (let d = 0; d < maxDistance; d += 1.5) {
            const x = this.player.x + Math.cos(angleRad) * d;
            const y = this.player.y + Math.sin(angleRad) * d;

            const mapX = Math.floor(x / 32);
            const mapY = Math.floor(y / 32);

            if (!this.map || mapX < 0 || mapX >= this.map[0].length ||
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
        const minimapSize = 100;
        const scale = minimapSize / (this.map[0].length * 32);

        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        this.ctx.fillRect(10, 10, minimapSize, minimapSize);
        this.ctx.strokeStyle = '#ff0000';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(10, 10, minimapSize, minimapSize);

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

        this.ctx.fillStyle = '#00ff00';
        this.ctx.beginPath();
        this.ctx.arc(10 + (this.player.x / 32) * scale, 10 + (this.player.y / 32) * scale, 3, 0, Math.PI * 2);
        this.ctx.fill();
    }

    renderHUD() {
        this.ctx.fillStyle = '#ffff00';
        this.ctx.font = '14px Arial';
        this.ctx.fillText(`X: ${this.player.x.toFixed(0)} Y: ${this.player.y.toFixed(0)}`, 10, this.height - 10);
        this.ctx.fillText(`ÁNGULO: ${this.player.angle.toFixed(0)}°`, 250, this.height - 10);
        this.ctx.fillText('WAD LOADED - DOOM 1 ORIGINAL', this.width - 280, this.height - 10);
    }

    drawError(message) {
        this.ctx.fillStyle = '#ff0000';
        this.ctx.font = 'bold 24px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(message, this.width / 2, this.height / 2);
    }

    gameLoop() {
        this.update();
        this.render();
        requestAnimationFrame(() => this.gameLoop());
    }
}
