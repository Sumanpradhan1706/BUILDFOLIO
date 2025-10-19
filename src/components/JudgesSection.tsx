import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Linkedin } from 'lucide-react';

const judges = [
  {
    name: 'Rohit Debnath',
    image: 'https://res.cloudinary.com/dczuivjqz/image/upload/v1760717989/Rohit_Debnath_xngstq.jpg',
    linkedin: 'https://www.linkedin.com/in/rohit-debnath/',
    description: 'Dev @sparkmentis.ai | Ex.Intern @Earnify, @Lane | 4x Hackathon Winner | Co-founder Goosy.ai',
  },
  {
    name: 'Akash Nath',
    image: 'https://res.cloudinary.com/dczuivjqz/image/upload/v1760717987/Akash_Nath_qdsmvm.jpg',
    linkedin: 'https://www.linkedin.com/in/akash-nath29',
    description: 'AI/ML Dev | CA @GSSoC’25 | SSoC’25 Contributor | 4x Hackathon Winner | Co-founder Goosy.ai',
  },
];

const FEATURED_COUNT = 3;

export default function JudgesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const featuredJudges = judges.slice(0, FEATURED_COUNT);
  const guestJudges = judges.slice(FEATURED_COUNT);

  const renderJudgeCard = (judge: (typeof judges)[number], index: number) => (
    <motion.div
      key={judge.name}
      initial={{ opacity: 0, y: 50, rotateY: -20 }}
      animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="bg-glass p-6 md:p-8 rounded-2xl hover-glow group perspective-1000 shadow-lg w-full md:w-72 mx-auto"
    >
      <div className="relative mb-8 overflow-hidden rounded-xl border-2 border-primary/30 group-hover:border-primary transition-all duration-300">
        {judge.image ? (
          <img
            src={judge.image}
            alt={judge.name}
            className="w-full aspect-square object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full aspect-square bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            {/* blank placeholder for now */}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
          <a
            href={judge.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary hover:bg-primary/90 text-primary-foreground p-3 rounded-full hover-glow"
          >
            <Linkedin size={22} />
          </a>
        </div>
      </div>
      <h3 className="text-xl font-bold text-center">{judge.name}</h3>
      {judge.description && (
        <p className="text-sm text-center text-foreground/80 mt-2">{judge.description}</p>
      )}
    </motion.div>
  );

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
            <p className="text-xl text-foreground/85">
              Industry experts who will evaluate your amazing work
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredJudges.map((judge, index) => renderJudgeCard(judge, index))}

            {guestJudges.length > 0 && (
              <div className="md:col-span-3 flex flex-col items-center gap-8 md:flex-row md:justify-center">
                {guestJudges.map((judge, index) => renderJudgeCard(judge, FEATURED_COUNT + index))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
