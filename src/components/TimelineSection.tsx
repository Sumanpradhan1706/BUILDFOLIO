import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Calendar, Send, Award, Users } from 'lucide-react';

const timelineEvents = [
  {
    icon: Calendar,
    title: 'Registration Opens',
    date: '1st November 2025',
    description: 'Sign up and join the challenge. Get ready to showcase your creativity!',
  },
  {
    icon: Send,
    title: 'Submission Deadline',
    date: '15th November 2025',
    description: 'Submit your portfolio projects. Make sure everything is polished!',
  },
  {
    icon: Users,
    title: 'Judging Round',
    date: '18-20th November 2025',
    description: 'Expert judges evaluate all submissions based on creativity and execution.',
  },
  {
    icon: Award,
    title: 'Winner Announcement',
    date: '22nd November 2025',
    description: 'Winners revealed! Celebrate with the community and claim your prizes.',
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
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 glow-neon">
              Event <span className="gradient-text">Timeline</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Mark your calendars and don't miss any important dates
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent transform -translate-y-1/2" />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4">
              {timelineEvents.map((event, index) => (
                <motion.div
                  key={event.title}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="relative"
                >
                  <div className="bg-glass p-6 rounded-xl hover-glow group relative z-10">
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300 border-2 border-primary">
                      <event.icon className="text-primary" size={28} />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-center">{event.title}</h3>
                    <p className="text-sm text-primary font-semibold mb-3 text-center">
                      {event.date}
                    </p>
                    <p className="text-sm text-muted-foreground text-center leading-relaxed">
                      {event.description}
                    </p>
                  </div>

                  {/* Connector line for mobile */}
                  {index < timelineEvents.length - 1 && (
                    <div className="md:hidden w-1 h-8 bg-primary/50 mx-auto" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
