import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/contexts/LanguageContext";
import { Scale, CheckCircle, Gavel, Calculator, Send, ArrowRight, Building2 } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import heroImage from "@/assets/hero3.jpg";

export default function Services() {
  const { dir } = useLanguage();
  const { t } = useTranslation();

  const serviceCategories = [
    {
      key: 'legal',
      icon: <Gavel className="w-10 h-10 text-brand-blue" />,
    },
    {
      key: 'financial',
      icon: <Calculator className="w-10 h-10 text-brand-blue" />,
    },
    {
      key: 'engineering',
      icon: <Building2 className="w-10 h-10 text-brand-blue" />,
    }
  ];

  const servicesPageT = t.servicesPage || {
    hero: { title: "خدماتنا", subtitle: "نقدم حلولاً متكاملة لدعم نجاح أعمالك." },
    legal: { title: "الاستشارات القانونية", description: "وصف موجز للاستشارات القانونية.", points: { "1": { title: "صياغة العقود", description: "" }, "2": { title: "تأسيس الشركات", description: "" }, "3": { title: "الاستشارات التجارية", description: "" } } },
    financial: { title: "الاستشارات المالية", description: "وصف موجز للاستشارات المالية.", points: { "1": { title: "التخطيط المالي", description: "" }, "2": { title: "دراسات الجدوى", description: "" }, "3": { title: "التحليل المالي", description: "" } } },
    engineering: { title: "الاستشارات الهندسية", description: "وصف موجز للاستشارات الهندسية.", points: { "1": { title: "إدارة المشاريع", description: "" }, "2": { title: "التصميم الهندسي", description: "" }, "3": { title: "الإشراف الفني", description: "" } } },
    cta: { title: "هل أنت مستعد للبدء؟", subtitle: "تواصل معنا اليوم للحصول على استشارة مجانية.", button: "اطلب استشارة" }
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section 
        className="text-center py-20 sm:py-28"
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
            className="py-10 px-8 bg-white bg-opacity-80 backdrop-blur-sm rounded-xl shadow-lg"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-brand-blue tracking-tight">
              {servicesPageT.hero.title}
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl text-brand-blue">
              {servicesPageT.hero.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main content */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {serviceCategories.map((category, index) => {
              const categoryT = servicesPageT[category.key as keyof typeof servicesPageT] as any;
              return (
                <motion.div 
                  key={category.key}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="bg-white rounded-2xl p-8 flex flex-col items-start text-left hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-brand-blue"
                >
                  <div className="p-4 bg-brand-blue-light rounded-xl mb-5">
                    {category.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-brand-blue mb-3">
                    {categoryT.title}
                  </h3>
                  <p className="text-brand-blue mb-6 flex-grow">
                    {categoryT.description}
                  </p>
                  <div className="w-full space-y-3">
                    {Object.values(categoryT.points).map((point: any, pointIndex: number) => (
                      <div key={pointIndex} className="flex items-center">
                        <CheckCircle className="flex-shrink-0 h-5 w-5 text-brand-blue mr-3" />
                        <span className="text-brand-blue">{point.title}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <section className="bg-gray-50 relative py-16">
        <div className="absolute inset-0 bg-brand-blue opacity-5"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center py-16 px-4 sm:px-6 lg:px-8">
          <div className="bg-white bg-opacity-95 backdrop-blur-sm p-10 rounded-2xl shadow-md">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-brand-blue">
              {servicesPageT.cta.title}
            </h2>
            <p className="text-lg text-brand-blue max-w-2xl mx-auto mb-8">
              {servicesPageT.cta.subtitle}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "bg-brand-blue text-white px-8 py-4 rounded-lg font-semibold text-lg",
                "transition-all duration-300 hover:bg-brand-blue-dark hover:shadow-lg",
                "flex items-center group mx-auto"
              )}
              onClick={() => window.location.href = "/contact"}
            >
              <span>{servicesPageT.cta.button}</span>
              <ArrowRight className={`h-5 w-5 ${dir === 'rtl' ? 'mr-2' : 'ml-2'} transition-transform duration-300 group-hover:translate-x-1`} />
            </motion.button>
          </div>
        </div>
      </section>
    </div>
  );
}