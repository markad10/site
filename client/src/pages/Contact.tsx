import { motion } from "framer-motion";
import { ContactForm } from "@/components/ContactForm";
import { MapPin, Phone, Mail } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/contexts/LanguageContext";
import heroImage from "@/assets/hero3.jpg"; // Using hero3.jpg to match other pages

export default function Contact() {
  const { t } = useTranslation();
  const { dir } = useLanguage();

  const contactPageT = t.contactPage || {};
  const heroT = contactPageT.hero || {};
  const contactInfoT = contactPageT.contactInfo || {};
  const addressT = contactInfoT.address || {};
  const phoneT = contactInfoT.phone || {};
  const emailT = contactInfoT.email || {};

  return (
    <div className="bg-gray-50 dark:bg-gray-950">
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
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-brand-blue">{heroT.title || "Contact Us"}</h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl text-brand-blue">{heroT.subtitle || "Let us help you achieve your goals."}</p>
          </motion.div>
        </div>
      </motion.section>

      <div className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-x-16 items-start">
            
            <motion.div
              initial={{ opacity: 0, x: dir === 'rtl' ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
              className="bg-white dark:bg-gray-800/50 p-8 sm:p-10 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 h-full lg:col-span-4 mb-12 lg:mb-0"
            >
              <h2 className="text-3xl font-bold text-brand-blue mb-8">{contactInfoT.title || "Contact Information"}</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 p-3 bg-blue-100 dark:bg-blue-900/50 rounded-full"><MapPin className="w-6 h-6 text-blue-500" /></div>
                  <div className="ml-4 rtl:mr-4 rtl:ml-0">
                    <h3 className="text-lg font-semibold text-brand-blue">{addressT.title || "Address"}</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {(addressT.details || []).map((line, index) => (
                        <span key={index}>{line}<br/></span>
                      ))}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 p-3 bg-blue-100 dark:bg-blue-900/50 rounded-full"><Phone className="w-6 h-6 text-blue-500" /></div>
                  <div className="ml-4 rtl:mr-4 rtl:ml-0">
                    <h3 className="text-lg font-semibold text-brand-blue">{phoneT.title || "Phone"}</h3>
                    <p className="text-gray-600 dark:text-gray-400" dir="ltr">
                      {(phoneT.details || []).map((line, index) => (
                        <span key={index}>{line}<br/></span>
                      ))}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 p-3 bg-blue-100 dark:bg-blue-900/50 rounded-full"><Mail className="w-6 h-6 text-blue-500" /></div>
                  <div className="ml-4 rtl:mr-4 rtl:ml-0">
                    <h3 className="text-lg font-semibold text-brand-blue">{emailT.title || "Email"}</h3>
                    <p className="text-gray-600 dark:text-gray-400" dir="ltr">
                      {(emailT.details || []).map((line, index) => (
                        <span key={index}>{line}<br/></span>
                      ))}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative z-10 lg:col-span-6"
            >
              <ContactForm />
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
} 