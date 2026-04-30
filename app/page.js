'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import {
  Terminal, Shield, Lock, Code2, Server, Network, Database,
  Github, Linkedin, Mail, Download, ChevronRight, Cpu,
  Bug, Eye, FileCode, GitBranch, Award, Activity, Fingerprint,
  Zap, ShieldCheck, Radio, Monitor, KeyRound, Wifi
} from 'lucide-react'

const RESUME_URL = '/Yaseen-Resume.pdf'
const HERO_IMAGE = '/hero-hacker.png'

/* ============ TYPING HOOK ============ */
function useTyping(lines, speed = 35, lineDelay = 400) {
  const [rendered, setRendered] = useState([])
  const [lineIdx, setLineIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (lineIdx >= lines.length) { setDone(true); return }
    const current = lines[lineIdx]
    if (charIdx < current.length) {
      const t = setTimeout(() => {
        setRendered(prev => {
          const copy = [...prev]
          copy[lineIdx] = (copy[lineIdx] || '') + current[charIdx]
          return copy
        })
        setCharIdx(c => c + 1)
      }, speed)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => {
      setLineIdx(i => i + 1)
      setCharIdx(0)
    }, lineDelay)
    return () => clearTimeout(t)
  }, [lineIdx, charIdx, lines, speed, lineDelay])

  return { rendered, done, lineIdx }
}

/* ============ FAKE LIVE LOG FEED ============ */
const LOG_SAMPLES = [
  { level: 'INFO', msg: 'SSH session established from 198.51.100.42' },
  { level: 'WARN', msg: 'Failed auth attempt on honeypot-node-02 (user=root)' },
  { level: 'ALERT', msg: 'Possible brute-force pattern detected [+24 attempts/60s]' },
  { level: 'INFO', msg: 'Hash chain integrity verified: OK (12487 blocks)' },
  { level: 'WARN', msg: 'Unusual outbound TCP connection :4444 flagged' },
  { level: 'ALERT', msg: 'Lateral movement heuristic triggered on host-17' },
  { level: 'INFO', msg: 'Packet capture rotated \u2192 pcap_2025_06_11.pcap' },
  { level: 'INFO', msg: 'IOC feed sync complete \u2014 2,143 indicators loaded' },
  { level: 'WARN', msg: 'Suspicious PowerShell encoded command observed' },
  { level: 'INFO', msg: 'Firewall rule auto-generated: DROP 185.220.101.0/24' },
  { level: 'ALERT', msg: 'SHA-256 mismatch on audit log entry #8192' },
  { level: 'INFO', msg: 'Threat intel match: APT29 TTP signature (low conf.)' },
]

