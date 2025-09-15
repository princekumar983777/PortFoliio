import About from "@/app/components/About";

export default function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="text-2xl md:text-3xl font-bold">About</h2>
        <div className="mt-6">
          <About />
        </div>
      </div>
    </section>
  );
}


