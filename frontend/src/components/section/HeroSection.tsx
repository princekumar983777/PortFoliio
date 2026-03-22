import { ArrowDown, Github, Linkedin, Twitter } from "lucide-react";
import { useState, useEffect } from "react";

interface HeroSectionProps {
  onNavigate: (index: number) => void;
}

const TypingEffect = () => {
  const texts = [
    "AI / ML Engineer",
    "Python Developer",
    "Mechatronics / Automation Engineer",
    "IoT Engineer",
    "Data Analyst"
  ];

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const handleTyping = () => {
      const fullText = texts[currentTextIndex];

      if (!isDeleting) {
        // Typing forward
        setCurrentText(fullText.substring(0, currentText.length + 1));
        setTypingSpeed(100);

        if (currentText === fullText) {
          // Pause at end of text
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        // Backspacing
        setCurrentText(fullText.substring(0, currentText.length - 1));
        setTypingSpeed(50);

        if (currentText === "") {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, currentTextIndex, isDeleting, typingSpeed, texts]);

  return (
    <span className="gradient-text font-medium">
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

const HeroSection = ({ onNavigate }: HeroSectionProps) => {
  return (
    <section className="section-container bg-section-hero flex items-center justify-center relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-float delay-300" />
      </div>

      <div className="w-full max-w-6xl mx-auto px-0 sm:px-6 grid lg:grid-cols-2 gap-8 md:gap-12 items-center relative z-10">
        {/* Content - order-2 on mobile (below image), order-1 on desktop */}
        <div className="order-2 lg:order-1 space-y-6 sm:space-y-8 text-center lg:text-left">
          <div className="space-y-3 sm:space-y-4">
            <p className="text-primary font-mono text-sm sm:text-base tracking-wider animate-fade-in-up">
              Hello, I'm
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight animate-fade-in-up delay-100">
              Prince Kumar
            </h1>
            <div className="h-12 sm:h-14 overflow-hidden">
              <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground animate-fade-in-up delay-200">
                <TypingEffect />
              </p>
            </div>
          </div>

          <p className="text-base sm:text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0 leading-relaxed animate-fade-in-up delay-300">
            Transforming complex problems into elegant solutions. Passionate about 
            building intelligent systems that make a difference.
          </p>

          <div className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 animate-fade-in-up delay-400">
            <button
              onClick={() => onNavigate(1)}
              className="btn-primary text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-2.5"
            >
              View Projects
            </button>
            <button
              onClick={() => onNavigate(4)}
              className="btn-secondary text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-2.5"
            >
              Contact Me
            </button>
          </div>

          {/* Social Links - horizontal on mobile, vertical sidebar on desktop */}
          <div className="flex lg:hidden justify-center gap-6 animate-fade-in-up delay-500">
            <a
              href="https://github.com/princekumar983777/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors p-2"
              aria-label="GitHub"
            >
              <Github size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/prince-kumar-021460290/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors p-2"
              aria-label="LinkedIn"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="https://x.com/PrinceK29628508"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors p-2"
              aria-label="Twitter"
            >
              <Twitter size={24} />
            </a>
          </div>
          <div className="hidden lg:flex fixed left-8 bottom-8 flex-col gap-4 z-40 animate-fade-in-up delay-500">
            <a
              href="https://github.com/princekumar983777/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github size={22} />
            </a>
            <a
              href="https://www.linkedin.com/in/prince-kumar-021460290/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Linkedin size={22} />
            </a>
            <a
              href="https://x.com/PrinceK29628508"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Twitter size={22} />
            </a>
          </div>
        </div>

        {/* Profile Image - order-1 on mobile (above content), order-2 on desktop */}
        <div className="order-1 lg:order-2 flex justify-center items-center animate-fade-in-right delay-300 lg:mt-0">
          <div className="relative">
            <div className="w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-full bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center">
              <div className="w-[85%] h-[85%] rounded-full bg-card border border-border/50 flex items-center justify-center overflow-hidden">
                <img src="/dp.jpg" alt="Prince Kumar" className="w-full h-full object-cover" />
              </div>
            </div>
            {/* Floating elements - hide on small mobile */}
            <div className="hidden sm:block absolute -top-4 -right-4 px-4 py-2 glass-card text-sm font-mono animate-float">
              AI/ML
            </div>
            <div className="hidden sm:block absolute -bottom-4 -left-4 px-4 py-2 glass-card text-sm font-mono animate-float delay-200">
              Backend
            </div>
            <div className="hidden lg:block absolute top-1/2 -right-8 px-4 py-2 glass-card text-sm font-mono animate-float delay-400">
              Data Science
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator - hides on small mobile when content is tall */}
      <button
        onClick={() => onNavigate(1)}
        className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-foreground transition-colors animate-bounce z-10"
      >
        <ArrowDown size={24} aria-label="Scroll to projects" />
      </button>
    </section>
  );
};

export default HeroSection;
