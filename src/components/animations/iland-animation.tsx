"use client";

import { useEffect, useRef } from "react";

interface ILandAnimationProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function ILandAnimation({
  className = "",
  size = "md",
}: ILandAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const sizeMap = {
      sm: 64,
      md: 128,
      lg: 256,
    };
    const canvasSize = sizeMap[size];
    canvas.width = canvasSize;
    canvas.height = canvasSize;

    // Animation variables
    let animationId: number;
    let time = 0;
    const speedMultiplier = 0.5; // slower animation

    // Sophisticated dark color scheme
    const primaryColor = "#1e293b"; // slate-800
    const secondaryColor = "#475569"; // slate-600
    const accentColor = "#475569"; // slate-600 (changed from blue to gray)
    const highlightColor = "#fbbf24"; // amber-400
    const techGreen = "#059669"; // emerald-600

    // Draw sophisticated grid pattern (island infrastructure)
    const drawGrid = () => {
      ctx.strokeStyle = primaryColor;
      ctx.lineWidth = 0.5;
      ctx.globalAlpha = 0.2;

      // Horizontal infrastructure lines
      for (let i = 0; i < 12; i++) {
        const y = (canvasSize / 12) * i;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvasSize, y);
        ctx.stroke();
      }

      // Vertical infrastructure lines
      for (let i = 0; i < 12; i++) {
        const x = (canvasSize / 12) * i;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvasSize);
        ctx.stroke();
      }

      // Connection nodes (island power stations)
      ctx.fillStyle = secondaryColor;
      ctx.globalAlpha = 0.4;
      for (let i = 0; i < 12; i++) {
        for (let j = 0; j < 12; j++) {
          if ((i + j) % 3 === 0) {
            const x = (canvasSize / 12) * i;
            const y = (canvasSize / 12) * j;
            ctx.beginPath();
            ctx.arc(x, y, 1.5, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
    };

    // Data flow particles (island network traffic)
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      type: "data" | "signal";
    }> = [];

    const createParticle = () => {
      const side = Math.floor(Math.random() * 4);
      let x, y, vx, vy;

      switch (side) {
        case 0: // top
          x = Math.random() * canvasSize;
          y = 0;
          vx = (Math.random() - 0.5) * 1.5;
          vy = Math.random() * 1.5 + 0.8;
          break;
        case 1: // right
          x = canvasSize;
          y = Math.random() * canvasSize;
          vx = -(Math.random() * 1.5 + 0.8);
          vy = (Math.random() - 0.5) * 1.5;
          break;
        case 2: // bottom
          x = Math.random() * canvasSize;
          y = canvasSize;
          vx = (Math.random() - 0.5) * 1.5;
          vy = -(Math.random() * 1.5 + 0.8);
          break;
        case 3: // left
          x = 0;
          y = Math.random() * canvasSize;
          vx = Math.random() * 1.5 + 0.8;
          vy = (Math.random() - 0.5) * 1.5;
          break;
        default:
          x = Math.random() * canvasSize;
          y = Math.random() * canvasSize;
          vx = (Math.random() - 0.5) * 1.5;
          vy = (Math.random() - 0.5) * 1.5;
          break;
      }

      particles.push({
        x,
        y,
        vx,
        vy,
        life: 1,
        maxLife: 80 + Math.random() * 60,
        type: Math.random() > 0.5 ? "data" : "signal",
      });
    };

    const updateParticles = () => {
      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];
        particle.x += particle.vx * speedMultiplier; // slower movement
        particle.y += particle.vy * speedMultiplier; // slower movement
        particle.life++;

        // Remove particles that are off-screen or expired
        if (
          particle.x < -10 ||
          particle.x > canvasSize + 10 ||
          particle.y < -10 ||
          particle.y > canvasSize + 10 ||
          particle.life > particle.maxLife
        ) {
          particles.splice(i, 1);
        }
      }
    };

    const drawParticles = () => {
      particles.forEach(particle => {
        const alpha = 1 - particle.life / particle.maxLife;
        const pulse = Math.sin(time * 0.1 + particle.life * 0.1) * 0.3 + 0.7;

        if (particle.type === "data") {
          ctx.fillStyle = accentColor; // now gray
          ctx.globalAlpha = alpha * pulse * 0.7;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, 1.2, 0, Math.PI * 2); // smaller
          ctx.fill();
        } else {
          ctx.fillStyle = highlightColor;
          ctx.globalAlpha = alpha * pulse * 0.6;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, 0.8, 0, Math.PI * 2); // smaller
          ctx.fill();
        }
      });
    };

    // Sophisticated data flow visualization
    const drawDataFlow = () => {
      ctx.strokeStyle = accentColor;
      ctx.lineWidth = 0.6; // thinner lines
      ctx.globalAlpha = 0.25; // more subtle

      // Create flowing data paths - slower and smoother
      for (let i = 0; i < 4; i++) {
        // fewer paths
        const startX =
          Math.sin(time * 0.01 * speedMultiplier + i) * canvasSize * 0.3 +
          canvasSize / 2;
        const startY = (time * 0.15 * speedMultiplier + i * 50) % canvasSize;
        const endX =
          Math.cos(time * 0.008 * speedMultiplier + i) * canvasSize * 0.25 +
          canvasSize / 2;
        const endY = (time * 0.12 * speedMultiplier + i * 45) % canvasSize;

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();

        // Connection points - smaller
        ctx.fillStyle = accentColor;
        ctx.globalAlpha = 0.5;
        ctx.beginPath();
        ctx.arc(startX, startY, 1.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(endX, endY, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    // Central island hub (main processing center)
    const drawCentralHub = () => {
      const centerX = canvasSize / 2;
      const centerY = canvasSize / 2;
      const hubSize = canvasSize / 10;

      // Main hub core
      ctx.fillStyle = primaryColor;
      ctx.globalAlpha = 0.8;
      ctx.beginPath();
      ctx.arc(centerX, centerY, hubSize, 0, Math.PI * 2);
      ctx.fill();

      // Hub border
      ctx.strokeStyle = accentColor;
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = 0.9;
      ctx.beginPath();
      ctx.arc(centerX, centerY, hubSize, 0, Math.PI * 2);
      ctx.stroke();

      // Processing indicator - slower pulse
      const pulse = Math.sin(time * 0.04 * speedMultiplier) * 0.4 + 0.6;
      ctx.fillStyle = techGreen;
      ctx.globalAlpha = pulse * 0.8;
      ctx.beginPath();
      ctx.arc(centerX, centerY, hubSize * 0.4, 0, Math.PI * 2);
      ctx.fill();

      // Hub connections
      ctx.strokeStyle = secondaryColor;
      ctx.lineWidth = 0.8;
      ctx.globalAlpha = 0.4;

      // Connect to particles
      particles.forEach(particle => {
        const distance = Math.sqrt(
          Math.pow(particle.x - centerX, 2) + Math.pow(particle.y - centerY, 2)
        );
        if (distance < canvasSize * 0.35) {
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(centerX, centerY);
          ctx.stroke();
        }
      });

      // Radial connection lines (arrows) - smaller and fewer
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI * 2) / 6;
        const radius = hubSize * 1.8; // smaller radius
        const endX = centerX + Math.cos(angle) * radius;
        const endY = centerY + Math.sin(angle) * radius;

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
      }
    };

    // Island perimeter monitoring
    const drawPerimeter = () => {
      const perimeterRadius = canvasSize * 0.45;
      const centerX = canvasSize / 2;
      const centerY = canvasSize / 2;

      // Perimeter nodes - slower rotation
      ctx.fillStyle = highlightColor;
      ctx.globalAlpha = 0.6;
      for (let i = 0; i < 10; i++) {
        // fewer nodes
        const angle = (i * Math.PI * 2) / 10 + time * 0.005 * speedMultiplier;
        const x = centerX + Math.cos(angle) * perimeterRadius;
        const y = centerY + Math.sin(angle) * perimeterRadius;

        const pulse = Math.sin(time * 0.025 * speedMultiplier + i) * 0.3 + 0.7;
        ctx.globalAlpha = pulse * 0.6;

        ctx.beginPath();
        ctx.arc(x, y, 1.5, 0, Math.PI * 2); // smaller nodes
        ctx.fill();
      }
    };

    // Main animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvasSize, canvasSize);

      // Draw grid infrastructure
      drawGrid();

      // Draw data flow
      drawDataFlow();

      // Update and draw particles
      updateParticles();
      drawParticles();

      // Create new particles occasionally - slower
      if (Math.random() < 0.04) {
        createParticle();
      }

      // Draw central hub
      drawCentralHub();

      // Draw perimeter
      drawPerimeter();

      time++;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [size]);

  return (
    <canvas
      ref={canvasRef}
      className={`block ${className}`}
      style={{
        imageRendering: "pixelated",
      }}
    />
  );
}
