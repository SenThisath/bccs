'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Featured = () => {
  const containerRef = useRef(null);
  const ringRef = useRef(null);
  const imagesRef = useRef([]);
  const xPosRef = useRef(0);

  useEffect(() => {
    const ring = ringRef.current;
    const images = imagesRef.current;
    
    if (!ring || images.length === 0) return;

    // Helper function for background position calculation
    const getBgPos = (i) => {
      const rotationY = gsap.getProperty(ring, 'rotationY') || 0;
      return (100 - gsap.utils.wrap(0, 360, rotationY - 180 - i * 36) / 360 * 500) + 'px 0px';
    };

    // GSAP Timeline setup
    const tl = gsap.timeline();
    
    // Set initial ring rotation
    tl.set(ring, { 
      rotationY: 180, 
      cursor: 'grab' 
    });

    // Set up each image
    tl.set(images, {
      rotateY: (i) => i * -36,
      transformOrigin: '50% 50% 500px',
      z: -500,
      backgroundImage: (i) => `url(https://picsum.photos/id/${i + 32}/600/400/)`,
      backgroundPosition: (i) => getBgPos(i),
      backfaceVisibility: 'hidden'
    });

    // Animate images in
    tl.from(images, {
      duration: 1.5,
      y: 200,
      opacity: 0,
      stagger: 0.1,
      ease: 'expo'
    });

    // Add hover effects after animation
    tl.add(() => {
      images.forEach((img) => {
        img.addEventListener('mouseenter', (e) => {
          const current = e.currentTarget;
          gsap.to(images, {
            opacity: (i, target) => (target === current) ? 1 : 0.5,
            ease: 'power3'
          });
        });

        img.addEventListener('mouseleave', () => {
          gsap.to(images, {
            opacity: 1,
            ease: 'power2.inOut'
          });
        });
      });
    }, '-=0.5');

    // Drag functionality
    const dragStart = (e) => {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      xPosRef.current = Math.round(clientX);
      gsap.set(ring, { cursor: 'grabbing' });
      
      document.addEventListener('mousemove', drag);
      document.addEventListener('touchmove', drag);
    };

    const drag = (e) => {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const deltaX = Math.round(clientX) - xPosRef.current;
      
      gsap.to(ring, {
        rotationY: '-=' + (deltaX % 360),
        onUpdate: () => {
          gsap.set(images, {
            backgroundPosition: (i) => getBgPos(i)
          });
        }
      });
      
      xPosRef.current = Math.round(clientX);
    };

    const dragEnd = () => {
      document.removeEventListener('mousemove', drag);
      document.removeEventListener('touchmove', drag);
      gsap.set(ring, { cursor: 'grab' });
    };

    // Add event listeners
    const container = containerRef.current;
    container.addEventListener('mousedown', dragStart);
    container.addEventListener('touchstart', dragStart);
    document.addEventListener('mouseup', dragEnd);
    document.addEventListener('touchend', dragEnd);

    // Cleanup function
    return () => {
      container?.removeEventListener('mousedown', dragStart);
      container?.removeEventListener('touchstart', dragStart);
      document.removeEventListener('mouseup', dragEnd);
      document.removeEventListener('touchend', dragEnd);
      document.removeEventListener('mousemove', drag);
      document.removeEventListener('touchmove', drag);
      
      images.forEach((img) => {
        img?.removeEventListener('mouseenter', () => {});
        img?.removeEventListener('mouseleave', () => {});
      });
    };
  }, []);

  return (
    <div className="h-screen w-full bg-black overflow-hidden flex items-center justify-center select-none">
      <div 
        ref={containerRef}
        className="relative"
        style={{
          perspective: '2000px',
          width: '300px',
          height: '400px'
        }}
      >
        <div 
          ref={ringRef}
          className="absolute inset-0"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {Array.from({ length: 10 }, (_, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) imagesRef.current[i] = el;
              }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ 
                transformStyle: 'preserve-3d',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Featured;