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

      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left: Content */}
        <div className="space-y-8">
          <div className="space-y-4">
            <p className="text-primary font-mono text-sm tracking-wider animate-fade-in-up">
              Hello, I'm
            </p>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight animate-fade-in-up delay-100">
              Prince Kumar
            </h1>
            <div className="h-12 overflow-hidden">
              <p className="text-xl md:text-2xl text-muted-foreground animate-fade-in-up delay-200">
                <TypingEffect />
              </p>
            </div>
          </div>

          <p className="text-lg text-muted-foreground max-w-lg leading-relaxed animate-fade-in-up delay-300">
            Transforming complex problems into elegant solutions. Passionate about 
            building intelligent systems that make a difference.
          </p>

          <div className="flex flex-wrap gap-4 animate-fade-in-up delay-400">
            <button
              onClick={() => onNavigate(1)}
              className="btn-primary"
            >
              View Projects
            </button>
            <button
              onClick={() => onNavigate(4)}
              className="btn-secondary"
            >
              Hire Me
            </button>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-6 pt-4 animate-fade-in-up delay-500">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github size={22} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Linkedin size={22} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Twitter size={22} />
            </a>
          </div>
        </div>

        {/* Right: Profile Image/Illustration */}
        <div className="hidden lg:flex justify-center items-center animate-fade-in-right delay-300">
          <div className="relative">
            <div className="w-80 h-80 rounded-full bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center animate-pulse-glow">
              <div className="w-72 h-72 rounded-full bg-card border border-border/50 flex items-center justify-center overflow-hidden">
                <div className="text-8xl font-bold gradient-text">
                  <img src="/dp.jpg" alt="H" />
                </div>
              </div>
            </div>
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 px-4 py-2 glass-card text-sm font-mono animate-float">
              AI/ML
            </div>
            <div className="absolute -bottom-4 -left-4 px-4 py-2 glass-card text-sm font-mono animate-float delay-200">
              Backend
            </div>
            <div className="absolute top-1/2 -right-8 px-4 py-2 glass-card text-sm font-mono animate-float delay-400">
              Data Science
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => onNavigate(1)}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-foreground transition-colors animate-bounce"
      >
        <ArrowDown size={24} />
      </button>
    </section>
  );
};

export default HeroSection;
