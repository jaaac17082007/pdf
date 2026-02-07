// Configuración del canvas
const canvas = document.getElementById('axolotlCanvas');
const ctx = canvas.getContext('2d');

// Ajustar tamaño del canvas
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Clase Ajolote
class Axolotl {
    constructor() {
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.size = 80;
        this.speedX = 2;
        this.speedY = 1;
        this.angle = 0;
        this.tailAngle = 0;
        this.tailSpeed = 0.1;
    }

    update() {
        // Movimiento del ajolote
        this.x += this.speedX;
        this.y += this.speedY;

        // Rebote en los bordes
        if (this.x > canvas.width - this.size || this.x < this.size) {
            this.speedX *= -1;
        }
        if (this.y > canvas.height - this.size || this.y < this.size) {
            this.speedY *= -1;
        }

        // Animación de la cola
        this.tailAngle += this.tailSpeed;
        this.angle = Math.sin(this.tailAngle) * 0.1;
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        
        // Voltear el ajolote según la dirección
        if (this.speedX < 0) {
            ctx.scale(-1, 1);
        }

        // Color dorado
        const goldGradient = ctx.createLinearGradient(-this.size, 0, this.size, 0);
        goldGradient.addColorStop(0, '#FFD700');
        goldGradient.addColorStop(0.5, '#FFA500');
        goldGradient.addColorStop(1, '#FFD700');

        // Cola del ajolote
        ctx.beginPath();
        const tailWave = Math.sin(this.tailAngle) * 15;
        ctx.moveTo(-this.size * 0.8, 0);
        ctx.quadraticCurveTo(-this.size * 1.2, tailWave, -this.size * 1.5, tailWave * 1.5);
        ctx.quadraticCurveTo(-this.size * 1.7, tailWave * 2, -this.size * 1.5, tailWave * 2.5);
        ctx.quadraticCurveTo(-this.size * 1.2, tailWave * 2, -this.size * 0.8, 10);
        ctx.closePath();
        ctx.fillStyle = goldGradient;
        ctx.fill();

        // Cuerpo del ajolote
        ctx.beginPath();
        ctx.ellipse(0, 0, this.size * 0.8, this.size * 0.4, 0, 0, Math.PI * 2);
        ctx.fillStyle = goldGradient;
        ctx.fill();

        // Cabeza del ajolote
        ctx.beginPath();
        ctx.ellipse(this.size * 0.6, 0, this.size * 0.5, this.size * 0.45, 0, 0, Math.PI * 2);
        ctx.fillStyle = goldGradient;
        ctx.fill();

        // Branquias (3 a cada lado)
        const branchiaColor = '#FF8C00';
        for (let i = 0; i < 3; i++) {
            const offsetY = (i - 1) * 15;
            // Branquias superiores
            ctx.beginPath();
            ctx.moveTo(this.size * 0.4, -this.size * 0.3 + offsetY);
            ctx.lineTo(this.size * 0.3, -this.size * 0.6 + offsetY);
            ctx.lineTo(this.size * 0.5, -this.size * 0.5 + offsetY);
            ctx.closePath();
            ctx.fillStyle = branchiaColor;
            ctx.fill();

            // Branquias inferiores (reflejadas)
            ctx.beginPath();
            ctx.moveTo(this.size * 0.4, this.size * 0.3 - offsetY);
            ctx.lineTo(this.size * 0.3, this.size * 0.6 - offsetY);
            ctx.lineTo(this.size * 0.5, this.size * 0.5 - offsetY);
            ctx.closePath();
            ctx.fillStyle = branchiaColor;
            ctx.fill();
        }

        // Ojos
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(this.size * 0.75, -10, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(this.size * 0.75, 10, 5, 0, Math.PI * 2);
        ctx.fill();

        // Brillo en los ojos
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(this.size * 0.75 + 2, -12, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(this.size * 0.75 + 2, 8, 2, 0, Math.PI * 2);
        ctx.fill();

        // Sonrisa
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(this.size * 0.8, 0, 8, 0.2, Math.PI - 0.2);
        ctx.stroke();

        // Patas delanteras
        ctx.fillStyle = goldGradient;
        ctx.beginPath();
        ctx.ellipse(this.size * 0.2, this.size * 0.4, 15, 8, 0.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(this.size * 0.2, -this.size * 0.4, 15, 8, -0.5, 0, Math.PI * 2);
        ctx.fill();

        // Patas traseras
        ctx.beginPath();
        ctx.ellipse(-this.size * 0.4, this.size * 0.4, 15, 8, 0.3, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(-this.size * 0.4, -this.size * 0.4, 15, 8, -0.3, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }
}

// Crear burbujas
class Bubble {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 20;
        this.size = Math.random() * 5 + 2;
        this.speed = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.5 + 0.3;
    }

    update() {
        this.y -= this.speed;
        if (this.y < -20) {
            this.y = canvas.height + 20;
            this.x = Math.random() * canvas.width;
        }
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Brillo de la burbuja
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.beginPath();
        ctx.arc(this.x - this.size * 0.3, this.y - this.size * 0.3, this.size * 0.3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

// Crear instancias
const axolotl = new Axolotl();
const bubbles = [];
for (let i = 0; i < 20; i++) {
    bubbles.push(new Bubble());
}

// Animación
function animate() {
    // Gradiente de fondo
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#667eea');
    gradient.addColorStop(1, '#764ba2');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Actualizar y dibujar burbujas
    bubbles.forEach(bubble => {
        bubble.update();
        bubble.draw();
    });

    // Actualizar y dibujar ajolote
    axolotl.update();
    axolotl.draw();

    requestAnimationFrame(animate);
}

animate();

// Scroll suave para los enlaces de navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Efecto de aparición al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.team-member, .proposal-card, .value-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});