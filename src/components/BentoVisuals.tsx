'use client';

import React from 'react';

// Visual 1: Neural Inference Engine (Mock Terminal Output)
export const TerminalVisual: React.FC = () => {
  return (
    <div className="w-full h-full min-h-[160px] bg-slate-950/80 rounded-lg border border-slate-800 p-4 font-mono text-[11px] text-emerald-400 overflow-hidden relative select-none">
      <div className="flex items-center gap-1.5 border-b border-slate-800/80 pb-2 mb-2">
        <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
        <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
        <span className="text-slate-500 ml-1.5 text-[10px]">inference_engine.py</span>
      </div>
      <div className="space-y-1.5 animate-pulse-slow">
        <div className="text-slate-500 font-sans"># Initializing global inference engine...</div>
        <div>
          <span className="text-cyan-400">INFO:</span> Load model <span className="text-pink-400">{"\"neuralops-reasoning-v2.1\""}</span>
        </div>
        <div>
          <span className="text-cyan-400">INFO:</span> KV-Cache allocated: <span className="text-yellow-400">32GB</span> | GPU-Util: <span className="text-yellow-400">88%</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-amber-400">WARNING:</span> Rate limit warming... <span className="text-slate-500">600 RPM</span>
        </div>
        <div className="text-teal-300">
          $ curl https://api.neuralops.ai/v1/chat/completions \
        </div>
        <div className="pl-3 text-slate-400">
          {"-d '{\"model\": \"neuralops-reasoning\", \"temp\": 0.2}'"}
        </div>
        <div className="text-indigo-300">
          &gt; [TOKENSTREAM]: {"\"Thinking: Analyzing query semantic graph... Done.\""}
        </div>
        <div className="text-emerald-300 flex items-center gap-2">
          <span>&gt; Latency: 42ms | Tokens/s: 185</span>
          <span className="inline-block w-1.5 h-3 bg-emerald-400 animate-blink" />
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />
    </div>
  );
};

// Visual 2: Vector Pipeline (Interactive SVG flows)
export const VectorPipelineVisual: React.FC = () => {
  return (
    <div className="w-full h-full min-h-[160px] flex items-center justify-center bg-slate-950/40 rounded-lg border border-slate-800/60 p-4 relative overflow-hidden">
      {/* Background grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:14px_24px]" />
      
      {/* Node flow diagram */}
      <svg className="w-full max-w-[280px] h-[120px] relative z-10" viewBox="0 0 280 120">
        {/* Connection Paths */}
        <path d="M 30,30 Q 140,10 140,60" fill="none" stroke="rgba(6, 182, 212, 0.2)" strokeWidth="1.5" />
        <path d="M 30,60 Q 140,60 140,60" fill="none" stroke="rgba(20, 184, 166, 0.2)" strokeWidth="1.5" />
        <path d="M 30,90 Q 140,110 140,60" fill="none" stroke="rgba(6, 182, 212, 0.2)" strokeWidth="1.5" />
        <path d="M 140,60 L 250,60" fill="none" stroke="rgba(14, 165, 233, 0.3)" strokeWidth="2" strokeDasharray="4 4" />

        {/* Floating animated points */}
        <circle r="3" fill="#06b6d4" className="animate-path-flow-1">
          <animateMotion dur="3s" repeatCount="indefinite" path="M 30,30 Q 140,10 140,60" />
        </circle>
        <circle r="3.5" fill="#14b8a6" className="animate-path-flow-2">
          <animateMotion dur="2.2s" repeatCount="indefinite" path="M 30,60 Q 140,60 140,60" />
        </circle>
        <circle r="3" fill="#06b6d4" className="animate-path-flow-3">
          <animateMotion dur="3.5s" repeatCount="indefinite" path="M 30,90 Q 140,110 140,60" />
        </circle>

        {/* Input Nodes */}
        <circle cx="30" cy="30" r="6" fill="#1e293b" stroke="#06b6d4" strokeWidth="1.5" />
        <circle cx="30" cy="60" r="6" fill="#1e293b" stroke="#14b8a6" strokeWidth="1.5" />
        <circle cx="30" cy="90" r="6" fill="#1e293b" stroke="#06b6d4" strokeWidth="1.5" />

        {/* Central Vector Database Node */}
        <g className="animate-pulse-slow">
          <circle cx="140" cy="60" r="16" fill="#0f172a" stroke="#0ea5e9" strokeWidth="2" />
          <polygon points="135,55 145,55 145,65 135,65" fill="#06b6d4" opacity="0.8" />
          <polygon points="140,51 149,60 140,69 131,60" fill="none" stroke="#0ea5e9" strokeWidth="1" />
        </g>

        {/* Output Target Node */}
        <circle cx="250" cy="60" r="8" fill="#1e293b" stroke="#14b8a6" strokeWidth="2" />
        <circle cx="250" cy="60" r="2" fill="#14b8a6" />
      </svg>
    </div>
  );
};

