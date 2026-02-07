import { motion } from 'framer-motion';
import { Home, Info, Rocket as RocketIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { useMemo } from 'react';

export default function FloatNavbar() {
    return (
        <div className="absolute top-0 left-0 w-full h-[50%] pointer-events-none z-50 flex items-start justify-center gap-24 pt-20">

            {/* Home Rocket (Blue) */}
            <RealisticRocket
                icon={<Home size={16} className="text-blue-900" />}
                label="Home"
                delay={0}
                variant="blue"
            />

            {/* About Rocket (Red) */}
            <RealisticRocket
                icon={<Info size={16} className="text-red-900" />}
                label="About"
                delay={1.5}
                variant="red"
            />

            {/* Start Rocket (Purple) */}
            <RealisticRocket
                icon={<RocketIcon size={16} className="text-purple-900" />}
                label="Start"
                delay={0.8}
                variant="purple"
            />

        </div>
    );
}

type RocketVariant = 'blue' | 'red' | 'purple';

function RealisticRocket({ icon, label, delay, variant }: { icon: ReactNode, label: string, delay: number, variant: RocketVariant }) {
    const randomParams = useMemo(() => ({
        duration: 5 + Math.random() * 3,
        x: Math.random() * 40 - 20,
        y: Math.random() * 20 - 10,
        rotate: Math.random() * 10 - 5
    }), []);

    const colors = {
        blue: { body: '#e0f2fe', nose: '#0284c7', fin: '#0369a1', window: '#bae6fd' }, // Sky/Blue
        red: { body: '#ffe4e6', nose: '#e11d48', fin: '#be123c', window: '#fecdd3' }, // Rose/Red
        purple: { body: '#f3e8ff', nose: '#9333ea', fin: '#7e22ce', window: '#e9d5ff' }, // Purple
    };

    const c = colors[variant];

    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{
                y: [0, -15 + randomParams.y, 0],
                x: [0, randomParams.x, 0],
                rotate: [0, randomParams.rotate, -randomParams.rotate, 0],
                opacity: 1
            }}
            transition={{
                y: { duration: randomParams.duration, repeat: Infinity, ease: "easeInOut", delay },
                x: { duration: randomParams.duration * 1.4, repeat: Infinity, ease: "easeInOut", delay },
                rotate: { duration: randomParams.duration * 1.2, repeat: Infinity, ease: "easeInOut", delay },
                opacity: { duration: 1 }
            }}
            className="pointer-events-auto relative group cursor-pointer"
            whileHover={{ scale: 1.15, rotate: -5, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.9 }}
        >
            {/* Rocket SVG Container */}
            <div className="relative w-40 h-20 drop-shadow-2xl filter hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] transition-all">
                <svg viewBox="0 0 200 100" className="w-full h-full transform -rotate-12">
                    {/* Left/Rear Fin (Top) */}
                    <path d="M40 30 L10 10 L60 30 Z" fill={c.fin} />
                    {/* Left/Rear Fin (Bottom) */}
                    <path d="M40 70 L10 90 L60 70 Z" fill={c.fin} />

                    {/* Main Fuselage */}
                    <ellipse cx="100" cy="50" rx="80" ry="25" fill={c.body} stroke="white" strokeWidth="2" />

                    {/* Nose Cone */}
                    <path d="M140 32 Q 190 50 140 68" fill={c.nose} />
                    {/* Wait, simpler nose: clip the ellipse? or just overlay? 
                        Let's draw a proper nose shape overlaying the right end.
                        Ellipse goes from 20 to 180.
                        Let's make a cap.
                     */}
                    <path d="M150 29 C 170 29 195 50 195 50 C 195 50 170 71 150 71 Z" fill={c.nose} />


                    {/* Window / Porthole */}
                    <circle cx="90" cy="50" r="14" fill="#334155" />
                    <circle cx="90" cy="50" r="11" fill={c.window} />

                    {/* Rear Engine Nozzle */}
                    <path d="M30 40 L15 35 L15 65 L30 60 Z" fill="#475569" />
                </svg>

                {/* Content Overlay (Text & Icon) */}
                <div className="absolute inset-0 flex items-center justify-center pl-6 pb-2 text-slate-700 font-bold tracking-wider z-20 pointer-events-none transform -rotate-12">
                    <span className="bg-white/50 px-2 py-0.5 rounded-md flex items-center gap-1 backdrop-blur-sm border border-white/20 shadow-sm">
                        {icon}
                        <span className="text-xs uppercase">{label}</span>
                    </span>
                </div>

                {/* Fire Animation at Rear */}
                <div className="absolute top-[55%] left-0 -translate-y-1/2 -ml-2 -rotate-12 z-0">
                    <FlameEffect />
                </div>
            </div>
        </motion.div>
    )
}

function FlameEffect() {
    return (
        <div className="relative transform rotate-90 origin-top">
            <motion.div
                animate={{ scaleY: [1, 1.5, 1, 1.8, 1], opacity: [0.8, 1, 0.7, 1, 0.8] }}
                transition={{ duration: 0.15, repeat: Infinity }}
                className="w-4 h-12 bg-gradient-to-t from-transparent via-orange-500 to-yellow-300 blur-sm rounded-full origin-top"
            />
            <motion.div
                animate={{ scaleY: [1, 1.2, 0.8, 1.4, 1] }}
                transition={{ duration: 0.1, repeat: Infinity }}
                className="absolute top-0 left-1 w-2 h-8 bg-white blur-sm rounded-full origin-top opacity-80"
            />
        </div>
    )
}
