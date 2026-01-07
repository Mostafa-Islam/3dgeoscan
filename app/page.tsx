import Hero from "@/components/home/hero";
import Features from "@/components/home/about";
import StatsSection from "@/components/home/stats-section";
import Services from "@/components/home/services";
import Projects from "@/components/home/projects";
import Solutions from "@/components/home/vision";
import Contact from "@/components/home/contact";
import Products from "@/components/home/products";
import LatestNews from "@/components/home/updates";
export default function Home() {
  return (
    <>
      <Hero />     
      <Features />
      <StatsSection/>
      <Solutions />
      <Products />
      <Services />
      <Projects />
      <LatestNews />
      <Contact />
      
    </>
  );
}