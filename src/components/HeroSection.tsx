import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, Mail } from 'lucide-react';

export default function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-black mb-6 glow-neon">
              BUILD<span className="text-primary">•</span>FOLIO
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-2xl md:text-3xl font-light mb-4 gradient-text">
              Showcase. Inspire. Achieve.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Hosted by <span className="text-primary font-semibold">TechVerse Community</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12 max-w-2xl mx-auto"
          >
            <div className="flex items-center justify-center space-x-3 bg-glass p-4 rounded-lg hover-glow">
              <Calendar className="text-primary" size={24} />
              <div className="text-left">
                <p className="text-sm text-muted-foreground">Event Date</p>
                <p className="font-semibold">15-16 Nov, 2025</p>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-3 bg-glass p-4 rounded-lg hover-glow">
              <Clock className="text-primary" size={24} />
              <div className="text-left">
                <p className="text-sm text-muted-foreground">Duration</p>
                <p className="font-semibold">36 Hours</p>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-3 bg-glass p-4 rounded-lg hover-glow">
              <MapPin className="text-primary" size={24} />
              <div className="text-left">
                <p className="text-sm text-muted-foreground">Venue</p>
                <p className="font-semibold">Online</p>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-3 bg-glass p-4 rounded-lg hover-glow">
              <Mail className="text-primary" size={24} />
              <div className="text-left">
                <p className="text-sm text-muted-foreground">Contact</p>
                <p className="font-semibold text-xs">techversecommunity7@gmail.com</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-12 py-6 text-lg hover-glow animate-glow-pulse"
            >
              Join the Competition
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-16"
          >
            <div className="inline-flex items-center space-x-2 text-muted-foreground">
              <div className="w-6 h-6 border-2 border-primary rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-primary rounded-full animate-float" />
              </div>
              <span className="text-sm">Scroll to explore</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
