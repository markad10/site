# دليل نشر موقع خبراء المتحدة للاستشارات على Cloudflare Pages

## إعدادات البناء المطلوبة

### أوامر البناء والإخراج
```bash
# أمر البناء
npm run build

# مجلد الإخراج
dist

# أمر التثبيت (اختياري)
npm install
```

### متغيرات البيئة المطلوبة

#### للتكامل مع Supabase (اختياري)
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

#### لتحسين الأداء
```env
NODE_ENV=production
VITE_APP_ENV=production
```

## خطوات النشر

### 1. إعداد المشروع في Cloudflare Pages
1. تسجيل الدخول إلى Cloudflare Dashboard
2. الانتقال إلى Pages > Create a project
3. ربط مستودع GitHub أو تحميل الملفات مباشرة

### 2. إعدادات البناء
- **Framework preset**: Vite
- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Root directory**: `/` (الجذر)

### 3. إعدادات متقدمة
- **Node.js version**: 18.x أو أحدث
- **Environment variables**: إضافة متغيرات البيئة المطلوبة

## تحسينات الأداء

### إعدادات Headers
إضافة ملف `_headers` في مجلد `public`:
```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
  
/*.js
  Cache-Control: public, max-age=31536000, immutable
  
/*.css
  Cache-Control: public, max-age=31536000, immutable
  
/*.woff2
  Cache-Control: public, max-age=31536000, immutable
```

### إعدادات إعادة التوجيه
إضافة ملف `_redirects` في مجلد `public`:
```
# إعادة توجيه SPA
/*    /index.html   200
```

## اختبار ما بعد النشر

### قائمة التحقق
- [ ] تحميل الصفحة الرئيسية بنجاح
- [ ] عمل التنقل بين الصفحات
- [ ] عرض الصور بشكل صحيح
- [ ] عمل نموذج الاتصال
- [ ] تبديل اللغة (العربية/الإنجليزية)
- [ ] عرض أرقام الهواتف بالتنسيق الصحيح
- [ ] استجابة التصميم على الأجهزة المختلفة

### أدوات المراقبة
- Web Vitals من Google
- Cloudflare Analytics
- GTmetrix للأداء

## استكشاف الأخطاء

### مشاكل شائعة وحلولها

#### عدم تحميل الأصول (Assets)
```bash
# التأكد من المسارات في vite.config.ts
export default defineConfig({
  base: './', // للنشر في مجلد فرعي
  // أو
  base: '/', // للنشر في الجذر
})
```

#### خطأ 404 عند التنقل
- التأكد من وجود ملف `_redirects`
- التحقق من إعدادات SPA في Cloudflare

#### مشاكل متغيرات البيئة
- التأكد من بادئة `VITE_` لجميع المتغيرات
- التحقق من إعدادات Environment Variables في Cloudflare

## أمان إضافي

### WAF Rules (اختياري)
```
(http.request.method eq "POST" and http.request.uri.path contains "/api/contact" and rate(5m) > 10)
```

### Bot Fight Mode
تفعيل حماية البوتات الأساسية في Cloudflare Security.

## نصائح للأداء الأمثل

1. **تحسين الصور**: استخدام WebP عند الإمكان
2. **ضغط الملفات**: تفعيل Brotli في Cloudflare
3. **CDN**: الاستفادة من شبكة Cloudflare العالمية
4. **Caching**: إعداد قواعد التخزين المؤقت المناسبة