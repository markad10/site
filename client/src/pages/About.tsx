import { motion } from "framer-motion";
import { Target, Users, Award, TrendingUp, CheckCircle, Briefcase, BarChart } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/contexts/LanguageContext";
import engineeringImage from "@/assets/hero3.jpg"; // Using hero3.jpg to match other pages
import heroImage from "@/assets/hero3.jpg";

const iconMap: { [key: string]: React.FC<any> } = {
  "الرؤية والهدف": Target,
  "Vision & Goal": Target,
  "الرسالة والأثر": Briefcase,
  "Mission & Impact": Briefcase,
  "الجودة والاحترافية": Award,
  "Quality & Professionalism": Award,
  "التطوير والابتكار": TrendingUp,
  "Development & Innovation": TrendingUp,
  "خبراؤنا المتخصصون": Users,
  "Specialized Expert Team": Users,
  "جودة معتمدة عالميًا": CheckCircle,
  "Globally Certified Quality": CheckCircle,
  "حلول مبتكرة ومخصصة": BarChart,
  "Innovative & Customized Solutions": BarChart,
};

const valueIconColors = [
  "text-blue-600 dark:text-blue-400",
  "text-green-600 dark:text-green-400",
  "text-purple-600 dark:text-purple-400",
  "text-orange-600 dark:text-orange-400",
];

const whyUsIconColors = [
  "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400",
  "bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400",
  "bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400",
];

export default function About() {
  const { t } = useTranslation();
  const { dir } = useLanguage();
  
  const aboutT = t.aboutPage;

  if (!aboutT) {
    return <div>Loading translations...</div>;
  }
  
  const FADE_IN_UP = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
  };

  const FADE_IN_SIDE = (delay = 0) => ({
    hidden: { opacity: 0, x: dir === 'rtl' ? -50 : 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut", delay } }
  });

  return (
    <div className="bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-200">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative text-center py-24 sm:py-32"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          position: 'relative',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="bg-white bg-opacity-80 backdrop-blur-sm py-10 px-8 rounded-xl shadow-lg"
          >
            <motion.h1 
              variants={FADE_IN_UP}
              initial="hidden"
              animate="visible"
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-brand-blue"
            >
              {aboutT.hero.title}
            </motion.h1>
            <motion.p 
              variants={FADE_IN_UP}
              initial="hidden"
              animate="visible"
              transition={{delay: 0.2}}
              className="mt-4 max-w-3xl mx-auto text-lg sm:text-xl text-brand-blue"
            >
              {aboutT.hero.subtitle}
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      {/* Vision Section */}
      <section className="py-20 sm:py-28 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={FADE_IN_SIDE()}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-brand-blue mb-6 leading-tight">
                {aboutT.vision.title}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                {aboutT.vision.content}
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                {aboutT.vision.secondParagraph}
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={FADE_IN_SIDE(0.2)}
              className="relative"
            >
              <img
                src={engineeringImage}
                alt={aboutT.vision.title}
                className="w-full h-auto rounded-2xl shadow-2xl object-cover dark:shadow-gray-800/20"
              />
               <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 sm:py-28 bg-gray-50 dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={FADE_IN_UP}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-brand-blue mb-4">
              {aboutT.values.title}
            </h2>
            <p className="text-lg text-brand-blue max-w-3xl mx-auto">
              {aboutT.values.subtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {aboutT.values.items.map((value, index) => {
              const Icon = iconMap[value.title] || Target;
              return (
              <motion.div
                key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={{ visible: { opacity: 1, y: 0, transition: { delay: index * 0.1, duration: 0.6 } }, hidden: { opacity: 0, y: 30 } }}
                  className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-lg hover:shadow-xl dark:shadow-gray-800/20 dark:hover:shadow-gray-800/40 border border-transparent hover:border-blue-500/30 dark:border-gray-800 dark:hover:border-blue-500/50 text-center transition-all duration-300 transform hover:-translate-y-2"
              >
                  <div className="flex justify-center mb-5">
                    <Icon className={valueIconColors[index % valueIconColors.length]} size={36} />
                </div>
                  <h3 className="text-xl font-bold text-brand-blue mb-3">
                  {value.title}
                </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
              )}
            )}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 sm:py-28 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={FADE_IN_UP}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-brand-blue mb-4">
              {aboutT.whyUs.title}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {aboutT.whyUs.items.map((item, index) => {
                const Icon = iconMap[item.title] || Users;
                return (
            <motion.div
                    key={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={{ visible: { opacity: 1, y: 0, transition: { delay: index * 0.15, duration: 0.6 } }, hidden: { opacity: 0, y: 30 } }}
                    className="text-center p-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200/50 dark:border-gray-800 transition-all duration-300 hover:shadow-md"
            >
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 ${whyUsIconColors[index % whyUsIconColors.length]}`}>
                      <Icon size={32} />
              </div>
                    <h3 className="text-xl font-bold text-brand-blue mb-3">
                      {item.title}
              </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {item.description}
              </p>
            </motion.div>
                )}
             )}
          </div>
        </div>
      </section>
    </div>
  );
}