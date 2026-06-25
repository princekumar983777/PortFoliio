import { useState, useEffect, useRef } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";

interface PortfolioNavProps {
  currentSection: number;
  onNavigate: (index: number) => void;
  isMobile?: boolean;
}

const INDIA_COORDS = {
  lat: 20.5937,
  lng: 78.9629,
};

const navItems = [
  { label: "Home", index: 0 },
  { label: "Experience", index: 1 },
  { label: "Projects", index: 2 },
  { label: "Blog", index: 3 },
  { label: "About", index: 4 },
  { label: "Hire Me", index: 5 },
];

const PortfolioNav = ({ currentSection, onNavigate, isMobile = false }: PortfolioNavProps) => {
  const [isDark, setIsDark] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isMobileMenuOpen && mobileMenuRef.current && !mobileMenuRef.current.contains(e.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const root = document.documentElement;
    const savedTheme = localStorage.getItem("theme");

    const setTheme = (dark: boolean) => {
      if (dark) {
        root.classList.remove("light");
      } else {
        root.classList.add("light");
      }
      setIsDark(dark);
      localStorage.setItem("theme", dark ? "dark" : "light");
    };

    const loadIndiaSunData = async () => {
      try {
        const response = await fetch(
          `https://api.sunrise-sunset.org/json?lat=${INDIA_COORDS.lat}&lng=${INDIA_COORDS.lng}&formatted=0`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch sunrise data");
        }

        const data = await response.json();
        const sunrise = new Date(data.results.sunrise);
        const sunset = new Date(data.results.sunset);
        const now = new Date();

        const isDay = now >= sunrise && now <= sunset;
        setTheme(!isDay);
      } catch (error) {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setTheme(prefersDark);
      }
    };

    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme === "dark");
    } else {
      loadIndiaSunData();
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
    <nav ref={mobileMenuRef} className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-background/80 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between h-16`}>
          {/* Logo */}
          <div className="flex items-center gap-2 sm:gap-4">
            {isMobile && (
              <button
                onClick={(e) => { e.stopPropagation(); setIsMobileMenuOpen(!isMobileMenuOpen); }}
                className="p-2 rounded-md text-foreground hover:bg-accent focus:outline-none"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            )}
            <button onClick={() => handleNavClick(0)} className="flex items-center gap-2 sm:gap-4">
              <img
                src="/images/logo.png"
                alt="Haldiya"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full p-0 m-0"
              />
              <span className="hidden sm:inline text-xl font-bold tracking-tight">Haldiya</span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.slice(0, 5).map((item) => (
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
              onClick={() => handleNavClick(5)}
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
        </div>
      </div>

      {/* Mobile menu - dropdown with nav items and Hire Me */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-4 right-4 mt-2 md:hidden bg-secondary/95 backdrop-blur-xl rounded-2xl border border-border shadow-lg z-50 py-4">
          <nav className="flex flex-col gap-1 px-2">
            {navItems.map((item) => (
              <button
                key={item.index}
                onClick={() => handleNavClick(item.index)}
                className={`px-4 py-3 text-left text-sm font-medium rounded-lg transition-colors ${
                  currentSection === item.index
                    ? 'text-primary font-semibold bg-primary/10'
                    : 'text-foreground hover:bg-secondary'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </nav>
  );
};

export default PortfolioNav;
