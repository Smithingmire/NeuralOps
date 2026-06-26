'use client';

import React, { useState, useMemo } from 'react';
import { 
  Database, Cpu, Terminal, GitBranch, ArrowRight, 
  Cloud, Layers, ShieldCheck, Zap, Network, Copy, Check
} from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';

const GithubIcon: React.FC<any> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

// Types
interface WorkflowStep {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  items: string[];
  icon: React.ComponentType<any>;
  expandedTech: {
    latency: string;
    throughput: string;
    protocol: string;
    details: string;
    code: string;
  };
}

interface IntegrationItem {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: React.ComponentType<any>;
  bind: string;
  ping: string;
  status: string;
  code: string;
  codeTs: string;
  logs: string[];
}

// Data Definition
const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    id: 1,
    title: 'Connect',
    subtitle: 'SECURE INGESTION',
    description: 'Sync your enterprise databases, vector indexes, and APIs in a secure sandboxed edge environment.',
    items: ['Data Sources', 'APIs', 'Databases', 'Cloud Storage'],
    icon: Database,
    expandedTech: {
      latency: '< 5ms',
      throughput: '10 GB/s',
      protocol: 'TLS 1.3 / gRPC',
      details: 'NeuralOps establishes secure TLS 1.3 tunnels to your local data warehouses. Data is streamed in chunks, chunked semantically, and cached locally at edge nodes for hot retrieval.',
      code: 'import neuralops as no\n\n# Securely link vector database\ncluster = no.connect_db(\n    provider="pinecone",\n    secret_key=no.env.PINECONE_KEY,\n    encryption="aes-256-gcm"\n)'
    }
  },
  {
    id: 2,
    title: 'Analyze',
    subtitle: 'COGNITIVE MAPPING',
    description: 'Our cognitive layers construct dynamic multi-agent semantic graphs and token-aware routes.',
    items: ['AI Processing', 'Vector Search', 'Pattern Detection', 'Predictions'],
    icon: Network,
    expandedTech: {
      latency: '12ms',
      throughput: '45,000 tps',
      protocol: 'HTTP/2 Stream',
      details: 'Dynamic parsing trees map query intentions, routing semantic requests to cache nodes before calling central LLM hubs, preventing rate limits and saving token costs.',
      code: '# Execute semantic analysis\nroute = no.Router.route_query(\n    query="Fetch Q4 kernel performance logs",\n    semantic_density=0.85,\n    fallback="gpt-4o"\n)'
    }
  },
  {
    id: 3,
    title: 'Automate',
    subtitle: 'ORCHESTRATION',
    description: 'Execute nested reasoning cycles, code writer loops, and automated safety verifications.',
    items: ['AI Agents', 'Workflow Engine', 'Task Scheduling', 'Notifications'],
    icon: Cpu,
    expandedTech: {
      latency: '18ms',
      throughput: '120 pipelines/s',
      protocol: 'gRPC Stream',
      details: 'Multi-agent loops execute code compilation tasks, verify output formats, and validate safety policies inside isolated micro-VM sandboxes with millisecond scheduling accuracy.',
      code: '# Spin up self-verifying agent pipeline\norchestrator = no.Orchestrator(\n    agents=[developer, security_checker],\n    max_refinement_loops=3\n)\nresult = orchestrator.execute()'
    }
  },
  {
    id: 4,
    title: 'Deploy',
    subtitle: 'GLOBAL RUNTIME',
    description: 'Instantly compile to a serverless API endpoint deployed globally across 180+ CDN nodes.',
    items: ['Dashboards', 'Reports', 'API Delivery', 'Enterprise Integration'],
    icon: Terminal,
    expandedTech: {
      latency: '< 42ms edge',
      throughput: 'Unlimited Scale',
      protocol: 'WASM / Edge Run',
      details: 'Pipelines compile down to WebAssembly binaries and deploy directly onto edge handlers, serving real-time neural inferences with low latencies globally.',
      code: '# Publish compiled agent to edge endpoint\nendpoint = no.deploy(\n    pipeline=orchestrator,\n    regions=["us-east", "eu-central", "ap-south"],\n    auth_mode="jwt"\n)'
    }
  }
];

