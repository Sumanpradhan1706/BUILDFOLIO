import { motion } from 'framer-motion';
import { Calendar, Clock, Zap, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function EventTicker() {
    const navigate = useNavigate();
    // New, professional ticker message with a highlighted "COMPLETED" badge and competition date.
    const competitionDate = '15–16 Nov 2025';

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-primary via-neon-glow to-primary border-t-2 border-primary/30 shadow-lg overflow-hidden">
            {/* Glowing top border effect */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse"></div>

            <div className="relative overflow-hidden py-3">
                {/* Scrolling text */}
                <motion.div
                    className="flex whitespace-nowrap"
                    animate={{
                        x: [0, -2200],
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: 'loop',
                            duration: 30,
                            ease: 'linear',
                        },
                    }}
                >
                    {/* Repeat the announcement multiple times for a seamless loop */}
                    {[...Array(6)].map((_, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-4 px-8 text-dark-space font-semibold text-sm sm:text-base"
                        >
                            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                            <span className="flex items-center gap-2">
                                <strong className="uppercase">BuildFolio Prep:</strong>
                                <span className="text-yellow-300 font-extrabold">COMPLETED</span>
                                <span className="mx-2">—</span>
                                <span className="text-foreground/80">Get ready for the BuildFolio Competition</span>
                            </span>

                            <span className="mx-2">|</span>

                            <Clock className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                            <span>
                                <span className="font-semibold">Competition:</span>{' '}
                                <span className="bg-yellow-300 text-black font-bold px-2 py-0.5 rounded-md shadow-sm">{competitionDate}</span>
                            </span>

                            <span className="mx-2">|</span>

                            <Zap className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                            <span className="text-foreground/80">Build a polished, deployable portfolio — showcase your best work.</span>

                            <span className="mx-2">|</span>

                            <span className="text-yellow-300">Limited slots — apply now</span>

                            <span className="mx-2">|</span>

                            <button
                                type="button"
                                onClick={() => {
                                    // Navigate to the same route the navbar uses
                                    navigate('/register');
                                }}
                                className="bg-white px-4 py-1.5 rounded-full hover:bg-white/90 transition-all hover:scale-105 text-black font-bold flex items-center gap-2 shadow-lg border-2 border-yellow-400"
                                aria-label="Register for BuildFolio Competition"
                            >
                                Register NOW
                            </button>
                            <span className="mx-2">|</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
