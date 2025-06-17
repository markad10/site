import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";
import { Menu, X } from "lucide-react";
import logoImage from "@/assets/logo.jpg";

export default function ModernNavbar() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!t) return null;

  const navItems = [
    { id: 'home', label: t.nav.home, path: '/' },
    { id: 'services', label: t.nav.services, path: '/services' },
    { id: 'about', label: t.nav.about, path: '/about' },
    { id: 'team', label: t.nav.team, path: '/team' },
    { id: 'contact', label: t.nav.contact, path: '/contact' },
  ];

  const handleNavClick = (item: typeof navItems[0]) => {
    setIsMobileMenuOpen(false);
    navigate(item.path);
  };

  const navClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
    scrolled ? 'bg-white shadow-md' : 'bg-white'
  }`;
  
  const linkColor = 'text-brand-text hover:text-brand-blue';

  return (
    <nav className={navClasses}>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src={logoImage} 
                alt="United Experts Logo" 
                className="h-12 w-auto object-contain"
              />
            </Link>
          </div>

          <div className="hidden md:flex items-center">
            <div className="flex items-center justify-evenly space-x-4 lg:space-x-8 mx-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className={`${linkColor} transition-colors duration-200 font-medium text-base px-2 ${
                    location.pathname === item.path ? 'text-brand-blue' : ''
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <LanguageSwitcher scrolled={true} />
          </div>

          <div className="md:hidden flex items-center">
             <LanguageSwitcher scrolled={true} />
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-brand-text transition-colors ml-2"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className={`w-full text-left block px-3 py-2 rounded-md text-base font-medium ${linkColor} ${
                  location.pathname === item.path ? 'bg-brand-blue-light text-brand-blue' : ''
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
