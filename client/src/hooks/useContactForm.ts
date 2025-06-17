import { useState } from 'react';

interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  serviceType: string;
  projectDetails: string;
  fileUrl?: string | null;
}

export function useContactForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitContactForm = async (formData: ContactFormData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'فشل إرسال النموذج');
      }
      
      setIsSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ ما');
      console.error('خطأ في إرسال نموذج الاتصال:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const uploadFile = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('فشل تحميل الملف');
      }
      
      const data = await response.json();
      return data.fileUrl;
    } catch (error) {
      console.error('خطأ في تحميل الملف:', error);
      return null;
    }
  };

  const reset = () => {
    setIsSuccess(false);
    setError(null);
  };

  return {
    isLoading,
    isSuccess,
    error,
    submitContactForm,
    uploadFile,
    reset
  };
} 