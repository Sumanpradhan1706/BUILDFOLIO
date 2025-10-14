import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Calendar, Send, Award, Users } from 'lucide-react';

const timelineEvents = [
  {
    icon: Calendar,
    title: 'Registration Opens',
    date: '1st Nov 2025',
    description: 'Sign up and start preparing your portfolio for submission',
    side: 'right',
  },
  {
    icon: Send,
    title: 'Submission Deadline',
    date: '15th Nov 2025',
    description: 'Final day to submit your portfolio',
    side: 'left',
  },
  {
    icon: Users,
    title: 'Judging Round',
    date: '18-20th Nov 2025',
    description: 'Expert judges evaluate all submissions based on creativity and execution',
    side: 'right',
  },
  {
    icon: Award,
    title: 'Winner Announcement',
    date: '22nd Nov 2025',
    description: 'Winners revealed! Celebrate with the community and claim your prizes',
    side: 'left',
  },
];

export default function TimelineSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="timeline" className="relative py-24 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Competition <span className="gradient-text">Timeline</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Mark your calendar and stay on track with our competition schedule
            </p>
          </div>

          <div className="relative">
            {/* Vertical Timeline Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary transform -translate-x-1/2 hidden md:block" />

            <div className="space-y-12 md:space-y-24">
              {timelineEvents.map((event, index) => (
                <motion.div
                  key={event.title}
                  initial={{ opacity: 0, x: event.side === 'left' ? -50 : 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className={`relative flex items-center ${
                    event.side === 'left'
                      ? 'md:flex-row-reverse'
                      : 'md:flex-row'
                  } flex-col md:gap-8`}
                >
                  {/* Content Card */}
                  <div className={`w-full md:w-5/12 ${event.side === 'left' ? 'md:text-right' : 'md:text-left'} text-center`}>
                    <div className="bg-glass p-6 rounded-xl hover-glow group border border-primary/20">
                      <div className={`flex items-center gap-3 mb-4 ${event.side === 'left' ? 'md:justify-end' : 'md:justify-start'} justify-center`}>
                        <event.icon className="text-primary" size={24} />
                        <span className="text-primary font-semibold">{event.date}</span>
                      </div>
                      <h3 className="text-2xl font-bold mb-3">{event.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </div>

                  {/* Center Node */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:block">
                    <div className="w-5 h-5 bg-primary rounded-full border-4 border-background shadow-[0_0_20px_rgba(0,198,255,0.8)]" />
                  </div>

                  {/* Empty space for alignment */}
                  <div className="hidden md:block w-5/12" />
                </motion.div>
              ))}
            </div>

            {/* Mobile Timeline */}
            <div className="md:hidden absolute left-8 top-0 bottom-0 w-0.5 bg-primary" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
