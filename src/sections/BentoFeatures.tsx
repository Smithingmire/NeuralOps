'use client';

import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { 
  Database, Cpu, Terminal, GitBranch, ArrowRight, ShieldCheck, 
  BarChart3, Network, ArrowLeft, Bot, Zap, Key
} from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';

// Types
interface FeatureMeta {
  id: number;
  title: string;
  badge: string;
  description: string;
  icon: React.ComponentType<any>;
}

// 6 Core Features
const FEATURES: FeatureMeta[] = [
  {
    id: 0,
    title: 'Workflow',
    badge: 'AI Orchestration',
    description: 'Dynamic execution graphs linking multi-agent systems and semantic search cycles.',
    icon: GitBranch,
  },
  {
    id: 1,
    title: 'Analytics',
    badge: 'Real-time Metrics',
    description: 'Live performance metrics, reasoning cost tracking, and optimization ratios.',
    icon: BarChart3,
  },
  {
    id: 2,
    title: 'Security',
    badge: 'Guardrails & VM',
    description: 'SOC-2 compliant isolated micro-VM sandboxes and token payload checking.',
    icon: ShieldCheck,
  },
  {
    id: 3,
    title: 'API Platform',
    badge: 'Edge Serverless',
    description: 'Compile agent scripts to fast edge APIs served globally under 50ms.',
    icon: Terminal,
  },
  {
    id: 4,
    title: 'Vector Database',
    badge: 'Context Store',
    description: 'Semantic vector indexes with hot-path caching for sub-millisecond retrieval.',
    icon: Database,
  },
  {
    id: 5,
    title: 'Automation',
    badge: 'Task Scheduling',
    description: 'Trigger-based cron actions and self-healing error resolution agents.',
    icon: Cpu,
  }
];

