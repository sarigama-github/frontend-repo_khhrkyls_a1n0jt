import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const steps = [
  {
    title: 'Discover',
    text: 'We align on goals, constraints, and success metrics to set a sharp direction.'
  },
  {
    title: 'Research',
    text: 'We explore users, market signals, and tech options to inform smart choices.'
  },
  {
    title: 'Design',
    text: 'We create flows and visuals that make the experience simple and beautiful.'
  },
  {
    title: 'Build',
    text: 'We implement robust, scalable systems with clean, maintainable code.'
  },
  {
    title: 'Ship',
    text: 'We launch with confidence, instrument analytics, and validate with real users.'
  },
  {
    title: 'Iterate',
    text: 'We learn from data and feedback, refine the product, and repeat the cycle.'
  }
]

export default function WorkCycle() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  // Drive the horizontal parade and subtle rotation
  const x = useTransform(scrollYProgress, [0, 1], ['40%', '-400%'])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360])

  return (
    <section ref={ref} className="relative min-h-[260vh] bg-black text-white">
      {/* Section intro so users know what this is */}
      <div className="mx-auto max-w-6xl px-6 pt-24 pb-10">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">How We Work</h2>
            <p className="mt-3 text-white/70 max-w-xl">Scroll to move through our six-step cycle. Each step will come front and center for easy reading.</p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-white/60 text-sm">
            <span className="inline-block h-2 w-2 rounded-full bg-fuchsia-400/80 shadow-[0_0_18px_6px_rgba(217,70,239,0.45)]" />
            <span>Active step indicator</span>
          </div>
        </div>
      </div>

      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* Cycle and blocks container */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            style={{ x, rotate }}
            className="relative flex items-center gap-16 md:gap-24 will-change-transform"
          >
            {/* The cycle visualization */}
            <div className="relative w-56 h-56 md:w-72 md:h-72 shrink-0">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-fuchsia-400/30 to-cyan-400/30 blur-2xl" />
              <div className="absolute inset-0 rounded-full border border-white/20" />
              <div className="absolute inset-6 rounded-full border-2 border-white/30 animate-pulse" />
              <div className="absolute inset-12 rounded-full border border-white/10" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-xl md:text-2xl font-semibold tracking-tight">The Cycle</h3>
                  <p className="text-white/60 text-xs md:text-sm mt-1">Scroll to move through steps</p>
                </div>
              </div>
            </div>

            {/* Steps blocks aligned horizontally to the right */}
            {steps.map((s, i) => {
              const start = Math.max(0, (i - 0.1) / steps.length)
              const center = Math.min(1, (i + 0.35) / steps.length)
              const end = Math.min(1, (i + 0.8) / steps.length)

              const opacity = useTransform(scrollYProgress, [start, center, end], [0.25, 1, 0.25])
              const scale = useTransform(scrollYProgress, [start, center, end], [0.92, 1.05, 0.92])
              const y = useTransform(scrollYProgress, [start, center, end], [20, 0, 20])

              return (
                <motion.div
                  key={s.title}
                  className="w-[320px] md:w-[520px] shrink-0"
                  style={{ opacity, scale, y }}
                >
                  <div className="relative rounded-2xl border border-white/15 bg-white/10 backdrop-blur-lg p-6 md:p-8 shadow-[0_15px_60px_-10px_rgba(0,0,0,0.7)]">
                    {/* active glow ring */}
                    <motion.div
                      aria-hidden
                      className="pointer-events-none absolute -inset-px rounded-2xl"
                      style={{
                        opacity,
                        background:
                          'radial-gradient(120px 120px at 10% 10%, rgba(217,70,239,0.18), transparent), radial-gradient(140px 140px at 90% 90%, rgba(34,211,238,0.18), transparent)'
                      }}
                    />

                    <div className="text-[11px] md:text-xs uppercase tracking-widest text-white/60">Step {i + 1}</div>
                    <div className="mt-2 text-2xl md:text-3xl font-semibold">{s.title}</div>
                    <div className="mt-3 md:mt-4 text-white/85 leading-relaxed md:text-lg">{s.text}</div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        {/* Removed heavy vignette to improve visibility */}
      </div>

      {/* After last block, allow scroll to continue */}
      <div className="relative h-[120vh] flex items-center justify-center px-6">
        <div className="max-w-2xl text-center">
          <h4 className="text-2xl font-semibold">Loop Completed</h4>
          <p className="mt-3 text-white/70">
            Continue scrolling to return to the beginning. Each step now snaps into clear view with
            higher contrast, larger type, and a focused glow.
          </p>
        </div>
      </div>
    </section>
  )
}
