import React, { useRef, useEffect } from "react";
import "./SingleFirework.css";

const SingleFirework = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    let firework;

    const randomColor = () => {
      const hue = Math.random() * 360;
      const saturation = Math.random() * 100 + 50;
      const lightness = Math.random() * 50 + 25;
      return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    };

    class Particle {
      constructor(x, y, generation = 1) {
        this.x = x;
        this.y = y;
        this.color = randomColor();
        this.alpha = 1;
        this.radius =
          generation === 1 ? Math.random() * 4 + 2 : Math.random() * 2 + 1;
        this.speed =
          generation === 1 ? Math.random() * 4 + 2 : Math.random() * 1.5 + 0.5;
        this.angle = Math.random() * Math.PI * 2;
        this.friction = 0.99;
        this.fadeRate = generation === 1 ? 0.02 : 0.05;
        this.generation = generation;
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

    class Firework {
      constructor(x, y, targetX, targetY) {
        this.x = x;
        this.y = y;
        this.targetX = targetX;
        this.targetY = targetY;
        this.color = randomColor();
        this.speed = 2;
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
        ctx.arc(this.x, this.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    const explode = (x, y, color) => {
      const particleCount = 150;
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(x, y));
      }
    };

    const miniExplosion = (x, y, color) => {
      const particleCount = 30;
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(x, y, 2));
      }
    };

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (!firework.done) {
        firework.update();
        firework.draw();
      }

      particles.forEach((particle, index) => {
        particle.update();
        particle.draw();
        if (particle.alpha <= 0) {
          if (particle.generation === 1) {
            miniExplosion(particle.x, particle.y, particle.color); // Generar mini explosiones
          }
          particles.splice(index, 1);
        }
      });

      requestAnimationFrame(animate);
    };

    firework = new Firework(
      canvas.width / 2,
      canvas.height,
      canvas.width / 2,
      canvas.height / 2
    );
    animate();

    return () => {
      particles.length = 0;
    };


  }, []);

  return <canvas id="single-firework" ref={canvasRef} />;
};

export default SingleFirework;
