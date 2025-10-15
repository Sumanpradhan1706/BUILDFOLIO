import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Palette, Trophy } from 'lucide-react';
import coverImage from '@/assets/cover image of BuildFolio.jpg';

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const features = [
    {
      icon: Code2,
      title: 'Code Excellence',
      description: 'Showcase your best projects with clean, efficient code.',
    },
    {
      icon: Palette,
      title: 'Design Mastery',
      description: 'Create stunning portfolios that stand out from the crowd.',
    },
    {
      icon: Trophy,
      title: 'Win Recognition',
      description: 'Get noticed by industry experts and win exciting prizes.',
    },
  ];

  return (
    <section id="about" className="relative py-24 md:py-32">
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
              About <span className="gradient-text">Buildfolio</span>
            </h2>
            <p className="text-xl text-foreground/90 max-w-3xl mx-auto leading-relaxed">
              Get ready to build, flex, and flaunt your creativity — because <span className="text-primary font-semibold">TechVerse</span> is bringing you the most awaited showdown of skills and style: <span className="font-bold"> BuildFolio 2025! </span>
            </p>
          </div>

          {/* Image + Description Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary/50 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
              <img
                src={coverImage}
                alt="BuildFolio cover illustration"
                className="relative rounded-2xl w-full h-auto object-cover border-2 border-primary/30 group-hover:border-primary transition-all duration-300"
              />
            </div>
            <div className="space-y-6">
              <h3 className="text-3xl font-bold">Craft Your Digital Masterpiece</h3>
              <div className="text-foreground/95 leading-relaxed text-lg space-y-4">
                <p>
                  This isn’t your average portfolio contest — it’s a digital identity battle where design meets code, creativity meets logic, and your imagination gets to steal the spotlight! Whether you’re a developer, designer, innovator, or dreamer, BuildFolio is your chance to turn your journey into a masterpiece.
                </p>

                <div className="bg-primary/5 border border-primary/10 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-primary mb-2">🗓 Event Dates</h4>
                  <ul className="text-foreground/85 text-sm space-y-1">
                    <li><strong>Submission Window:</strong> 15th – 16th November (Till 12 PM)</li>
                    <li><strong>Judging Round:</strong> 16th November, 7 PM (Online Meet)</li>
                  </ul>
                </div>

                <p>
                  Bring your best portfolio — be it a website, project hub, or design showcase — and wow our panel of expert judges. Each portfolio will be reviewed for creativity, content, design, storytelling, and tech skills. And here’s the best part — every participant gets personalized feedback to level up their portfolio game for future opportunities!
                </p>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-glass p-8 rounded-xl hover-glow group"
              >
                <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="text-primary" size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-foreground/80 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-glass p-8 md:p-12 rounded-2xl border-2 border-primary/30"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center">
              Why Participate?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-foreground/80">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <p>Learn from industry professionals and expand your skill set</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <p>Network with like-minded developers and designers</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <p>Build a portfolio that gets you noticed by recruiters</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <p>Win amazing prizes and recognition in the community</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