function LiveLogFeed() {
  const [logs, setLogs] = useState([])
  useEffect(() => {
    const iv = setInterval(() => {
      const sample = LOG_SAMPLES[Math.floor(Math.random() * LOG_SAMPLES.length)]
      const now = new Date()
      const ts = now.toISOString().split('T')[1].split('.')[0]
      setLogs(prev => [{ ...sample, ts, id: Math.random() }, ...prev].slice(0, 5))
    }, 1800)
    return () => clearInterval(iv)
  }, [])

  const colorFor = (lvl) => lvl === 'ALERT' ? 'text-red-400' : lvl === 'WARN' ? 'text-yellow-300' : 'text-cyan-300'

  return (
    <div className="terminal-box rounded-md p-3 font-mono text-[10px] sm:text-xs">
      <div className="flex items-center gap-2 mb-2 pb-2 border-b border-emerald-500/20">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/70"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70"></span>
        </div>
        <span className="text-emerald-400/70 text-[10px] flex items-center gap-2">
          <Radio className="w-3 h-3 pulse-dot" /> live_soc_feed.log
        </span>
        <span className="ml-auto text-emerald-500/50 text-[9px]">tail -f</span>
      </div>
      <div className="space-y-1 min-h-[120px]">
        <AnimatePresence initial={false}>
          {logs.map(l => (
            <motion.div
              key={l.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="flex gap-2"
            >
              <span className="text-emerald-500/50">[{l.ts}]</span>
              <span className={`${colorFor(l.level)} font-bold`}>{l.level}</span>
              <span className="text-emerald-100/80 truncate">{l.msg}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ============ NAV ============ */
function Nav() {
  const [active, setActive] = useState('home')
  const items = [
    { id: 'home', label: 'HOME' },
    { id: 'about', label: 'ABOUT' },
    { id: 'projects', label: 'PROJECTS' },
    { id: 'skills', label: 'SKILLS' },
    { id: 'certs', label: 'CERTIFICATIONS' },
    { id: 'contact', label: 'CONTACT' },
  ]

  useEffect(() => {
    const handler = () => {
      const y = window.scrollY + 120
      for (const i of items) {
        const el = document.getElementById(i.id)
        if (el && el.offsetTop <= y && el.offsetTop + el.offsetHeight > y) {
          setActive(i.id); break
        }
      }
    }
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-[#050505]/70 border-b border-emerald-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 text-emerald-400 font-mono text-sm"
        >
          <Terminal className="w-4 h-4" />
          <span className="hidden sm:inline">root@yaseen</span>
          <span className="text-emerald-500">:~$</span>
          <span className="w-2 h-4 bg-emerald-400 cursor-blink-static animate-pulse"></span>
        </motion.div>
        <div className="hidden md:flex items-center gap-1 text-xs">
          {items.map(i => (
            <button
              key={i.id}
              onClick={() => scrollTo(i.id)}
              className={`px-3 py-1.5 rounded transition-all ${
                active === i.id
                  ? 'text-emerald-300 neon-text'
                  : 'text-emerald-500/60 hover:text-emerald-300'
              }`}
            >
              {active === i.id && <span className="text-emerald-400">&gt;_ </span>}
              <span className="text-emerald-600/60">//</span> {i.label}
            </button>
          ))}
        </div>
        <button
          onClick={() => scrollTo('contact')}
          className="md:hidden text-emerald-400 text-xs border border-emerald-500/40 px-3 py-1.5 rounded"
        >
          // MENU
        </button>
      </div>
    </nav>
  )
}

/* ============ HERO ============ */
function Hero() {
  const { rendered, done } = useTyping(
    ['Defending systems.', 'Analyzing threats.', 'Building secure systems.'],
    40, 350
  )

  return (
    <section id="home" className="relative min-h-screen pt-24 pb-12 overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-60"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050505]"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-10 items-center">
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-emerald-400/80 text-xs sm:text-sm mb-4 flex items-center gap-2">
            <span className="text-emerald-400">root@yaseen</span>
            <span className="text-emerald-500">:~$</span>
            <span className="text-emerald-200">./init_portfolio.sh</span>
          </div>

          <div className="text-emerald-500/60 text-xs mb-2">&gt; HELLO, I&apos;M</div>
          <motion.h1
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="font-display text-5xl sm:text-6xl md:text-7xl font-black leading-none mb-3 neon-text"
          >
            YASEEN<br />RATHER
          </motion.h1>
          <div className="text-cyan-300 neon-text-blue text-sm sm:text-base tracking-widest mb-6 font-display font-semibold">
            SOC ANALYST <span className="text-emerald-500/50">|</span> CYBERSECURITY ENGINEER
          </div>

          {/* Typing terminal block */}
          <div className="terminal-box rounded-md p-4 mb-6 max-w-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-50"></div>
            <div className="space-y-1 font-mono text-sm sm:text-base text-emerald-200">
              {rendered.map((line, i) => (
                <div key={i} className="flex gap-2">
                  <span className="text-emerald-500">$</span>
                  <span>
                    {line}
                    {i === rendered.length - 1 && !done && (
                      <span className="inline-block w-2 h-4 ml-1 bg-emerald-400 align-middle animate-pulse"></span>
                    )}
                    {i === rendered.length - 1 && done && i === 2 && (
                      <span className="inline-block w-2 h-4 ml-1 bg-emerald-400 align-middle animate-pulse"></span>
                    )}
                  </span>
                </div>
              ))}
              {[...Array(3 - rendered.length)].map((_, i) => (
                <div key={`e${i}`} className="opacity-0">$ .</div>
              ))}
            </div>
          </div>

          <p className="text-emerald-100/60 text-sm max-w-xl mb-8 leading-relaxed">
            Blue team enthusiast focused on threat detection, forensic log analysis,
            and building resilient security infrastructure.
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative px-6 py-3 neon-border rounded-md font-mono text-sm text-emerald-300 hover:text-emerald-200 transition-all glitch-hover"
            >
              <span className="flex items-center gap-2">
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                VIEW PROJECTS
              </span>
            </button>
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-6 py-3 neon-border-blue rounded-md font-mono text-sm text-cyan-300 hover:text-cyan-200 transition-all"
            >
              <span className="flex items-center gap-2">
                <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                DOWNLOAD RESUME
              </span>
            </a>
          </div>
        </motion.div>

        {/* RIGHT - Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative float"
        >
          <div className="relative rounded-lg overflow-hidden neon-border-blue aspect-square max-w-xl mx-auto">
            <img
              src={HERO_IMAGE}
              alt="Cybersecurity Analyst at multiple monitors"
              className="w-full h-full object-cover"
              loading="eager"
            />
            {/* dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#050505]/70"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/60 via-transparent to-transparent"></div>
            {/* scanline overlay */}
            <div
              className="absolute inset-0 pointer-events-none opacity-50"
              style={{
                background: 'repeating-linear-gradient(0deg, rgba(0,255,157,0.05) 0px, rgba(0,255,157,0.05) 1px, transparent 1px, transparent 4px)'
              }}
            />
            {/* corner brackets */}
            {[
              'top-3 left-3 border-t-2 border-l-2',
              'top-3 right-3 border-t-2 border-r-2',
              'bottom-3 left-3 border-b-2 border-l-2',
              'bottom-3 right-3 border-b-2 border-r-2',
            ].map((cls, i) => (
              <div key={i} className={`absolute w-6 h-6 border-emerald-400/80 ${cls}`}></div>
            ))}
            {/* floating status badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="absolute bottom-4 left-4 right-4 terminal-box rounded p-2 text-[10px] sm:text-xs"
            >
              <div className="flex items-center gap-2 text-emerald-300">
                <Activity className="w-3 h-3 pulse-dot" />
                <span className="text-emerald-500/70">monitoring:</span>
                <span>network_traffic</span>
                <span className="ml-auto text-cyan-300">ACTIVE</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* BOTTOM INFO BAR */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 mt-12"
      >
        <div className="neon-border rounded-md p-3 sm:p-4 flex flex-col sm:flex-row gap-3 sm:gap-8 items-start sm:items-center text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <span className="text-emerald-500">&gt;</span>
            <span className="text-emerald-500/70">system_status:</span>
            <span className="neon-text font-bold">SECURE</span>
            <span className="w-2 h-2 bg-emerald-400 rounded-full pulse-dot"></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-emerald-500">&gt;</span>
            <span className="text-emerald-500/70">location:</span>
            <span className="text-cyan-300">Jammu, India</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-emerald-500">&gt;</span>
            <span className="text-emerald-500/70">availability:</span>
            <span className="neon-text font-bold">OPEN</span>
            <span className="w-2 h-2 bg-emerald-400 rounded-full pulse-dot"></span>
          </div>
          <div className="sm:ml-auto flex-1 sm:max-w-sm w-full">
            <LiveLogFeed />
          </div>
        </div>
      </motion.div>
    </section>
  )
}

/* ============ SECTION HEADER ============ */
function SectionHeader({ label, sub }) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-3">
        <span className="text-emerald-500/60 text-sm">//</span>
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold neon-text tracking-wider">
          {label}
        </h2>
        <div className="flex-1 h-px bg-gradient-to-r from-emerald-500/50 via-emerald-500/20 to-transparent"></div>
      </div>
      {sub && <div className="text-emerald-500/50 text-xs mt-2 ml-6">{sub}</div>}
    </div>
  )
}

/* ============ ABOUT ============ */
function About() {
  return (
    <section id="about" className="relative py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader label="ABOUT ME" sub="cat /home/yaseen/about.txt" />

        <div className="grid lg:grid-cols-2 gap-8">
          {/* LEFT CARD */}
          <motion.div
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="neon-border rounded-lg p-6 space-y-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-lg neon-border flex items-center justify-center">
                <Fingerprint className="w-8 h-8 text-emerald-400" />
              </div>
              <div>
                <div className="font-display text-xl text-emerald-300 neon-text">Yaseen Rather</div>
                <div className="text-emerald-500/70 text-sm">Security Operations Analyst</div>
              </div>
            </div>
            <p className="text-emerald-100/80 text-sm leading-relaxed">
              Detail-oriented cybersecurity student with hands-on experience in{' '}
              <span className="text-cyan-300">threat detection</span>,{' '}
              <span className="text-cyan-300">forensic log analysis</span>, and{' '}
              <span className="text-cyan-300">attacker behavior monitoring</span>.
            </p>
            <p className="text-emerald-100/70 text-sm leading-relaxed">
              Actively pursuing the SOC Level 1 path on TryHackMe and building practical
              blue team skills through real-world projects \u2014 from honeypots that capture
              attacker TTPs to tamper-evident logging systems using cryptographic hash chains.
            </p>

            <div className="grid grid-cols-3 gap-3 pt-2">
              {[
                { icon: Shield, label: 'Blue Team', val: 'ACTIVE' },
                { icon: Eye, label: 'Threats', val: 'MONITORED' },
                { icon: Cpu, label: 'IR Ready', val: 'TRUE' },
              ].map((s, i) => (
                <div key={i} className="text-center p-3 border border-emerald-500/20 rounded">
                  <s.icon className="w-5 h-5 mx-auto mb-1 text-emerald-400" />
                  <div className="text-[10px] text-emerald-500/60">{s.label}</div>
                  <div className="text-xs text-cyan-300 font-bold">{s.val}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT TERMINAL whoami */}
          <motion.div
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="terminal-box rounded-lg p-5 font-mono text-sm relative"
          >
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-emerald-500/20">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/70"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70"></span>
              </div>
              <span className="text-emerald-500/60 text-xs ml-2">yaseen@portfolio: ~ / whoami</span>
            </div>

            <div className="space-y-2 text-emerald-200">
              <div><span className="text-emerald-500">$</span> whoami --verbose</div>
              {[
                ['name', 'Yaseen Rather'],
                ['role', 'SOC Analyst | Cybersecurity Engineer'],
                ['education', 'B.E. CSE (Cyber Security) \u2014 MIET, 2024\u20132028'],
                ['location', 'Jammu, India'],
                ['focus', 'Blue Team | Threat Detection | Incident Response'],
                ['mindset', 'Defense-in-depth | Assume breach'],
              ].map(([k, v]) => (
                <div key={k} className="flex gap-3 pl-4">
                  <span className="text-cyan-400 w-24 shrink-0">{k}:</span>
                  <span className="text-emerald-100">{v}</span>
                </div>
              ))}
              <div className="pt-2 pl-4 text-emerald-500/60 text-xs">
                # process_complete \u2014 uid=1000(yaseen)
              </div>
              <div><span className="text-emerald-500">$</span> <span className="inline-block w-2 h-4 bg-emerald-400 align-middle animate-pulse ml-1"></span></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ============ PROJECTS ============ */
const PROJECTS = [
  {
    icon: Bug,
    num: '01',
    name: 'High-Interaction SSH Honeypot',
    status: 'COMPLETED',
    desc: 'MITM-based SSH honeypot forwarding attacker sessions to a decoy VM. Captures post-exploitation behavior for threat intelligence and TTP analysis.',
    bullets: [
      'Dual-layer forensic logging — .log files + SQLite',
      'Concurrent session handling via threading',
      'Planned deployment on Oracle Cloud infrastructure',
    ],
    tech: ['Python', 'Paramiko', 'SQLite', 'Threading'],
    color: 'emerald',
    githubUrl: 'https://github.com/Yaseen-Rather/Honey_Pot_Cloud_Python.git',
  },
  {
    icon: ShieldCheck,
    num: '02',
    name: 'Tamper-Evident Logging System',
    status: 'COMPLETED',
    desc: 'Forensic-grade logging system using a SHA-256 hash chain to instantly detect modifications to historical log entries.',
    bullets: [
      'SHA-256 cryptographic hash chain for integrity',
      'SQLite storage with queryable structured logs',
      'CLI interface for forensic verification',
    ],
    tech: ['Python', 'SQLite', 'SHA-256', 'CLI'],
    color: 'cyan',
    githubUrl: 'https://github.com/Yaseen-Rather/Tamper-Evident-Logging-System.git',
  },
  {
    icon: KeyRound,
    num: '03',
    name: 'CryptoVault — File Encryption Tool',
    status: 'ONGOING',
    desc: 'CLI file encryption tool using RSA for asymmetric key exchange and AES for high-performance symmetric encryption.',
    bullets: [
      'RSA asymmetric key exchange',
      'AES symmetric encryption engine',
      'SHA-256 integrity verification',
    ],
    tech: ['Python', 'RSA', 'AES', 'SHA-256'],
    color: 'emerald',
    githubUrl: 'https://github.com/Yaseen-Rather/CryptoVault_python.git',
  },
]

function Projects() {
  return (
    <section id="projects" className="relative py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader label="PROJECTS" sub="ls -la ~/projects/" />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((p, i) => {
            const isBlue = p.color === 'cyan'
            return (
              <motion.div
                key={p.num}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className={`relative group rounded-lg p-6 ${isBlue ? 'neon-border-blue' : 'neon-border'} cursor-pointer overflow-hidden`}
              >
                {/* sweep effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent"></div>
                </div>

                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded flex items-center justify-center ${isBlue ? 'bg-cyan-400/10 border border-cyan-400/30' : 'bg-emerald-400/10 border border-emerald-400/30'}`}>
                    <p.icon className={`w-6 h-6 ${isBlue ? 'text-cyan-300' : 'text-emerald-300'}`} />
                  </div>
                  <div className="text-right">
                    <div className={`text-[10px] px-2 py-0.5 rounded ${p.status === 'COMPLETED' ? 'bg-emerald-400/10 text-emerald-300 border border-emerald-400/30' : 'bg-yellow-400/10 text-yellow-300 border border-yellow-400/30'}`}>
                      {p.status}
                    </div>
                    <div className={`text-3xl font-display font-black mt-1 ${isBlue ? 'text-cyan-500/30' : 'text-emerald-500/30'}`}>
                      {p.num}
                    </div>
                  </div>
                </div>

                <h3 className={`font-display font-bold text-lg mb-2 ${isBlue ? 'text-cyan-300 neon-text-blue' : 'text-emerald-300 neon-text'}`}>
                  {p.name}
                </h3>
                <p className="text-emerald-100/70 text-sm mb-4 leading-relaxed">{p.desc}</p>

                <ul className="space-y-1.5 mb-4 text-xs text-emerald-100/60">
                  {p.bullets.map((b, j) => (
                    <li key={j} className="flex gap-2">
                      <span className={isBlue ? 'text-cyan-400' : 'text-emerald-400'}>{'▸'}</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.tech.map(t => (
                    <span key={t} className={`text-[10px] px-2 py-0.5 rounded border ${isBlue ? 'border-cyan-400/30 text-cyan-300 bg-cyan-400/5' : 'border-emerald-400/30 text-emerald-300 bg-emerald-400/5'}`}>
                      {t}
                    </span>
                  ))}
                </div>

                <a
                  href={p.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-xs font-mono flex items-center gap-1 ${isBlue ? 'text-cyan-300' : 'text-emerald-300'} group-hover:gap-2 transition-all hover:opacity-80`}
                >
                  <span>&gt;_ view_details</span>
                  <ChevronRight className="w-3 h-3" />
                </a>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ============ SKILLS ============ */
const SKILLS = [
  {
    icon: Shield,
    title: 'SOC & Blue Team',
    items: ['Log Analysis', 'Forensic Investigation', 'Threat Detection', 'Incident Triage', 'Tamper-Evident Logging'],
  },
  {
    icon: Zap,
    title: 'Security Tools',
    items: ['Wireshark', 'Burp Suite', 'Nmap', 'Metasploit', 'John The Ripper'],
  },
  {
    icon: Code2,
    title: 'Programming',
    items: ['Python', 'C', 'C++', 'JavaScript'],
  },
  {
    icon: Monitor,
    title: 'Systems',
    items: ['Linux', 'Windows'],
  },
  {
    icon: Wifi,
    title: 'Networking',
    items: ['CCNA (in progress)', 'Cisco Packet Tracer', 'Network Protocols'],
  },
  {
    icon: Database,
    title: 'Databases',
    items: ['SQLite', 'Structured Logs'],
  },
]

function Skills() {
  return (
    <section id="skills" className="relative py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader label="SKILLS" sub="skills --list --all" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SKILLS.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              className="neon-border rounded-lg p-5 group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded border border-emerald-500/30 bg-emerald-400/5 flex items-center justify-center group-hover:bg-emerald-400/15 transition-colors">
                  <s.icon className="w-5 h-5 text-emerald-300" />
                </div>
                <h3 className="font-display font-bold text-emerald-300 neon-text">{s.title}</h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {s.items.map(it => (
                  <span key={it} className="text-xs px-2 py-1 rounded bg-emerald-400/5 border border-emerald-400/20 text-emerald-200/80">
                    {it}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============ CERTIFICATIONS ============ */
const CERTS = [
  { name: 'Google Cybersecurity Professional Certificate', issuer: 'Google', status: 'COMPLETED', year: '2024' },
  { name: 'SOC Level 1 Pathway', issuer: 'TryHackMe', status: 'IN PROGRESS', year: '2025' },
  { name: 'Cyber Security 101', issuer: 'TryHackMe', status: 'COMPLETED', year: '2024' },
  { name: 'CCNA', issuer: 'Cisco', status: 'IN PROGRESS', year: '2025' },
]

function Certifications() {
  return (
    <section id="certs" className="relative py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader label="CERTIFICATIONS" sub="certs --verify --chain" />

        <div className="relative pl-6 md:pl-8">
          {/* vertical line */}
          <div className="absolute left-2 md:left-3 top-2 bottom-2 w-px bg-gradient-to-b from-emerald-400/80 via-emerald-500/30 to-transparent"></div>

          <div className="space-y-5">
            {CERTS.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
                className="relative"
              >
                {/* node */}
                <div className="absolute -left-6 md:-left-8 top-5 w-4 h-4 rounded-full bg-[#050505] border-2 border-emerald-400 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-dot"></div>
                </div>

                <div className="neon-border rounded-lg p-4 md:p-5 flex flex-col sm:flex-row sm:items-center gap-3 hover:translate-x-1 transition-transform">
                  <Award className="w-8 h-8 text-emerald-400 shrink-0" />
                  <div className="flex-1">
                    <div className="font-display font-bold text-emerald-200 text-sm md:text-base">{c.name}</div>
                    <div className="text-emerald-500/70 text-xs mt-0.5">{c.issuer} {'·'} {c.year}</div>
                  </div>
                  <div className={`text-[10px] px-2 py-1 rounded border ${
                    c.status === 'COMPLETED'
                      ? 'border-emerald-400/40 text-emerald-300 bg-emerald-400/10'
                      : 'border-yellow-400/40 text-yellow-300 bg-yellow-400/10'
                  }`}>
                    {c.status}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ============ CONTACT ============ */
function Contact() {
  const links = [
    { icon: Mail, label: 'Email', value: 'yaseenbinashraf469@gmail.com', href: 'mailto:yaseenbinashraf469@gmail.com' },
    { icon: Github, label: 'GitHub', value: 'github.com/Yaseen-Rather', href: 'https://github.com/Yaseen-Rather' },
    { icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/yaseen-rather', href: 'https://linkedin.com/in/yaseen-rather' },
  ]

  return (
    <section id="contact" className="relative py-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeader label="CONTACT" sub="./establish_connection.sh" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="neon-border rounded-2xl p-8 md:p-12 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 cyber-grid opacity-30"></div>

          <div className="relative">
            <div className="inline-flex items-center gap-2 text-emerald-500/80 text-xs mb-4">
              <div className="w-2 h-2 bg-emerald-400 rounded-full pulse-dot"></div>
              CHANNEL_OPEN {'·'} awaiting_handshake
            </div>

            <h3 className="font-display font-black text-3xl md:text-4xl mb-3 gradient-text">
              Let&apos;s connect and secure the digital world together.
            </h3>
            <p className="text-emerald-100/60 text-sm mb-10 max-w-xl mx-auto">
              Open to SOC internships, blue team collaborations, and cybersecurity research opportunities.
            </p>

            <div className="grid sm:grid-cols-3 gap-4">
              {links.map((l, i) => (
                <motion.a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.04, y: -3 }}
                  className="neon-border-blue rounded-lg p-4 text-left group block"
                >
                  <l.icon className="w-6 h-6 text-cyan-300 mb-2 group-hover:scale-110 transition-transform" />
                  <div className="text-[10px] text-cyan-500/70 uppercase tracking-wider">{l.label}</div>
                  <div className="text-xs text-emerald-100 mt-1 truncate">{l.value}</div>
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ============ FOOTER ============ */
function Footer() {
  return (
    <footer className="relative py-10 px-4 sm:px-6 border-t border-emerald-500/20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
        <div className="text-emerald-500/70 font-mono flex items-center gap-2">
          <Terminal className="w-3 h-3" />
          &gt; Built with passion for cybersecurity and blue teaming.
        </div>
        <div className="text-emerald-500/50 font-mono">
          {'©'} {new Date().getFullYear()} Yaseen Rather {'·'} All systems operational
        </div>
      </div>
    </footer>
  )
}

/* ============ APP ============ */
const App = () => {
  return (
    <div className="relative min-h-screen bg-[#050505] text-emerald-50">
      <div className="scanlines"></div>
      <div className="vignette"></div>
      <Nav />
      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Certifications />
        <Contact />
        <Footer />
      </main>
    </div>
  )
}

export default App
