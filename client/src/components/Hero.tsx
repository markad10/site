import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Hero() {
  const { t } = useTranslation();
  const { language } = useLanguage();

  if (!t) return null;

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section id="home" className="relative h-screen flex items-center justify-center text-center overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          src="/assets/herosection.mp4?v=1"
        >
          Your browser does not support the video tag.
        </video>
        <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>
      </div>

      <motion.div 
        className="relative z-10 max-w-3xl mx-auto px-4"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.2
            }
          }
        }}
      >
        <motion.h1
          key={`h1-${language}`}
          className="text-4xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg"
          variants={fadeIn}
        >
          {t.hero.title}
        </motion.h1>
        <motion.p
          key={`p-${language}`}
          className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto drop-shadow-md"
          variants={fadeIn}
        >
          {t.hero.subtitle}
        </motion.p>
        <motion.div variants={fadeIn}>
          <Link
            to="/contact"
            className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-700 transition-transform transform hover:scale-105 duration-300 ease-in-out shadow-lg"
          >
            {t.hero.cta}
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
} 