// This file will handle all API requests under `/api/*`
// We will translate the Express logic from `server/routes.ts` to Cloudflare Workers syntax.

import { createClient } from '@supabase/supabase-js';
import { z } from "zod";
import type { PagesFunction } from '@cloudflare/workers-types';

// This schema can be shared between client and server
const insertContactSubmissionSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  serviceType: z.string(),
  projectDetails: z.string().min(10),
  fileUrl: z.string().url().optional(),
});

/**
 * Handles POST requests to /api/contact
 */
async function handleContactSubmission(request: Request, env: Env) {
  try {
    const body = await request.json();
    const validatedData = insertContactSubmissionSchema.parse(body);

    // Create a Supabase client instance within the worker
    const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_KEY);

    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([
        {
          full_name: validatedData.fullName,
          email: validatedData.email,
          phone: validatedData.phone,
          service_type: validatedData.serviceType,
          message: validatedData.projectDetails,
          file_url: validatedData.fileUrl,
        }
      ])
      .select();

    if (error) {
      throw new Error(error.message);
    }

    return new Response(JSON.stringify({ success: true, submission: data }), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify({ error: "Invalid form data", details: error.errors }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    console.error("Internal Server Error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

/**
 * Handles POST requests to /api/upload
 */
async function handleFileUpload(request: Request, env: Env) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return new Response(JSON.stringify({ error: "No file uploaded" }), { status: 400 });
    }

    // Create a Supabase client instance
    const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_KEY);

    // Create a unique file path
    const filePath = `public/${Date.now()}-${file.name}`;

    // Upload the file to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('contact-files') // Bucket name
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      throw new Error(`Supabase upload error: ${uploadError.message}`);
    }

    // Get the public URL for the uploaded file
    const { data: urlData } = supabase.storage
      .from('contact-files')
      .getPublicUrl(filePath);

    if (!urlData) {
        throw new Error("Could not get public URL for the file.");
    }

    return new Response(JSON.stringify({ fileUrl: urlData.publicUrl }), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("File upload failed:", error);
    return new Response(JSON.stringify({ error: `File upload failed: ${error.message}` }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// Define the environment variables interface
interface Env {
  SUPABASE_URL: string;
  SUPABASE_KEY: string;
}

/**
 * Main fetch handler for the Cloudflare Worker.
 * It acts as a router for all incoming API requests.
 */
export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const url = new URL(request.url);

  // Simple router
  if (url.pathname === '/api/contact' && request.method === 'POST') {
    return handleContactSubmission(request, env);
  }
  
  if (url.pathname === '/api/upload' && request.method === 'POST') {
    return handleFileUpload(request, env);
  }

  // Fallback for any other requests
  return new Response("Not Found", { status: 404 });
}; 