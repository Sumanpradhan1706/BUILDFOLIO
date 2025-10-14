import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Linkedin } from 'lucide-react';

const judges = [
  {
    name: 'Suman Pradhan',
    title: 'Frontend Developer',
    company: 'TechVerse',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    linkedin: '#',
  },
  {
    name: 'Ananya Sharma',
    title: 'UI/UX Designer',
    company: 'Google',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    linkedin: '#',
  },
  {
    name: 'Rahul Mehta',
    title: 'Software Engineer',
    company: 'Microsoft',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    linkedin: '#',
  },
];

export default function JudgesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="judges" className="relative py-24 md:py-32">
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
              Meet the <span className="gradient-text">Judges</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Industry experts who will evaluate your amazing work
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {judges.map((judge, index) => (
              <motion.div
                key={judge.name}
                initial={{ opacity: 0, y: 50, rotateY: -20 }}
                animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-glass p-6 rounded-xl hover-glow group perspective-1000"
              >
                <div className="relative mb-6 overflow-hidden rounded-lg border-2 border-primary/30 group-hover:border-primary transition-all duration-300">
                  <img
                    src={judge.image}
                    alt={judge.name}
                    className="w-full aspect-square object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                    <a
                      href={judge.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-primary hover:bg-primary/90 text-primary-foreground p-3 rounded-full hover-glow"
                    >
                      <Linkedin size={20} />
                    </a>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-2">{judge.name}</h3>
                <p className="text-primary font-semibold mb-1">{judge.title}</p>
                <p className="text-muted-foreground">{judge.company}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
