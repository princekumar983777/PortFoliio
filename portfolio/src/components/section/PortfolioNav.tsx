import { useState, useEffect } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";

interface PortfolioNavProps {
  currentSection: number;
  onNavigate: (index: number) => void;
}

const navItems = [
  { label: "Home", index: 0 },
  { label: "Projects", index: 1 },
  { label: "Blog", index: 2 },
  { label: "About", index: 3 },
  { label: "Hire Me", index: 4 },
];

const PortfolioNav = ({ currentSection, onNavigate }: PortfolioNavProps) => {
  const [isDark, setIsDark] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Check initial theme
    const root = document.documentElement;
    if (!root.classList.contains("light")) {
      root.classList.remove("light");
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("light");
    } else {
      root.classList.remove("light");
    }
    setIsDark(!isDark);
  };

  const handleNavClick = (index: number) => {
    onNavigate(index);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4">
      <nav className="relative w-full max-w-7xl bg-secondary/90 backdrop-blur-xl rounded-full px-6 py-3 flex items-center justify-between border border-border/50">
        {/* Logo */}
        <button
          onClick={() => handleNavClick(0)}
          className="flex items-center gap-2 text-xl font-bold tracking-tight hover:text-primary transition-colors"
        >
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-primary-foreground font-bold text-sm">H</span>
          </div>
          <span className="hidden sm:inline">Haldiya</span>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.slice(0, 4).map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.index)}
              className={`text-sm font-medium transition-colors ${
                currentSection === item.index 
                  ? "text-foreground" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Right side actions */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-muted transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={18} className="text-foreground" /> : <Moon size={18} className="text-foreground" />}
          </button>

          <button
            onClick={() => handleNavClick(4)}
            className="btn-primary text-sm px-4 py-2 rounded-full"
          >
            HIRE ME
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-muted transition-colors"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-full hover:bg-muted transition-colors"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 md:hidden bg-secondary/95 backdrop-blur-xl rounded-2xl border border-border animate-slide-in-right shadow-lg">
          <div className="px-6 py-4 space-y-3">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.index)}
                className={`block w-full text-left py-2 text-base font-medium transition-colors ${
                  currentSection === item.index
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default PortfolioNav;
