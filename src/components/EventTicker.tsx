import { motion } from 'framer-motion';
import { Calendar, Clock, Zap, Users } from 'lucide-react';

export default function EventTicker() {
    const eventMessage = "🎉 Buildfolio Prep: Vibe & Code — Create Your Portfolio Live! | 📅 4th November at 8 PM | ⏰ Build your entire portfolio in an hour! | 💡 Learn to make a professional site | ⚠️ Limited spots! |  Register NOW: https://luma.com/lod8iebx";

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-primary via-neon-glow to-primary border-t-2 border-primary/30 shadow-lg overflow-hidden">
            {/* Glowing top border effect */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse"></div>

            <div className="relative overflow-hidden py-3">
                {/* Scrolling text */}
                <motion.div
                    className="flex whitespace-nowrap"
                    animate={{
                        x: [0, -2000],
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 30,
                            ease: "linear",
                        },
                    }}
                >
                    {/* Repeat the message multiple times for seamless loop */}
                    {[...Array(5)].map((_, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-3 px-8 text-dark-space font-semibold text-sm sm:text-base"
                        >
                            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                            <span>🎉 Buildfolio Prep: Vibe & Code — Create Your Portfolio Live!</span>
                            <span className="mx-2">|</span>

                            <Clock className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                            <span>📅 4th November at 8 PM</span>
                            <span className="mx-2">|</span>

                            <Zap className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                            <span>⏰ Build your entire portfolio in an hour!</span>
                            <span className="mx-2">|</span>

                            <Users className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                            <span>💡 Learn to make a professional site</span>
                            <span className="mx-2">|</span>

                            <span className="text-yellow-300">⚠️ Limited spots!</span>
                            <span className="mx-2">|</span>

                            <a
                                href="https://luma.com/lod8iebx"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white px-4 py-1.5 rounded-full hover:bg-white/90 transition-all hover:scale-105 text-black font-bold flex items-center gap-2 shadow-lg border-2 border-yellow-400"
                            >
                                Register NOW
                            </a>
                            <span className="mx-2">|</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
