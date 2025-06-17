import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  accentColor: string;
  index: number;
}

export default function ServiceCard({ 
  icon, 
  title, 
  description, 
  features, 
  accentColor,
  index 
}: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2, duration: 0.6 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-white p-8 rounded-2xl shadow-lg border border-light-gray group cursor-pointer transition-all duration-300 hover:shadow-2xl"
    >
      <div className="text-center">
        <motion.div 
          className={`w-20 h-20 bg-gradient-to-br ${accentColor} rounded-2xl flex items-center justify-center mx-auto mb-6`}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          {icon}
        </motion.div>
        
        <h3 className="text-2xl font-bold text-soft-navy mb-4">{title}</h3>
        
        <p className="text-charcoal-gray leading-relaxed mb-6">
          {description}
        </p>
        
        <ul className="text-sm text-charcoal-gray space-y-2 text-right">
          {features.map((feature, featureIndex) => (
            <li key={featureIndex} className="flex items-center justify-end">
              <Check className={`mr-2 rtl:mr-0 rtl:ml-2 w-4 h-4 ${accentColor.includes('sage') ? 'text-sage-green' : accentColor.includes('terracotta') ? 'text-warm-terracotta' : 'text-dusty-blue'}`} />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