const INTEGRATIONS: IntegrationItem[] = [
  { 
    id: 'github', 
    name: 'GitHub', 
    category: 'DevOps', 
    description: 'Trigger agent deployment and CI/CD testing pipelines on git commit events.', 
    icon: GithubIcon,
    bind: 'git-gRPC / Webhook',
    ping: '8ms',
    status: 'ONLINE',
    code: 'pipeline = no.Pipeline(\n  trigger=no.triggers.GitHubCommit(repo="org/repo", branch="main"),\n  action=no.actions.DeployAgent(sandbox="micro-vm")\n)',
    codeTs: "import { no } from 'neuralops';\n\n// Create GitHub listener\nconst flow = no.pipeline('ci-flow')\n  .on('github:commit', { branch: 'main' })\n  .then(no.actions.deployAgent({ sandbox: 'micro-vm' }));",
    logs: [
      '✔ Webhook registered with GitHub organization repository.',
      '➜ Syncing git ref: refs/heads/main (SHA: 4fa90b)',
      '✔ Compiled production build and triggered Agent micro-VM launch.'
    ]
  },
  { 
    id: 'docker', 
    name: 'Docker', 
    category: 'Containers', 
    description: 'Package agent runtime environments into secure sandboxed container images.', 
    icon: Layers,
    bind: 'Registry API',
    ping: '14ms',
    status: 'ONLINE',
    code: 'image = no.containers.build(\n  dockerfile="./Dockerfile",\n  target="neuralops-agent:latest",\n  optimize=True\n)',
    codeTs: "import { no } from 'neuralops';\n\n// Build optimized containers\nconst image = await no.containers.build({\n  dockerfile: './Dockerfile',\n  tag: 'agent-ops:latest',\n  optimize: true\n});",
    logs: [
      '➜ Parsing container spec configurations...',
      '✔ Layer cached: agent-base:python3.11-slim (84.2MB)',
      '✔ Docker image neuralops-agent:latest pushed to registry.'
    ]
  },
  { 
    id: 'kubernetes', 
    name: 'Kubernetes', 
    category: 'Orchestration', 
    description: 'Scale containerized agent cluster tasks across private cloud infrastructure.', 
    icon: Network,
    bind: 'kube-apiserver / gRPC',
    ping: '4ms',
    status: 'ONLINE',
    code: 'cluster = no.orchestrator.Kubernetes(\n  namespace="agents",\n  replicas=50,\n  autoscaling=True\n)',
    codeTs: "import { no } from 'neuralops';\n\n// Provision K8s clusters\nconst k8s = no.orchestrator.Kubernetes({\n  namespace: 'agents',\n  replicas: 50,\n  autoscaling: true\n});",
    logs: [
      '➜ Scaling pods in namespace: agents...',
      '✔ Pod group initialized: neuralops-worker-a-9428',
      '✔ ReplicaSet verified: 50/50 ready [Avg CPU: 12%]'
    ]
  },
  { 
    id: 'aws', 
    name: 'AWS', 
    category: 'Cloud', 
    description: 'Store context databases, access IAM policies, and scale edge resources.', 
    icon: Cloud,
    bind: 'IAM / HTTPS Tunnel',
    ping: '6ms',
    status: 'ONLINE',
    code: 's3 = no.storage.AWS(\n  bucket="neuralops-context-vault",\n  kms_key_id="arn:aws:kms:..."\n)',
    codeTs: "import { no } from 'neuralops';\n\n// Securely link S3 vault\nconst s3 = no.storage.AWS({\n  bucket: 'neuralops-context-vault',\n  kmsKeyId: 'arn:aws:kms:...'\n});",
    logs: [
      '➜ Requesting AWS IAM STS session token...',
      '✔ Established encrypted TLS tunnel to bucket: neuralops-context-vault',
      '✔ Ingested 1,492 documents into S3 index.'
    ]
  },
  { 
    id: 'azure', 
    name: 'Azure', 
    category: 'Cloud', 
    description: 'Sync active directories and ingest corporate file systems into semantic indices.', 
    icon: Cloud,
    bind: 'Active Directory / OAuth2',
    ping: '9ms',
    status: 'ONLINE',
    code: 'index = no.indices.AzureBlob(\n  connection_string="DefaultEndpointsProtocol=...",\n  sync_interval="5m"\n)',
    codeTs: "import { no } from 'neuralops';\n\n// Sync Azure storage blobs\nconst blob = no.indices.AzureBlob({\n  connectionString: 'DefaultEndpointsProtocol=...',\n  syncInterval: '5m'\n});",
    logs: [
      '➜ Resolving Azure Active Directory authorization...',
      '✔ Subscribed to BlobChange feed: production-files',
      '➜ Synced 402 files to edge node cache.'
    ]
  },
  { 
    id: 'gcp', 
    name: 'Google Cloud', 
    category: 'Cloud', 
    description: 'Leverage Google Cloud TPU inference instances and BigQuery datasets.', 
    icon: Cloud,
    bind: 'gRPC / TPU Interconnect',
    ping: '5ms',
    status: 'ONLINE',
    code: 'tpu = no.compute.GCP(\n  tpu_type="v5e-8",\n  zone="us-west1-a",\n  pipeline=my_model\n)',
    codeTs: "import { no } from 'neuralops';\n\n// Deploy model inference to TPU\nconst tpu = no.compute.GCP({\n  tpuType: 'v5e-8',\n  zone: 'us-west1-a',\n  pipeline: myModel\n});",
    logs: [
      '➜ Booking TPU v5e pod slice in zone: us-west1-a...',
      '✔ Established secure Interconnect tunnel to TPU cluster.',
      '✔ Loaded model weights: neuralops-inference-core (3.4B parameters)'
    ]
  },
  { 
    id: 'mongodb', 
    name: 'MongoDB', 
    category: 'Database', 
    description: 'Retrieve transactional documents for vector indexing and semantic retrieval.', 
    icon: Database,
    bind: 'Change Streams',
    ping: '11ms',
    status: 'ONLINE',
    code: 'db = no.db.MongoDB(\n  uri="mongodb+srv://...",\n  collection="users",\n  on_change=no.handlers.EmbedAndIndex()\n)',
    codeTs: "import { no } from 'neuralops';\n\n// Embed MongoDB changes in real-time\nconst db = no.db.MongoDB({\n  uri: 'mongodb+srv://...',\n  collection: 'users',\n  onChange: no.handlers.EmbedAndIndex()\n});",
    logs: [
      '➜ Spawning MongoDB Change Stream listener...',
      '➜ Change detected: INSERT in collection: users',
      '✔ Embedded and indexed: user_profile_4201 in Pinecone.'
    ]
  },
  { 
    id: 'postgres', 
    name: 'PostgreSQL', 
    category: 'Database', 
    description: 'Sync relational databases with continuous gRPC WAL streaming.', 
    icon: Database,
    bind: 'WAL Replication / gRPC',
    ping: '7ms',
    status: 'ONLINE',
    code: 'db = no.db.Postgres(\n  connection_url="postgresql://...",\n  listen_channel="model_triggers",\n  auto_sync=True\n)',
    codeTs: "import { no } from 'neuralops';\n\n// Stream WAL events\nconst pg = no.db.Postgres({\n  url: 'postgresql://...',\n  listen: 'model_triggers',\n  autoSync: true\n});",
    logs: [
      '➜ Attaching WAL replication slot listener...',
      '➜ Event received on channel: model_triggers',
      '✔ Executed pipeline action successfully.'
    ]
  },
  { 
    id: 'slack', 
    name: 'Slack', 
    category: 'Messaging', 
    description: 'Deliver notification cards and trigger interactive agent console tasks.', 
    icon: Zap,
    bind: 'Websockets / App API',
    ping: '18ms',
    status: 'ONLINE',
    code: 'bot = no.integrations.Slack(\n  signing_secret=no.env.SLACK_SECRET,\n  channels=["#ops-alerts"],\n  interactive_cards=True\n)',
    codeTs: "import { no } from 'neuralops';\n\n// Trigger Slack alerts\nconst slack = no.integrations.Slack({\n  signingSecret: process.env.SLACK_SECRET,\n  channels: ['#ops-alerts'],\n  interactiveCards: true\n});",
    logs: [
      '➜ Opening interactive websocket session with Slack App API...',
      '✔ Loaded interactive warning card template.',
      '✔ Alert message sent successfully to channel: #ops-alerts'
    ]
  },
  { 
    id: 'stripe', 
    name: 'Stripe', 
    category: 'Payments', 
    description: 'Configure billing boundaries and rate-limit agents dynamically.', 
    icon: ShieldCheck,
    bind: 'Webhooks / REST API',
    ping: '22ms',
    status: 'ONLINE',
    code: 'billing = no.billing.Stripe(\n  webhook_secret="whsec_...",\n  limits={"max_tokens_per_month": 50000000}\n)',
    codeTs: "import { no } from 'neuralops';\n\n// Rate limit by subscription plans\nconst stripe = no.billing.Stripe({\n  webhookSecret: 'whsec_...',\n  limits: { maxTokensPerMonth: 50000000 }\n});",
    logs: [
      '➜ Attaching Stripe webhook endpoint listener...',
      '➜ Webhook received: customer.subscription.updated',
      '✔ Dynamic limits updated: max_tokens = 50,000,000'
    ]
  },
  { 
    id: 'openai', 
    name: 'OpenAI', 
    category: 'Models', 
    description: 'Route processing flows to GPT models with edge semantic token caching.', 
    icon: Cpu,
    bind: 'HTTP/2 Streaming',
    ping: '3ms',
    status: 'ONLINE',
    code: 'llm = no.models.OpenAI(\n  model="gpt-4o",\n  temperature=0.0,\n  semantic_cache_ttl=86400\n)',
    codeTs: "import { no } from 'neuralops';\n\n// Stream OpenAI requests with cache\nconst llm = no.models.OpenAI({\n  model: 'gpt-4o',\n  temperature: 0.0,\n  semanticCacheTtl: 86400\n});",
    logs: [
      '➜ Opening HTTP/2 streaming pipeline to OpenAI API...',
      '✔ Query matched in semantic cache [Saved 840 input tokens]',
      '✔ Stream completed. Response delivered in 4ms.'
    ]
  },
  { 
    id: 'rest', 
    name: 'REST APIs', 
    category: 'Delivery', 
    description: 'Expose compiled serverless workflows through authenticated JSON web hooks.', 
    icon: Terminal,
    bind: 'JSON / HTTPS Tunnel',
    ping: '12ms',
    status: 'ONLINE',
    code: 'endpoint = no.api.REST(\n  method="POST",\n  url="https://api.external.com/v1/trigger",\n  headers={"Authorization": "Bearer ..."}\n)',
    codeTs: "import { no } from 'neuralops';\n\n// Expose webhook endpoints\nconst api = no.api.REST({\n  method: 'POST',\n  url: 'https://api.external.com/v1/trigger',\n  headers: { Authorization: 'Bearer ...' }\n});",
    logs: [
      '➜ Awaiting incoming POST request on /v1/trigger...',
      '✔ Request authorized: Bearer token matched.',
      '✔ Triggered serverless edge worker in region: ap-south'
    ]
  }
];

