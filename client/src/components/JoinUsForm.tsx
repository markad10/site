import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { ArrowRight, Loader2, FileText, CheckCircle, AlertCircle, CheckIcon } from "lucide-react";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const formSchema = z.object({
  fullName: z.string().min(2, { message: "الاسم يجب أن يكون حرفين على الأقل." }),
  email: z.string().email({ message: "الرجاء إدخال بريد إلكتروني صالح." }),
  phone: z.string().optional(),
  specialization: z.string({ required_error: "الرجاء اختيار التخصص." }),
  message: z.string().optional(),
  cv: z.instanceof(FileList).refine(files => files?.length === 1, "الرجاء تحميل سيرتك الذاتية."),
});

export function JoinUsForm() {
  const { dir } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ message: string; success: boolean } | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      message: "",
      specialization: "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    setSubmitStatus(null);
    console.log(values);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // On success:
    setSubmitStatus({ message: "تم إرسال طلبك بنجاح! سنتواصل معك قريبًا.", success: true });
    form.reset();
    setSelectedFile(null);
    
    // On error:
    // setSubmitStatus({ message: "حدث خطأ أثناء إرسال طلبك. الرجاء المحاولة مرة أخرى.", success: false });

    setIsSubmitting(false);
  }

  const specializations = [
    { value: "engineering", label: "هندسية", icon: "🏗️", description: "استشارات في مجال الهندسة المدنية، المعمارية، والتخطيط العمراني" },
    { value: "financial", label: "مالية", icon: "📊", description: "استشارات في التخطيط المالي، الاستثمار، وإدارة الأصول" },
    { value: "legal", label: "قانونية", icon: "⚖️", description: "استشارات في القانون التجاري، العقود، والملكية الفكرية" },
  ];

  return (
    <div className="bg-white bg-opacity-85 backdrop-blur-sm rounded-xl shadow-md p-6 md:p-8 border border-white border-opacity-50">
      <div className="mb-6 text-center">
        <h3 className="text-2xl font-bold text-brand-blue mb-2">انضم إلى فريقنا</h3>
        <p className="text-brand-blue">نرحب بالمواهب المتميزة للانضمام إلى فريق الخبراء لدينا</p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-brand-blue font-medium">الاسم الكامل</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="مثال: عبد الله محمد" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-brand-blue font-medium">البريد الإلكتروني</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="example@domain.com" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-brand-blue font-medium">رقم الهاتف (اختياري)</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="05xxxxxxxxx" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="specialization"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-brand-blue font-medium">اختر تخصصك</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                  >
                    {specializations.map((specialization) => (
                      <div key={specialization.value} className="relative">
                        <RadioGroupItem
                          value={specialization.value}
                          id={specialization.value}
                          className="peer sr-only"
                        />
                        <label
                          htmlFor={specialization.value}
                          className="flex flex-col h-full p-4 border-2 rounded-lg cursor-pointer border-gray-200 
                                    peer-data-[state=checked]:border-brand-blue peer-data-[state=checked]:bg-brand-blue-light
                                    hover:border-brand-blue hover:bg-white transition-all"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xl">{specialization.icon}</span>
                            <div className="hidden peer-data-[state=checked]:flex w-5 h-5 bg-brand-blue rounded-full items-center justify-center">
                              <CheckIcon className="h-3 w-3 text-white" />
                            </div>
                          </div>
                          <div className="font-medium text-lg mb-1 text-brand-blue">{specialization.label}</div>
                          <p className="text-sm text-brand-blue">{specialization.description}</p>
                        </label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-brand-blue font-medium">نبذة عنك (اختياري)</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="اكتب نبذة مختصرة عن خبراتك ومهاراتك..." 
                    {...field} 
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="cv"
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem>
                <FormLabel className="text-brand-blue font-medium">السيرة الذاتية (CV)</FormLabel>
                <FormControl>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 transition-colors hover:border-brand-blue bg-white bg-opacity-80">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <div className="bg-brand-blue-light p-3 rounded-full">
                        <FileText className="h-6 w-6 text-brand-blue" />
                      </div>
                      <div className="text-center">
                        {selectedFile ? (
                          <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-sm font-medium text-brand-blue">{selectedFile.name}</span>
                          </div>
                        ) : (
                          <>
                            <p className="text-brand-blue font-medium">اسحب الملف هنا أو</p>
                            <p className="text-sm text-brand-blue">PDF، DOC، أو DOCX (بحد أقصى 5 ميجابايت)</p>
                          </>
                        )}
                      </div>
                      <Button 
                        type="button"
                        variant="outline" 
                        className="relative overflow-hidden border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white"
                        onClick={() => document.getElementById('cv-upload')?.click()}
                      >
                        {selectedFile ? 'تغيير الملف' : 'اختر ملفًا'}
                        <Input
                          id="cv-upload"
                          type="file"
                          accept=".pdf,.doc,.docx"
                          className="absolute inset-0 opacity-0 cursor-pointer"
                          onChange={(e) => {
                            handleFileChange(e);
                            onChange(e.target.files);
                          }}
                          {...fieldProps}
                        />
                      </Button>
                    </div>
                  </div>
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          
          <div className="flex flex-col items-center pt-4">
            <Button 
              type="submit"
              disabled={isSubmitting}
              className={cn(
                "bg-brand-blue text-white px-10 py-6 rounded-lg font-semibold text-lg transition-all duration-300",
                "hover:bg-brand-blue-dark hover:shadow-lg flex items-center justify-center gap-2 w-full md:w-auto",
                "disabled:opacity-70"
              )}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>جاري الإرسال...</span>
                </>
              ) : (
                <>
                  <span>{dir === 'rtl' ? 'إرسال الطلب' : 'Submit Application'}</span>
                  <ArrowRight className={`h-5 w-5 transition-transform duration-300 group-hover:translate-x-1`} />
                </>
              )}
            </Button>
            
            {submitStatus && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "mt-4 p-3 rounded-lg w-full flex items-center justify-center gap-2",
                  submitStatus.success 
                    ? "bg-white bg-opacity-90 border border-green-200 text-brand-blue" 
                    : "bg-white bg-opacity-90 border border-red-200 text-brand-blue"
                )}
              >
                {submitStatus.success ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-500" />
                )}
                <p className="text-sm font-medium text-brand-blue">{submitStatus.message}</p>
              </motion.div>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
} 