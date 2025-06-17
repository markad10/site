import { z } from "zod";

interface Env {
  CONTACT_SUBMISSIONS: KVNamespace;
}

// نفس مخطط البيانات الموجود في المشروع الأصلي
const contactSubmissionSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(5),
  serviceType: z.string(),
  projectDetails: z.string(),
  fileUrl: z.string().nullable().optional(),
});

type ContactSubmission = z.infer<typeof contactSubmissionSchema> & {
  id: string;
  createdAt: string;
};

export const onRequest: PagesFunction<Env> = async (context) => {
  const url = new URL(context.request.url);
  const pathSegments = url.pathname.split("/").filter(Boolean);
  
  // تجاهل "api" من المسار لمعالجة المسارات الفعلية
  if (pathSegments.length > 0 && pathSegments[0] === "api") {
    pathSegments.shift();
  }

  // اختيار المسار المناسب بناءً على URL وطريقة الطلب
  if (pathSegments[0] === "contact") {
    if (context.request.method === "POST") {
      return handleContactSubmission(context);
    }
  }
  
  else if (pathSegments[0] === "contact-submissions" && context.request.method === "GET") {
    return handleGetSubmissions(context);
  }
  
  else if (pathSegments[0] === "upload" && context.request.method === "POST") {
    return handleFileUpload(context);
  }

  // إرجاع خطأ 404 إذا لم يتم العثور على المسار
  return new Response(JSON.stringify({ error: "Route not found" }), {
    status: 404,
    headers: { "Content-Type": "application/json" }
  });
};

// معالج إرسال نموذج الاتصال
async function handleContactSubmission(context: EventContext<Env, string, unknown>) {
  try {
    // استخراج البيانات من الطلب
    const data = await context.request.json();
    
    // التحقق من صحة البيانات
    const validatedData = contactSubmissionSchema.parse(data);
    
    // إنشاء معرف فريد وتاريخ إنشاء
    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();
    
    // تخزين بيانات النموذج في KV
    const submission: ContactSubmission = {
      ...validatedData,
      id,
      createdAt,
      fileUrl: validatedData.fileUrl || null
    };
    
    await context.env.CONTACT_SUBMISSIONS.put(id, JSON.stringify(submission));
    
    // إرجاع استجابة ناجحة
    return new Response(JSON.stringify({ success: true, submission }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    let status = 500;
    let message = "خطأ في الخادم الداخلي";
    
    if (error instanceof z.ZodError) {
      status = 400;
      message = "بيانات غير صالحة";
    }
    
    return new Response(JSON.stringify({ error: message, details: error }), {
      status,
      headers: { "Content-Type": "application/json" }
    });
  }
}

// معالج الحصول على جميع نماذج الاتصال
async function handleGetSubmissions(context: EventContext<Env, string, unknown>) {
  try {
    // الحصول على جميع المفاتيح في مخزن KV
    const keys = await context.env.CONTACT_SUBMISSIONS.list();
    
    // الحصول على جميع النماذج
    const submissions: ContactSubmission[] = [];
    for (const key of keys.keys) {
      const data = await context.env.CONTACT_SUBMISSIONS.get(key.name);
      if (data) {
        submissions.push(JSON.parse(data));
      }
    }
    
    return new Response(JSON.stringify(submissions), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "خطأ في الخادم الداخلي" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

// معالج تحميل الملفات
async function handleFileUpload(context: EventContext<Env, string, unknown>) {
  try {
    const formData = await context.request.formData();
    const file = formData.get("file") as File | null;
    
    if (!file) {
      return new Response(JSON.stringify({ error: "لم يتم تحميل أي ملف" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    
    // ملاحظة: في النسخة الحقيقية، ستقوم برفع الملف إلى R2 أو خدمة تخزين أخرى
    // وهنا نقوم بمحاكاة ذلك من خلال إرجاع عنوان URL وهمي
    
    const fileId = crypto.randomUUID();
    const fileUrl = `/uploads/${fileId}-${file.name}`;
    
    return new Response(JSON.stringify({ fileUrl }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "فشل تحميل الملف" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
} 