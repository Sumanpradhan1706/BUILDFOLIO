import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative py-12 border-t border-border/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Logo & Description */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center glow-neon">
                  <span className="text-2xl font-bold text-primary-foreground">T</span>
                </div>
                <span className="text-xl font-orbitron font-bold gradient-text">
                  TechVerse
                </span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Empowering developers and designers to showcase their talent through innovative challenges and community events.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#home" className="text-muted-foreground hover:text-primary transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#timeline" className="text-muted-foreground hover:text-primary transition-colors">
                    Timeline
                  </a>
                </li>
                <li>
                  <a href="#judges" className="text-muted-foreground hover:text-primary transition-colors">
                    Judges
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-bold mb-4">Contact Us</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Mail size={18} className="text-primary" />
                  <a
                    href="mailto:techversecommunity7@gmail.com"
                    className="hover:text-primary transition-colors text-sm"
                  >
                    techversecommunity7@gmail.com
                  </a>
                </div>
                <div className="flex space-x-4 pt-2">
                  <a
                    href="#"
                    className="w-10 h-10 bg-glass rounded-lg flex items-center justify-center hover-glow"
                  >
                    <Twitter size={20} className="text-primary" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-glass rounded-lg flex items-center justify-center hover-glow"
                  >
                    <Github size={20} className="text-primary" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-glass rounded-lg flex items-center justify-center hover-glow"
                  >
                    <Linkedin size={20} className="text-primary" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-border/30 text-center">
            <p className="text-muted-foreground text-sm">
              © 2025 TechVerse Community. All rights reserved. Built with{' '}
              <span className="text-primary">❤</span> for the community.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
