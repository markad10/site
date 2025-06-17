import { motion } from "framer-motion";
import customerLogosImage from "@/assets/customor.jpg";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/contexts/LanguageContext";

export default function CustomerLogos() {
  const { t } = useTranslation();
  const { dir } = useLanguage();
  
  return (
    <section className="py-16 bg-gradient-to-br from-off-white to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal-gray mb-4">
            {dir === "rtl" ? "عملاؤنا المميزون" : "Our Distinguished Clients"}
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
            {dir === "rtl" 
              ? "نفخر بثقة عملائنا من كبرى الشركات والمؤسسات الحكومية والخاصة في المملكة العربية السعودية"
              : "We pride ourselves on the trust of our clients from major companies and government and private institutions in Saudi Arabia"}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
        >
          <div className="flex justify-center">
            <img
              src={customerLogosImage}
              alt={dir === "rtl" ? "شركاؤنا وعملاؤنا المميزون" : "Our partners and distinguished clients"}
              className="w-full max-w-5xl h-auto object-contain rounded-lg"
            />
          </div>
          
          <div className="text-center mt-8">
            <p className="text-gray-600 text-sm md:text-base">
              {dir === "rtl" 
                ? <>أكثر من <span className="font-bold text-dusty-blue">50+ عميل</span> يثقون بخبرتنا وجودة خدماتنا</>
                : <>More than <span className="font-bold text-dusty-blue">50+ clients</span> trust our expertise and service quality</>
              }
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}