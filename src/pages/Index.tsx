
import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import UploadSection from '@/components/UploadSection';
import About from '@/components/About';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        <Hero />
        <UploadSection />
        <About />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
