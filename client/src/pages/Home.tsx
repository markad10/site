import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/contexts/LanguageContext";
import AnimatedHero from "@/components/AnimatedHero";
import WhyChooseUs from "@/components/WhyChooseUs";
import { ArrowRight, Cog, CheckCircle2 } from "lucide-react";
import customerLogosImage from "@/assets/customor.jpg";
import contractorLogosImage from "@/assets/contractors.jpg";
import { servicesAr, servicesEn } from "@/data/services.tsx";

export default function Home() {
  const { t } = useTranslation();
  const { language, dir } = useLanguage();

  const services = language === 'ar' ? servicesAr : servicesEn;

  // Function to determine button color based on service index
  const getButtonColor = (index: number) => {
    switch (index) {
      case 0: // Legal - Green
        return "bg-green-600 hover:bg-green-700";
      case 1: // Financial - Orange
        return "bg-orange-600 hover:bg-orange-700";
      case 2: // Engineering - Red
        return "bg-red-600 hover:bg-red-700";
      default:
        return "bg-blue-600 hover:bg-blue-700";
    }
  };

  // Function to determine check icon color based on service index
  const getCheckIconColor = (index: number) => {
    return "text-blue-600";
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <AnimatedHero />

      {/* Services Overview */}
      <section id="services" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-700 dark:text-blue-500 mb-6">
              {t.home.servicesOverview.title}
            </h2>
            <p className="text-lg sm:text-xl text-brand-secondary-text dark:text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
              {t.home.servicesOverview.subtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.8, type: 'spring', stiffness: 50 }}
                className="group flex flex-col rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-400 ease-in-out border border-gray-200"
              >
                {/* Service Content */}
                <div className="p-8 flex flex-col flex-grow text-center">
                  {/* Card Header */}
                  <div className="flex flex-col items-center justify-center gap-4 mb-5">
                    <div className="p-4 bg-brand-blue-light rounded-xl mb-2">
                      {service.icon}
                    </div>
                    <h3 className={`text-2xl font-bold text-brand-text`}>
                      {service.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-brand-secondary-text mb-6 text-base leading-relaxed flex-grow">
                    {service.description}
                  </p>
                  
                  {/* Features List */}
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center justify-center gap-3">
                        <CheckCircle2 className={getCheckIconColor(index)} size={20} />
                        <span className={`text-brand-secondary-text font-medium`}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {/* CTA Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full mt-auto py-3 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center group ${getButtonColor(index)} text-white`}
                    onClick={() => window.location.href = "/contact"}
                  >
                    <span className="font-semibold">
                      {dir === "rtl" ? "اطلب استشارة الآن" : "Request a Consultation"}
                    </span>
                    <ArrowRight className={`${dir === "rtl" ? "mr-2 rotate-180" : "ml-2"} group-hover:translate-x-1 transition-transform duration-300`} size={20} />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* More Services Button */}
          <div className="text-center mt-16">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => window.location.href = "/services"}
              className="bg-white text-brand-blue px-8 py-3 rounded-xl font-semibold text-base transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-lg border border-gray-300 group"
            >
              <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse">
                <span>{dir === "rtl" ? "عرض جميع الخدمات" : "View All Services"}</span>
                <ArrowRight className={`${dir === "rtl" ? "rotate-180" : ""} text-brand-blue ml-2 rtl:ml-0 rtl:mr-2 transition-transform duration-300 group-hover:translate-x-1`} size={16} />
              </div>
            </motion.button>
          </div>
        </div>
      </section>

      {/* Customer Logos Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-blue-700 dark:text-blue-500 mb-6">
              {dir === "rtl" ? "عملاؤنا" : "Our Clients"}
            </h2>
            <p className="text-lg text-brand-secondary-text dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {dir === "rtl" 
                ? "نفخر بثقة أبرز المؤسسات والشركات في المملكة العربية السعودية"
                : "We are proud of the trust of leading institutions and companies in Saudi Arabia"
              }
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-2xl p-8"
          >
            <img 
              src={customerLogosImage}
              alt={dir === "rtl" ? "شعارات عملائنا" : "Our clients logos"}
              className="w-full h-auto rounded-xl"
            />
          </motion.div>
        </div>
      </section>

      {/* Contractors Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-blue-700 dark:text-blue-500 mb-6">
              {dir === "rtl" ? "المتعاقدون" : "Our Partners"}
            </h2>
            <p className="text-lg text-brand-secondary-text dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {dir === "rtl" 
                ? "شراكات استراتيجية مع أفضل الشركات والمؤسسات المحلية والدولية"
                : "Strategic partnerships with the best local and international companies and institutions"
              }
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-2xl p-8"
          >
            <img 
              src={contractorLogosImage}
              alt={dir === "rtl" ? "شعارات المتعاقدين" : "Our partners logos"}
              className="w-full h-auto rounded-xl"
            />
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Blog Section - Example */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        {/* Blog content */}
      </section>
    </div>
  );
}