import React from 'react';
import { Navbar } from '../sections/Navbar';
import { Hero } from '../sections/Hero';
import { TrustedBy } from '../sections/TrustedBy';
import { HowItWorks } from '../sections/HowItWorks';
import { BentoFeatures } from '../sections/BentoFeatures';
import { Pricing } from '../sections/Pricing';
import { Testimonials } from '../sections/Testimonials';
import { CTA } from '../sections/CTA';
import { Footer } from '../sections/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <TrustedBy />
        <HowItWorks />
        <BentoFeatures />
        <Pricing />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
