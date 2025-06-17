import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useContactForm } from "@/hooks/useContactForm";
import { Gavel, Calculator, Building, Send, CheckCircle } from "lucide-react";
import { WhatsAppButton } from "./WhatsAppButton";

// Schema definition
const contactSchemaAr = z.object({
  fullName: z.string().min(3, { message: "الاسم يجب أن يتكون من 3 أحرف على الأقل." }),
  phone: z.string().min(10, { message: "يرجى إدخال رقم هاتف صحيح." }),
  email: z.string().email({ message: "يرجى إدخال بريد إلكتروني صحيح." }),
  serviceType: z.string({ required_error: "يرجى اختيار نوع الاستشارة." }),
  subject: z.string().min(5, { message: "الموضوع يجب أن يتكون من 5 أحرف على الأقل." }),
  message: z.string().min(10, { message: "الرسالة يجب أن تتكون من 10 أحرف على الأقل." }),
});

const contactSchemaEn = z.object({
  fullName: z.string().min(3, { message: "Full name must be at least 3 characters." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  serviceType: z.string({ required_error: "Please select a consultation type." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormData = z.infer<typeof contactSchemaEn>;

export function ContactForm() {
  const { dir, language } = useLanguage();
  const { t } = useTranslation();
  const { toast } = useToast();
  const { isLoading, isSuccess, submitContactForm, reset: resetHook } = useContactForm();
  
  // Defensive coding: Ensure translations are loaded
  if (!t.contactForm || !t.contactPage) {
    return <div>Loading...</div>;
  }

  const form = useForm<ContactFormData>({
    resolver: zodResolver(language === 'ar' ? contactSchemaAr : contactSchemaEn),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      serviceType: undefined,
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    await submitContactForm(data);
      form.reset();
  };
  
  const serviceTypes = t.contactPage?.services || [];

  const icons: { [key: string]: JSX.Element } = {
    "Legal": <Gavel size={20} />,
    "Financial": <Calculator size={20} />,
    "Engineering": <Building size={20} />,
    "قانونية": <Gavel size={20} />,
    "مالية": <Calculator size={20} />,
    "هندسية": <Building size={20} />,
  };
  
  if (isSuccess) {
  return (
        <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center text-center bg-white dark:bg-gray-800 p-10 rounded-2xl shadow-xl h-full"
      >
        <CheckCircle className="w-16 h-16 text-green-500 mb-6" />
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t.contactForm.success.title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-8">{t.contactForm.success.subtitle}</p>
        <Button onClick={() => resetHook()}>{t.contactForm.success.button}</Button>
        </motion.div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-8 sm:p-10 rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">{t.contactForm.title}</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          
          {/* Service Type */}
          <FormField
            control={form.control}
            name="serviceType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-gray-800 dark:text-gray-200">{t.contactForm.service.label}</FormLabel>
                <div className="grid grid-cols-3 gap-2 pt-2">
                    {serviceTypes.map((service) => (
                      <motion.div
                      key={service.title}
                      whileTap={{ scale: 0.95 }}
                    >
                      <button
                        type="button"
                        onClick={() => field.onChange(service.title)}
                        className={`w-full flex items-center justify-center p-3 rounded-lg border-2 transition-all duration-200 ${
                          field.value === service.title
                            ? 'bg-blue-600 border-blue-600 text-white shadow-lg'
                            : 'bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:border-blue-500'
                        }`}
                      >
                        {icons[service.title]}
                        <span className="ml-2 rtl:mr-2 rtl:ml-0">{service.title}</span>
                      </button>
                      </motion.div>
                    ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
                
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
                      <FormField
                        control={form.control}
              name="fullName"
                        render={({ field }) => (
                          <FormItem>
                  <FormLabel className="font-semibold text-gray-800 dark:text-gray-200">{t.contactForm.name.label}</FormLabel>
                            <FormControl>
                    <Input placeholder={t.contactForm.name.placeholder} {...field} className="bg-gray-50 dark:bg-gray-700/50" />
                            </FormControl>
                  <FormMessage />
                          </FormItem>
                        )}
                      />
            {/* Phone */}
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                  <FormLabel className="font-semibold text-gray-800 dark:text-gray-200">{t.contactForm.phone.label}</FormLabel>
                            <FormControl>
                    <Input placeholder={t.contactForm.phone.placeholder} {...field} className="bg-gray-50 dark:bg-gray-700/50" />
                            </FormControl>
                  <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

          {/* Email */}
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                <FormLabel className="font-semibold text-gray-800 dark:text-gray-200">{t.contactForm.email.label}</FormLabel>
                          <FormControl>
                  <Input placeholder={t.contactForm.email.placeholder} {...field} className="bg-gray-50 dark:bg-gray-700/50" />
                          </FormControl>
                <FormMessage />
                        </FormItem>
                      )}
                    />
                    
          {/* Subject */}
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                <FormLabel className="font-semibold text-gray-800 dark:text-gray-200">{t.contactForm.subject.label}</FormLabel>
                          <FormControl>
                  <Input placeholder={t.contactForm.subject.placeholder} {...field} className="bg-gray-50 dark:bg-gray-700/50" />
                          </FormControl>
                <FormMessage />
                        </FormItem>
                      )}
                    />

          {/* Message */}
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                <FormLabel className="font-semibold text-gray-800 dark:text-gray-200">{t.contactForm.message.label}</FormLabel>
                          <FormControl>
                  <Textarea placeholder={t.contactForm.message.placeholder} {...field} rows={5} className="bg-gray-50 dark:bg-gray-700/50" />
                          </FormControl>
                <FormMessage />
                        </FormItem>
                      )}
                    />

          <div className="pt-4">
            <Button type="submit" disabled={isLoading} className="w-full text-lg py-6 bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600 shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-1 transition-all duration-300">
                      {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  {t.common.loadingSending}
                </>
              ) : (
                <>
                  <Send className={`w-5 h-5 ${dir === 'rtl' ? 'ml-2' : 'mr-2'}`} />
                  {t.contactForm.submit}
                </>
                      )}
                    </Button>
          </div>
          
          <div className="pt-6 text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-3">
              {dir === 'rtl' 
                ? "أو تواصل معنا مباشرة عبر الواتساب:" 
                : "Or contact us directly via WhatsApp:"}
            </p>
            <div className="flex justify-center">
              <WhatsAppButton className="px-6" />
            </div>
          </div>
                  </form>
                </Form>
      </div>
  );
}