export const HowItWorks: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [hoveredIntegration, setHoveredIntegration] = useState<string | null>(null);
  const [selectedIntegration, setSelectedIntegration] = useState<string | null>(null);

  // Expanded SDK & CLI Console States
  const [activeLang, setActiveLang] = useState<'py' | 'ts'>('py');
  const [consoleTab, setConsoleTab] = useState<'sdk' | 'cli'>('sdk');
  const [cliCommand, setCliCommand] = useState<string | null>(null);
  const [cliOutput, setCliOutput] = useState<string[]>([]);
  const [cliLoading, setCliLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Active details computed from selected step
  const activeStepDetails = useMemo(() => WORKFLOW_STEPS[activeStep], [activeStep]);

  const activeIntegrationId = hoveredIntegration || selectedIntegration;

  const activeIntegration = useMemo(() => {
    return INTEGRATIONS.find((item) => item.id === activeIntegrationId) || null;
  }, [activeIntegrationId]);

  const handleCopy = () => {
    const codeText = activeIntegration 
      ? (activeLang === 'py' ? activeIntegration.code : activeIntegration.codeTs)
      : (activeLang === 'py' 
          ? '# Checking global routing tables...\nno.diagnostics.check_mesh_health()\nno.diagnostics.verify_routing_tables()\nprint("STATUS: OPTIMAL")'
          : '// Checking global routing tables...\nawait no.diagnostics.checkMeshHealth();\nawait no.diagnostics.verifyRoutingTables();\nconsole.log("STATUS: OPTIMAL");'
        );
    navigator.clipboard.writeText(codeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const runCliCommand = (cmd: string) => {
    if (cliLoading) return;
    setCliCommand(cmd);
    setCliLoading(true);
    setCliOutput([]);
    
    setTimeout(() => {
      let output: string[] = [];
      if (cmd === 'neuralops init') {
        output = [
          'Initializing NeuralOps workspace...',
          '✔ Created configuration: neuralops.config.json',
          '✔ Configured sandbox environment profile: default-micro-vm',
          '✔ Connected to 180+ global edge Points of Presence.',
          'Project initialized successfully. Try running: neuralops deploy'
        ];
      } else if (cmd === 'neuralops deploy') {
        output = [
          'Compiling local pipelines to WebAssembly (WASM) binaries...',
          '✔ Compilation complete [Target: WASI 0.2, Size: 14.8MB]',
          'Deploying package to global orchestrator network...',
          '✔ Published US-East region -> 8ms avg execution time',
          '✔ Published EU-Central region -> 12ms avg execution time',
          '✔ Published AP-South region -> 5ms avg execution time',
          'Live Endpoint active at: https://edge.neuralops.ai/v1/trigger'
        ];
      } else {
        output = [
          'Requesting connectivity mesh status...',
          '● Mesh Integrity: 100.0% nominal',
          '● Active Edge Regions: 180/180 PoPs healthy',
          '● Active Telemetry Channels: 12 Bounded Nodes',
          '● Systems Status: OPTIMAL'
        ];
      }
      setCliOutput(output);
      setCliLoading(false);
    }, 1200);
  };

  const formatCode = (code: string, lang: 'py' | 'ts') => {
    return code.split('\n').map((line, i) => {
      if (line.trim().startsWith('//') || line.trim().startsWith('#')) {
        return <div key={i} className="text-slate-500 min-h-[1.2rem]">{line}</div>;
      }
      
      const regex = lang === 'py' 
        ? /(\bimport\b|\bfrom\b|\bas\b|\bTrue\b|\bFalse\b)|(\bno\b|\bpipeline\b|\bimage\b|\bcluster\b|\bs3\b|\bindex\b|\btpu\b|\bdb\b|\bbot\b|\bbilling\b|\bllm\b|\bendpoint\b)|("[^"]*")/g
        : /(\bimport\b|\bfrom\b|\bconst\b|\bawait\b|\basync\b)|(\bno\b|\bflow\b|\bimage\b|\bk8s\b|\bs3\b|\bblob\b|\btpu\b|\bdb\b|\bpg\b|\bslack\b|\bstripe\b|\bllm\b|\bapi\b)|("[^"]*"|'[^']*')/g;

      return (
        <div key={i} className="text-slate-300 min-h-[1.2rem]">
          {line.split(regex).map((part, idx) => {
            if (!part) return null;
            if ((part.startsWith('"') && part.endsWith('"')) || (part.startsWith("'") && part.endsWith("'"))) {
              return <span key={idx} className="text-emerald-400">{part}</span>;
            }
            if (['import', 'from', 'as', 'True', 'False', 'const', 'await', 'async'].includes(part)) {
              return <span key={idx} className="text-brand-accent font-bold">{part}</span>;
            }
            if (['no', 'pipeline', 'image', 'cluster', 's3', 'index', 'tpu', 'db', 'bot', 'billing', 'llm', 'endpoint', 'flow', 'k8s', 'blob', 'pg', 'slack', 'stripe', 'api'].includes(part)) {
              return <span key={idx} className="text-amber-400">{part}</span>;
            }
            return <span key={idx}>{part}</span>;
          })}
        </div>
      );
    });
  };

  return (
    <section id="how-it-works" className="py-16 relative overflow-hidden border-t border-slate-900/60 scroll-mt-20 bg-[#172B36]">
      
      {/* 1. Subtle AI Infrastructure Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Subtle grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] opacity-35" />
        
        {/* Radial gradients */}
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-brand-accent-hover/5 rounded-full blur-3xl" />

        {/* Neural Network Line Vectors in Background */}
        <svg className="w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <line x1="10%" y1="20%" x2="30%" y2="40%" stroke="#FFC801" strokeWidth="1" />
          <line x1="30%" y1="40%" x2="50%" y2="30%" stroke="#FF9932" strokeWidth="1" />
          <line x1="50%" y1="30%" x2="70%" y2="50%" stroke="#FFC801" strokeWidth="1" />
          <line x1="70%" y1="50%" x2="90%" y2="30%" stroke="#FF9932" strokeWidth="1" />
          <circle cx="10%" cy="20%" r="3" fill="#FFC801" className="animate-pulse" />
          <circle cx="30%" cy="40%" r="4" fill="#FF9932" className="animate-pulse" />
          <circle cx="50%" cy="30%" r="3.5" fill="#FFC801" className="animate-pulse" />
          <circle cx="70%" cy="50%" r="4" fill="#FF9932" className="animate-pulse" />
          <circle cx="90%" cy="30%" r="3" fill="#FFC801" className="animate-pulse" />
        </svg>

        {/* Floating particles */}
        <div className="absolute top-20 left-10 w-1.5 h-1.5 bg-brand-accent rounded-full animate-ping" style={{ animationDuration: '3s' }} />
        <div className="absolute top-80 right-20 w-2 h-2 bg-brand-accent-hover rounded-full animate-ping" style={{ animationDuration: '5s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title & Subtitle */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-[10px] font-mono font-bold tracking-widest text-brand-accent uppercase">
            <span>PIPELINE INFRASTRUCTURE</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-brand-text-primary tracking-tight font-mono">
            How NeuralOps Works
          </h2>
          <p className="text-sm sm:text-base text-brand-text-secondary leading-relaxed font-sans max-w-2xl mx-auto">
            From raw data to intelligent automation in four seamless stages.
          </p>
        </div>

        {/* 2. Four-Step Interactive Workflow */}
        <div className="relative mb-16">
          
          {/* Animated Connecting SVG Paths (Desktop) */}
          <div className="hidden lg:block absolute inset-0 pointer-events-none z-0">
            <svg className="w-full h-full" fill="none">
              {/* Path 1 -> 2 */}
              <path
                id="flow-path-1"
                d="M 22% 80 C 25% 140, 32% 20, 36% 80"
                stroke={activeStep >= 1 ? '#FFC801' : '#114C5A'}
                strokeWidth={activeStep >= 1 ? '2' : '1.5'}
                className="transition-colors duration-300"
              />
              <circle r="4" fill="#FFC801">
                <animateMotion dur={hoveredStep === 0 ? '1s' : '2.5s'} repeatCount="indefinite" path="M 22% 80 C 25% 140, 32% 20, 36% 80" />
              </circle>

              {/* Path 2 -> 3 */}
              <path
                id="flow-path-2"
                d="M 46% 80 C 50% 140, 56% 20, 60% 80"
                stroke={activeStep >= 2 ? '#FF9932' : '#114C5A'}
                strokeWidth={activeStep >= 2 ? '2' : '1.5'}
                className="transition-colors duration-300"
              />
              <circle r="4.5" fill="#FF9932">
                <animateMotion dur={hoveredStep === 1 ? '1.2s' : '3s'} repeatCount="indefinite" path="M 46% 80 C 50% 140, 56% 20, 60% 80" />
              </circle>

              {/* Path 3 -> 4 */}
              <path
                id="flow-path-3"
                d="M 70% 80 C 74% 140, 80% 20, 84% 80"
                stroke={activeStep >= 3 ? '#FFC801' : '#114C5A'}
                strokeWidth={activeStep >= 3 ? '2' : '1.5'}
                className="transition-colors duration-300"
              />
              <circle r="4" fill="#FFC801">
                <animateMotion dur={hoveredStep === 2 ? '0.8s' : '2.2s'} repeatCount="indefinite" path="M 70% 80 C 74% 140, 80% 20, 84% 80" />
              </circle>
            </svg>
          </div>

          {/* Workflow Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {WORKFLOW_STEPS.map((step, idx) => {
              const Icon = step.icon;
              const isActive = activeStep === idx;
              const isDimmed = !isActive && activeStep !== null;
              
              return (
                <ScrollReveal key={step.id} animation="scale" delay={idx * 100}>
                  <div
                    onClick={() => setActiveStep(idx)}
                    onMouseEnter={() => setHoveredStep(idx)}
                    onMouseLeave={() => setHoveredStep(null)}
                    className={`group relative glass-panel rounded-2xl p-6 cursor-pointer select-none transition-all duration-300 ${
                      isActive 
                        ? 'border-brand-accent bg-[#114C5A]/45 shadow-xl shadow-brand-accent/5 -translate-y-2' 
                        : 'border-slate-800 hover:border-brand-accent-hover/40 bg-slate-900/10'
                    } ${isDimmed ? 'opacity-70 saturate-75' : 'opacity-100'}`}
                  >
                    
                    {/* Unique Geometric Composition based on Step ID */}
                    <div className="absolute top-3 right-3 opacity-20 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none">
                      {step.id === 1 && (
                        /* Step 1: Concentric glass circle */
                        <div className="w-14 h-14 rounded-full border border-brand-accent flex items-center justify-center">
                          <div className="w-8 h-8 rounded-full border border-brand-accent/40" />
                        </div>
                      )}
                      {step.id === 2 && (
                        /* Step 2: Floating capsule elements inside a soft hexagon border */
                        <div className="w-12 h-14 border border-brand-accent-hover rotate-12 flex flex-col justify-center items-center gap-1 p-1">
                          <div className="w-8 h-2 rounded bg-brand-accent-hover/30" />
                          <div className="w-6 h-2 rounded bg-brand-accent-hover/20" />
                        </div>
                      )}
                      {step.id === 3 && (
                        /* Step 3: Soft diamond shape */
                        <div className="w-10 h-10 border border-brand-accent rotate-45 transform translate-y-2 translate-x-2" />
                      )}
                      {step.id === 4 && (
                        /* Step 4: Abstract blobs with low opacity */
                        <div className="w-12 h-12 bg-brand-accent-hover/10 rounded-full blur-sm" />
                      )}
                    </div>

                    {/* Step Card Header */}
                    <div className="flex items-center gap-3 mb-6">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        isActive 
                          ? 'bg-brand-accent text-slate-950 scale-110' 
                          : 'bg-slate-950 text-brand-accent group-hover:scale-105'
                      }`}>
                        <Icon className={`w-5 h-5 ${hoveredStep === idx ? 'animate-pulse' : ''}`} />
                      </div>
                      <div>
                        <span className={`font-mono text-[9px] font-bold tracking-widest block ${isActive ? 'text-brand-accent' : 'text-brand-text-secondary opacity-60'}`}>
                          {step.subtitle}
                        </span>
                        <h3 className={`text-base font-extrabold font-mono transition-colors duration-150 ${isActive ? 'text-brand-accent' : 'text-brand-text-primary'}`}>
                          0{step.id}. {step.title}
                        </h3>
                      </div>
                    </div>

                    {/* Items Bullet List */}
                    <div className="mb-4">
                      <ul className="space-y-1.5 text-xs text-brand-text-secondary">
                        {step.items.map((item, itemIdx) => (
                          <li key={itemIdx} className="flex items-center gap-2">
                            <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-brand-accent' : 'bg-slate-800'}`} />
                            <span className="font-sans">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-brand-text-secondary leading-relaxed font-sans mt-4 opacity-80">
                      {step.description}
                    </p>

                    {/* Tooltip on Hover */}
                    <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <div className="bg-slate-950 text-brand-text-primary border border-slate-800 text-[8px] font-mono px-2 py-1 rounded shadow-lg uppercase tracking-wider">
                        Click for code
                      </div>
                    </div>

                    {/* Progress Indicator */}
                    <div className={`absolute bottom-0 inset-x-0 h-1 transition-all duration-300 ${
                      isActive ? 'bg-gradient-to-r from-brand-accent to-brand-accent-hover' : 'bg-transparent'
                    }`} />
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          {/* Interactive Flow Indicator (Vertical timeline line for Mobile only) */}
          <div className="block lg:hidden absolute top-[10%] bottom-[5%] left-[24px] w-[2px] bg-slate-800/80 pointer-events-none -z-10" />
        </div>

        {/* 3. Deep Dive Expanded Details / Code Block */}
        <ScrollReveal animation="fade">
          <div className="glass-panel border border-brand-accent/25 rounded-2xl p-6 sm:p-8 bg-slate-950/80 shadow-2xl relative overflow-hidden mb-16">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/5 rounded-full blur-2xl pointer-events-none" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Technical Specifications */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <span className="text-[9px] font-mono font-bold tracking-widest text-brand-accent uppercase block mb-1">
                    ACTIVE WORKFLOW SPECIFICATION
                  </span>
                  <h4 className="text-xl font-bold font-mono text-brand-text-primary">
                    Stage {activeStepDetails.id}: {activeStepDetails.title} Engine
                  </h4>
                </div>

                <div className="grid grid-cols-3 gap-4 border-y border-slate-900 py-4 font-mono text-xs">
                  <div>
                    <div className="text-[10px] text-brand-text-secondary opacity-60 font-sans">Avg Latency</div>
                    <div className="text-sm font-bold text-brand-accent mt-1">{activeStepDetails.expandedTech.latency}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-brand-text-secondary opacity-60 font-sans">Throughput</div>
                    <div className="text-sm font-bold text-brand-accent-hover mt-1">{activeStepDetails.expandedTech.throughput}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-brand-text-secondary opacity-60 font-sans">Protocol</div>
                    <div className="text-sm font-bold text-brand-text-primary mt-1">{activeStepDetails.expandedTech.protocol}</div>
                  </div>
                </div>

                <p className="text-xs text-brand-text-secondary leading-relaxed font-sans">
                  {activeStepDetails.expandedTech.details}
                </p>

                <div className="flex items-center gap-2 text-xs font-semibold text-brand-accent">
                  <span>Explore developer tools</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>

              {/* Code Snippet */}
              <div className="lg:col-span-7 w-full">
                <div className="w-full rounded-xl border border-slate-800/80 bg-slate-950 overflow-hidden font-mono text-xs select-none">
                  {/* Code window header */}
                  <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-950">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                      <span className="text-[10px] text-brand-text-secondary opacity-60 ml-2">neuralops_sdk.py</span>
                    </div>
                    <div className="text-[9px] text-brand-accent font-bold uppercase tracking-wider">
                      PYTHON SDK
                    </div>
                  </div>
                  {/* Code body */}
                  <pre className="p-5 overflow-x-auto text-[10px] sm:text-[11px] leading-relaxed text-slate-300">
                    <code>{activeStepDetails.expandedTech.code}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* 4. Integrates With Everything Section */}
        <div>
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-accent-hover/10 border border-brand-accent-hover/20 text-[10px] font-mono font-bold tracking-widest text-brand-accent-hover uppercase">
              <span>GLOBAL ECOSYSTEM</span>
            </div>
            <h3 className="text-3xl font-extrabold text-brand-text-primary tracking-tight font-mono">
              Integrates With Everything.
            </h3>
            <p className="text-xs text-brand-text-secondary leading-relaxed font-sans">
              Connect your tools, cloud targets, and data storage systems directly into our edge orchestrators.
            </p>
          </div>

          {/* Connected Integrations Grid */}
          <div className="relative">
            
            {/* Animated Connector SVG Lines Behind Grid */}
            <div className="absolute inset-0 pointer-events-none z-0">
              <svg className="w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
                {/* Draw connection paths between major coordinates */}
                <path
                  d="M 10% 20% C 25% 15%, 35% 35%, 50% 50%"
                  stroke={activeIntegrationId === 'github' ? '#FFC801' : '#114C5A'}
                  strokeWidth="1"
                  strokeDasharray="4,4"
                  fill="none"
                />
                <path
                  d="M 50% 50% C 65% 65%, 75% 35%, 90% 20%"
                  stroke={activeIntegrationId === 'openai' ? '#FF9932' : '#114C5A'}
                  strokeWidth="1.5"
                  strokeDasharray="4,4"
                  fill="none"
                />
                <path
                  d="M 10% 80% C 25% 85%, 35% 65%, 50% 50%"
                  stroke={activeIntegrationId === 'mongodb' ? '#FFC801' : '#114C5A'}
                  strokeWidth="1"
                  strokeDasharray="4,4"
                  fill="none"
                />
                <path
                  d="M 50% 50% C 65% 35%, 75% 85%, 90% 80%"
                  stroke={activeIntegrationId === 'rest' ? '#FF9932' : '#114C5A'}
                  strokeWidth="1.2"
                  strokeDasharray="4,4"
                  fill="none"
                />
              </svg>
            </div>

            {/* Integrations Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 relative z-10">
              {INTEGRATIONS.map((integration, idx) => {
                const Icon = integration.icon;
                const isHovered = hoveredIntegration === integration.id;
                const isActive = activeIntegrationId === integration.id;
                
                return (
                  <ScrollReveal key={integration.id} animation="fade" delay={idx * 40}>
                    <div
                      onClick={() => setSelectedIntegration(
                        selectedIntegration === integration.id ? null : integration.id
                      )}
                      onMouseEnter={() => setHoveredIntegration(integration.id)}
                      onMouseLeave={() => setHoveredIntegration(null)}
                      className={`group relative glass-panel rounded-xl p-4 transition-all duration-200 hover:-translate-y-1 hover:border-brand-accent/40 bg-slate-900/10 cursor-pointer ${
                        isActive ? 'border-brand-accent/60 bg-[#114C5A]/20 shadow-lg shadow-brand-accent/5' : ''
                      }`}
                    >
                      <div className="flex flex-col items-center text-center space-y-3">
                        <div className={`w-10 h-10 rounded-lg bg-slate-950 border border-slate-900 flex items-center justify-center transition-all duration-200 ${
                          isHovered || isActive ? 'scale-110 text-brand-accent border-brand-accent/20' : 'text-brand-text-secondary opacity-60'
                        }`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className={`text-xs font-bold font-mono transition-colors duration-150 ${isHovered || isActive ? 'text-brand-accent' : 'text-brand-text-primary'}`}>
                            {integration.name}
                          </h4>
                          <span className="text-[9px] text-brand-text-secondary opacity-50 block mt-0.5">
                            {integration.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>

            {/* Ecosystem Console / Live telemetry details panel */}
            <ScrollReveal animation="fade" delay={150}>
              <div className="mt-8 w-full rounded-2xl border border-slate-800 bg-slate-950/75 backdrop-blur-md overflow-hidden shadow-2xl transition-all duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[220px]">
                  
                  {/* Left Column: Live Telemetry & Connectivity details */}
                  <div className="lg:col-span-5 p-6 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-900/60">
                    <div>
                      {activeIntegration ? (
                        <>
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-[#114C5A]/35 border border-brand-accent/35 flex items-center justify-center text-brand-accent">
                              {React.createElement(activeIntegration.icon, { className: "w-5 h-5" })}
                            </div>
                            <div>
                              <div className="inline-block px-2 py-0.5 rounded-full bg-brand-accent/15 border border-brand-accent/30 text-[8px] font-mono font-bold text-brand-accent uppercase">
                                {activeIntegration.category}
                              </div>
                              <h4 className="text-sm font-extrabold text-brand-text-primary font-mono mt-0.5">
                                {activeIntegration.name} Integration
                              </h4>
                            </div>
                          </div>
                          
                          <p className="text-xs text-brand-text-secondary leading-relaxed font-sans mb-5">
                            {activeIntegration.description}
                          </p>
                        </>
                      ) : (
                        <>
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-brand-text-secondary opacity-80 animate-[spin_10s_linear_infinite]">
                              <Network className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="inline-block px-2 py-0.5 rounded-full bg-brand-accent-hover/15 border border-brand-accent-hover/30 text-[8px] font-mono font-bold text-brand-accent-hover uppercase">
                                TELEMETRY SHIELD
                              </div>
                              <h4 className="text-sm font-extrabold text-brand-text-primary font-mono mt-0.5">
                                System Connectivity Mesh
                              </h4>
                            </div>
                          </div>
                          
                          <p className="text-xs text-brand-text-secondary leading-relaxed font-sans mb-5">
                            Hover or click any integration node above to inspect real-time connection telemetry, edge latency logs, and programmatic SDK implementation bindings.
                          </p>
                        </>
                      )}
                    </div>

                    {/* Live log feed at the bottom of the details card */}
                    <div className="mt-4 pt-4 border-t border-slate-900/60 font-mono text-[9px] text-slate-400 space-y-1.5 select-none">
                      <div className="flex items-center justify-between text-slate-500 text-[8px] uppercase tracking-wider mb-1">
                        <span>Connection Log Feed</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                      </div>
                      {(activeIntegration ? activeIntegration.logs : [
                        '➜ NeuralOps Unified Connection Telemetry init...',
                        '✔ Heartbeat signal acknowledged across 180+ edge nodes.',
                        '✔ Average routing mesh latency resolved to 8.4ms.',
                        '✔ Status: OPTIMAL. All channels operational.'
                      ]).map((log, idx) => (
                        <div key={idx} className="flex items-start gap-1.5 leading-normal animate-[fadeIn_0.3s_ease-out_both]" style={{ animationDelay: `${idx * 150}ms` }}>
                          <span className={log.startsWith('✔') ? 'text-emerald-400' : log.startsWith('●') ? 'text-brand-accent' : 'text-slate-500'}>
                            {log.slice(0, 1)}
                          </span>
                          <span>{log.slice(1)}</span>
                        </div>
                      ))}
                    </div>

                    {/* Status grid */}
                    <div className="grid grid-cols-2 gap-3 pt-4 mt-4 border-t border-slate-900/60">
                      <div>
                        <span className="text-[8px] font-mono text-brand-text-secondary opacity-50 uppercase block">Binding Type</span>
                        <span className="text-xs font-semibold font-mono text-brand-text-primary block mt-0.5">
                          {activeIntegration ? activeIntegration.bind : 'Unified Edge Mesh'}
                        </span>
                      </div>
                      <div>
                        <span className="text-[8px] font-mono text-brand-text-secondary opacity-50 uppercase block">Latency / Ping</span>
                        <span className="text-xs font-semibold font-mono text-emerald-400 block mt-0.5">
                          {activeIntegration ? activeIntegration.ping : '8.4ms Avg'}
                        </span>
                      </div>
                      <div>
                        <span className="text-[8px] font-mono text-brand-text-secondary opacity-50 uppercase block">Sync Integrity</span>
                        <span className="text-xs font-semibold font-mono text-brand-accent-hover block mt-0.5">
                          {activeIntegration ? '99.998%' : '99.99% Guaranteed'}
                        </span>
                      </div>
                      <div>
                        <span className="text-[8px] font-mono text-brand-text-secondary opacity-50 uppercase block">Connection Status</span>
                        <span className="text-xs font-semibold font-mono text-brand-text-primary flex items-center gap-1.5 mt-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10B981]" />
                          {activeIntegration ? activeIntegration.status : 'ONLINE'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Code snippet & CLI interactive emulator */}
                  <div className="lg:col-span-7 p-6 bg-slate-950 flex flex-col justify-between font-mono text-xs">
                    
                    {/* Header with selector tabs */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-3 border-b border-slate-900 mb-4 gap-3 select-none">
                      
                      {/* Left: Console Selector Tabs */}
                      <div className="flex items-center gap-1 bg-slate-900/60 p-1 rounded-lg border border-slate-800">
                        <button
                          onClick={() => setConsoleTab('sdk')}
                          className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase transition-all duration-200 ${
                            consoleTab === 'sdk' 
                              ? 'bg-[#114C5A] text-brand-accent border border-brand-accent/20' 
                              : 'text-brand-text-secondary hover:text-brand-text-primary'
                          }`}
                        >
                          SDK Bindings
                        </button>
                        <button
                          onClick={() => setConsoleTab('cli')}
                          className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase transition-all duration-200 ${
                            consoleTab === 'cli' 
                              ? 'bg-[#114C5A] text-brand-accent border border-brand-accent/20' 
                              : 'text-brand-text-secondary hover:text-brand-text-primary'
                          }`}
                        >
                          Edge CLI
                        </button>
                      </div>

                      {/* Right: Actions based on active tab */}
                      {consoleTab === 'sdk' ? (
                        <div className="flex items-center gap-2">
                          {/* Language Selection */}
                          <div className="flex items-center bg-slate-900/60 p-0.5 rounded-md border border-slate-800/80">
                            <button
                              onClick={() => setActiveLang('py')}
                              className={`px-2 py-0.5 rounded text-[9px] font-bold transition-all duration-150 ${
                                activeLang === 'py' ? 'bg-[#FF9932]/25 text-[#FF9932]' : 'text-slate-500 hover:text-slate-300'
                              }`}
                            >
                              PY
                            </button>
                            <button
                              onClick={() => setActiveLang('ts')}
                              className={`px-2 py-0.5 rounded text-[9px] font-bold transition-all duration-150 ${
                                activeLang === 'ts' ? 'bg-[#FFC801]/25 text-[#FFC801]' : 'text-slate-500 hover:text-slate-300'
                              }`}
                            >
                              TS
                            </button>
                          </div>

                          {/* Copy Button */}
                          <button
                            onClick={handleCopy}
                            className="p-1 rounded-md border border-slate-800 bg-slate-900/60 hover:bg-slate-900 hover:border-slate-700 text-slate-400 hover:text-slate-200 transition-all duration-150 flex items-center gap-1.5 px-2 text-[9px]"
                            title="Copy code to clipboard"
                          >
                            {copied ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-400" />
                                <span className="text-emerald-400">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                      ) : (
                        <div className="text-[9px] text-[#FFC801] font-bold uppercase tracking-wider flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Interactive Sandbox
                        </div>
                      )}
                    </div>
                    
                    {/* Content Section */}
                    {consoleTab === 'sdk' ? (
                      <div className="flex-grow flex flex-col justify-between">
                        <pre className="overflow-x-auto text-[10px] sm:text-[11px] leading-relaxed text-slate-300 flex-grow font-mono py-2">
                          <code>
                            {activeIntegration ? (
                              formatCode(activeLang === 'py' ? activeIntegration.code : activeIntegration.codeTs, activeLang)
                            ) : (
                              formatCode(
                                activeLang === 'py'
                                  ? '# Checking global routing tables...\nno.diagnostics.check_mesh_health()\nno.diagnostics.verify_routing_tables()\nprint("STATUS: OPTIMAL")'
                                  : '// Checking global routing tables...\nawait no.diagnostics.checkMeshHealth();\nawait no.diagnostics.verifyRoutingTables();\nconsole.log("STATUS: OPTIMAL");',
                                activeLang
                              )
                            )}
                          </code>
                        </pre>
                        
                        <div className="text-[9px] text-slate-500 select-none pt-2 border-t border-slate-900/60">
                          File: {activeIntegration ? `${activeIntegration.id}_binding.${activeLang}` : `mesh_diagnostics.${activeLang}`}
                        </div>
                      </div>
                    ) : (
                      <div className="flex-grow flex flex-col justify-between min-h-[160px]">
                        
                        {/* Simulated Terminal Screen */}
                        <div className="bg-slate-950 p-4 rounded-xl border border-slate-900/80 font-mono text-[10px] sm:text-[11px] text-slate-300 leading-relaxed flex-grow overflow-y-auto max-h-[180px] space-y-1">
                          
                          {/* Acknowledge past outputs */}
                          <div>neuralops@edge ~ % {cliCommand || 'awaiting input...'}</div>
                          
                          {cliLoading && (
                            <div className="flex items-center gap-2 text-slate-400 py-1">
                              <span className="w-3 h-3 border border-slate-600 border-t-brand-accent rounded-full animate-spin" />
                              <span>Executing remote edge task...</span>
                            </div>
                          )}

                          {!cliLoading && cliOutput.length > 0 && (
                            <div className="space-y-1 py-1">
                              {cliOutput.map((line, lIdx) => (
                                <div 
                                  key={lIdx} 
                                  className={
                                    line.startsWith('✔') ? 'text-emerald-400' : 
                                    line.startsWith('●') ? 'text-brand-accent' : 
                                    line.startsWith('Project') || line.startsWith('Live') ? 'text-sky-400' : 'text-slate-300'
                                  }
                                >
                                  {line}
                                </div>
                              ))}
                            </div>
                          )}
                          
                          {!cliLoading && !cliCommand && (
                            <div className="text-slate-500 italic">
                              Click one of the suggested commands below to run a live deployment trigger simulation.
                            </div>
                          )}
                        </div>

                        {/* Interactive Suggestion Tabs */}
                        <div className="pt-4 border-t border-slate-900/60">
                          <div className="text-[9px] text-slate-500 uppercase tracking-wider mb-2 select-none">
                            Suggested CLI Actions:
                          </div>
                          <div className="flex flex-wrap items-center gap-2">
                            <button
                              onClick={() => runCliCommand('neuralops init')}
                              disabled={cliLoading}
                              className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 hover:border-brand-accent/30 text-slate-300 hover:text-brand-accent font-bold text-[9px] transition-all duration-150 disabled:opacity-50"
                            >
                              neuralops init
                            </button>
                            <button
                              onClick={() => runCliCommand('neuralops deploy')}
                              disabled={cliLoading}
                              className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 hover:border-brand-accent/30 text-slate-300 hover:text-brand-accent font-bold text-[9px] transition-all duration-150 disabled:opacity-50"
                            >
                              neuralops deploy
                            </button>
                            <button
                              onClick={() => runCliCommand('neuralops status')}
                              disabled={cliLoading}
                              className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 hover:border-brand-accent/30 text-slate-300 hover:text-brand-accent font-bold text-[9px] transition-all duration-150 disabled:opacity-50"
                            >
                              neuralops status
                            </button>
                          </div>
                        </div>

                      </div>
                    )}
                  </div>

                </div>
              </div>
            </ScrollReveal>

          </div>
        </div>

      </div>
    </section>
  );
};
