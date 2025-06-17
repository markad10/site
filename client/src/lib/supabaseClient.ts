import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://mgwxyodldggzrvcvshse.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1nd3h5b2RsZGdnenJ2Y3ZzaHNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkwNDk0NzMsImV4cCI6MjA2NDYyNTQ3M30.pgWoM64vfoPayZvjKhAPmeTfgp4femHNhqSMKrCbBIM';

if (!supabaseUrl || !supabaseKey) {
  console.warn('Supabase environment variables not found, using fallback values');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// أنواع البيانات
export interface ContactSubmission {
  id?: number;
  full_name: string;
  email: string;
  phone: string;
  service_type: string;
  message: string;
  created_at?: string;
  status?: string;
}

// دوال التفاعل مع قاعدة البيانات
export const submitContactForm = async (data: Omit<ContactSubmission, 'id' | 'created_at' | 'status'>) => {
  const { data: result, error } = await supabase
    .from('contact_submissions')
    .insert([data])
    .select();

  if (error) {
    throw new Error(`خطأ في إرسال البيانات: ${error.message}`);
  }

  return result;
};

export const getContactSubmissions = async () => {
  const { data, error } = await supabase
    .from('contact_submissions')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`خطأ في جلب البيانات: ${error.message}`);
  }

  return data;
};