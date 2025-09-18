import Hero from "@/app/components/Hero";

export default function HeroSection() {
  return (
    <div id="home" className="pt-20">{/* offset for fixed navbar */}
      <Hero />
    </div>
  );
}

