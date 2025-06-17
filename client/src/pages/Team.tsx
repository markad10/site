import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, ArrowRight } from "lucide-react";
import { JoinUsForm } from "@/components/JoinUsForm";
import heroImage from "@/assets/hero3.jpg";
import { cn } from "@/lib/utils";

export default function Team() {
  const { dir } = useLanguage();
  const { t } = useTranslation();
  
  const teamPageT = t.teamPage || { title: "فريقنا", subtitle: "تعرف على الخبراء الذين يقودون نجاحنا.", members: [] };

  const teamMembers = Array.isArray(teamPageT.members) ? teamPageT.members.map((member: any) => ({
    name: dir === 'rtl' ? member.name : (member.name || member.name),
    position: dir === 'rtl' ? member.position : (member.position || member.position),
    bio: dir === 'rtl' ? member.description : (member.description || member.description),
  })) : [];

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
            className="bg-white bg-opacity-80 backdrop-blur-sm py-10 px-8 rounded-xl shadow-lg"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight text-brand-blue">
              {teamPageT.title}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-brand-blue mb-12 leading-relaxed max-w-3xl mx-auto">
              {teamPageT.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="h-full"
              >
                <Card className={cn(
                  "h-full bg-white border border-gray-200 shadow-sm hover:shadow-lg rounded-xl overflow-hidden",
                  "transition-all duration-300 flex flex-col hover:border-brand-blue"
                )}>
                  <CardContent className="p-8 text-center flex-grow flex flex-col">
                    <div className="w-28 h-28 mx-auto rounded-full flex items-center justify-center mb-5 bg-brand-blue-light">
                      <User className="text-brand-blue" size={56} />
                    </div>
                    <h3 className="text-2xl font-bold text-brand-blue mb-1">
                      {member.name}
                    </h3>
                    <p className="text-brand-blue font-semibold mb-4">
                      {member.position}
                    </p>
                    <p className="text-brand-blue text-sm leading-relaxed flex-grow">
                      {member.bio}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="bg-gray-50 relative py-16">
        <div className="absolute inset-0 bg-brand-blue opacity-5"></div>
        <div className="relative z-10 max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-blue mb-4">
              {dir === "rtl" ? "انضم إلى فريقنا" : "Join Our Team"}
            </h2>
            <p className="text-lg text-brand-blue max-w-2xl mx-auto mb-10">
              {dir === "rtl" ? "نحن نبحث دائمًا عن المواهب الاستثنائية. إذا كنت تعتقد أنك مناسب، نود أن نسمع منك. يرجى ملء النموذج أدناه." : "We are always looking for exceptional talent. If you think you're a good fit, we'd love to hear from you. Please fill out the form below."}
            </p>
          </div>
          <div className="text-left">
            <JoinUsForm />
          </div>
        </div>
      </section>
    </div>
  );
}