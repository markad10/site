import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Award, Users, Target } from "lucide-react";

export default function WhyChooseUs() {
  const { dir } = useLanguage();

  const features = [
    {
      icon: <Award className="text-brand-blue" size={32} />,
      title: dir === "rtl" ? "خبرة متميزة" : "Distinguished Experience",
      description: dir === "rtl" ? "أكثر من 25 عاماً من الخبرة في تقديم الحلول الاستشارية المتطورة" : "Over 25 years of experience in providing advanced consulting solutions",
    },
    {
      icon: <Users className="text-brand-blue" size={32} />,
      title: dir === "rtl" ? "خبراؤنا" : "Our Experts",
      description: dir === "rtl" ? "نخبة من الخبراء والمتخصصين في مختلف المجالات الاستشارية" : "Elite experts and specialists in various consulting fields",
    },
    {
      icon: <Target className="text-brand-blue" size={32} />,
      title: dir === "rtl" ? "رؤية 2030" : "Vision 2030",
      description: dir === "rtl" ? "نساهم في تحقيق رؤية المملكة 2030 من خلال حلولنا المبتكرة" : "We contribute to achieving Saudi Vision 2030 through our innovative solutions",
    },
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-brand-text dark:text-white mb-6">
            {dir === "rtl" ? "لماذا تختارنا؟" : "Why Choose Us?"}
          </h2>
          <p className="text-xl text-brand-secondary-text dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {dir === "rtl" 
              ? "نقدم خدمات استشارية متميزة تساعدك على تحقيق أهدافك وتطلعاتك"
              : "We provide exceptional consulting services that help you achieve your goals and aspirations"
            }
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="text-center p-8"
            >
              <div className="w-20 h-20 bg-brand-blue-light rounded-full flex items-center justify-center mx-auto mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-brand-text dark:text-white mb-4">{feature.title}</h3>
              <p className="text-brand-secondary-text dark:text-gray-300 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}