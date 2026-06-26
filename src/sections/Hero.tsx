'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Shield, Cpu, Activity, Play, Database, GitBranch, 
  Terminal, ShieldCheck, BarChart3
} from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';

// requestAnimationFrame count up hook for high performance
const AnimatedCounter: React.FC<{ value: number; suffix?: string; decimals?: number; duration?: number }> = ({
  value,
  suffix = '',
  decimals = 0,
  duration = 1500,
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const currentVal = progress * value;
      setCount(currentVal);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [value, duration]);

  return <span>{count.toFixed(decimals) + suffix}</span>;
};

interface HeroModule {
  id: number;
  name: string;
  icon: React.ComponentType<any>;
}

const HERO_MODULES: HeroModule[] = [
  { id: 0, name: 'Workflow', icon: GitBranch },
  { id: 1, name: 'Analytics', icon: BarChart3 },
  { id: 2, name: 'Security', icon: ShieldCheck },
  { id: 3, name: 'Automation', icon: Cpu },
  { id: 4, name: 'API Platform', icon: Terminal },
  { id: 5, name: 'Vector Database', icon: Database }
];

export const Hero: React.FC = () => {
  // Orbit Angle
  const [orbitAngle, setOrbitAngle] = useState(0);
  const [hoveredModule, setHoveredModule] = useState<number | null>(null);
  const [coreHovered, setCoreHovered] = useState(false);
  const requestRef = useRef<number | null>(null);

  // Mouse Parallax coordinates (X, Y ±8 degrees)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 16;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  // Run the orbital physics engine
  useEffect(() => {
    const animate = () => {
      const speed = coreHovered ? 0.08 : hoveredModule !== null ? 0 : 0.22;
      if (speed > 0) {
        setOrbitAngle((prev) => (prev + speed) % 360);
      }
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [hoveredModule, coreHovered]);

  // Calculate 3D Orbital Coordinates
  const moduleCoords = useMemo(() => {
    return HERO_MODULES.map((mod, i) => {
      const angle = (orbitAngle + i * 60) * (Math.PI / 180);
      const rx = 190 + (i % 2 === 0 ? 15 : -15);
      const ry = 60 + (i % 2 === 0 ? -10 : 10);
      
      const x = Math.cos(angle) * rx;
      const y = Math.sin(angle) * ry + (i % 2 === 0 ? -12 : 12);
      const z = Math.sin(angle) * 160; // Depth coordinate

      // Scale & opacity based on Z depth
      const scale = ((z + 160) / 320) * 0.3 + 0.85; // 0.85 to 1.15
      const opacity = ((z + 160) / 320) * 0.5 + 0.5; // 0.5 to 1.0
      const blur = z < 0 ? Math.abs(z) * 0.005 : 0;

      return { id: mod.id, x, y, z, scale, opacity, blur };
    });
  }, [orbitAngle]);

  const kpiCoords = useMemo(() => {
    const kpis = [
      { id: 'automation', title: 'Automation', value: 98.7, suffix: '%', decimals: 1, colorClass: 'text-brand-accent' },
      { id: 'daily_req', title: 'Daily Req', value: 1.8, suffix: 'M', decimals: 1, colorClass: 'text-brand-accent-hover' },
      { id: 'speed', title: 'Speed', value: 12, suffix: 'ms', decimals: 0, colorClass: 'text-emerald-400' }
    ];
    return kpis.map((kpi, i) => {
      const angle = (orbitAngle + i * 120 + 30) * (Math.PI / 180);
      const rx = 240;
      const ry = 100;
      
      const x = Math.cos(angle) * rx;
      const y = Math.sin(angle) * ry + (i % 2 === 0 ? -16 : 16);
      const z = Math.sin(angle) * 200; // Depth coordinate

      const scale = ((z + 200) / 400) * 0.25 + 0.8; // 0.8 to 1.05
      const opacity = ((z + 200) / 400) * 0.6 + 0.4; // 0.4 to 1.0
      const blur = z < 0 ? Math.abs(z) * 0.003 : 0;

      return { ...kpi, x, y, z, scale, opacity, blur };
    });
  }, [orbitAngle]);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden bg-[#172B36]">
      
      {/* Background Glows */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-brand-accent/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 right-10 w-96 h-96 bg-brand-accent-hover/5 rounded-full blur-3xl" />
        
        {/* Layer 2: Grid Backdrop */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] opacity-25" />
      </div>

      <style>{`
        .perspective-1200 {
          perspective: 1200px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        @keyframes rotate-cube-outer {
          0% { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
          100% { transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg); }
        }
        @keyframes rotate-cube-inner {
          0% { transform: rotateX(360deg) rotateY(0deg) rotateZ(360deg); }
          100% { transform: rotateX(0deg) rotateY(360deg) rotateZ(0deg); }
        }
        @keyframes spin-ring-x {
          0% { transform: rotateX(75deg) rotateY(0deg) rotateZ(0deg); }
          100% { transform: rotateX(75deg) rotateY(0deg) rotateZ(360deg); }
        }
        @keyframes spin-ring-y {
          0% { transform: rotateX(25deg) rotateY(75deg) rotateZ(0deg); }
          100% { transform: rotateX(25deg) rotateY(75deg) rotateZ(360deg); }
        }
        @keyframes float-core {
          0%, 100% { transform: translateY(0px) rotateZ(0deg); }
          50% { transform: translateY(-12px) rotateZ(3deg); }
        }
        @keyframes float-kpi-1 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes float-kpi-2 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes pulse-line-dash {
          to {
            stroke-dashoffset: -40;
          }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Side: Hero Content */}
          <div className="lg:col-span-6 flex flex-col items-start text-left space-y-6">
            <ScrollReveal animation="fade">
              {/* Tech Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-xs font-mono font-bold tracking-widest text-brand-accent uppercase">
                <span>COGNITIVE LAYER</span>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="slide-up" delay={100}>
              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-brand-text-primary">
                The Cognitive Layer{' '}
                <span className="block mt-2 bg-gradient-to-r from-brand-accent via-brand-accent-hover to-brand-accent bg-clip-text text-transparent animate-text-shine">
                  for Enterprise AI.
                </span>
              </h1>
            </ScrollReveal>

            <ScrollReveal animation="slide-up" delay={200}>
              {/* Sub-headline */}
              <p className="text-base sm:text-lg text-brand-text-secondary max-w-xl font-normal leading-relaxed font-sans">
                Deploy complex multi agent state machines, perform real-time neural inference, and scale vector pipelines on globally optimized serverless LLM clusters at sub-50ms latency.
              </p>
            </ScrollReveal>

            <ScrollReveal animation="slide-up" delay={300}>
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <a
                  href="#pricing"
                  className="group relative inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-gradient-to-r from-brand-accent to-brand-accent-hover hover:brightness-110 text-slate-950 font-bold uppercase tracking-wider text-xs shadow-lg hover:shadow-brand-accent/20 hover:scale-[1.01] transition-all duration-150 select-none cursor-pointer"
                >
                  <span>Deploy API Endpoint</span>
                  <Play className="w-3.5 h-3.5 fill-current" />
                </a>
                <a
                  href="#features"
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-slate-700 hover:text-white text-brand-text-secondary font-semibold uppercase tracking-wider text-xs transition-all duration-150 cursor-pointer"
                >
                  <span>See How It Works</span>
                </a>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="slide-up" delay={400}>
              {/* Core Stats / Trust Indicators */}
              <div className="grid grid-cols-3 gap-6 sm:gap-10 pt-8 border-t border-slate-800/80 w-full max-w-lg font-mono">
                <div className="space-y-1">
                  <div className="text-xs text-brand-text-secondary font-sans">Avg Latency</div>
                  <div className="text-lg font-bold text-brand-accent flex items-center gap-1.5">
                    <Activity className="w-4 h-4 text-brand-accent shrink-0" />
                    <AnimatedCounter value={12} suffix="ms" />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-brand-text-secondary font-sans">SLA Guarantee</div>
                  <div className="text-lg font-bold text-emerald-400 flex items-center gap-1.5">
                    <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
                    <AnimatedCounter value={99.98} suffix="%" decimals={2} />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-brand-text-secondary font-sans">AI Agents</div>
                  <div className="text-lg font-bold text-brand-accent-hover flex items-center gap-1.5">
                    <Cpu className="w-4 h-4 text-brand-accent-hover shrink-0" />
                    <AnimatedCounter value={23} />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Side: Futuristic 3D AI Core Experience */}
          <div className="lg:col-span-6 w-full h-[520px] relative flex items-center justify-center select-none z-10">
            <ScrollReveal animation="right" delay={200} className="w-full h-full">
              
              <div 
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative w-full h-full flex items-center justify-center perspective-1200 overflow-visible"
              >
                
                {/* 3D Parallax Viewport container */}
                <div 
                  className={`relative w-full h-full flex items-center justify-center transform-style-3d ${
                    mousePos.x === 0 && mousePos.y === 0 ? 'transition-transform duration-500 ease-out' : ''
                  }`}
                  style={{
                    transform: `rotateX(${-mousePos.y}deg) rotateY(${mousePos.x}deg)`
                  }}
                >
                  
                  {/* SVG Orbit Lines & Energy Pulse Nodes */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
                    {moduleCoords.map((coord) => {
                      const isHovered = hoveredModule === coord.id;
                      return (
                        <g key={coord.id}>
                          {/* Base connection path */}
                          <path
                            d={`M 50% 50% Q calc(50% + ${coord.x / 2}px) calc(50% + ${coord.y / 2 - 25}px), calc(50% + ${coord.x}px) calc(50% + ${coord.y}px)`}
                            stroke={isHovered ? '#FFC801' : '#114C5A'}
                            strokeWidth="1"
                            fill="none"
                            opacity={coord.opacity * 0.4}
                            className="transition-all duration-300"
                          />
                          {/* Pulsing overlay path */}
                          <path
                            d={`M 50% 50% Q calc(50% + ${coord.x / 2}px) calc(50% + ${coord.y / 2 - 25}px), calc(50% + ${coord.x}px) calc(50% + ${coord.y}px)`}
                            stroke={isHovered ? '#FF9932' : '#FFC801'}
                            strokeWidth={isHovered ? '2.5' : '1.5'}
                            fill="none"
                            opacity={coord.opacity * 0.95}
                            strokeDasharray={isHovered ? '12, 12' : '6, 12'}
                            className="transition-all duration-300 animate-[pulse-line-dash_2s_linear_infinite]"
                            style={{
                              animationDuration: isHovered ? '0.7s' : '2s'
                            }}
                          />
                        </g>
                      );
                    })}
                  </svg>

                  {/* 1. CENTRAL NESTED DUAL-ROTATING COGNITIVE CORE */}
                  <div 
                    onMouseEnter={() => setCoreHovered(true)}
                    onMouseLeave={() => setCoreHovered(false)}
                    className={`relative z-20 w-32 h-32 flex items-center justify-center transform-style-3d cursor-pointer transition-transform duration-300 ${
                      coreHovered ? 'scale-[1.08]' : 'scale-100'
                    }`}
                  >
                    {/* Concentric rotating holographic rings */}
                    <div className={`absolute w-44 h-44 rounded-full border-2 border-dashed transform-style-3d pointer-events-none animate-[spin-ring-x_6s_linear_infinite] transition-colors duration-300 ${
                      coreHovered ? 'border-brand-accent/80' : 'border-brand-accent/20'
                    }`}>
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-brand-accent rounded-full shadow-[0_0_12px_#FFC801]" />
                    </div>
                    <div className={`absolute w-48 h-48 rounded-full border-2 border-double transform-style-3d pointer-events-none animate-[spin-ring-y_8s_linear_infinite] transition-colors duration-300 ${
                      coreHovered ? 'border-brand-accent-hover/80' : 'border-brand-accent-hover/20'
                    }`}>
                      <div className="absolute bottom-0 right-1/2 translate-x-1/2 translate-y-1/2 w-2 h-2 bg-brand-accent-hover rounded-full shadow-[0_0_10px_#FF9932]" />
                    </div>

                    {/* Double nested 3D Polyhedrons with Floating wrapper */}
                    <div className="relative w-24 h-24 transform-style-3d flex items-center justify-center animate-[float-core_5s_ease-in-out_infinite]">
                      
                      {/* A. Outer Crystalline Glass Shell (Rotates forward) */}
                      <div className="absolute w-20 h-20 transform-style-3d animate-[rotate-cube-outer_14s_linear_infinite]">
                        <div className="absolute inset-0 bg-[#114C5A]/35 border border-brand-accent/60 backdrop-blur-sm transform translate-z-[40px]" />
                        <div className="absolute inset-0 bg-[#114C5A]/35 border border-brand-accent/60 backdrop-blur-sm transform rotate-y-180 translate-z-[40px]" />
                        <div className="absolute inset-0 bg-[#114C5A]/35 border border-brand-accent/60 backdrop-blur-sm transform rotate-y-90 translate-z-[40px]" />
                        <div className="absolute inset-0 bg-[#114C5A]/35 border border-brand-accent/60 backdrop-blur-sm transform -rotate-y-90 translate-z-[40px]" />
                        <div className="absolute inset-0 bg-[#114C5A]/35 border border-brand-accent/60 backdrop-blur-sm transform rotate-x-90 translate-z-[40px]" />
                        <div className="absolute inset-0 bg-[#114C5A]/35 border border-brand-accent/60 backdrop-blur-sm transform -rotate-x-90 translate-z-[40px]" />
                      </div>

                      {/* B. Inner Energy Core (Rotates backward) */}
                      <div className="absolute w-10 h-10 transform-style-3d animate-[rotate-cube-inner_8s_linear_infinite]">
                        <div className="absolute inset-0 bg-[#FF9932]/35 border border-[#FFC801] transform translate-z-[20px]" />
                        <div className="absolute inset-0 bg-[#FF9932]/35 border border-[#FFC801] transform rotate-y-180 translate-z-[20px]" />
                        <div className="absolute inset-0 bg-[#FF9932]/35 border border-[#FFC801] transform rotate-y-90 translate-z-[20px]" />
                        <div className="absolute inset-0 bg-[#FF9932]/35 border border-[#FFC801] transform -rotate-y-90 translate-z-[20px]" />
                        <div className="absolute inset-0 bg-[#FF9932]/35 border border-[#FFC801] transform rotate-x-90 translate-z-[20px]" />
                        <div className="absolute inset-0 bg-[#FF9932]/35 border border-[#FFC801] transform -rotate-x-90 translate-z-[20px]" />
                      </div>

                      {/* Deep internal glow */}
                      <div className={`absolute inset-4 rounded-full blur-lg transition-all duration-300 ${
                        coreHovered ? 'bg-[#FFC801]/60 scale-120' : 'bg-[#FF9932]/30'
                      }`} />

                    </div>
                  </div>

                  {/* 2. ORBITING MODULES (Framed inside custom glass hexagons) */}
                  {moduleCoords.map((coord) => {
                    const module = HERO_MODULES[coord.id];
                    const Icon = module.icon;
                    const isHovered = hoveredModule === coord.id;

                    return (
                      <div
                        key={coord.id}
                        onMouseEnter={() => setHoveredModule(coord.id)}
                        onMouseLeave={() => setHoveredModule(null)}
                        style={{
                          position: 'absolute',
                          transform: `translate3d(${coord.x}px, ${coord.y}px, ${coord.z}px) scale(${coord.scale})`,
                          zIndex: Math.round(coord.z + 150),
                          opacity: coord.opacity,
                          filter: `blur(${coord.blur}px)`
                        }}
                        className="transition-[opacity,filter] duration-300 group cursor-pointer p-4 -m-4"
                      >
                        
                        {/* Hexagon Wrapper */}
                        <div className="relative w-12 h-12 flex items-center justify-center">
                          <svg className="absolute inset-0 w-full h-full drop-shadow-xl" viewBox="0 0 100 100">
                            <polygon 
                              points="50,5 93,28 93,72 50,95 7,72 7,28" 
                              fill={isHovered ? 'rgba(17, 76, 90, 0.7)' : 'rgba(23, 43, 54, 0.4)'} 
                              stroke={isHovered ? '#FFC801' : '#114C5A'} 
                              strokeWidth={isHovered ? '4' : '2'}
                              className="transition-all duration-300"
                            />
                          </svg>
                          
                          {/* Inner Centered Icon */}
                          <div className="relative z-10 flex items-center justify-center text-brand-text-primary group-hover:text-brand-accent transition-colors duration-200">
                            <Icon className={`w-4 h-4 ${isHovered ? 'scale-110' : ''} transition-transform duration-200`} />
                          </div>
                        </div>

                        {/* Hover Tooltip */}
                        {isHovered && (
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-[9px] font-mono text-brand-accent whitespace-nowrap shadow-xl">
                            {module.name}
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {/* 3. ORBITING GLASS KPI METRICS */}
                  {kpiCoords.map((coord) => (
                    <div 
                      key={coord.id}
                      className="absolute z-30 glass-panel p-3 rounded-xl border border-slate-800 bg-slate-900/35 w-[105px] select-none transition-all duration-300"
                      style={{
                        position: 'absolute',
                        transform: `translate3d(${coord.x}px, ${coord.y}px, ${coord.z}px) scale(${coord.scale})`,
                        zIndex: Math.round(coord.z + 180),
                        opacity: coord.opacity,
                        filter: `blur(${coord.blur}px)`
                      }}
                    >
                      <span className="text-[9px] font-mono text-brand-text-secondary opacity-60 uppercase block">{coord.title}</span>
                      <span className={`text-xs sm:text-sm font-bold font-mono tracking-tight ${coord.colorClass}`}>
                        <AnimatedCounter value={coord.value} suffix={coord.suffix} decimals={coord.decimals} />
                      </span>
                    </div>
                  ))}

                </div>

              </div>
              
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
};
