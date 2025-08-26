'use client';

import React, { useRef, useEffect, useState, useCallback, FC } from 'react';
import { gsap } from 'gsap';

// Sample collection data - replace with your actual data
const collection = [
  { title: "Ethereal Dreams", img: "https://picsum.photos/400/600?random=1" },
  { title: "Urban Symphony", img: "https://picsum.photos/400/600?random=2" },
  { title: "Midnight Reverie", img: "https://picsum.photos/400/600?random=3" },
  { title: "Golden Hour", img: "https://picsum.photos/400/600?random=4" },
  { title: "Ocean Depths", img: "https://picsum.photos/400/600?random=5" },
  { title: "Mountain Peak", img: "https://picsum.photos/400/600?random=6" },
  { title: "Forest Whispers", img: "https://picsum.photos/400/600?random=7" },
  { title: "Desert Mirage", img: "https://picsum.photos/400/600?random=8" },
  { title: "Starlit Path", img: "https://picsum.photos/400/600?random=9" },
  { title: "Autumn Breeze", img: "https://picsum.photos/400/600?random=10" },
];

interface TransformState {
  currentRotation: number;
  targetRotation: number;
  currentX: number;
  targetX: number;
  currentY: number;
  targetY: number;
  currentScale: number;
  targetScale: number;
  angle: number;
}

interface ParallaxState {
  targetX: number;
  targetY: number;
  targetZ: number;
  currentX: number;
  currentY: number;
  currentZ: number;
}

