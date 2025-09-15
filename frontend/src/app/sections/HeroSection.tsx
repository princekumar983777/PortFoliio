import Hero from "@/app/components/Hero";

export default function HeroSection() {
  return (
    <div id="home" className="pt-20">{/* offset for fixed navbar */}
      <Hero />
    </div>
  );
}

<div className="flex flex-col justify-center items-start h-screen px-8 md:px-24">
  <h1 className="text-5xl md:text-7xl font-bold mb-4">Hi, I'm Prince</h1>
  <p className="text-xl md:text-2xl text-gray-500 mb-6">
    Building modern web experiences with AI and code.
  </p>
  <a
    href="#projects"
    className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition"
  >
    See My Work
  </a>
</div>
