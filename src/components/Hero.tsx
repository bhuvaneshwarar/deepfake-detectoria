
import React from 'react';
import { ArrowDown, Video, ShieldCheck } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen pt-20 px-6 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-20 w-[500px] h-[500px] rounded-full bg-accent/5 blur-3xl"></div>
      </div>
      
      <div className="max-w-4xl text-center space-y-6 animate-fade-up">
        <div className="inline-block mb-4">
          <span className="inline-flex items-center py-1 px-3 rounded-full text-xs font-medium bg-primary/10 text-primary">
            <Video className="w-3 h-3 mr-1" />
            Video Deepfake Detection
          </span>
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
          <span className="block">Identify AI-Generated</span>
          <span className="block text-primary">Video Manipulations</span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Our advanced technology analyzes videos frame-by-frame to detect synthetic 
          media and deepfakes with high accuracy and detailed explanations.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
          <a 
            href="#upload"
            className="button-hover rounded-lg bg-primary text-primary-foreground font-medium px-8 py-3 text-center flex items-center justify-center"
          >
            <Video className="w-4 h-4 mr-2" />
            Analyze Video Now
          </a>
          <a 
            href="#how-it-works"
            className="button-hover rounded-lg bg-secondary text-secondary-foreground font-medium px-8 py-3 text-center flex items-center justify-center"
          >
            <ShieldCheck className="w-4 h-4 mr-2" />
            How It Works
          </a>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#upload" className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md">
          <ArrowDown className="w-5 h-5 text-primary" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
