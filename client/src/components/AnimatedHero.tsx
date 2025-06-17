import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero4.jfif";
import { cn } from "@/lib/utils";

export default function AnimatedHero() {
  const { t } = useTranslation();
  const { dir } = useLanguage();

  const scrollToServices = () => {
    const servicesSection = document.getElementById("services");
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      className="relative py-32 sm:py-40 flex items-center justify-center min-h-[70vh] md:min-h-[80vh]"
      style={{
        backgroundImage: `url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>
      
      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="py-10 px-8 bg-white bg-opacity-80 backdrop-blur-sm rounded-xl shadow-lg"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight text-brand-blue">
            {t.hero.title}
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-brand-blue mb-12 leading-relaxed max-w-3xl mx-auto">
            {t.hero.description}
          </p>
          
          <div className="flex justify-center items-center">
            <motion.button
              onClick={scrollToServices}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "bg-brand-blue text-white px-8 py-4 rounded-lg font-semibold text-lg",
                "transition-all duration-300 hover:bg-brand-blue-dark hover:shadow-lg",
                "flex items-center group"
              )}
            >
              <span>{t.hero.cta}</span>
              <ArrowRight className={`h-5 w-5 ${dir === 'rtl' ? 'mr-2' : 'ml-2'} transition-transform duration-300 group-hover:translate-x-1`} />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
