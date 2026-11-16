import { Hero } from "@/components/sections/Hero";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { WhyUs } from "@/components/sections/WhyUs";
import { About } from "@/components/sections/About";
import { CTA } from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <ProductShowcase />
      <WhyUs />
      <About />
      <CTA />
    </>
  );
}