export const BentoFeatures: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [hoveredModule, setHoveredModule] = useState<number | null>(null);
  
  // Orbit state
  const [orbitAngle, setOrbitAngle] = useState(0);
  const requestRef = useRef<number | null>(null);

  // Mouse tracking state for virtual camera 3D tilting
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16; // -8 to +8 degrees
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 16; // -8 to +8 degrees
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  // Run orbit loop only when overview is visible and not hovered
  useEffect(() => {
    const animate = () => {
      if (!isExpanded && hoveredModule === null) {
        setOrbitAngle((prev) => (prev + 0.3) % 360);
      }
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isExpanded, hoveredModule]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isExpanded) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setActiveFeature((prev) => (prev + 1) % FEATURES.length);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setActiveFeature((prev) => (prev - 1 + FEATURES.length) % FEATURES.length);
        } else if (e.key === 'Escape') {
          e.preventDefault();
          setIsExpanded(false);
        }
      } else {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          setActiveFeature((prev) => (prev + 1) % FEATURES.length);
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          setActiveFeature((prev) => (prev - 1 + FEATURES.length) % FEATURES.length);
        } else if (e.key === 'Enter') {
          e.preventDefault();
          setIsExpanded(true);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isExpanded]);

  // Compute 3D Coordinates for each orbiting module
  const modulesCoordinates = useMemo(() => {
    return FEATURES.map((feat, i) => {
      const angle = (orbitAngle + i * 60) * (Math.PI / 180);
      // Orbiting ellipsoidal radii
      const x = Math.cos(angle) * 280;
      const y = Math.sin(angle) * 70 + (i % 2 === 0 ? -15 : 15);
      const z = Math.sin(angle) * 180; // depth offset
      
      // Calculate scaling & opacity based on depth coordinate (z)
      // Z ranges from -180 (furthest) to +180 (closest)
      const scale = ((z + 180) / 360) * 0.35 + 0.85; // 0.85 to 1.2
      const opacity = ((z + 180) / 360) * 0.55 + 0.45; // 0.45 to 1.0
      const blur = z < 0 ? Math.abs(z) * 0.007 : 0; // slight background blur
      
      return { id: feat.id, x, y, z, scale, opacity, blur };
    });
  }, [orbitAngle]);

  // Dynamic Background shift based on active feature
  const activeBackground = useMemo(() => {
    switch (activeFeature) {
      case 0: // Workflow
        return (
          <div className="absolute inset-0 opacity-15 pointer-events-none transition-all duration-500">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <path d="M 0 50 Q 25% 10, 50% 90 T 100% 50" fill="none" stroke="#FFC801" strokeWidth="1" strokeDasharray="8,8" />
              <path d="M 0 30 Q 30% 90, 60% 10 T 100% 30" fill="none" stroke="#FF9932" strokeWidth="1" strokeDasharray="6,6" />
            </svg>
          </div>
        );
      case 1: // Analytics
        return (
          <div className="absolute inset-0 opacity-20 pointer-events-none transition-all duration-500">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px]" />
          </div>
        );
      case 2: // Security
        return (
          <div className="absolute inset-0 opacity-10 pointer-events-none transition-all duration-500">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <pattern id="hex-grid" width="30" height="52" patternUnits="userSpaceOnUse">
                <path d="M 15 0 L 30 8.6 L 30 25.8 L 15 34.4 L 0 25.8 L 0 8.6 Z" fill="none" stroke="#FFC801" strokeWidth="0.5" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#hex-grid)" />
            </svg>
          </div>
        );
      case 3: // API
        return (
          <div className="absolute inset-0 opacity-15 pointer-events-none transition-all duration-500">
            <div className="absolute inset-0 flex flex-col justify-around font-mono text-[9px] text-brand-accent/30 overflow-hidden leading-none select-none pl-4">
              <span>GET /v2/agent/run HTTP/2</span>
              <span>POST /v2/vector/query HTTP/2</span>
              <span>gRPC STREAM /v2/reasoning/session</span>
            </div>
          </div>
        );
      case 4: // Vector DB
        return (
          <div className="absolute inset-0 opacity-15 pointer-events-none transition-all duration-500">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <line x1="20%" y1="20%" x2="40%" y2="80%" stroke="#FFC801" strokeWidth="0.5" />
              <line x1="40%" y1="80%" x2="60%" y2="30%" stroke="#FF9932" strokeWidth="0.5" />
              <line x1="60%" y1="30%" x2="80%" y2="70%" stroke="#FFC801" strokeWidth="0.5" />
              <circle cx="20%" cy="20%" r="3" fill="#FFC801" />
              <circle cx="40%" cy="80%" r="4" fill="#FF9932" />
              <circle cx="60%" cy="30%" r="3.5" fill="#FFC801" />
              <circle cx="80%" cy="70%" r="3" fill="#FF9932" />
            </svg>
          </div>
        );
      case 5: // Automation
        return (
          <div className="absolute inset-0 opacity-20 pointer-events-none transition-all duration-500 overflow-hidden">
            <div className="flex gap-16 animate-marquee-left whitespace-nowrap text-brand-accent-hover/30 text-2xl font-mono">
              <span>➔ ➔ ➔ ➔ </span>
              <span>➔ ➔ ➔ ➔ </span>
              <span>➔ ➔ ➔ ➔ </span>
            </div>
          </div>
        );
      default:
        return null;
    }
  }, [activeFeature]);

  // Rendering individual feature experiences
  const renderWorkflowExperience = () => {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-950/40 p-5 rounded-2xl border border-slate-900">
          {['Upload', 'Validation', 'Embeddings', 'AI Agents', 'Deployment'].map((step, idx) => (
            <React.Fragment key={idx}>
              <div className="flex flex-col items-center gap-1.5 group">
                <div className="w-8 h-8 rounded-full bg-slate-950 border border-brand-accent/30 flex items-center justify-center text-brand-accent text-[10px] font-mono font-bold group-hover:scale-110 transition-transform duration-200">
                  {idx + 1}
                </div>
                <span className="text-[10px] font-mono text-brand-text-secondary">{step}</span>
              </div>
              {idx < 4 && (
                <div className="hidden sm:block text-brand-accent animate-pulse">➔</div>
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-900 text-center font-mono">
            <span className="text-[9px] text-brand-text-secondary opacity-60 block">LATENCY</span>
            <span className="text-sm font-bold text-brand-accent">24 ms</span>
          </div>
          <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-900 text-center font-mono">
            <span className="text-[9px] text-brand-text-secondary opacity-60 block">ACCURACY</span>
            <span className="text-sm font-bold text-brand-accent-hover">99.82%</span>
          </div>
          <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-900 text-center font-mono">
            <span className="text-[9px] text-brand-text-secondary opacity-60 block">AUTOMATION</span>
            <span className="text-sm font-bold text-emerald-400">98.4%</span>
          </div>
        </div>
        <div className="w-full rounded-xl border border-slate-900 bg-slate-950 p-4 space-y-1 text-slate-300 font-mono text-[10px] sm:text-[11px] leading-relaxed">
          <div className="text-brand-accent font-bold">&gt; Upload complete [OK]</div>
          <div className="text-brand-text-secondary">&gt; Building embeddings... [OK]</div>
          <div className="text-brand-text-secondary">&gt; Launching agents... [OK]</div>
          <div className="text-emerald-400 font-bold">&gt; Workflow deployed [OK]</div>
        </div>
      </div>
    );
  };

  const renderAnalyticsExperience = () => {
    return (
      <div className="space-y-6">
        <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-900">
          <div className="flex justify-between items-center mb-4">
            <h5 className="text-[10px] font-mono font-bold text-brand-text-primary uppercase tracking-widest">Inference Volume</h5>
            <span className="text-[9px] font-mono text-brand-accent">LIVE FEED</span>
          </div>
          <svg className="w-full h-32" viewBox="0 0 400 100" fill="none">
            <path
              d="M 0 80 Q 50 20, 100 70 T 200 40 T 300 90 T 400 20"
              stroke="#FFC801"
              strokeWidth="2.5"
              fill="none"
            />
            <path
              d="M 0 80 Q 50 20, 100 70 T 200 40 T 300 90 T 400 20 L 400 100 L 0 100 Z"
              fill="url(#an-grad)"
              opacity="0.1"
            />
            <defs>
              <linearGradient id="an-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFC801" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-900 flex justify-between items-center">
            <div>
              <span className="text-[9px] font-mono text-brand-text-secondary opacity-60">ACTIVE WORKERS</span>
              <div className="text-xl font-bold font-mono text-brand-text-primary mt-1">1,482</div>
            </div>
            <svg className="w-10 h-10" viewBox="0 0 36 36">
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#114C5A" strokeWidth="2.5" />
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#FF9932" strokeDasharray="80, 100" strokeWidth="2.5" />
            </svg>
          </div>
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-900 flex justify-between items-center">
            <div>
              <span className="text-[9px] font-mono text-brand-text-secondary opacity-60">SAVED TOKEN BILL</span>
              <div className="text-xl font-bold font-mono text-brand-accent mt-1">$48,293</div>
            </div>
            <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/30 px-2 py-0.5 rounded border border-emerald-500/20">+74%</span>
          </div>
        </div>
      </div>
    );
  };

  const renderSecurityExperience = () => {
    return (
      <div className="space-y-6">
        <div className="bg-slate-950/60 p-6 rounded-2xl border border-slate-900 relative overflow-hidden">
          <div className="absolute top-2 right-2 flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-950/30 border border-emerald-500/20 text-[9px] font-mono font-bold text-emerald-400 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>SECURE SANDBOX</span>
          </div>
          <div className="flex flex-col items-center justify-center py-4 space-y-4 text-center">
            <div className="relative w-16 h-16 rounded-full bg-brand-accent/10 border border-brand-accent flex items-center justify-center text-brand-accent animate-pulse">
              <ShieldCheck className="w-8 h-8" />
              <div className="absolute inset-0 rounded-full bg-brand-accent/20 blur animate-ping" />
            </div>
            <div>
              <h6 className="text-xs font-mono font-bold text-brand-text-primary uppercase tracking-wider">Multi-Tenant Isolated micro-VM</h6>
              <p className="text-[10px] text-brand-text-secondary mt-1 max-w-sm leading-normal">
                Executing dynamic tasks in sandboxed edge micro-VM nodes. SOC-2 type payload validations completed automatically.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderAPIExperience = () => {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4 bg-slate-950/40 p-4 rounded-xl border border-slate-900 font-mono text-[10px]">
          <div className="flex flex-col items-center">
            <span className="text-[8px] text-brand-text-secondary opacity-60">CLIENT</span>
            <span className="text-brand-accent font-bold">curl API</span>
          </div>
          <div className="text-slate-700 font-bold">➔</div>
          <div className="flex flex-col items-center">
            <span className="text-[8px] text-brand-text-secondary opacity-60">GATEWAY</span>
            <span className="text-brand-text-primary">Verify Keys</span>
          </div>
          <div className="text-slate-700 font-bold">➔</div>
          <div className="flex flex-col items-center">
            <span className="text-[8px] text-brand-text-secondary opacity-60">RESPONSE</span>
            <span className="text-emerald-400 font-bold">200 OK</span>
          </div>
        </div>
        <div className="rounded-xl border border-slate-900 bg-slate-950 overflow-hidden font-mono text-[10px] sm:text-[11px]">
          <div className="flex justify-between items-center px-4 py-2 bg-slate-900 border-b border-slate-950">
            <span className="text-brand-text-secondary opacity-70">JSON response</span>
            <span className="text-[8px] bg-brand-accent/15 text-brand-accent px-1.5 py-0.5 rounded font-bold">POST</span>
          </div>
          <pre className="p-4 overflow-x-auto text-slate-300">
            <code>
{`{
  "status": "success",
  "pipeline": "orchestrator_main",
  "execution_ms": 42,
  "tokens_used": 1420
}`}
            </code>
          </pre>
        </div>
      </div>
    );
  };

  const renderVectorDBExperience = () => {
    return (
      <div className="space-y-6">
        <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-900 relative overflow-hidden">
          <div className="flex justify-between items-center mb-4">
            <h5 className="text-[10px] font-mono font-bold text-brand-text-primary uppercase tracking-widest">Similarity Search Clusters</h5>
            <span className="text-[9px] font-mono text-brand-accent-hover">NEIGHBOR CORRELATION</span>
          </div>
          <div className="relative w-full h-36 border border-slate-900 bg-slate-950/80 rounded-xl overflow-hidden">
            <svg className="absolute inset-0 w-full h-full">
              <circle cx="50%" cy="50%" r="5" fill="#FFC801" className="animate-ping" />
              <circle cx="50%" cy="50%" r="5" fill="#FFC801" />
              <line x1="50%" y1="50%" x2="30%" y2="25%" stroke="#FF9932" strokeWidth="1" strokeDasharray="3,3" />
              <line x1="50%" y1="50%" x2="70%" y2="45%" stroke="#FF9932" strokeWidth="1" strokeDasharray="3,3" />
              <line x1="50%" y1="50%" x2="45%" y2="75%" stroke="#FFC801" strokeWidth="1.5" />
              <circle cx="30%" cy="25%" r="3" fill="#FF9932" />
              <circle cx="70%" cy="45%" r="3" fill="#FF9932" />
              <circle cx="45%" cy="75%" r="4" fill="#FFC801" />
              <circle cx="10%" cy="80%" r="2.5" fill="#114C5A" />
              <circle cx="90%" cy="15%" r="2" fill="#114C5A" />
            </svg>
          </div>
        </div>
      </div>
    );
  };

  const renderAutomationExperience = () => {
    return (
      <div className="space-y-6">
        <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-900">
          <div className="flex justify-between items-center mb-4">
            <h5 className="text-[10px] font-mono font-bold text-brand-text-primary uppercase tracking-widest">Trigger Orchestrations</h5>
            <span className="text-[9px] font-mono text-brand-accent">CRON SCHEDULER</span>
          </div>
          <div className="space-y-2.5 font-mono text-[10px]">
            <div className="flex items-center justify-between p-3 bg-slate-950 border border-slate-900 rounded-lg">
              <span className="text-brand-text-primary">1. Database Webhook Trigger</span>
              <span className="text-brand-accent">INTERVAL: 5s</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-950 border border-slate-900 rounded-lg">
              <span className="text-brand-text-primary">2. Validation Agent Execution</span>
              <span className="text-emerald-400 font-bold">PASS</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const activeExperienceVisual = useMemo(() => {
    switch (activeFeature) {
      case 0: return renderWorkflowExperience();
      case 1: return renderAnalyticsExperience();
      case 2: return renderSecurityExperience();
      case 3: return renderAPIExperience();
      case 4: return renderVectorDBExperience();
      case 5: return renderAutomationExperience();
      default: return null;
    }
  }, [activeFeature]);

  const handleModuleClick = useCallback((index: number) => {
    setActiveFeature(index);
    setIsExpanded(true);
  }, []);

  return (
    <section id="features" className="py-16 relative overflow-hidden scroll-mt-20 border-t border-slate-900/60 bg-[#172B36] min-h-[600px]">
      
      {/* Dynamic Shifting Backgrounds */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[#172B36] transition-colors duration-500" />
        
        {/* Layer 1: Blurred radial gradients */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-accent/5 rounded-full blur-3xl pointer-events-none" />
        
        {/* Layer 2: Grid Backdrop */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] opacity-25" />

        {activeBackground}
      </div>

      {/* Embedded CSS for 3D structures and animations */}
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
        @keyframes spin-ring-1 {
          0% { transform: rotateX(70deg) rotateY(0deg) rotateZ(0deg); }
          100% { transform: rotateX(70deg) rotateY(0deg) rotateZ(360deg); }
        }
        @keyframes spin-ring-2 {
          0% { transform: rotateX(20deg) rotateY(70deg) rotateZ(0deg); }
          100% { transform: rotateX(20deg) rotateY(70deg) rotateZ(360deg); }
        }
        @keyframes float-core {
          0%, 100% { transform: translateY(0px) rotateZ(0deg); }
          50% { transform: translateY(-12px) rotateZ(3deg); }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-[10px] font-mono font-bold tracking-widest text-brand-accent uppercase">
            <span>CORE COMPUTATION</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-brand-text-primary tracking-tight font-mono">
            NeuralOps Command Center
          </h2>
          <p className="text-sm text-brand-text-secondary leading-relaxed font-sans max-w-xl mx-auto">
            Interact with the central floating AI operating processor and navigate the core ecosystem.
          </p>
        </div>

        {/* 1. VIEWPORT STATE */}
        {!isExpanded ? (
          /* ==================================================
             3D INTERACTIVE AI CORE VIEWPORT
             ================================================== */
          <div 
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-full min-h-[480px] flex items-center justify-center perspective-1200 transition-all duration-300"
          >
            {/* 3D Orbiting Network Group with tilt effect */}
            <div 
              className={`relative w-full h-full flex items-center justify-center transform-style-3d ${
                mousePos.x === 0 && mousePos.y === 0 ? 'transition-transform duration-500 ease-out' : ''
              }`}
              style={{
                transform: `rotateX(${-mousePos.y}deg) rotateY(${mousePos.x}deg)`
              }}
            >
              
              {/* SVG Connector lines and pulses from center to modules */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
                {modulesCoordinates.map((coord, idx) => {
                  const isHovered = hoveredModule === coord.id;
                  
                  return (
                    <g key={coord.id}>
                      {/* Curved link from center (0,0 relative in viewBox center) */}
                      <path
                        d={`M 50% 50% Q calc(50% + ${coord.x / 2}px) calc(50% + ${coord.y / 2 - 20}px), calc(50% + ${coord.x}px) calc(50% + ${coord.y}px)`}
                        stroke={isHovered ? '#FFC801' : '#114C5A'}
                        strokeWidth={isHovered ? '2' : '1'}
                        fill="none"
                        opacity={coord.opacity * 0.7}
                        className="transition-all duration-300"
                      />
                      {/* Flowing animated pulse circle */}
                      <circle r={isHovered ? 4.5 : 3} fill={isHovered ? '#FF9932' : '#FFC801'} opacity={coord.opacity}>
                        <animateMotion
                          dur={isHovered ? '0.8s' : '3s'}
                          repeatCount="indefinite"
                          path={`M 50% 50% Q calc(50% + ${coord.x / 2}px) calc(50% + ${coord.y / 2 - 20}px), calc(50% + ${coord.x}px) calc(50% + ${coord.y}px)`}
                        />
                      </circle>
                    </g>
                  );
                })}
              </svg>

              {/* A. THE CENTRAL 3D AI CORE (Floating Polyhedron) */}
              <div className="relative z-10 w-32 h-32 flex items-center justify-center transform-style-3d pointer-events-none">
                
                {/* 3D Core Outer Gyroscopic Rings */}
                <div className="absolute w-44 h-44 rounded-full border-2 border-dashed border-brand-accent/25 transform-style-3d pointer-events-none animate-[spin-ring-1_8s_linear_infinite]">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-brand-accent rounded-full shadow-[0_0_8px_#FFC801]" />
                </div>
                <div className="absolute w-48 h-48 rounded-full border-2 border-double border-brand-accent-hover/20 transform-style-3d pointer-events-none animate-[spin-ring-2_10s_linear_infinite]">
                  <div className="absolute bottom-0 right-1/2 translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 bg-brand-accent-hover rounded-full shadow-[0_0_8px_#FF9932]" />
                </div>

                {/* Double nested 3D Polyhedrons with Floating wrapper */}
                <div className="relative w-24 h-24 transform-style-3d flex items-center justify-center animate-[float-core_5s_ease-in-out_infinite]">
                  
                  {/* A. Outer Crystalline Glass Shell (Rotates forward) */}
                  <div className="absolute w-20 h-20 transform-style-3d animate-[rotate-cube-outer_12s_linear_infinite]">
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

                </div>

              </div>

              {/* B. Orbiting Module Nodes */}
              {modulesCoordinates.map((coord, idx) => {
                const feature = FEATURES[coord.id];
                const Icon = feature.icon;
                const isHovered = hoveredModule === coord.id;
                
                return (
                  <div
                    key={coord.id}
                    onClick={() => handleModuleClick(coord.id)}
                    onMouseEnter={() => setHoveredModule(coord.id)}
                    onMouseLeave={() => setHoveredModule(null)}
                    style={{
                      position: 'absolute',
                      transform: `translate3d(${coord.x}px, ${coord.y}px, ${coord.z}px) scale(${coord.scale})`,
                      zIndex: Math.round(coord.z + 200),
                      opacity: coord.opacity,
                      filter: `blur(${coord.blur}px)`,
                    }}
                    className="group cursor-pointer select-none transition-[opacity,filter] duration-300"
                  >
                    {/* Glass module capsule shape */}
                    <div className={`glass-panel px-4 py-2.5 rounded-full border flex items-center gap-2.5 bg-slate-900/40 transition-all duration-300 ${
                      isHovered 
                        ? 'border-brand-accent bg-[#114C5A]/60 shadow-lg shadow-brand-accent/10 scale-110' 
                        : 'border-slate-800 hover:border-brand-accent-hover/30'
                    }`}>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 ${
                        isHovered ? 'bg-brand-accent text-slate-950' : 'bg-slate-950 text-brand-accent'
                      }`}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-mono text-xs font-bold text-brand-text-primary group-hover:text-brand-accent transition-colors duration-150">
                        {feature.title}
                      </span>
                    </div>

                    {/* Floating mini preview on hover */}
                    {isHovered && (
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-48 p-3 rounded-xl bg-slate-950 border border-slate-800 text-[10px] text-brand-text-secondary text-center shadow-2xl leading-normal animate-fade-in pointer-events-none">
                        <span className="text-[9px] font-mono font-bold tracking-widest text-brand-accent uppercase block mb-1">
                          {feature.badge}
                        </span>
                        {feature.description}
                      </div>
                    )}
                  </div>
                );
              })}

            </div>
          </div>
        ) : (
          /* ==================================================
             EXPANDED COMMAND WORKBENCH STATE
             ================================================== */
          <ScrollReveal animation="fade">
            <div className="glass-panel border border-brand-accent/20 rounded-2xl bg-slate-950/70 overflow-hidden shadow-2xl relative">
              
              {/* Control Header */}
              <div className="flex items-center justify-between px-6 py-4 bg-slate-900 border-b border-slate-950">
                <button
                  onClick={() => setIsExpanded(false)}
                  className="flex items-center gap-2 text-xs font-semibold text-brand-text-secondary hover:text-brand-text-primary transition-colors duration-150 focus:outline-none focus:ring-1 focus:ring-brand-accent/50 rounded px-2.5 py-1.5 border border-slate-800 hover:border-slate-700 bg-slate-950/40"
                  aria-label="Back to overview grid"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to 3D Core View</span>
                </button>
                <div className="text-[10px] font-mono text-brand-text-secondary opacity-50 tracking-wider hidden sm:block">
                  USE UP/DOWN ARROWS TO NAVIGATE • ESC TO CORE
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[480px]">
                
                {/* LEFT SIDE: Vertical Navigation Rail */}
                <div className="lg:col-span-4 border-r border-slate-950 bg-slate-900/10 p-6 space-y-2">
                  <span className="text-[9px] font-mono font-bold tracking-widest text-brand-text-secondary opacity-50 uppercase block mb-4">
                    COMMAND MODULES
                  </span>
                  
                  <nav className="space-y-1.5" aria-label="Feature list navigation">
                    {FEATURES.map((feature, idx) => {
                      const Icon = feature.icon;
                      const isActive = activeFeature === idx;
                      
                      return (
                        <button
                          key={feature.id}
                          onClick={() => setActiveFeature(idx)}
                          className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl border text-left transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-brand-accent/50 ${
                            isActive
                              ? 'bg-[#114C5A]/45 border-brand-accent text-brand-accent shadow-md shadow-brand-accent/5'
                              : 'bg-transparent border-transparent text-brand-text-secondary opacity-70 hover:opacity-100 hover:bg-slate-900/30'
                          }`}
                        >
                          <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'animate-pulse' : ''}`} />
                          <div className="min-w-0">
                            <span className="text-xs font-bold font-mono block truncate">
                              {feature.title}
                            </span>
                            <span className="text-[9px] text-brand-text-secondary opacity-50 block truncate">
                              {feature.badge}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </nav>
                </div>

                {/* RIGHT SIDE: Large Interactive Showcase */}
                <div className="lg:col-span-8 p-6 sm:p-8 flex flex-col justify-between bg-slate-950/40 relative">
                  
                  {/* Glowing background spot */}
                  <div className="absolute bottom-4 right-4 w-48 h-48 bg-brand-accent/5 rounded-full blur-2xl pointer-events-none" />

                  {/* Showcase Header */}
                  <div className="mb-8">
                    <span className="text-[9px] font-mono font-bold tracking-widest text-brand-accent uppercase block mb-1">
                      {FEATURES[activeFeature].badge} SPECIFICATIONS
                    </span>
                    <h4 className="text-2xl font-bold font-mono text-brand-text-primary">
                      {FEATURES[activeFeature].title} Panel
                    </h4>
                    <p className="text-xs text-brand-text-secondary opacity-80 mt-1 max-w-xl font-sans">
                      {FEATURES[activeFeature].description}
                    </p>
                  </div>

                  {/* Render the selected unique visual experience */}
                  <div className="relative z-10 flex-grow">
                    {activeExperienceVisual}
                  </div>

                </div>

              </div>

            </div>
          </ScrollReveal>
        )}

      </div>
    </section>
  );
};
