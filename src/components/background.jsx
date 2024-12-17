import React, { useRef, useEffect } from 'react';
import './background.css';

const Background = ({ speed = 400, activateFireworks = false }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fireworks = [];
    const particles = [];
    const stars = [];

    class Star {
      constructor(x, y, radius, opacity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.opacity = opacity;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.fill();
        ctx.restore();
      }
    }

    class Firework {
      constructor(x, y, targetX, targetY) {
        this.x = x;
        this.y = y;
        this.targetX = targetX;
        this.targetY = targetY;
        this.speed = 2;
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        this.radius = 2;
        this.done = false;
      }

      update() {
        const dx = this.targetX - this.x;
        const dy = this.targetY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.speed) {
          this.done = true;
          explode(this.targetX, this.targetY, this.color);
        } else {
          this.x += (dx / distance) * this.speed;
          this.y += (dy / distance) * this.speed;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    class Particle {
      constructor(x, y, color, generation = 1) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.radius = generation === 1 ? Math.random() * 2 + 1 : Math.random() * 1 + 0.5;
        this.alpha = 1;
        this.speed = generation === 1 ? Math.random() * 4 + 1 : Math.random() * 2 + 0.5;
        this.angle = Math.random() * Math.PI * 2;
        this.friction = 0.98;
        this.generation = generation;
        this.fadeRate = generation === 1 ? 0.02 : 0.04;
      }

      update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.speed *= this.friction;
        this.alpha -= this.fadeRate;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
      }
    }

    const createStars = () => {
      const starCount = 150;
      for (let i = 0; i < starCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * 1.5;
        const opacity = Math.random() * 0.8 + 0.2;
        stars.push(new Star(x, y, radius, opacity));
      }
    };

    const drawStars = () => {
      stars.forEach((star) => star.draw());
    };

    const explode = (x, y, color, generation = 1) => {
      const particleCount = generation === 1 ? 50 : 20;
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(x, y, color, generation));
      }
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Dibujar estrellas
      drawStars();

      // Actualizar y dibujar fuegos artificiales
      fireworks.forEach((firework, index) => {
        firework.update();
        firework.draw();
        if (firework.done) fireworks.splice(index, 1);
      });

      // Actualizar y dibujar partículas
      particles.forEach((particle, index) => {
        particle.update();
        particle.draw();

        // Si la partícula se desvanece y es de la primera generación, crear mini explosiones
        if (particle.alpha <= 0) {
          if (particle.generation === 1) {
            explode(particle.x, particle.y, particle.color, 2);
          }
          particles.splice(index, 1);
        }
      });

      requestAnimationFrame(animate);
    };

    const interval = setInterval(() => {
      const x = Math.random() * canvas.width;
      const y = canvas.height;
      const targetX = Math.random() * canvas.width;
      const targetY = Math.random() * canvas.height * 0.5;
      fireworks.push(new Firework(x, y, targetX, targetY));
    }, speed);

    createStars();
    animate();

  
    if (activateFireworks) {
      for (let i = 0; i < 50; i++) {
        const x = Math.random() * canvas.width;
        const y = canvas.height;
        const targetX = Math.random() * canvas.width;
        const targetY = Math.random() * canvas.height * 0.5;
        fireworks.push(new Firework(x, y, targetX, targetY));
      }
    }

    return () => {
      clearInterval(interval);
    };
  }, [speed, activateFireworks]);

  return <canvas id='background' ref={canvasRef} />;
};

export default Background;