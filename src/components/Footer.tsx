import { Twitter, Linkedin, Instagram, Mail, Phone } from 'lucide-react';
import logo from '@/assets/logo.jpg';

export default function Footer() {
  return (
    <footer className="relative py-12 border-t border-border/30 bg-glass backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Logo & Description (large left-aligned logo) */}
            <div className="flex items-start space-x-6 mb-2">
              <img
                src={logo}
                alt="BUILDFOLIO logo"
                className="w-28 h-28 md:w-36 md:h-36 rounded-lg object-cover shadow-lg"
              />

              <div>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl md:text-3xl font-orbitron font-bold gradient-text">
                    BUILDFOLIO
                  </span>
                </div>
                <p className="text-foreground/80 text-sm leading-relaxed mt-3 max-w-md">
                  Empowering developers and designers to showcase their talent through innovative challenges and community events.
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#home" className="text-foreground/80 hover:text-primary transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#about" className="text-foreground/80 hover:text-primary transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#timeline" className="text-foreground/80 hover:text-primary transition-colors">
                    Timeline
                  </a>
                </li>
                <li>
                  <a href="#judges" className="text-foreground/80 hover:text-primary transition-colors">
                    Judges
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-bold mb-4">Contact Us</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-foreground/80">
                  <Mail size={18} className="text-primary" />
                  <a
                    href="mailto:techversecommunity7@gmail.com"
                    className="hover:text-primary transition-colors text-sm"
                  >
                    techversecommunity7@gmail.com
                  </a>
                </div>
                <div className="flex items-center space-x-2 text-foreground/80">
                  <Phone size={18} className="text-primary" />
                  <a href="tel:9339982624" className="hover:text-primary transition-colors text-sm">
                    Soumen Das — 9339982624
                  </a>
                </div>
                <div className="flex space-x-4 pt-2">
                  <a
                    href="https://x.com/wearetechverse"
                    className="w-10 h-10 bg-glass rounded-lg flex items-center justify-center hover-glow"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Twitter size={20} className="text-primary" />
                  </a>
                  <a
                    href="https://www.instagram.com/wearetechverse/"
                    className="w-10 h-10 bg-glass rounded-lg flex items-center justify-center hover-glow"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Instagram size={20} className="text-primary" />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/techversecommunity/about/?viewAsMember=true"
                    className="w-10 h-10 bg-glass rounded-lg flex items-center justify-center hover-glow"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin size={20} className="text-primary" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-border/30 text-center">
            <p className="text-foreground/80 text-sm">
              © 2025 TechVerse Community. All rights reserved. Built with{' '}
              <span className="text-primary">❤</span> for the community.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
