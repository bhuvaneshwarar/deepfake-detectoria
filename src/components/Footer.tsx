
import React from 'react';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-secondary py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="relative w-8 h-8 flex items-center justify-center rounded-lg bg-primary/10">
                <div className="absolute w-4 h-4 bg-primary rounded-full"></div>
              </div>
              <span className="text-xl font-medium">DeepFake Detectoria</span>
            </div>
            <p className="text-muted-foreground">
              Advanced AI-powered deepfake detection technology for maintaining trust in visual media.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="w-10 h-10 rounded-full bg-background flex items-center justify-center button-hover">
                <Twitter className="w-5 h-5 text-muted-foreground" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-background flex items-center justify-center button-hover">
                <Linkedin className="w-5 h-5 text-muted-foreground" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-background flex items-center justify-center button-hover">
                <Github className="w-5 h-5 text-muted-foreground" />
              </a>
              <a href="mailto:contact@example.com" className="w-10 h-10 rounded-full bg-background flex items-center justify-center button-hover">
                <Mail className="w-5 h-5 text-muted-foreground" />
              </a>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Links</h3>
            <ul className="space-y-3">
              {['Home', 'About', 'How It Works', 'FAQ', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Resources</h3>
            <ul className="space-y-3">
              {['Documentation', 'Research', 'Privacy Policy', 'Terms of Service'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-border/70 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} DeepFake Detectoria. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 text-sm text-muted-foreground">
            <span>A project for demonstration purposes only</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