export const LeaderBoard = () => {
  const galleryRef = useRef<HTMLDivElement>(null);
  const galleryContainerRef = useRef<HTMLDivElement>(null);
  const titleContainerRef = useRef<HTMLDivElement>(null);
  const centerTextRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  
  const [isPreviewActive, setIsPreviewActive] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentTitle, setCurrentTitle] = useState<HTMLParagraphElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const transformStateRef = useRef<TransformState[]>([]);
  const parallaxStateRef = useRef<ParallaxState>({
    targetX: 0,
    targetY: 0,
    targetZ: 0,
    currentX: 0,
    currentY: 0,
    currentZ: 0,
  });

  const config = {
    imageCount: 10,
    radius: 275,
    sensitivity: 500,
    effectFalloff: 250,
    cardMoveAmount: 50,
    lerpFactor: 0.15,
  };

  // Initialize cards and transform states
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1000);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!galleryRef.current) return;

    transformStateRef.current = [];
    
    for (let i = 0; i < config.imageCount; i++) {
      const angle = (i / config.imageCount) * Math.PI * 2;
      transformStateRef.current.push({
        currentRotation: 0,
        targetRotation: 0,
        currentX: 0,
        targetX: 0,
        currentY: 0,
        targetY: 0,
        currentScale: 1,
        targetScale: 1,
        angle,
      });
    }

    cardsRef.current.forEach((card, i) => {
      if (card) {
        const angle = transformStateRef.current[i].angle;
        const x = config.radius * Math.cos(angle);
        const y = config.radius * Math.sin(angle);

        gsap.set(card, {
          x,
          y,
          rotation: (angle * 180) / Math.PI + 90,
          transformPerspective: 800,
          transformOrigin: "center center",
        });
      }
    });

    // Animate center text on load
    if (centerTextRef.current) {
      const centerText = centerTextRef.current;
      const heading = centerText.querySelector('h2');
      const paragraph = centerText.querySelector('p');
      
      gsap.set([heading, paragraph], { opacity: 0, y: 30 });
      gsap.to([heading, paragraph], {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        delay: 0.5,
        ease: "power3.out"
      });
    }

    // Set initial gallery scale based on viewport
    handleResize();
  }, []);

  const handleResize = useCallback(() => {
    const viewportWidth = window.innerWidth;
    let galleryScale = 1;

    if (viewportWidth < 768) {
      galleryScale = 0.6;
    } else if (viewportWidth < 1200) {
      galleryScale = 0.8;
    }

    if (galleryRef.current) {
      gsap.set(galleryRef.current, {
        scale: galleryScale,
      });
    }

    if (isPreviewActive) {
      const parallaxState = parallaxStateRef.current;
      parallaxState.targetX = 0;
      parallaxState.targetY = 0;
      parallaxState.targetZ = 0;
      parallaxState.currentX = 0;
      parallaxState.currentY = 0;
      parallaxState.currentZ = 0;

      transformStateRef.current.forEach((state) => {
        state.targetRotation = 0;
        state.currentRotation = 0;
        state.targetScale = 1;
        state.currentScale = 1;
        state.targetX = 0;
        state.currentX = 0;
        state.targetY = 0;
        state.currentY = 0;
      });
    }
  }, [isPreviewActive]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  const togglePreview = useCallback((index: number) => {
    if (isTransitioning) return;

    setIsPreviewActive(true);
    setIsTransitioning(true);

    // Hide center text when preview is active
    if (centerTextRef.current) {
      gsap.to(centerTextRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.5,
        ease: "power2.out"
      });
    }

    const angle = transformStateRef.current[index].angle;
    const targetPosition = (Math.PI * 3) / 2;
    let rotationRadians = targetPosition - angle;

    if (rotationRadians > Math.PI) rotationRadians -= Math.PI * 2;
    else if (rotationRadians < -Math.PI) rotationRadians += Math.PI * 2;

    // Reset transform states
    transformStateRef.current.forEach((state) => {
      state.currentRotation = state.targetRotation = 0;
      state.currentScale = state.targetScale = 1;
      state.currentX = state.targetX = state.currentY = state.targetY = 0;
    });

    // Animate gallery
    gsap.to(galleryRef.current, {
      onStart: () => {
        cardsRef.current.forEach((card, i) => {
          if (card) {
            gsap.to(card, {
              x: config.radius * Math.cos(transformStateRef.current[i].angle),
              y: config.radius * Math.sin(transformStateRef.current[i].angle),
              rotationY: 0,
              scale: 1,
              duration: 1.25,
              ease: "power4.out",
            });
          }
        });
      },
      scale: 5,
      y: 1300,
      rotation: (rotationRadians * 180) / Math.PI + 360,
      duration: 2,
      ease: "power4.inOut",
      onComplete: () => setIsTransitioning(false),
    });

    // Reset parallax
    gsap.to(parallaxStateRef.current, {
      currentX: 0,
      currentY: 0,
      currentZ: 0,
      duration: 0.5,
      ease: "power2.out",
      onUpdate: () => {
        if (galleryContainerRef.current) {
          gsap.set(galleryContainerRef.current, {
            rotateX: parallaxStateRef.current.currentX,
            rotateY: parallaxStateRef.current.currentY,
            rotateZ: parallaxStateRef.current.currentZ,
            transformOrigin: "center center",
          });
        }
      },
    });

    // Show title
    const titleText = collection[index % 20].title;
    const p = document.createElement("p");
    p.textContent = titleText;
    p.className = "absolute w-full text-center text-3xl md:text-4xl font-semibold text-gray-800 tracking-tight";
    
    if (titleContainerRef.current) {
      titleContainerRef.current.appendChild(p);
      setCurrentTitle(p);

      // Simple animation without SplitText
      gsap.fromTo(p, 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75, delay: 1.25, ease: "power4.out" }
      );
    }
  }, [isTransitioning]);

  const resetGallery = useCallback(() => {
    if (isTransitioning) return;

    setIsTransitioning(true);

    if (currentTitle) {
      gsap.to(currentTitle, {
        y: -50,
        opacity: 0,
        duration: 0.75,
        delay: 0.5,
        ease: "power4.out",
        onComplete: () => {
          currentTitle.remove();
          setCurrentTitle(null);
        },
      });
    }

    const viewportWidth = window.innerWidth;
    let galleryScale = 1;

    if (viewportWidth < 768) {
      galleryScale = 0.6;
    } else if (viewportWidth < 1200) {
      galleryScale = 0.8;
    }

    gsap.to(galleryRef.current, {
      scale: galleryScale,
      y: 0,
      x: 0,
      rotation: 0,
      duration: 2.5,
      ease: "power4.out",
      onComplete: () => {
        setIsPreviewActive(false);
        setIsTransitioning(false);
        Object.assign(parallaxStateRef.current, {
          targetX: 0,
          targetY: 0,
          targetZ: 0,
          currentX: 0,
          currentY: 0,
          currentZ: 0,
        });

        // Show center text again
        if (centerTextRef.current) {
          gsap.to(centerTextRef.current, {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            delay: 0.5,
            ease: "power3.out"
          });
        }
      },
    });
  }, [isTransitioning, currentTitle]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isPreviewActive || isTransitioning || isMobile) return;

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const percentX = (e.clientX - centerX) / centerX;
    const percentY = (e.clientY - centerY) / centerY;

    const parallaxState = parallaxStateRef.current;
    parallaxState.targetY = percentX * 15;
    parallaxState.targetX = -percentY * 15;
    parallaxState.targetZ = (percentX + percentY) * 5;

    cardsRef.current.forEach((card, index) => {
      if (!card) return;
      
      const rect = card.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      const distance = Math.sqrt(dx * dx + dy * dy);

      const transformState = transformStateRef.current[index];
      
      if (distance < config.sensitivity) {
        const flipFactor = Math.max(0, 1 - distance / config.effectFalloff);
        const angle = transformState.angle;
        const moveAmount = config.cardMoveAmount * flipFactor;

        transformState.targetRotation = 180 * flipFactor;
        transformState.targetScale = 1 + 0.3 * flipFactor;
        transformState.targetX = moveAmount * Math.cos(angle);
        transformState.targetY = moveAmount * Math.sin(angle);
      } else {
        transformState.targetRotation = 0;
        transformState.targetScale = 1;
        transformState.targetX = 0;
        transformState.targetY = 0;
      }
    });
  }, [isPreviewActive, isTransitioning, isMobile]);

  const handleClick = useCallback(() => {
    if (isPreviewActive && !isTransitioning) {
      resetGallery();
    }
  }, [isPreviewActive, isTransitioning, resetGallery]);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleClick);
    };
  }, [handleMouseMove, handleClick]);

  // Animation loop
  useEffect(() => {
    let animationId: number;

    const animate = () => {
      if (!isPreviewActive && !isTransitioning) {
        const parallaxState = parallaxStateRef.current;
        
        parallaxState.currentX += (parallaxState.targetX - parallaxState.currentX) * config.lerpFactor;
        parallaxState.currentY += (parallaxState.targetY - parallaxState.currentY) * config.lerpFactor;
        parallaxState.currentZ += (parallaxState.targetZ - parallaxState.currentZ) * config.lerpFactor;

        if (galleryContainerRef.current) {
          gsap.set(galleryContainerRef.current, {
            rotateX: parallaxState.currentX,
            rotateY: parallaxState.currentY,
            rotation: parallaxState.currentZ,
          });
        }

        cardsRef.current.forEach((card, index) => {
          if (!card) return;
          
          const state = transformStateRef.current[index];

          state.currentRotation += (state.targetRotation - state.currentRotation) * config.lerpFactor;
          state.currentScale += (state.targetScale - state.currentScale) * config.lerpFactor;
          state.currentX += (state.targetX - state.currentX) * config.lerpFactor;
          state.currentY += (state.targetY - state.currentY) * config.lerpFactor;

          const angle = state.angle;
          const x = config.radius * Math.cos(angle);
          const y = config.radius * Math.sin(angle);

          gsap.set(card, {
            x: x + state.currentX,
            y: y + state.currentY,
            rotationY: state.currentRotation,
            scale: state.currentScale,
            rotation: (angle * 180) / Math.PI + 90,
            transformPerspective: 1000
          });
        });
      }
      
      animationId = requestAnimationFrame(animate);
    };

    animate();
    
    return () => cancelAnimationFrame(animationId);
  }, [isPreviewActive, isTransitioning]);

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Main Container */}
      <div 
        className="relative w-full h-full flex justify-center items-center"
        ref={galleryContainerRef}
        style={{ 
          transformStyle: 'preserve-3d',
          perspective: '2000px',
          willChange: 'transform'
        }}
      >
        {/* Gallery Container */}
        <div 
          className="relative w-full h-full flex justify-center items-center"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Gallery */}
          <div 
            className="relative w-[600px] h-[600px] flex justify-center items-center"
            ref={galleryRef}
            style={{ 
              transformOrigin: 'center',
              willChange: 'transform'
            }}
          >
            {/* Cards */}
            {Array.from({ length: config.imageCount }, (_, i) => {
              const cardIndex = i % 20;
              return (
                <div
                  key={i}
                  className="absolute w-11 h-15 md:w-[45px] md:h-[60px] rounded cursor-pointer overflow-hidden"
                  ref={(el) => {
                    if (el) cardsRef.current[i] = el;
                  }}
                  style={{
                    transformOrigin: 'center',
                    willChange: 'transform',
                    transformStyle: 'preserve-3d',
                    backfaceVisibility: 'visible'
                  }}
                  data-index={i}
                  data-title={collection[cardIndex].title}
                  onClick={(e) => {
                    if (!isPreviewActive && !isTransitioning) {
                      togglePreview(i);
                      e.stopPropagation();
                    }
                  }}
                >
                  <img 
                    src={collection[cardIndex].img} 
                    alt={collection[cardIndex].title}
                    className="w-full h-full object-cover"
                    draggable={false}
                    style={{ backfaceVisibility: 'hidden' }}
                  />
                </div>
              );
            })}
            
            {/* Center Text Content */}
            <div 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10 pointer-events-none max-w-[300px]"
              ref={centerTextRef}
            >
              <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-3 font-sans tracking-tight">
                Gallery Collection
              </h2>
              <p className="text-sm md:text-base font-normal text-gray-600 leading-relaxed font-sans">
                Explore our curated selection of artistic masterpieces
              </p>
            </div>
          </div>
        </div>

        {/* Title Container */}
        <div 
          className="fixed bottom-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-[42px]"
          ref={titleContainerRef}
          style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' }}
        >
        </div>
      </div>
    </div>
  );
};