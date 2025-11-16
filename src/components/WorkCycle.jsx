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

  // Horizontal translation to move the cycle from right to left
  const x = useTransform(scrollYProgress, [0, 1], ['50%', '-350%'])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360])
  const opacity = useTransform(scrollYProgress, [0, 0.05, 0.15], [0, 1, 1])

  return (
    <section ref={ref} className="relative min-h-[220vh] bg-black text-white">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Cycle and blocks container */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            style={{ x, rotate }}
            className="relative flex items-center gap-24 will-change-transform"
          >
            {/* The cycle visualization */}
            <div className="relative w-72 h-72 shrink-0">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-fuchsia-400/30 to-cyan-400/30 blur-2xl" />
              <div className="absolute inset-0 rounded-full border border-white/20" />
              <div className="absolute inset-6 rounded-full border-2 border-white/30 animate-pulse" />
              <div className="absolute inset-12 rounded-full border border-white/10" />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div style={{ opacity }} className="text-center">
                  <h3 className="text-2xl font-semibold tracking-tight">The Cycle</h3>
                  <p className="text-white/60 text-sm mt-1">Scroll to move through steps</p>
                </motion.div>
              </div>
            </div>

            {/* Steps blocks aligned horizontally to the right */}
            {steps.map((s, i) => (
              <motion.div
                key={s.title}
                className="w-[320px] shrink-0"
                style={{ opacity: useTransform(scrollYProgress, [i/steps.length, (i+0.5)/steps.length], [0.25, 1]) }}
              >
                <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
                  <div className="text-xs uppercase tracking-widest text-white/50">Step {i+1}</div>
                  <div className="mt-2 text-xl font-semibold">{s.title}</div>
                  <div className="mt-2 text-white/70 leading-relaxed">{s.text}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* subtle vignette */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black via-transparent to-black" />
      </div>

      {/* After last block, allow scroll to continue and then snap back effect description */}
      <div className="relative h-[120vh] flex items-center justify-center px-6">
        <div className="max-w-2xl text-center">
          <h4 className="text-2xl font-semibold">Loop Completed</h4>
          <p className="mt-3 text-white/70">
            Keep scrolling to return to the beginning. The cycle invites continuous improvement —
            once the last block appears, the page continues, then scrolling back brings you to the
            starting stack and the motion reverses naturally.
          </p>
        </div>
      </div>
    </section>
  )
}