// Visual 3: Agent Orchestrator (Visual state connections)
export const AgentOrchestratorVisual: React.FC = () => {
  return (
    <div className="w-full h-full min-h-[160px] flex flex-col justify-between bg-slate-950/30 rounded-lg border border-slate-800/60 p-4 font-mono text-[10px] relative overflow-hidden">
      {/* Node elements */}
      <div className="flex justify-between items-center z-10">
        <div className="px-2 py-1 rounded bg-slate-900 border border-slate-700/80 text-cyan-400 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          <span>Planner</span>
        </div>
        <div className="h-0.5 flex-1 bg-gradient-to-r from-cyan-500/40 to-teal-500/40 relative">
          <div className="absolute top-1/2 left-0 w-2 h-2 -translate-y-1/2 rounded-full bg-cyan-400 animate-agent-flow-1" />
        </div>
        <div className="px-2 py-1 rounded bg-slate-900 border border-slate-700/80 text-teal-300 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-300" />
          <span>Coder_Agent</span>
        </div>
      </div>

      <div className="flex justify-center items-center my-2.5 z-10">
        <svg className="w-[100px] h-[30px]" viewBox="0 0 100 30">
          <path d="M 10,0 L 50,25 L 90,0" fill="none" stroke="rgba(20, 184, 166, 0.4)" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="50" cy="25" r="4" fill="#0ea5e9" className="animate-bounce" />
        </svg>
      </div>

      <div className="flex justify-between items-center z-10">
        <div className="px-2 py-1 rounded bg-slate-900 border border-slate-700/80 text-indigo-400 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
          <span>Evaluator</span>
        </div>
        <div className="h-0.5 flex-1 bg-gradient-to-r from-indigo-500/40 to-emerald-500/40 relative">
          <div className="absolute top-1/2 left-0 w-2 h-2 -translate-y-1/2 rounded-full bg-emerald-400 animate-agent-flow-2" />
        </div>
        <div className="px-2 py-1 rounded bg-emerald-950/40 border border-emerald-800/60 text-emerald-400 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>Output_Deploy</span>
        </div>
      </div>
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 bg-sky-500/5 rounded-full blur-xl pointer-events-none" />
    </div>
  );
};

// Visual 4: Secure Sandbox (JSON metadata inspector)
export const SecureSandboxVisual: React.FC = () => {
  return (
    <div className="w-full h-full min-h-[160px] bg-slate-950/70 rounded-lg border border-slate-800 p-4 font-mono text-[10px] text-slate-300 relative overflow-hidden select-none">
      <div className="flex justify-between items-center border-b border-slate-800/80 pb-2 mb-2">
        <span className="text-slate-500 text-[9px] uppercase tracking-wider">VM-SANDBOX METRICS</span>
        <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px]">ISOLATED</span>
      </div>
      <div className="space-y-1 text-slate-400">
        <div><span className="text-slate-500">{"{"}</span></div>
        <div className="pl-3">
          <span className="text-indigo-400">{"\"sandbox_id\""}</span>: <span className="text-amber-300">{"\"sb-928f-x8\""}</span>,
        </div>
        <div className="pl-3">
          <span className="text-indigo-400">{"\"memory_limit\""}</span>: <span className="text-amber-300">{"\"128MB\""}</span>,
        </div>
        <div className="pl-3">
          <span className="text-indigo-400">{"\"network_access\""}</span>: <span className="text-rose-400">false</span>,
        </div>
        <div className="pl-3">
          <span className="text-indigo-400">{"\"persistent_disk\""}</span>: <span className="text-rose-400">false</span>,
        </div>
        <div className="pl-3">
          <span className="text-indigo-400">{"\"compliance\""}</span>: <span className="text-cyan-400">{"[\"SOC2\", \"HIPAA\"]"}</span>,
        </div>
        <div className="pl-3 flex items-center gap-1.5">
          <span className="text-indigo-400">{"\"process_status\""}</span>: <span className="text-emerald-400">{"\"active_exec\""}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </div>
        <div><span className="text-slate-500">{"}"}</span></div>
      </div>
      {/* Scanning laser line overlay */}
      <div className="absolute left-0 right-0 h-[1.5px] bg-cyan-500/40 shadow-[0_0_8px_rgba(6,182,212,0.8)] animate-laser-scan pointer-events-none" />
    </div>
  );
};

// Visual 5: Global Edge Cache (Inference Latency Graph)
export const EdgeCacheVisual: React.FC = () => {
  return (
    <div className="w-full h-full min-h-[160px] flex flex-col justify-between bg-slate-950/40 rounded-lg border border-slate-800/60 p-4 relative overflow-hidden">
      <div className="flex justify-between items-center">
        <span className="text-slate-400 font-mono text-[10px]">CACHE STATS</span>
        <span className="text-cyan-400 font-mono text-[10px] font-bold">94.8% HIT RATE</span>
      </div>

      {/* Latency bar comparison */}
      <div className="space-y-3 my-2 z-10">
        <div className="space-y-1">
          <div className="flex justify-between text-[9px] font-mono text-slate-500">
            <span>Direct API Call (Origin)</span>
            <span className="text-rose-400">182ms</span>
          </div>
          <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
            <div className="h-full w-[85%] bg-gradient-to-r from-red-600 to-rose-500 rounded-full animate-bar-grow-1" />
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-[9px] font-mono text-slate-500">
            <span>NeuralOps Semantic Edge Cache</span>
            <span className="text-emerald-400">6ms</span>
          </div>
          <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
            <div className="h-full w-[8%] bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full animate-bar-grow-2" />
          </div>
        </div>
      </div>

      <div className="text-[9px] text-slate-500 font-mono text-center border-t border-slate-900 pt-1">
        Reduces average billing overhead by <span className="text-emerald-400 font-bold">78%</span>
      </div>
    </div>
  );
};
