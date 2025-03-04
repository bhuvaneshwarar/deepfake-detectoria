
import React from 'react';
import { Shield, Zap, AlertTriangle, Eye } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: <Shield className="w-6 h-6 text-primary" />,
      title: "Advanced Detection",
      description: "Utilizing state-of-the-art deep learning algorithms to identify manipulation patterns invisible to the human eye."
    },
    {
      icon: <Zap className="w-6 h-6 text-primary" />,
      title: "Rapid Analysis",
      description: "Get results in seconds with our optimized processing pipeline, designed for both accuracy and speed."
    },
    {
      icon: <AlertTriangle className="w-6 h-6 text-primary" />,
      title: "Growing Threat",
      description: "As deepfake technology evolves, our detection methods continuously adapt to address new manipulation techniques."
    },
    {
      icon: <Eye className="w-6 h-6 text-primary" />,
      title: "Visual Explanation",
      description: "Clear, interpretable results that highlight the areas of potential manipulation for better understanding."
    }
  ];

  return (
    <section id="about" className="section-padding px-6 bg-secondary/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Understanding Deepfakes</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Deepfakes use artificial intelligence to create or manipulate media that can appear remarkably authentic to human observers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <div className="space-y-8">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="flex gap-4 items-start"
                  style={{ animationDelay: `${0.1 + index * 0.1}s` }}
                >
                  <div className="mt-1 p-2 rounded-lg bg-primary/10">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="order-1 md:order-2 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <div className="relative">
              <div className="absolute -inset-4 -z-10 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl blur-xl"></div>
              <div className="glass rounded-xl p-6 overflow-hidden">
                <div className="relative aspect-video rounded-lg overflow-hidden mb-6">
                  <div className="absolute inset-0 bg-black/5 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-muted-foreground">Deepfake Comparison</p>
                      <p className="text-xs text-muted-foreground/70">Interactive visualization</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold">The Growing Threat of Deepfakes</h3>
                  <p className="text-sm text-muted-foreground">
                    Deepfake technology has evolved rapidly, making it increasingly difficult to 
                    distinguish between real and synthetic media. This poses significant risks to:
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-primary mt-2"></span>
                      <span>Personal reputation and privacy</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-primary mt-2"></span>
                      <span>Information integrity in media and news</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-primary mt-2"></span>
                      <span>Public trust in digital content</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-primary mt-2"></span>
                      <span>Electoral processes and democratic institutions</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
